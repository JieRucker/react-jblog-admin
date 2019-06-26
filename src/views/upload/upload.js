/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/26 14:22
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/26 14:22
 */

import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Form, Select, Input, Button, Table, Modal} from 'antd';
import {getWorksList, deleteWorks, setStore} from '../../redux/works/list.redux';

const {Option} = Select;

const mapStateProps = state => ({
    upload: state.upload
});

const mapDispatchToProps = dispatch => ({
    getWorksList, deleteWorks, setStore
});

@connect(
    mapStateProps,
    mapDispatchToProps()
)

class UploadForm extends Component {

}

const Upload = Form.create()(UploadForm);

export default Upload
