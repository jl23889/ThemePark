import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as LoginState from '../store/Login';
import * as LoginActions from '../actions/_LoginActions'
import LoginForm from './LoginForm';


// At runtime, Redux will merge together...
type DataProps =
    LoginState.LoginState		// ... state we've requested from the Redux store
    & typeof LoginActions.actionCreators       // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class Login extends React.Component<DataProps, {}> {
    componentDidMount() {
        // This method runs when the component is first added to the page
    }

    componentDidUpdate(nextProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
    }

    render() {
        return <div>
        	<h1>Login Form</h1>
            { this.renderLoginForm() }
        </div>
    }

    login = values => {
        this.props.login(values.username, values.password, 'customer');
    }

    private renderLoginForm() {
    	return <LoginForm onSubmit={this.login} form="loginForm"/>
    }
}

export default connect(
    (state: ApplicationState) => state.login, // Selects which state properties are merged into the component's props
    LoginActions.actionCreators                 // Selects which action creators are merged into the component's props
)(Login) as typeof Login;