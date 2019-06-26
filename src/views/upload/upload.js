/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/26 14:22
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/26 14:22
 */

import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Form, Tree, Row, Col, Button, Table, Modal} from 'antd';
import {getUploadList, alterUpload, deleteUpload, setStore} from '../../redux/upload/upload.redux';

const {TreeNode, DirectoryTree} = Tree;

const mapStateProps = state => ({
    upload: state.upload
});

const mapDispatchToProps = dispatch => ({
    getUploadList, alterUpload, deleteUpload, setStore
});

@connect(
    mapStateProps,
    mapDispatchToProps()
)

class UploadForm extends Component {

    onSelect = (keys, event) => {
        console.log('Trigger Select', keys, event);
    };

    onExpand = () => {
        console.log('Trigger Expand');
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

    render() {
        const tree_list = this.props.upload;

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
                dataIndex: 'image_url',
                key: 'image_url',
                render: (value, params) => (
                    <img src={value} style={{width: '40px', height: '40px'}}/>
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
            <div>
                <Row gutter={16}>
                    <Col span={6}>
                        <DirectoryTree multiple defaultExpandAll onSelect={this.onSelect} onExpand={this.onExpand}>
                            {/*<TreeNode title="parent 0" key="0-0">
                                <TreeNode title="leaf 0-0" key="0-0-0" isLeaf/>
                                <TreeNode title="leaf 0-1" key="0-0-1" isLeaf/>
                            </TreeNode>
                            <TreeNode title="parent 1" key="0-1">
                                <TreeNode title="leaf 1-0" key="0-1-0" isLeaf/>
                                <TreeNode title="leaf 1-1" key="0-1-1" isLeaf/>
                            </TreeNode>*/}

                            {
                                tree_list.map((item, key) => (
                                    <TreeNode
                                        title={item.name}
                                        key={key}
                                    >
                                        {
                                            item.nodes && item.nodes.map((node, nodeKey) => (
                                                <TreeNode
                                                    title={node.name}
                                                    key={nodeKey}
                                                    isLeaf
                                                />
                                            ))
                                        }
                                    </TreeNode>
                                ))
                            }
                        </DirectoryTree>
                    </Col>
                    <Col span={18}>
                        <Table
                            style={{marginTop: '20px'}}
                            columns={columns}
                            dataSource={this.props.upload.upload_list}
                            rowKey="_id"
                            pagination={paginationProps}
                            onChange={this.handleTableChange}
                        />
                    </Col>
                </Row>

            </div>
        )
    }
}

const Upload = Form.create()(UploadForm);

export default Upload
