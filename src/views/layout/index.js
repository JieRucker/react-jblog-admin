import React, {Component} from 'react'
import {Layout} from 'antd'
import {
    Route
} from 'react-router-dom'
import Cookies from 'js-cookie'
import {connect} from 'react-redux'
import SiderCustom from './sider/siderCustom'
import HeaderCustom from './header/headerCustom'
import {routers} from '../../routes/router';
import {loginOut} from '../../redux/user.redux'
import './index.css'

import {initOpenMenu, siderOpenChange} from '../../redux/blog1.redux'

const {Content, Footer} = Layout;

const mapStateToProps = (state) => {
    return {
        user: state.user,
        blog1:state.blog1
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginOut,
        initOpenMenu, siderOpenChange
    }
};

@connect(
    mapStateToProps,
    mapDispatchToProps
)
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }

    componentDidMount() {
        console.log('12345', this)
        // this.props.initOpenMenu()
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
                            Copyright © Water 2018
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Index
