/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/26 14:22
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/26 14:22
 */

import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Form, Tree, Row, Col, Button, Table, Modal} from 'antd';
import {getUploadList, alterUpload, deleteUpload, setStore} from '../../redux/upload/upload.redux';

const {TreeNode, DirectoryTree} = Tree;

const mapStateProps = state => ({
    upload: state.upload
});

const mapDispatchToProps = dispatch => ({
    getUploadList, alterUpload, deleteUpload, setStore
});

@connect(
    mapStateProps,
    mapDispatchToProps()
)

class UploadForm extends Component {

    onSelect = (keys, event) => {
        console.log('Trigger Select', keys, event);
    };

    onExpand = () => {
        console.log('Trigger Expand');
    };

    render() {
        return (
            <div>
                <Row gutter={16}>
                    <Col span={6}>
                        <DirectoryTree multiple defaultExpandAll onSelect={this.onSelect} onExpand={this.onExpand}>
                            <TreeNode title="parent 0" key="0-0">
                                <TreeNode title="leaf 0-0" key="0-0-0" isLeaf/>
                                <TreeNode title="leaf 0-1" key="0-0-1" isLeaf/>
                            </TreeNode>
                            <TreeNode title="parent 1" key="0-1">
                                <TreeNode title="leaf 1-0" key="0-1-0" isLeaf/>
                                <TreeNode title="leaf 1-1" key="0-1-1" isLeaf/>
                            </TreeNode>
                        </DirectoryTree>
                    </Col>
                    <Col span={18}>

                    </Col>
                </Row>

            </div>
        )
    }
}

const Upload = Form.create()(UploadForm);

export default Upload
