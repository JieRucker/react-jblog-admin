import React, {Component} from 'react'
import {Layout} from 'antd'
import {
    Route
} from 'react-router-dom'
import Cookies from 'js-cookie'
import {connect} from 'react-redux'
import SiderCustom from './sider/siderCustom'
import HeaderCustom from './header/headerCustom'
import {routers} from '../../router/routers';
import {loginOut} from '../../redux/user/user.redux'
import './index.css'

import {initOpenMenu, siderOpenChange} from '../../redux/sider/sider.redux'

const {Content, Footer} = Layout;

const mapStateToProps = (state) => ({
    user: state.user,
    sider: state.sider
});

const mapDispatchToProps = (dispatch) => ({
    loginOut,
    initOpenMenu, siderOpenChange
});

@connect(
    mapStateToProps,
    mapDispatchToProps()
)
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            hidden: true
        };
    }

    componentWillMount() {
        this.props.initOpenMenu();

        setTimeout(() => {
            this.setState(prevState => ({hidden: !prevState}))
        }, 100)
    }

    loginOut = () => {
        this.props.loginOut();
        this.props.history.push('/login')
    };

    toggle = () => {
        this.setState(prevState => ({collapsed: !prevState.collapsed}))
    };

    siderOpenChange = (payload) => {
        this.props.siderOpenChange(payload)
    };

    render() {
        return !this.state.hidden && (
            <div className="container">
                <Layout>
                    <SiderCustom
                        collapsed={this.state.collapsed}
                        defaultOpenKeys={this.props.sider.openKeys}
                        siderOpenChange={this.siderOpenChange}
                    >
                    </SiderCustom>
                    <Layout>
                        <HeaderCustom
                            collapsed={this.state.collapsed}
                            toggle={this.toggle}
                            loginOut={this.loginOut}
                        >
                        </HeaderCustom>
                        <Content style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            overflow: 'initial',
                            minHeight: 'initial'}}>
                            {Cookies.get('token') ?
                                routers.map(({path, title, component, ...props}) => (
                                    <Route key={title}
                                           exact
                                           path={path}
                                           component={component}
                                           {...props}
                                    />
                                ))
                                : null}
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            Copyright © J.Rucker 2018
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Index
