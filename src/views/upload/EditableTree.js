/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/28 下午10:54
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/28 下午10:54
 */

import React, {Component} from 'react';
import {Tree, Icon} from 'antd';
import styles from './EditableTree.scss';

const {TreeNode} = Tree;

class EditableTree extends Component {

    /*list = [{
        value: 'Root',
        defaultValue: 'Root',
        key: '0-1',
        isEditable: false
    }];*/

    // list = this.props.list;

    expandedKeys = [];

    static defaultProps = {
        editBtn: true,
        plusBtn: true,
        minusBtn: true
    };

    state = {
        expandedKeys: [],
        list: []
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)

        if (nextProps.list !== this.state.list) {
            this.setState({
                list: nextProps.list
            });
        }
    }

    /*static getDerivedStateFromProps(props, state) {
        return {
            list: props.list
        };
    }*/

    componentDidMount() {
        this.onExpand([]); // 手动触发，否则会遇到第一次添加子节点不展开的Bug
    }

    onExpand = (expandedKeys) => {
        this.expandedKeys = expandedKeys;
        this.setState({expandedKeys: expandedKeys});
        if (this.props.onExpand) {
            this.props.onExpand(expandedKeys);
        }
    };

    onAdd = (item) => {
        this.props.onAdd({item})
        // console.log('add', this.state);
        // 防止expandedKeys重复
        // Tip: Must have, expandedKeys should not be reduplicative
        /*if (this.state.expandedKeys.indexOf(key) === -1) {
            this.expandedKeys.push(key);
        }

        this.addNode(key, this.list);
        this.setState({
            expandedKeys: this.expandedKeys,
            list: this.list
        });*/
    };

    onDelete = (item) => {
        /*this.deleteNode(key, this.list);
        this.setState({
            list: this.list
        });*/
        this.props.onDelete({item})
    };

    onEdit = (item) => {

        /*this.editNode(key, this.list);
        this.setState({
            list: this.list
        });*/
        item.isEditable = true;

        this.setState({
            list: this.state.list
        });

        // this.props.onEdit({item})
    };

    onClose = (item) => {
        item.isEditable = false;
        item.value = item.defaultValue;

        this.setState({
            list: this.state.list
        });
        /*this.closeNode(key, defaultValue, this.list);
        this.setState({
            list: this.list
        });*/
    };

    onSave = (item) => {
        /*this.saveNode(key, this.list);
        this.setState({
            list: this.list
        });*/
        this.props.onSave({item})
    };

    onChange = (e, item) => {
        item.value = e.target.value;

        this.setState({
            list: this.state.list
        });
        /*this.changeNode(key, e.target.value, this.list);
        this.setState({
            list: this.list
        });*/
    };

    /*addNode = (key, list) => list.map((item) => {
        if (item.key === key) {
            this.props.onAdd({item});
            if (item.children) {
                item
                    .children
                    .push({
                        value: 'default',
                        defaultValue: 'default',
                        key: key + Math.random(100), // 这个 key 应该是唯一的。 Tip: The key should be unique
                        isEditable: false
                    });
            } else {
                item.children = [];
                item
                    .children
                    .push({
                        value: 'default',
                        defaultValue: 'default',
                        key: key + Math.random(100),
                        isEditable: false
                    });
            }
        }

        if (item.children) {
            this.addNode(key, item.children)
        }

        return true
    });*/

    /*deleteNode = (key, list) => list.map((item, index) => {
        if (item.key === key) {
            list.splice(index, 1);
        } else {
            if (item.children) {
                this.deleteNode(key, item.children)
            }
        }

        return true
    });*/

    /*editNode = (key, list) => list.map((item) => {
        if (item.key === key) {
            item.isEditable = true;
        } else {
            item.isEditable = false;
        }
        //Tip: Must have, when a node is editable, and you click a button to make other node editable, the node which you don't save yet will be not editable, and its value should be defaultValue
        item.value = item.defaultValue; // 当某节点处于编辑状态，并改变数据，点击编辑其他节点时，此节点变成不可编辑状态，value 需要回退到 defaultvalue
        if (item.children) {
            this.editNode(key, item.children)
        }

        return true
    });*/

    /*closeNode = (key, defaultValue, list) => list.map((item) => {
        item.isEditable = false;
        if (item.key === key) {
            item.value = defaultValue;
        }
        if (item.children) {
            this.closeNode(key, defaultValue, item.children)
        }

        return true
    });*/

    /*saveNode = (key, list) => list.map((item) => {
        if (item.key === key) {
            item.defaultValue = item.value;
            this.props.onSave({item})
        }
        if (item.children) {
            this.saveNode(key, item.children)
        }
        item.isEditable = false;

        return true
    });*/

    /*changeNode = (key, value, list) => list.map((item) => {
        if (item.key === key) {
            item.value = value;
        }
        if (item.children) {
            this.changeNode(key, value, item.children)
        }

        return true
    });*/

    renderTreeNodes = list => list.map((item) => {
        if (item.isEditable) {
            item.title = (
                <div>
                    <input
                        className={styles.inputField}
                        value={item.value}
                        onChange={(e) => this.onChange(e, item)}/>
                    <Icon type='close' style={{marginLeft: 10}}
                          onClick={() => this.onClose(item)}/>
                    <Icon type='check' style={{marginLeft: 10}} onClick={() => this.onSave(item)}/>
                </div>
            );
        } else {
            item.title = (
                <div className={styles.titleContainer}>
                    <span onClick={() => this.props.onSelect({item})}>
                        {item.value}
                    </span>
                    <span className={styles.operationField}>
                        {this.props.editBtn && (
                            <Icon style={{marginLeft: 10}} type='edit' onClick={() => this.onEdit(item)}/>)}
                        {this.props.plusBtn && (
                            <Icon style={{marginLeft: 10}} type='plus' onClick={() => this.onAdd(item)}/>)}
                        {this.props.minusBtn && (
                            <Icon style={{marginLeft: 10}} type='minus' onClick={() => this.onDelete(item)}/>)}
                    </span>
                </div>
            )
        }

        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }

        return <TreeNode {...item} />;
    });

    render() {
        return (
            <div>
                <Tree showLine expandedKeys={this.state.expandedKeys} selectedKeys={[]}
                      onExpand={this.onExpand}>
                    {this.renderTreeNodes(this.state.list)}
                </Tree>
            </div>
        )
    }
}

export default EditableTree;