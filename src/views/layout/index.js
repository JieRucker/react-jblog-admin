import React, {Component} from 'react'
import {Layout} from 'antd'
import {
    Route
} from 'react-router-dom'
import Cookies from 'js-cookie'
import {connect} from 'react-redux'
import SiderCustom from '../../components/sider/siderCustom'
import HeaderCustom from '../../components/header/headerCustom'
import {routes} from '../../routes/menuRoutes'
import {loginOut} from '../../redux/user.redux'
import './index.css'

const {Content, Footer} = Layout;

@connect(
    state => state.user,
    {loginOut}
)
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }

    loginOut = () => {
        this.props.loginOut();
        this.props.history.push('/login')
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    };

    render() {
        return (
            <div className="container">
                <Layout>
                    <SiderCustom
                        collapsed={this.state.collapsed}
                    >
                    </SiderCustom>
                    <Layout>
                        <HeaderCustom
                            collapsed={this.state.collapsed}
                            toggle={this.toggle}
                            loginOut={this.loginOut}
                        >
                        </HeaderCustom>
                        <Content style={{margin: '24px 16px', padding: 24, background: '#fff', overflow: 'initial'}}>
                            {Cookies.get('token') ?
                                routes.map(({path, key, component, ...props}) => (
                                    <Route key={key}
                                           exact
                                           path={path}
                                           component={component}
                                           {...props}
                                    />
                                ))
                                : null}
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            Copyright © Water 2018
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Index
