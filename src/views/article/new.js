/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/15 下午2:55
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/15 下午2:55
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Select, Input, Button, Tag, message} from 'antd';
// import Editor from 'for-editor';
import Editor from '../../components/editor';
import './stylesheet.css';
// import MdEditor from 'react-markdown-editor-lite';
// import MarkdownIt from 'markdown-it';
// import hljs from 'highlight.js';
// import MarkdownEditor from '@uiw/react-markdown-editor';
// import SimpleMDE from "react-simplemde-editor";
// import "simplemde/dist/simplemde.min.css";
// import './github-markdown.css';
import {getTagsList, getArticle, addArticle, alterArticle, setStore} from "../../redux/article/new.redux";

const {Option} = Select;
const {CheckableTag} = Tag;

const mapStateProps = state => ({
    article_new: state.article_new
});

const mapDispatchToProps = dispatch => ({
    getTagsList, getArticle, addArticle, alterArticle, setStore
});

@connect(
    mapStateProps,
    mapDispatchToProps()
)

class NewForm extends Component {

    editor = null;

    constructor(props) {
        super(props);

        this.state = {
            state_list: [{
                name: '发布',
                value: 1
            }, {
                name: '草稿',
                value: 0
            }],
            formLayout: 'horizontal',
        };

    }


    handleEditorChange = (value) => {
        console.log(value)
        this.props.setStore({
            content: value,
        });
        // console.log('handleEditorChange', html, md)
    };

    /*handleGetMdValue = () => {
        window.editor = this.editor;
        console.log(this.editor)
        // this.editor && alert(this.editor.getMdValue())
    };*/

    /*handleGetHtmlValue = () => {
        this.editor && alert(this.editor.getHtmlValue())
    };*/

    componentWillMount() {
        this.props.getTagsList()
    }

    componentDidMount() {
        console.log(this);

        // let _id = ''
        // this.props.getArticle({_id})
    }

    updateMarkdown = (editor, data, value) => {
        window.editor = editor;
    };

    handleInputTitleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

