/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/25 16:27
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/25 16:27
 */

import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Form, Input, Button} from 'antd';
import {getSetting, alterSetting, setStore} from '../../redux/setting/about.redux';

const mapStateProps = state => ({
    about: state.about
});

const mapDispatchToProps = dispatch => ({
    getSetting, alterSetting, setStore
});

@connect(
    mapStateProps,
    mapDispatchToProps()
)

class AboutForm extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        console.log(this);
        this.props.getSetting()
    }

    handleSave = () => {
        this.props.alterSetting({
            picture: this.props.about.picture,
            description: this.props.about.description
        })
    };

    render() {
        return (
            <div>
                <Form layout="inline">
                    <Form.Item label="贴图：">
                        <Input
                            placeholder="请输入贴图地址"
                            name="picture"
                            value={this.props.about.picture}
                            onChange={(event) => {
                                this.props.setStore({
                                    picture: event.target.value,
                                });
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="描述：">
                        <Input.TextArea
                            placeholder="请输入描述内容"
                            name="description"
                            value={this.props.about.description}
                            autosize={{minRows: 2, maxRows: 5}}
                            onChange={(event) => {
                                this.props.setStore({
                                    description: event.target.value,
                                });
                            }}
                        />
                    </Form.Item>
                    <Button
                        type="primary"
                        onClick={this.handleSave}
                    >
                        保存
                    </Button>
                </Form>
            </div>
        )
    }
}

const About = Form.create()(AboutForm);

export default About
