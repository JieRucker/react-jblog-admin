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
import {login, fetchCaptcha} from '../../redux/user.redux'

const FormItem = Form.Item;

@connect(
  state => state.user,
  {login, fetchCaptcha}
)
class LoginForm extends Component {
  constructor(props) {
    super(props);

    /*this.state = {
      checkToken: '',
      captchaImg: ''
    };*/

    this.onRegister = this.onRegister.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)

    // this.setState(prevState => ({ toggle: !prevState.toggle }));
  }

  componentDidMount() {
    console.log(this);

    this.props.fetchCaptcha()

  }

  get backgroundImage() {
    return `url(http://admin.jrucker.cn/static/images/login/login-bg.jpg)`
  }

  onRegister(e) {
    e.preventDefault();
    this.props.history.push('/register')
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let body = Object.assign({}, values, {
          checkToken: this.props.checkToken
        });

        this.props.login(body)
      }
    })
  }

  render() {
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
                    src={this.props.captchaImg}
                    onClick={this.props.fetchCaptcha}
                    alt="验证码" className="captcha"/>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              <a href="" className="login-register" onClick={this.onRegister}>注册</a>
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