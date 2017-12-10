import React, { Component } from 'react';
import { history } from '../../store/configureStore';
import { store } from '../../index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getBoards, deleteBoard, createBoard, getBoard, updateBoard } from '../../actions/boardActions';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Field, reduxForm, submit } from 'redux-form';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import _ from 'lodash';

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

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required';
    }
    return errors;
};

class _NewBoardDialogForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div>
                    <Field
                        name="name"
                        component={_renderTextField}
                        label="Board title"
                    />
                </div>
                <div>
                    <Field
                        name="description"
                        component={_renderTextField}
                        label="Board description"
                        multiLine={true}
                        rows={2}
                    />
                </div>
            </form>
        )
    }
}

const NewBoardDialogForm = reduxForm({
    form: 'NewBoardForm',
    validate
})(_NewBoardDialogForm);

class _EditBoardDialogForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div>
                    <Field
                        name="name"
                        component={_renderTextField}
                        label="Board title"
                    />
                </div>
                <div>
                    <Field
                        name="description"
                        component={_renderTextField}
                        label="Board description"
                        multiLine={true}
                        rows={2}
                    />
                </div>
            </form>
        )
    }
}

const EditBoardDialogForm = reduxForm({
    form: 'EditBoardForm',
    validate
})(_EditBoardDialogForm);

class boardsRoute extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newBoardDialogOpen: false,
            editBoardDialogOpen: false
        }
    }

    componentWillMount() {
        this.props.actions.getBoards();
    }

    _renderAddButton = () => {
        return (
            <FloatingActionButton
                backgroundColor='#43A047'
                style={{
                    position: 'fixed',
                    bottom: '50px',
                    right: '50px'
                }}
                onClick={() => { this.setState({ newBoardDialogOpen: true }); }}
            >
                <ContentAdd/>
            </FloatingActionButton>
        )
    };

    _renderAddBoardDialog = () => {
        const actions = [
            <FlatButton
                label="Add"
                primary={true}
                onClick={() => { store.dispatch(submit('NewBoardForm')); }}
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => { this.setState({ newBoardDialogOpen: false }); }}
            />
        ];

        return (
            <Dialog
                title="Add a new board"
                actions={actions}
                modal={false}
                open={this.state.newBoardDialogOpen}
            >
                <NewBoardDialogForm
                    onSubmit={(values) => {
                        this.props.actions.createBoard(values);
                        this.setState({ newBoardDialogOpen: false });
                    }}
                />
            </Dialog>
        )
    };

    _renderEditBoardDialog = () => {
        const actions = [
            <FlatButton
                label="Save"
                primary={true}
                onClick={() => { store.dispatch(submit('EditBoardForm')); }}
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => { this.setState({ editBoardDialogOpen: false }); }}
            />
        ];

        return (
            <Dialog
                title="Editing a board"
                actions={actions}
                modal={false}
                open={this.state.editBoardDialogOpen}
            >
                <EditBoardDialogForm
                    initialValues={this.props.selectedBoard}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        this.props.actions.updateBoard(values);
                        this.setState({ editBoardDialogOpen: false });
                    }}
                />
            </Dialog>
        )
    };

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap'
                }}
            >
                {
                    _.map(this.props.boards, (board, index) => (
                        <Card
                            key={index}
                            style={{
                                width: '300px',
                                height: '150px',
                                marginRight: '10px',
                                marginTop: '10px'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex'
                                }}
                            >
                                <CardHeader
                                    title={board.name}
                                    actAsExpander={false}
                                    showExpandableButton={false}
                                    onClick={() => {history.push(`board/${board._id}`)}}
                                    style={{ cursor: 'pointer' }}
                                >
                                </CardHeader>
                                <IconMenu
                                    style={{
                                        paddingTop: '0',
                                        marginLeft: 'auto'
                                    }}
                                    iconButtonElement={
                                        <IconButton>
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                >
                                    <MenuItem
                                        primaryText="Edit"
                                        onClick={() => {
                                            this.props.actions.getBoard(board._id);
                                            this.setState({ editBoardDialogOpen: true });
                                        }}
                                    />
                                    <MenuItem
                                        primaryText="Delete"
                                        onClick={() => { this.props.actions.deleteBoard(board._id) }}
                                    />
                                </IconMenu>
                            </div>
                            <CardText>
                                {board.description}
                            </CardText>
                        </Card>
                    ))
                }
                { this._renderAddButton() }
                { this._renderAddBoardDialog() }
                { this._renderEditBoardDialog() }
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            boards: state.boardsReducer.boards,
            selectedBoard: state.boardsReducer.selectedBoard
        }
    },
    (dispatch) => {
        return {
            actions: bindActionCreators({
                getBoards,
                deleteBoard,
                createBoard,
                getBoard,
                updateBoard
            }, dispatch)
        };
    }
)(boardsRoute);
