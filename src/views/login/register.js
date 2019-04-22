import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import './login.scss'
import {
  Row,
  Col,
  Form,
  Icon,
  Input,
  Button
} from 'antd'
import {login} from '../../redux/user.redux'

import api from '@/api/server';
const FormItem = Form.Item;

@connect(
  state => state.user,
  {login}
)
class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this)

    // this.setState(prevState => ({ toggle: !prevState.toggle }));
  }

  componentDidMount() {
    this.fetchCaptcha()
  }

  get backgroundImage() {
    return `url(http://admin.jrucker.cn/static/images/login/login-bg.jpg)`
  }

  async fetchCaptcha() {
    let res = await api.loginInterface.getCheckcode();
    let {code} = res.data;
    if (code === 200) {
      // let {token, img} = data;
      // this.checkCodeToken = token;
      // this.checkCodeImg = img;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values)
      }
    })
  }

  render() {
    console.log(this)

    const {getFieldDecorator} = this.props.form;
    return (
      <div className="login" style={{backgroundImage: this.backgroundImage}}>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo}/> : null}

        <div className="login-box">
          <h3 className="login-title"><Icon type="user" style={{marginRight: '3px'}}/>登录</h3>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{required: true, message: '请输入用户名'}],
              })(
                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="请输入用户名"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{required: true, message: '请输入密码'}],
              })(
                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                       placeholder="请输入密码"/>
              )}
            </FormItem>
            <FormItem>
              <Row gutter={6}>
                <Col span={17}>
                  {getFieldDecorator('captcha', {
                    rules: [{required: true, message: '请输入验证码'}],
                  })(
                    <Input placeholder="请输入验证码"/>
                  )}
                </Col>
                <Col span={7}>
                  <img
                    src="data:image/bmp;base64,Qk0WLwAAegAAADYAAAAoAAAAZAAAACgAAAABABgAAAAAAOAuAAAAAAAAAAAAAAAAAAAAAAAAMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl2OnvMiYlMiYl2Onv2Onv2Onv2Onv2Onv2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlvxR72Onv2Onv2OnvMiYlMiYlMiYlMiYlMiYl2Onv2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlvxR7vxR7vxR7vxR7MiYl2Onv2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYl2Onv2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYllXnylXnylXnylXnylXnylXnylXnylXnylXnylXnylXnylXnyMiYlMiYlMiYlMiYlMiYlvxR7vxR7vxR7vxR7MiYlMiYlMiYlMiYlMiYl2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl2Onv2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYllXnylXnyMiYlMiYlMiYlMiYlMiYlMiYlMiYllXnylXnyMiYlvxR7vxR7vxR7vxR7MiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl2Onv2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYllXnylXnylXnyMiYlMiYlMiYlMiYlMiYlvxR7vxR7lXnyvxR7MiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl2Onv2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlXHLyXHLyXHLyXHLyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYllXnylXnyMiYlvxR7vxR7vxR7vxR7MiYlMiYlMiYllXnyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl2Onv2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlXHLyXHLyMiYlMiYlMiYlXHLyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlvxR7lXnylXnylXnyMiYlMiYlMiYlMiYlMiYlMiYlMiYllXnyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl2Onv2Onv2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlXHLyXHLyMiYlMiYlMiYlMiYlMiYlXHLyMiYlMiYlMiYlMiYlMiYlMiYlvxR7vxR7vxR7vxR7MiYlMiYllXnylXnyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl2Onv2Onv2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlXHLyXHLyMiYlMiYlMiYlMiYlMiYlMiYlXHLyMiYlvxR7vxR7vxR7vxR7MiYlMiYlMiYlMiYlMiYlMiYllXnylXnylXnyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl2Onv2Onv2Onv2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlPVb8MiYlMiYlPVb8PVb8PVb8PVb8PVb8MiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlXHLyXHLyMiYlMiYlMiYlMiYlMiYlvxR7vxR7XHLyvxR7MiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYllXnylXnyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl2Onv2Onv2Onv2Onv2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlPVb8PVb8PVb8MiYlMiYlMiYlMiYlPVb8PVb8MiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlXHLyXHLyMiYlvxR7vxR7vxR7vxR7MiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYllXnylXnylXnyMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZMiYl2Onv2Onv2Onv2Onv2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlPVb8PVb8MiYlMiYlMiYlMiYlMiYlMiYlPVb8PVb8MiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlvxR7XHLyXHLyvxR7MiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYllXnylXnyMiYlMiYlMiYlHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZ2Onv2Onv2Onv2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlPVb8MiYlMiYlMiYlMiYlMiYlMiYlMiYlPVb8PVb8MiYlMiYlMiYlMiYlMiYlvxR7vxR7vxR7vxR7MiYlXHLyXHLyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYllXnylXnylXnyHAUZHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl2Onv2OnvHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlPVb8MiYlMiYlMiYlMiYlMiYlMiYlMiYlPVb8PVb8MiYlvxR7vxR7vxR7vxR7MiYlMiYlMiYlMiYlMiYlXHLyXHLyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZlXnylXnyHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl2Onv2OnvMiYlMiYlHAUZHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlvxR7PVb8PVb8vxR7MiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlXHLyXHLyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZlXnylXnylXnyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl2Onv2OnvMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlvxR7vxR7vxR7vxR7PVb8PVb8MiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlXHLyXHLyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZMiYllXnylXnyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl2Onv2OnvMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZ2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlvxR7vxR7vxR7MiYlMiYlPVb8PVb8PVb8PVb8MiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlXHLyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZMiYlMiYlMiYllXnylXnylXnyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl2Onv2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZ2OnvHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlPVb8PVb8PVb8PVb8MiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlXHLyXHLyMiYlMiYlMiYlMiYlMiYlMiYlXHLyMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYllXnylXnyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl2Onv2OnvMiYlMiYlMiYlMiYlMiYlMiYlMiYl2Onv2OnvHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlPVb8PVb8PVb8PVb8MiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlXHLyXHLyMiYlMiYlMiYlMiYlMiYlMiYlXHLyMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZlXnyMiYlMiYlMiYlMiYlMiYlMiYllXnylXnylXnyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl2Onv2OnvMiYlMiYlMiYlMiYlMiYl2Onv2Onv2OnvMiYlHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlPVb8PVb8PVb8MiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlXHLyXHLyMiYlMiYlMiYlMiYlXHLyXHLyMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZMiYllXnyMiYlMiYlMiYlMiYlMiYlMiYlMiYllXnylXnyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl2Onv2Onv2Onv2Onv2Onv2OnvMiYlMiYl2OnvMiYlMiYlMiYlHAUZHAUZHAUZHAUZMiYlMiYlMiYlHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlPVb8PVb8MiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlXHLyXHLyXHLyXHLyXHLyXHLyMiYlMiYlHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYllXnyMiYlMiYlMiYlMiYlMiYlMiYlMiYllXnylXnyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZMiYlMiYlMiYlHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlPVb8PVb8MiYlMiYlMiYlMiYlMiYlMiYlMiYlPVb8MiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYllXnylXnyMiYlMiYlMiYlMiYlMiYlMiYllXnylXnyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlPVb8PVb8MiYlMiYlMiYlMiYlMiYlMiYlMiYlPVb8MiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYllXnylXnylXnylXnylXnylXnylXnylXnylXnylXnylXnyMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlPVb8PVb8MiYlMiYlMiYlMiYlPVb8PVb8PVb8MiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlPVb8PVb8PVb8PVb8PVb8MiYlMiYlPVb8MiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZHAUZMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYlMiYl"
                    alt="验证码" className="captcha"/>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              <a href="" className="login-register">注册</a>
            </FormItem>

          </Form>
        </div>


      </div>
    )
  }

  /*render() {
    const {getFieldDecorator} = this.props.form
    return (
      <div className="login">
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo}/> : null}
        <Col span="6" className="login-form">
          <h3 className="login-title">Login</h3>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{required: true, message: 'Please input your username!'}],
              })(
                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Username"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{required: true, message: 'Please input your Password!'}],
              })(
                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                       placeholder="Password"/>
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </FormItem>
          </Form>
        </Col>
      </div>
    )
  }*/
}

const Login = Form.create()(LoginForm)

export default Login