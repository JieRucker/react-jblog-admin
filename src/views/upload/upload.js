/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/26 14:22
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/26 14:22
 */

import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Form, Row, Col, Button, Table, Input, Modal} from 'antd';
import {
    getFold,
    addFold,
    alterFold,
    deleteFold,
    getUploadList,
    alterUpload,
    deleteUpload,
    setStore
} from '../../redux/upload/upload.redux';
import EditableTree from './EditableTree';
import './upload.scss';

const mapStateProps = state => ({
    upload: state.upload
});

const mapDispatchToProps = dispatch => ({
    getFold, addFold, alterFold, deleteFold,
    getUploadList, alterUpload, deleteUpload, setStore
});

@connect(
    mapStateProps,
    mapDispatchToProps()
)

class UploadForm extends Component {

    state = {
        foldVisible: false,
        foldName: '',
        parentId: -1,
    };

    componentWillMount() {
        this.props.getFold();
    };

    componentDidMount() {

    };

    handleTableChange = (pagination, filters, sorter) => {
        this.props.setStore({
            current_page: pagination.current,
        });

        setTimeout(() => {
            let {keyword, tag, state, current_page, page_size} = this.props.upload;
            this.props.getUploadList({keyword, tag, state, current_page, page_size})
        }, 50)
    };

    onSelect = (value) => {
        console.log('onSelect', value);
    };

    onExpand = (value) => {
        console.log('onExpand', value);
    };

    onAdd = ({item}) => {
        this.setState({
            foldVisible: true,
            parentId: item._id
        })
    };

    onSave = ({item}) => {
        this.props.alterFold({
            _id: item._id,
            name: item.value,
            onSuccess: () => {
                this.props.getFold();
            }
        });
    };

    onDelete = ({item}) => {
        Modal.confirm({
            title: '删除',
            content: '确定删除吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                this.props.deleteFold({
                    _id: item._id,
                    onSuccess: () => {
                        this.props.getFold();
                    }
                });
            },
        });
    };

    render() {
        const {tree_list} = this.props.upload;

        const columns = [
            {
                title: '文件名',
                dataIndex: 'image_origin_name',
                key: 'image_origin_name',
            },
            {
                title: '创建日期',
                dataIndex: 'create_date',
                key: 'create_date',
                render: (value, params) => (
                    <span>{value}</span>
                )
            },
            {
                title: '大小',
                dataIndex: 'image_size',
                key: 'image_size',
                render: (value, params) => (
                    <span>{`${(value / 1024).toFixed(3)}kb`}</span>
                )
            },
            {
                title: '图片',
                render: (value, params) => (
                    <img src={params.image_url} alt="" style={{width: '40px', height: '40px'}}/>
                )
            },
            {
                title: '地址',
                dataIndex: 'image_url',
                key: 'image_url',
                render: (value, params) => (
                    <span>{value}</span>
                )
            },
            {
                title: '操作',
                key: 'action',
                render: (value, params) => (
                    <span>
                        {/*<Button
                            type="primary"
                            size="small"
                            style={{marginRight: '5px'}}
                            onClick={() => {
                                let prefix = 'https://www.jrucker.cn';
                                window.open(`${prefix}/detail/${params._id}`, '_blank')
                            }}
                        >预览
                        </Button>*/}
                        <Button
                            type="primary"
                            size="small"
                            style={{marginRight: '5px'}}
                            onClick={() => this.props.history.push(`/app/work/edit/${params._id}`)}
                        >修改
                        </Button>
                        <Button
                            type="danger"
                            size="small"
                            onClick={() => {
                                Modal.confirm({
                                    title: '删除',
                                    content: '确定删除吗？',
                                    okText: '确认',
                                    cancelText: '取消',
                                    onOk: async () => {
                                        this.props.deleteUplaod({
                                            _id: params._id,
                                            onSuccess: () => {
                                                this.getUploadList()
                                            }
                                        })
                                    },
                                });
                            }}
                        >删除
                        </Button>
                    </span>
                ),
            },
        ];

        const paginationProps = {
            pageSize: this.props.upload.page_size,
            total: this.props.upload.total_count,
        };

        return (
            <div style={{height: '100%'}}>
                <Row gutter={16} style={{height: '100%'}}>
                    <Col span={5} className="tree">
                        <div>
                            <h2 className="title">文件目录</h2>
                            <Button className="button" size="small" onClick={() => {
                                this.setState(() => ({foldVisible: true, parentId: -1}));
                            }}>新建目录</Button>
                        </div>
                        <EditableTree
                            list={tree_list}
                            onSelect={this.onSelect}
                            onExpand={this.onExpand}
                            onSave={this.onSave}
                            onAdd={this.onAdd}
                            onDelete={this.onDelete}
                        />
                    </Col>
                    <Col span={19}>
                        <Table
                            columns={columns}
                            dataSource={this.props.upload.upload_list}
                            rowKey="_id"
                            pagination={paginationProps}
                            onChange={this.handleTableChange}
                        />
                    </Col>
                </Row>

                <Modal
                    title="新建目录"
                    visible={this.state.foldVisible}
                    destroyOnClose
                    onOk={() => {
                        this.props.addFold({
                            parentId: this.state.parentId,
                            name: this.state.foldName,
                            onSuccess: () => {
                                this.props.getFold();

                                this.setState({
                                    foldVisible: false
                                })
                            }
                        });
                    }}
                    onCancel={() => {
                        this.setState(() => ({foldVisible: false}));
                    }}
                >
                    <Input
                        placeholder="请输入名称"
                        onChange={(e) => {
                            this.setState({foldName: e.target.value})
                        }}
                    />
                </Modal>
            </div>
        )
    }
}

const Upload = Form.create()(UploadForm);

export default Upload
