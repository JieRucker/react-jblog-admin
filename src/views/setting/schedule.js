/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/25 16:27
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/25 16:27
 */

import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Form, Typography, Tabs, Button, Table, Input, Select, Modal, TimePicker} from 'antd';
import {getSchedule, alterSchedule, setStore} from '../../redux/setting/schedule.redux';
import styles from './schedule.scss';
import {formatDate, dateCron} from '../../utils';

const {Title, Paragraph} = Typography;
const {TabPane} = Tabs;
const FormItem = Form.Item;
const {TextArea} = Input;
const {Option} = Select;

const mapStateProps = state => ({
    schedule: state.schedule
});

const mapDispatchToProps = dispatch => ({
    getSchedule, alterSchedule, setStore
});

@connect(
    mapStateProps,
    mapDispatchToProps()
)

class ScheduleForm extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    state = {visible: false};

    formLayout = {
        labelCol: {span: 7},
        wrapperCol: {span: 13},
    };

    componentDidMount() {
        // this.props.getSchedule()
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const {form} = this.props;
        const {current} = this.state;

        form.validateFields((err, fieldsValue) => {
            if (err) return;

            let {task_name, task_cookie, task_desc} = fieldsValue;
            let params;

            if (typeof current !== 'undefined') {
                params = {
                    _id: current._id,
                    task_name,
                    task_cookie,
                    task_desc: typeof task_desc !== 'undefined' ? task_desc : '',
                    onSuccess: () => {
                        // this.props.getTagsList();
                        this.setState({
                            visible: false,
                        });
                    }
                };

                // this.props.alterTags(params)
            } else {
                params = {
                    task_name,
                    task_cookie,
                    task_desc: typeof task_desc !== 'undefined' ? task_desc : '',
                    onSuccess: () => {
                        this.props.getTagsList();
                        this.setState({
                            visible: false,
                        });
                    }
                };

                let {weekSelectValue, dateSelectValue, timeValue} = this.props.schedule;
                let cron = '';

                if (weekSelectValue === 'day') {
                    cron = dateCron({type: 'day', date: timeValue})
                } else if (weekSelectValue === 'week') {
                    cron = dateCron({type: 'week', week: [dateSelectValue + 1], date: timeValue})
                } else if (weekSelectValue === 'month') {
                    cron = dateCron({type: 'month', month: [dateSelectValue + 1], date: timeValue})
                }

                console.log('cron', cron);
                console.log('params', params);

                this.props.addTags(params)
            }
        });
    };

    handleSave = () => {
        this.props.alterSchedule({
            avatar: this.props.mine.avatar, /*头像*/
            cover: this.props.mine.cover, /*封面*/
            description: this.props.mine.description, /*描述*/
            github: this.props.mine.github,
            juejin: this.props.mine.juejin,
        })
    };

    onTabChange = (key) => {
        console.log(key);
    };

    onWeekChange = (val) => {
        if (val === 'day') {
            this.props.setStore({
                dateList: [],
            });
        } else if (val === 'week') {
            this.props.setStore({
                dateList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            });
        } else if (val === 'month') {
            let day = Array.apply(null, Array(31)).map((it, key) => key + 1 + '号');
            this.props.setStore({
                dateList: day,
            });
        }

        this.props.setStore({
            weekSelectValue: val,
        });
        console.log(val);
    };

    onDateChange = (val) => {
        console.log(val);

        this.props.setStore({
            dateSelectValue: val,
        });
    };

    onTimeChange = (val) => {
        console.log(val);

        this.props.setStore({
            timeValue: formatDate(val.toDate()),
        });
    };

    render() {
        const columns = [
            {
                title: '任务名称',
                dataIndex: 'task_name',
                key: 'task_name',
            },
            {
                title: '任务cookie',
                dataIndex: 'task_cookie',
                key: 'task_cookie',
            },
            {
                title: '任务描述',
                dataIndex: 'task_desc',
                key: 'task_desc',
            },
            {
                title: '操作',
                key: 'action',
                width: 150,
                render: (value, params) => (
                    <span>
                        <Button
                            type="primary"
                            size="small"
                            style={{marginRight: '5px'}}
                            onClick={() => {
                                this.setState({
                                    visible: true,
                                    current: params
                                });
                            }}
                        >修改
                        </Button>
                        <Button
                            type="danger"
                            size="small"
                            onClick={() => {
                                Modal.confirm({
                                    title: '删除',
                                    content: '确定删除吗？',
                                    okText: '确认',
                                    cancelText: '取消',
                                    onOk: async () => {
                                        /*this.props.deleteTags({
                                            _id: params._id,
                                            onSuccess: () => {
                                                this.props.getTagsList()
                                            }
                                        })*/
                                    },
                                });
                            }}
                        >删除
                        </Button>
                    </span>
                ),
            },
        ];

        const {visible, current = {}} = this.state;

        const modalFooter = {okText: '确认', cancelText: '取消', onOk: this.handleSubmit, onCancel: this.handleCancel};

        const {
            form: {getFieldDecorator},
        } = this.props;

        const getModalContent = () => {
            return (
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="任务名称" {...this.formLayout}>
                        {getFieldDecorator('task_name', {
                            rules: [{required: true, message: '请输入任务名称'}],
                            initialValue: current.task_name,
                        })(<Input placeholder="请输入任务名称"/>)}
                    </FormItem>
                    <FormItem label="cookie" {...this.formLayout}>
                        {getFieldDecorator('task_cookie', {
                            rules: [{required: true, message: '请输入任务cookie'}],
                            initialValue: current.task_cookie,
                        })(<TextArea rows={4} placeholder="请输入任务cookie"/>)}
                    </FormItem>
                    <FormItem label="任务描述" {...this.formLayout}>
                        {getFieldDecorator('task_desc', {
                            rules: [{message: '请输入任务描述'}],
                            initialValue: current.task_desc,
                        })(<TextArea rows={4} placeholder="请输入任务描述"/>)}
                    </FormItem>
                    <FormItem label="周期" {...this.formLayout} rules={[{required: true}]}>
                        <Select
                            placeholder="选择周期"
                            defaultValue={this.props.schedule.weekSelectValue}
                            onChange={this.onWeekChange}
                            allowClear
                        >
                            <Option value="day">每天</Option>
                            <Option value="week">每周</Option>
                            <Option value="month">每月</Option>
                        </Select>
                    </FormItem>
                    {this.props.schedule.dateList.length > 0 &&
                    <FormItem label="日期" {...this.formLayout} rules={[{required: true}]}>
                        <Select
                            placeholder="选择日期"
                            onChange={this.onDateChange}
                            allowClear
                        >
                            {this.props.schedule.dateList.map((it, key) => (
                                <Option
                                    key={key}
                                    value={key}>
                                    {it}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>}
                    <FormItem label="时间" {...this.formLayout} rules={[{required: true}]}>
                        <TimePicker placeholder="选择时间" onChange={this.onTimeChange}/>
                    </FormItem>
                </Form>
            );
        };

        const SetTabs = () => (
            <Tabs defaultActiveKey="0" onChange={this.onTabChange}>
                {this.props.schedule.tabs_list.map((item, key) => (
                    <TabPane
                        tab={item.name}
                        key={item.key}
                    >
                    </TabPane>
                ))}
            </Tabs>
        );

        return (
            <div>
                <Typography>
                    <Title level={4}>设置定时任务</Title>
                    <Paragraph>
                        设置定时任务后，每天都会定时执行
                    </Paragraph>
                </Typography>
                <SetTabs/>
                <Form layout="inline">
                    <Button
                        type="primary"
                        onClick={() => {
                            this.setState({
                                visible: true,
                                current: undefined,
                            });
                        }}
                    >
                        添加任务
                    </Button>
                    <Table
                        style={{marginTop: '20px'}}
                        columns={columns}
                        dataSource={this.props.schedule.schedule_list}
                        rowKey="_id"
                    />
                    <Modal
                        title={`${current._id ? '编辑' : '添加'}`}
                        className={styles.standardListForm}
                        width={600}
                        destroyOnClose
                        visible={visible}
                        {...modalFooter}
                    >
                        {getModalContent()}
                    </Modal>
                </Form>
            </div>
        )
    }
}

const Schedule = Form.create()(ScheduleForm);

export default Schedule
