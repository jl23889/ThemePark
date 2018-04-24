import * as React from 'react';
import { NavLink, Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as LoginState from '../store/Login';
import * as LoginActions from '../actions/_LoginActions'

// At runtime, Redux will merge together...
type DataProps =
    LoginState.LoginState        // ... state we've requested from the Redux store
    & typeof LoginActions.actionCreators       // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class NavMenu extends React.Component<DataProps, {}> {
    componentDidMount() {
        // This method runs when the component is first added to the page

        // check if a user is logged in
        this.props.checkLoggedIn();
    }

    componentDidUpdate(prevProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
        this.props.checkLoggedIn();
    }

    render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    { this.props.loggedIn && typeof this.props.accessLevel === 'undefined' ? this.renderCustomerProfile() : '' }
                    { this.props.loggedIn && this.props.accessLevel >= 1 ? this.renderEmployeeProfile() : ''}
                </div>
                <div className='clearfix'></div>
                { !this.props.loggedIn ? this.renderLogin() : '' }
                { this.props.loggedIn && typeof this.props.accessLevel === 'undefined' ? this.renderCustomerMenu() : '' }
                { this.props.loggedIn && this.props.accessLevel >= 1 ? this.renderEmployeeMenu() : '' }
                { this.props.loggedIn && this.props.accessLevel == 1 ? this.renderAdminMenu() : '' }
            </div>
        </div>;
    }

    private renderCustomerProfile() {
        return <div className="navbar-brand">
            <Link to={'/profile'}>MyProfile</Link>
        </div>
    }

    private renderEmployeeProfile() {
        return <div className="navbar-brand">
            <Link to={'/customerProfile'}>MyProfile</Link>
        </div>
    }

    private renderLogin() {
        return <div className='navbar-collapse collapse'>
            <ul className='nav navbar-nav'>
                <li>
                    <Link to={ '/login' }>
                        <span className='glyphicon glyphicon-home'></span> Login
                    </Link>
                </li>
            </ul>
        </div>
    }

    private renderAdminMenu() {
        return <div className='navbar-collapse collapse'>
            <ul className='nav navbar-nav'>
                <li>
                    <Link to={ '/rides/table' }>
                        <span className='glyphicon glyphicon-th-list'></span> Manage Ride Information
                    </Link>
                </li>
                <li>
                    <Link to={ '/rides/employees' }>
                        <span className='glyphicon glyphicon-th-list'></span> Assign Ride Employees
                    </Link>
                </li>
                <li>
                    <Link to={ '/rides/report' }>
                        <span className='glyphicon glyphicon-th-list'></span> View Ride Report
                    </Link>
                </li>
                <li>
                    <Link to={ '/employees' }>
                        <span className='glyphicon glyphicon-th-list'></span> Manage Employee Information
                    </Link>
                </li>
                <li>
                    <Link to={ '/maintenance' }>
                        <span className='glyphicon glyphicon-calendar'></span> 
                            Assign Maintenance Employees
                    </Link>
                </li>
                <li>
                    <Link to={ '/lookup' }>
                        <span className='glyphicon glyphicon-th-list'></span> LookupTables
                    </Link>
                </li>
            </ul>
        </div>
    }

    private renderCustomerMenu() {
        return <div className='navbar-collapse collapse'>
            <ul className='nav navbar-nav'>
                <li>
                    <Link to={ '/ticket/purchase' }>
                        <span className='glyphicon glyphicon-film'></span> Purchase Ticket
                    </Link>
                </li>
            </ul>
        </div>
    }

    private renderEmployeeMenu() {
        return <div className='navbar-collapse collapse'>
            <ul className='nav navbar-nav'>
                <li>
                    <Link to={ '/ticket/scan' }>
                        <span className='glyphicon glyphicon-film'></span> Scan Ticket
                    </Link>
                </li>
            </ul>
        </div>
    }
}

export default connect(
    (state: ApplicationState) => state.login, // Selects which state properties are merged into the component's props
    LoginActions.actionCreators                 // Selects which action creators are merged into the component's props
)(NavMenu);
