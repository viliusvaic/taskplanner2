import React, { Component } from 'react';
import { history } from '../../store/configureStore';
import { store } from '../../index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getTasks, updateTask, deleteTask, createTask, getTask } from '../../actions/taskActions';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TaskCard from '../tasks/taskCard';
import { Field, reduxForm, submit } from 'redux-form';
import moment from 'moment';

const _renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
}) => (
    <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />
);

const _renderDateField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
}) => (
    <div>
        <div
            style={{
                marginTop: '15px'
            }}
        >{label}</div>
        <DatePicker
            textFieldStyle={{width: '100%'}}
            onChange={(nothing, date) => input.onChange(date)}
            value={input.value}
            name={label}
        />
    </div>
);

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required';
    }

    if (!/^[0-9]+$/i.test(values.weight) && values.weight) {
        errors.weight = 'Must be a number';
    }
    return errors;
};

class _NewTaskDialogForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div>
                    <Field
                        name="name"
                        component={_renderTextField}
                        label="Task title"
                    />
                </div>
                <div>
                    <Field
                        name="description"
                        component={_renderTextField}
                        label="Task description"
                        multiLine={true}
                        rows={2}
                    />
                </div>
                <div>
                    <Field
                        name="weight"
                        component={_renderTextField}
                        label="Task weight"
                    />
                </div>
                <div>
                    <Field
                        name="deadline"
                        component={_renderDateField}
                        format={(value) => !_.isNil(value) ? moment(value).toDate() : null}
                        normalize={(value) => !_.isNil(value) ? moment(value).format('YYYY-MM-DD') : null}
                        label="Task deadline"
                    />
                </div>
            </form>
        )
    }
}

const NewTaskDialogForm = reduxForm({
    form: 'NewTaskForm',
    validate
})(_NewTaskDialogForm);

class _EditTaskDialogForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div>
                    <Field
                        name="name"
                        component={_renderTextField}
                        label="Task title"
                    />
                </div>
                <div>
                    <Field
                        name="description"
                        component={_renderTextField}
                        label="Task description"
                        multiLine={true}
                        rows={2}
                    />
                </div>
                <div>
                    <Field
                        name="weight"
                        component={_renderTextField}
                        label="Task weight"
                    />
                </div>
                <div>
                    <Field
                        name="deadline"
                        component={_renderDateField}
                        format={(value) => !_.isNil(value) ? moment(value).toDate() : null}
                        normalize={(value) => !_.isNil(value) ? moment(value).format('YYYY-MM-DD') : null}
                        label="Task deadline"
                    />
                </div>
            </form>
        )
    }
}

const EditTaskDialogForm = reduxForm({
    form: 'EditTaskForm',
    validate
})(_EditTaskDialogForm);

