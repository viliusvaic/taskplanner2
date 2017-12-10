import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { history } from '../store/configureStore';
import boardsRoute from '../components/boards/boardsRoute';
import boardRoute from '../components/boards/boardRoute';
import DevTools from './DevTools';
import AppBar from 'material-ui/AppBar';
import LoginScreen from '../components/user/loginRoute';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import AppMenuIcon from 'material-ui/svg-icons/navigation/menu';
import LinearProgress from 'material-ui/LinearProgress';

const Logged = () => (
    <IconMenu
        iconButtonElement={
            <IconButton><AppMenuIcon color="#212121" /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem
            primaryText="Log out"
            onClick={() => {
                localStorage.clear();
                window.location.href = 'http://localhost:8080';
            }}
        />
    </IconMenu>
);

class Root extends Component {
    render() {
        const store = this.props.store;
        const history = this.props.history;

        if (this.props.isAuthenticated) {
            return (
                <MuiThemeProvider>
                    <Provider store={store}>
                        <div>
                            <AppBar
                                title="Task planner"
                                iconElementLeft={<div></div>}
                                style={{
                                    backgroundColor: 'white'
                                }}
                                titleStyle={{
                                    color: '#212121'
                                }}
                                iconElementRight={<Logged/>}
                            />
                            <LinearProgress
                                mode="indeterminate"
                                color="#43A047"
                                style={{
                                    visibility: this.props.showLoading ? 'visible' : 'hidden'
                                }}
                            />
                            <ConnectedRouter history={history}>
                                <Switch>
                                    <Route exact path="/" component={boardsRoute}/>
                                    <Route exact path="/board/:id" component={boardRoute}/>
                                </Switch>
                            </ConnectedRouter>
                        </div>
                    </Provider>
                </MuiThemeProvider>
            );
        } else {
            return (
                <MuiThemeProvider>
                    <Provider store={store}>
                        <div>
                            <ConnectedRouter history={history}>
                                <Switch>
                                    <Route exact path="/" component={LoginScreen}/>
                                </Switch>
                            </ConnectedRouter>
                        </div>
                    </Provider>
                </MuiThemeProvider>
            )
        }
    }
}

export default connect(
    (state) => {
        return {
            isAuthenticated: state.uiReducer.isAuthenticated,
            showLoading: state.uiReducer.showLoading
        }
    },
    (dispatch) => {
        return {
            actions: bindActionCreators({

            }, dispatch)
        };
    }
)(Root);

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};