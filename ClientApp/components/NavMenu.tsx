import * as React from 'react';
import { NavLink, Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as NavMenuState from '../store/NavMenu';
import * as LoginActions from '../actions/_LoginActions'

// At runtime, Redux will merge together...
type DataProps =
    NavMenuState.NavMenuState        // ... state we've requested from the Redux store
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
                { this.props.loginType == 'employee' ? this.renderEmployeeMenu() : '' }
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
                    <NavLink exact to={ '/login' } activeClassName='active'>
                        <span className='glyphicon glyphicon-home'></span> Login
                    </NavLink>
                </li>
            </ul>
        </div>
    }

    private renderEmployeeMenu() {
        return <div className='navbar-collapse collapse'>
            <ul className='nav navbar-nav'>
                <li>
                    <NavLink exact to={ '/' } activeClassName='active'>
                        <span className='glyphicon glyphicon-home'></span> Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={ '/counter' } activeClassName='active'>
                        <span className='glyphicon glyphicon-education'></span> Counter
                    </NavLink>
                </li>
                <li>
                    <NavLink to={ '/rides' } activeClassName='active'>
                        <span className='glyphicon glyphicon-th-list'></span> Ride Table
                    </NavLink>
                </li>
                <li>
                    {// TODO: MAKE THIS COLLAPSIBLE OR DROPDOWN
                    }
                    <NavLink to={ '/lookup' } activeClassName='active'>
                        <span className='glyphicon glyphicon-th-list'></span> LookupTables
                    </NavLink>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/lookup/ridestatus' } activeClassName='active'>
                                LookupRideStatus
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/lookup/ridetype' } activeClassName='active'>
                                LookupRideType
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/lookup/employeetype' } activeClassName='active'>
                                LookupEmployeeType
                            </NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    }
}

export default connect(
    (state: ApplicationState) => state.navMenu, // Selects which state properties are merged into the component's props
    LoginActions.actionCreators                 // Selects which action creators are merged into the component's props
)(NavMenu);