class boardRoute extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayRemoveZone: false,
            draggedTask: null,
            newTaskDialogOpen: false,
            editTaskDialogOpen: false
        }
    }

    componentWillMount() {
        const boardId = this.props.match.params.id;
        this.props.actions.getTasks(boardId);
    }

    _renderDeleteZone = () => {
        if (this.state.displayRemoveZone) {
            return (
                <FloatingActionButton
                    backgroundColor='#b71c1c'
                    style={{
                        position: 'fixed',
                        bottom: '50px',
                        right: '120px'
                    }}
                    onDragOver={(ev) => { ev.preventDefault(); }}
                    onDrop={(ev) => {
                        ev.preventDefault();
                        this.props.actions.deleteTask(this.props.match.params.id, this.state.draggedTask._id);
                    }}
                >
                    <ContentRemove/>
                </FloatingActionButton>
            )
        }
    };

    _renderAddButton = () => {
        return (
            <FloatingActionButton
                backgroundColor='#43A047'
                style={{
                    position: 'fixed',
                    bottom: '50px',
                    right: '50px'
                }}
                onClick={() => { this.setState({ newTaskDialogOpen: true }); }}
            >
                <ContentAdd/>
            </FloatingActionButton>
        )
    };

    _renderAddTaskDialog = () => {
        const actions = [
            <FlatButton
                label="Add"
                primary={true}
                onClick={() => { store.dispatch(submit('NewTaskForm')); }}
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => { this.setState({ newTaskDialogOpen: false }); }}
            />
        ];

        const boardId = this.props.match.params.id;
        return (
            <Dialog
                title="Add a new task"
                actions={actions}
                modal={false}
                open={this.state.newTaskDialogOpen}
            >
                <NewTaskDialogForm
                    onSubmit={(values) => {
                        this.props.actions.createTask(boardId, values);
                        this.setState({ newTaskDialogOpen: false });
                    }}
                />
            </Dialog>
        )
    };

    _renderEditTaskDialog = () => {
        const actions = [
            <FlatButton
                label="Save"
                primary={true}
                onClick={() => { store.dispatch(submit('EditTaskForm')); }}
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => { this.setState({ editTaskDialogOpen: false }); }}
            />
        ];

        const boardId = this.props.match.params.id;
        const initialValues = this.props.selectedTask;

        return (
            <Dialog
                title="Editing a task"
                actions={actions}
                modal={false}
                open={this.state.editTaskDialogOpen}
            >
                <EditTaskDialogForm
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        this.props.actions.updateTask(boardId, values);
                        this.setState({ editTaskDialogOpen: false });
                    }}
                />
            </Dialog>
        )
    };

    render() {
        const columnTitleStyle = {
            width: '250px',
            fontFamily: 'Roboto, sans-serif',
            paddingLeft: '5px',
            marginTop: '5px'
        };

        const columnTasksStyle = {
            width: '280px',
            borderRight: '1px solid rgb(172, 141, 141)',
            alignContent: 'center',
            overflowY: 'auto'
        };

        const columnTasksContainer = {
            display: 'flex',
            justifyContent: 'flex-start',
            height: '100%',
        };

        const boardId = this.props.match.params.id;

        const tasks = this.props.tasks;

        const columns = [
            {
                status: 1,
                title: 'To do'
            },
            {
                status: 2,
                title: 'In progress'
            },
            {
                status: 3,
                title: 'Done'
            },            {
                status: 4,
                title: 'Archived'
            }
        ];

        return (
            <div
                style={{
                    height: '88vh'
                }}
            >
                <div style={columnTasksContainer}>
                    {_.map(columns, (column, index) => {
                        const filteredTasks = _.filter(tasks, (task) => task.status === column.status);
                        return (
                            <div
                                key={index}
                                style={columnTasksStyle}
                                onDragOver={(ev) => { ev.preventDefault(); }}
                                onDrop={(ev) => {
                                    ev.preventDefault();
                                    if (this.state.draggedTask.status !== column.status) {
                                        this.props.actions.updateTask(boardId, {...this.state.draggedTask, status: column.status});
                                    }
                                }}
                            >
                                <div style={columnTitleStyle}>{column.title}</div>
                                {_.map(filteredTasks, (task, index) => {
                                    return (
                                        <TaskCard
                                            key={index}
                                            name={task.name}
                                            weight={task.weight}
                                            description={task.description}
                                            deadline={task.deadline}
                                            onTaskDrag={() => {
                                                this.setState({ displayRemoveZone: true, draggedTask: task })
                                            }}
                                            onTaskDragEnd={() => {
                                                this.setState({ displayRemoveZone: false, draggedTask: task })
                                            }}
                                            onHeaderClick={() => {
                                                this.props.actions.getTask(boardId, task._id);
                                                this.setState({ editTaskDialogOpen: true });
                                            }}
                                        />
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                {this._renderDeleteZone()}
                {this._renderAddButton()}
                {this._renderAddTaskDialog()}
                {this._renderEditTaskDialog()}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            tasks: state.tasksReducer.tasks,
            selectedTask: state.tasksReducer.selectedTask
        }
    },
    (dispatch) => {
        return {
            actions: bindActionCreators({
                createTask,
                getTasks,
                updateTask,
                deleteTask,
                getTask
            }, dispatch)
        };
    }
)(boardRoute);