        this.props.setStore({
            title: event.target.value,
        });
    };

    handleStateChange = value => {
        this.props.setStore({
            state: value,
        });

        // this.setState(prevState => ({state: value}))
    };

    handleInputCoverChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

        this.props.setStore({
            cover: event.target.value,
        });
    };

    handleTextAreaChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

        this.props.setStore({
            desc: event.target.value,
        });
    };

    handleTagChange = (tag, checked) => {
        const {selectedTags} = this.props.article_new;
        const nextSelectedTags = checked ? [...selectedTags, tag._id] : selectedTags.filter(t => t !== tag._id);
        this.props.setStore({selectedTags: nextSelectedTags});

        setTimeout(() => {
            console.log(this.props.article_new.selectedTags)
        }, 50)
    };

    getFile(e) {
        let self = this;
        let obj = e.target || null;
        let fileName = obj.files[0].name;

        let fileReader = new FileReader();
        if (fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase() !== 'md') {
            return message.info('请上传markdown的文件');
        }
        fileReader.readAsText(obj.files[0]);
        fileReader.onload = function () {
            let result = this.result;

            try {
                self.props.setStore({
                    content: result
                })
            } catch (e) {
                console.error("Storage failed: " + e);
            }
        }
    };

    getNavigation = () => {
        let navigationContent;
        let navigation_list = [];
        let mavonEditor = this.$refs.mavonEditor;
        navigationContent = mavonEditor.$refs.navigationContent;
        navigationContent.innerHTML = mavonEditor.d_render;

        let nodes = navigationContent.children;
        if (nodes.length) {
            for (let i = 0; i < nodes.length; i++) {
                judageH(nodes[i], i, nodes)
            }
        }

        function judageH(node, i, nodes) {
            let reg = /^H[1-6]{1}$/;
            if (reg.exec(node.tagName)) {
                navigation_list.push({
                    name: node.innerText,
                    id: node.childNodes[0].getAttribute('id')
                })
            }
        }

        return navigation_list
    };

    handlePublish = () => {
        let reqBody = {
            content: this.props.article_new.content,
            render_content: this.editor.getHtmlValue(),
            cover: this.props.article_new.cover,
            desc: this.props.article_new.desc,
            state: this.props.article_new.state,
            tags: this.props.article_new.selectedTags,
            title: this.props.article_new.title,
            navigation: JSON.stringify(this.getNavigation())
        };

        this.props.addArticle(reqBody)
    };

    render() {
        const {selectedTags} = this.props.article_new;

        return (
            <div>
                <Form labelCol={{span: 1}} wrapperCol={{span: 15}}>
                    <Form.Item label="标题：">
                        <Input
                            placeholder="请输入名称"
                            name="title"
                            value={this.props.article_new.title}
                            onChange={this.handleInputTitleChange}
                        />
                    </Form.Item>
                    <Form.Item label="标签：">
                        {
                            this.props.article_new.tag_list.map((tag, key) => (
                                <CheckableTag
                                    key={key}
                                    checked={selectedTags.indexOf(tag._id) > -1}
                                    onChange={checked => this.handleTagChange(tag, checked)}
                                >
                                    {tag.tags_name}
                                </CheckableTag>
                            ))
                        }
                    </Form.Item>
                    <Form.Item label="状态：">
                        <Select defaultValue={this.props.article_new.state} style={{width: 150}}
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
                    <Form.Item label="封面：">
                        <Input
                            placeholder="请输入图片地址"
                            name="cover"
                            value={this.props.article_new.cover}
                            onChange={this.handleInputCoverChange}
                        />
                    </Form.Item>
                    <Form.Item label="描述：">
                        <Input.TextArea
                            placeholder="请输入描述内容"
                            name="desc"
                            value={this.props.article_new.desc}
                            autosize={{minRows: 2, maxRows: 5}}
                            onChange={this.handleTextAreaChange}
                        />
                    </Form.Item>
                </Form>
                <div className="article-content markdown-body" id="article-content" style={{marginBottom: '20px'}}>
                    <Editor
                        ref={node => this.editor = node}
                        value={this.props.article_new.content}
                        onChange={this.handleEditorChange}/>
                    {/*<MdEditor
                        ref={node => this.mdEditor = node}
                        value={this.props.article_new.content}
                        renderHTML={(text) => this.mdjs.render(text)}
                        config={{
                            view: {
                                menu: true,
                                md: true,
                                html: true
                            },
                            imageUrl: 'https://octodex.github.com/images/minion.png'
                        }}
                        onChange={this.handleEditorChange}
                    />*/}
                    {/*<SimpleMDE
                        id="your-custom-id"
                        label=""
                        options={{
                            autofocus: true,
                            spellChecker: false,
                            gfm: true,
                            pedantic: false,
                            sanitize: false,
                            tables: true,
                            breaks: true,
                            smartLists: true,
                            smartypants: true,
                        }}
                        value={this.props.article_new.content}
                        onChange={this.updateMarkdown}
                    />*/}
                    {/*<MarkdownEditor
                        value={this.props.article_new.content}
                        height={300}
                        onChange={this.updateMarkdown}
                    />*/}
                </div>

                <input
                    type="file"
                    id="uploadMD"
                    onChange={this.getFile.bind(this)}
                    className="file"
                    style={{opacity: 0, position: 'absolute', top: '-999px'}}
                />
                <Button
                    type="primary"
                    onClick={this.handlePublish}
                >
                    发表
                </Button>
                <label
                    htmlFor="uploadMD"
                    className="upload-md"
                    style={{marginLeft: '10px', cursor: 'pointer', verticalAlign: 'middle', fontSize: '14px'}}
                >上传MD
                </label>

            </div>
        )
    }
}

const New = Form.create()(NewForm);

export default New
