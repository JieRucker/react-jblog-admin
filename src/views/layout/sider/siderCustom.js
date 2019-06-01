import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Layout} from 'antd'
import './sider.css'
import SiderMenu from './siderMenu'
import {appRouter} from "../../../routes/router";

const {Sider} = Layout;

@withRouter
class SiderCustom extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
        openKey: '',
        selectedKey: ''
    };

    menuClick = ({item, key, keyPath, domEvent}) => {
    };

    onOpenChange = (openKeys) => {

        console.log(openKeys);

        // this.props.siderOpenChange()
    };

    render() {
        // console.log('this', this, this.props.location.pathname)

        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}
                breakpoint="md"
                collapsedWidth="0"
                className="sider-contaniner">
                <div className="logo"/>
                <SiderMenu
                    menus={appRouter}
                    onOpenChange={this.onOpenChange}
                    onClick={this.menuClick}
                    theme="dark"
                    mode="inline"
                    active={this.props.location.pathname || ''}
                />
            </Sider>
        )
    }
}

export default SiderCustom
