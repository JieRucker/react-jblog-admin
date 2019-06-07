import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Form, Select, Input, Button, Table} from 'antd';
import {getTagsList, getArticleList} from '../../redux/article/list.redux';

const {Option} = Select;

const mapStateProps = state => ({
    article: state.article_list
});

const mapDispatchToProps = dispatch => ({
    getTagsList, getArticleList
});

@connect(
    mapStateProps,
    mapDispatchToProps()
)

class ListForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // keyword: '',
            // tag: -1,
            // state: -1,
            state_list: [{
                name: '所有',
                value: ''
            }, {
                name: '发布',
                value: 1
            }, {
                name: '草稿',
                value: 0
            }],
            /*pagination: {
                total_count: 0
            },*/
            // loading: false,
            // data: []
        }
    }

    componentWillMount() {
        this.props.getTagsList()
    }

    componentDidMount() {
        this.props.getArticleList({...this.props.article.search, ...this.props.article.pagination})
    }

    handleTagChange = (value) => {
        console.log('value', value);

        this.setState(prevState => ({tag: value}))
    };

    handleStateChange = (value) => {
        console.log('value', value);

        this.setState(prevState => ({state: value}))
    };

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    /**
     * 搜索
     * @params e
     */
    handleSearch = e => {
        e.preventDefault();

        this.props.getArticleList({...this.props.article.search, ...this.props.article.pagination})
    };

    /**
     * 写文章
     * @params e
     */
    handleArticle = e => {

    };

    /**
     * 查看
     * @params e
     */
    handlePreview = e => {

    };

    /**
     * 修改
     * @params e
     */
    handleFix = e => {

    };

    /**
     * 删除
     * @params e
     */
    handleDelete = e => {

    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });

        let params = {
            current_page: 1,
            page_size: 10,
        };

        this.props.getArticleList(params);
    };

    render() {
        const columns = [
            {
                title: '文章标题',
                dataIndex: 'article_title',
                key: 'article_title',
            },
            {
                title: '创建日期',
                dataIndex: 'article_create_time',
                key: 'article_create_time',
                render: (params) => (
                    <span>{params.article_create_time}</span>
                )
            },
            {
                title: '修改日期',
                dataIndex: 'article_update_time',
                key: 'article_update_time',
                render: (params) => (
                    <span>{params.article_update_time}</span>
                )
            },
            {
                title: '标签',
                key: 'article_tags',
                dataIndex: 'article_tags',
                render: () => {

                }
            },
            {
                title: '状态',
                key: 'article_state',
                dataIndex: 'article_state',
                render: (params) => (
                    <span>{this.formatState(params.article_state)}</span>
                )
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button
                            type="primary"
                            size="small"
                            style={{marginRight: '5px'}}
                            onClick={this.handlePreview}
                        >查看
                        </Button>
                        <Button
                            type="primary"
                            size="small"
                            style={{marginRight: '5px'}}
                            onClick={this.handleFix}
                        >修改
                        </Button>
                        <Button
                            type="danger"
                            size="small"
                            onClick={this.handleDelete}
                        >删除
                        </Button>
                    </span>
                ),
            },
        ];

        console.log(this)

        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item label="标签：">
                        <Select defaultValue={this.props.article.search.tag} style={{width: 150}}
                                onChange={this.handleTagChange}>
                            {this.props.article.tag_list.map((item, key) => (
                                <Option
                                    key={key}
                                    value={item._id}
                                >
                                    {item.tags_name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="状态：">
                        <Select defaultValue={this.props.article.search.state} style={{width: 150}}
                                onChange={this.handleStateChange}>
                            {this.state.state_list.map((item, key) => (
                                <Option
                                    key={key}
                                    value={item.value}
                                >
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="搜索：">
                        <Input
                            placeholder="请输入关键词"
                            name="keyword"
                            value={this.state.keyword}
                            onChange={this.handleInputChange}
                        />
                    </Form.Item>
                    <Button
                        style={{margin: '4px'}}
                        type="primary"
                        onClick={this.handleSearch}
                    >
                        搜索
                    </Button>
                    <Button
                        type="default"
                        style={{marginLeft: '10px'}}
                        onClick={this.handleArticle}
                    >
                        写文章
                    </Button>
                </Form>
                <Table
                    style={{marginTop: '20px'}}
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                />
            </div>

        )
    }
}

const List = Form.create()(ListForm);

export default List


/*<template>
  <div>
    <Form :label-width="60" inline>
      <FormItem label="标签：">
        <Select v-model="search.tag" style="width: 150px">
          <Option :value="item._id" :key="item._id" v-for="item in tagList">{{item.tags_name}}</Option>
        </Select>
      </FormItem>

      <FormItem label="状态：">
        <Select v-model="search.state" style="width: 150px">
          <Option :value="item.value" :key="item.value" v-for="item in stateOptions">{{item.name}}</Option>
        </Select>
      </FormItem>

      <FormItem label="搜索">
        <Input v-model="search.keyword" placeholder="请输入关键词"></Input>
      </FormItem>
      <Button type="primary" @click="handleSearch">搜索</Button>
      <Button type="default" style="margin-left: 10px" @click="handleArticle">写文章</Button>
    </Form>

    <Table :columns="table.header" :data="table.body"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="table.args.total_count"
              :current="table.args.current_page"
              :page-size="table.args.page_size"
              show-total @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>*/

/*<script>
  export default {
    name: "article-list",
    data() {
      return {
        search: {
          keyword: '',
          tag: -1,
          state: -1
        },
        stateOptions: [
          {
            name: '所有',
            value: -1
          },
          {
            name: '发布',
            value: 1
          },
          {
            name: '草稿',
            value: 0
          }
        ],
        table: {
          header: [
            {
              title: '文章标题',
              key: 'article_title'
            },
            {
              title: '创建日期',
              key: 'article_create_time',
              render: (h, params) => {
                return h('div', [
                  h('Span', {}, params.row.article_create_time)
                ]);
              }
            },
            {
              title: '修改日期',
              key: 'article_update_time',
              render: (h, params) => {
                return h('div', [
                  h('Span', {}, params.row.article_update_time)
                ]);
              }
            },
            {
              title: '标签',
              key: 'article_tags',
              render: (h, params) => {
                let a = null;
                if (params.row.article_tags.length) {
                  a = h('ul', params.row.article_tags.map((item, key) => {
                    return h('li', {
                      style: {
                        float: 'left'
                      },
                      attrs: {
                        title: item.tags_desc
                      }
                    }, key === params.row.article_tags.length - 1 ? item.tags_name : `${item.tags_name},`)
                  }))
                } else {
                  a = h('Span', '无')
                }

                return a;
              }
            },
            {
              title: '状态',
              key: 'article_state',
              render: (h, params) => {
                return h('div', [
                  h('Span', {}, this.formatState(params.row.article_state))
                ]);
              }
            },
            {
              title: '操作',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        let prefix = 'https://www.jrucker.cn';
                        window.open(`${prefix}/detail/${params.row._id}`, '_blank')
                      }
                    }
                  }, '查看'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: 'create-article',
                          query: {
                            _id: params.row._id
                          }
                        })
                      }
                    }
                  }, '修改'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: '提示',
                          content: '<p>确定删除？</p>',
                          onOk: async () => {
                            let res = await this.$api.articleInterface.deleteArticleById({_id: params.row._id});
                            let {msg} = res.data;
                            this.getArticleList();
                            return this.$Message.info(msg)
                          }
                        });
                      }
                    }
                  }, '删除')
                ]);
              }
            },
          ],
          body: [],
          args: {
            current_page: 1,
            page_size: 10,
            total_count: 0
          },
        },
        tagList: [],
      }
    },
    async created() {
      let res = await this.$api.tagsInterface.getTagsList();
      let {article_num_list = [], tags_list = []} = res.data.data;
      tags_list.forEach(item => {
        let temp = article_num_list.find(i => i._id === item._id);
        item.tags_article_num = temp == null ? 0 : temp.count;
      });

      this.tagList = tags_list.sort((a, b) => {
        return a.tags_article_num < b.tags_article_num;
      });

      this.tagList = tags_list;
      this.tagList.unshift({
        tags_name: '所有',
        _id: -1
      });

      this.getArticleList();
    },
    methods: {
      async getArticleList() {
        let a = {
          keyword: this.search.keyword,
          tag: this.search.tag === -1 ? '' : this.search.tag,
          state: this.search.state === -1 ? '' : this.search.state
        };

        let res = await this.$api.articleInterface.getArticleList({...a, ...this.table.args});
        let {code, data = {}} = res.data;
        if (code === 200) {
          this.table.body = data.list;
          this.table.args.total_count = data.total;
        }
      },
      handleArticle() {
        this.$router.push({
          name: 'create-article'
        })
      },
      handleSearch() {
        this.search.current_page = 1;
        this.getArticleList();
      },
      changePage(targetPage) {
        this.table.args.current_page = targetPage;
        this.getArticleList();
      },
      formatState(val) {
        return val === 0 ? "草稿" : "发布";
      }
    }
  }
</script>*/
