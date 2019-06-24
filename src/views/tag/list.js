/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/24 16:18
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/24 16:18
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Button, Table, Modal} from 'antd';
import {getTagsList, deleteTags, setStore} from '../../redux/tag/list.redux';

const mapStateProps = state => ({
    tags_list: state.tags_list
});

const mapDispatchToProps = dispatch => ({
    getTagsList, deleteTags, setStore
});

@connect(
    mapStateProps,
    mapDispatchToProps()
)

class ListForm extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentWillMount() {
        this.props.getTagsList()
    }

    handleAddTag = () => {

    };

    render() {
        const columns = [
            {
                title: '名称',
                dataIndex: 'tags_name',
                key: 'tags_name',
            },
            {
                title: '描述',
                dataIndex: 'tags_desc',
                key: 'tags_desc',
            },
            {
                title: '文章数',
                dataIndex: 'tags_article_num',
                key: 'tags_article_num',
            },
            {
                title: '操作',
                key: 'action',
                render: (value, params) => (
                    <span>
                        <Button
                            type="primary"
                            size="small"
                            style={{marginRight: '5px'}}
                            onClick={() => {

                            }}
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
                                        this.props.deleteTags({
                                            _id: params._id,
                                            onSuccess: () => {
                                                this.props.getTagsList()
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

        return (
            <div>
                <Form layout="inline">
                    <Button
                        type="primary"
                        onClick={this.handleAddTag}
                    >
                        添加标签
                    </Button>
                </Form>
                <Table
                    style={{marginTop: '20px'}}
                    columns={columns}
                    dataSource={this.props.tags_list.tag_list}
                    rowKey="_id"
                />
            </div>
        )
    }
}

const List = Form.create()(ListForm);

export default List
