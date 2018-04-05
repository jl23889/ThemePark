import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as RegisterState from '../store/Register';
import * as RegisterActions from '../actions/_RegisterActions'
import RegisterForm from './RegisterForm';

// At runtime, Redux will merge together...
type DataProps =
    RegisterState.RegisterState		// ... state we've requested from the Redux store
    & typeof RegisterActions.actionCreators       // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class Register extends React.Component<DataProps, {}> {
    componentDidMount() {
        // This method runs when the component is first added to the page
    }

    componentDidUpdate(nextProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
    }

    render() {
        return <div>
        	<h1>Registration Form</h1>
            { this.renderRegisterForm() }
        </div>
    }

    register = values => {
    	console.log (values);
        // this.props.register(values);
    }

    private renderRegisterForm() {
    	return <RegisterForm onSubmit={this.register} form="registerForm"/>
    }
}

export default connect(
    (state: ApplicationState) => state.register, // Selects which state properties are merged into the component's props
    RegisterActions.actionCreators                 // Selects which action creators are merged into the component's props
)(Register) as typeof Register;