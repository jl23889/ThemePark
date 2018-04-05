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

    componentDidUpdate(nextProps: DataProps) {
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
                    { this.props.loggedIn ? this.renderUsername() : ''}
                </div>
                <div className='clearfix'></div>
                { !this.props.loggedIn ? this.renderLogin() : '' }
                { this.props.loggedIn && this.props.accessLevel >= 1 ? this.renderEmployeeMenu() : '' }
                { this.props.loggedIn && this.props.accessLevel == 1 ? this.renderAdminMenu() : '' }
            </div>
        </div>;
    }

    private renderUsername() {
        return <div className="navbar-brand">
            <Link to={'/login'}>MyProfile</Link>
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
                    {// TODO: MAKE THIS COLLAPSIBLE OR DROPDOWN
                    }
                    <Link to={ '/lookup' }>
                        <span className='glyphicon glyphicon-th-list'></span> LookupTables
                    </Link>
                    <ul className='nav navbar-nav'>
                        <li>
                            <Link to={ '/lookup/ridestatus' }>
                                LookupRideStatus
                            </Link>
                        </li>
                        <li>
                            <Link to={ '/lookup/ridetype' }>
                                LookupRideType
                            </Link>
                        </li>
                        <li>
                            <Link to={ '/lookup/employeetype' }>
                                LookupEmployeeType
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    }

    private renderEmployeeMenu() {
        return <div className='navbar-collapse collapse'>
            <ul className='nav navbar-nav'>
                <li>
                    <Link to={ '/rides' }>
                        <span className='glyphicon glyphicon-th-list'></span> Ride Table
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
