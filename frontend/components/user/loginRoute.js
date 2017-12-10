import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Field, reduxForm, submit } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { store } from '../../index';
import { getToken, registerUser } from '../../actions/userActions';
import { justRegisteredUndo } from '../../actions/uiActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    if (!values.username) {
        errors.username = 'Please enter your username';
    }
    if (!values.password) {
        errors.password = 'Please enter your password';
    }
    return errors;
};

class _LoginForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div>
                    <Field
                        name="username"
                        component={_renderTextField}
                        label="Username"
                    />
                </div>
                <div>
                    <Field
                        name="password"
                        component={_renderTextField}
                        label="Password"
                        type="password"
                    />
                </div>
            </form>
        )
    }
}

const LoginForm = reduxForm({
    form: 'LoginForm',
    validate
})(_LoginForm);

class _RegisterForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div>
                    <Field
                        name="username"
                        component={_renderTextField}
                        label="Username"
                    />
                </div>
                <div>
                    <Field
                        name="password"
                        component={_renderTextField}
                        label="Password"
                        type="password"
                    />
                </div>
            </form>
        )
    }
}

const RegisterForm = reduxForm({
    form: 'RegisterForm',
    validate
})(_RegisterForm);

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoginView: true
        }
    }

    _renderLoginView() {
        return(
            <Paper
                style={{
                    height: '350px',
                    width: '400px'
                }}
            >
                <div
                    style={{
                        height: '25%',
                        width: '100%',
                        marginLeft: '50px',
                    }}
                >
                    <div
                        style={{
                            color: '#558B2F',
                            fontSize: '26pt',
                            paddingTop: '30px'
                        }}
                    >
                        Log in!
                    </div>
                    {
                        this.props.unsuccessfulLogin
                            ?
                            <div
                                style={{
                                    color: '#d50000',
                                    fontSize: '10pt'
                                }}
                            >
                                Incorrect username or password
                            </div>
                            :
                            null
                    }
                    {
                        this.props.successfulRegister
                            ?
                            <div
                                style={{
                                    color: '#558B2F',
                                    fontSize: '10pt'
                                }}
                            >
                                Registration successful. You can log in now.
                            </div>
                            :
                            null
                    }
                </div>
                <div
                    style={{
                        marginLeft: '50px',
                        height: '55%',
                        width: '100%',
                    }}
                >
                    <LoginForm
                        onSubmit={(values) => {
                            this.props.actions.getToken(values);
                        }}
                    />
                </div>
                <div
                    style={{
                        marginLeft: '50px',
                        height: '20%',
                        width: '100%',
                    }}
                >
                    <RaisedButton
                        label="Log in"
                        backgroundColor="#558B2F"
                        labelColor='#F1F8E9'
                        onClick={() => {
                            store.dispatch(submit('LoginForm'));
                            this.props.actions.justRegisteredUndo();
                        }}
                    />
                    <RaisedButton
                        label="Sign up"
                        style={{
                            marginLeft: '15px'
                        }}
                        onClick={() => { this.setState({ showLoginView: false }); }}
                    />
                </div>
            </Paper>
        )
    }

    _renderRegisterView() {
        return(
            <Paper
                style={{
                    height: '350px',
                    width: '400px'
                }}
            >
                <div
                    style={{
                        height: '25%',
                        width: '100%',
                        marginLeft: '50px',
                    }}
                >
                    <div
                        style={{
                            color: '#558B2F',
                            fontSize: '26pt',
                            paddingTop: '30px'
                        }}
                    >Sign up!</div>
                </div>
                <div
                    style={{
                        marginLeft: '50px',
                        height: '55%',
                        width: '100%',
                    }}
                >
                    <RegisterForm
                        onSubmit={(values) => {
                            this.props.actions.registerUser(values);
                        }}
                    />
                </div>
                <div
                    style={{
                        marginLeft: '50px',
                        height: '20%',
                        width: '100%',
                    }}
                >
                    <RaisedButton
                        label="Sign up"
                        backgroundColor="#558B2F"
                        labelColor='#F1F8E9'
                        onClick={() => {
                            store.dispatch(submit('RegisterForm'));
                            setTimeout(() => {
                                this.setState({ showLoginView: true });
                            }, 500)
                        }}
                    />
                    <RaisedButton
                        label="Back"
                        style={{
                            marginLeft: '15px'
                        }}
                        onClick={() => { this.setState({ showLoginView: true }); }}
                    />
                </div>
            </Paper>
        )
    }

    render() {
        return (
            <div
                style={{
                    height: '90vh',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                { this.state.showLoginView ? this._renderLoginView() : this._renderRegisterView() }
            </div>

        )
    }
}

export default connect(
    (state) => {
        return {
            unsuccessfulLogin: state.uiReducer.unsuccessfulLogin,
            successfulRegister: state.uiReducer.successfulRegister
        }
    },
    (dispatch) => {
        return {
            actions: bindActionCreators({
                getToken,
                registerUser,
                justRegisteredUndo
            }, dispatch)
        };
    }
)(LoginScreen);