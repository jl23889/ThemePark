import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
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

    logoutUser = () => {
        this.props.logout();
    }

    render() {
        return (
          <div>
            <Navbar color="light" light expand="md">
              <Collapse navbar>
                <Nav navbar>
                    <NavItem><Button color="link"><Link to="/">
                        ThemePark</Link></Button></NavItem>
                    <NavItem><Button color="link"><Link to="/ridespublic">
                        Rides</Link></Button></NavItem>
                </Nav>
                { this.props.loggedIn && typeof this.props.accessLevel === 'undefined' ? this.renderCustomerMenu() : '' }
                { this.props.loggedIn && this.props.accessLevel >= 1 ? this.renderEmployeeMenu() : '' }
                { this.props.loggedIn && this.props.accessLevel == 1 ? this.renderAdminMenu() : '' }

                
                { this.props.loggedIn && typeof this.props.accessLevel === 'undefined' ? this.renderCustomerProfile() : '' }
                { this.props.loggedIn && this.props.accessLevel >= 1 ? this.renderEmployeeProfile() : '' }
                { !this.props.loggedIn ? this.renderLogin() : '' }
             
              </Collapse>
            </Navbar>
          </div>
        );
    }

    private renderCustomerProfile() {
        return <Nav className="ml-auto" navbar>
          <NavItem>
            <Button outline color='success'>
              <Link to={'/customerProfile'}>
                Profile
              </Link>
            </Button>
          </NavItem> 
          <NavItem><Button color="warning" onClick={this.logoutUser}>
            <Link to={'/'}>Logout</Link></Button>
          </NavItem> 
        </Nav>
    }

    private renderEmployeeProfile() {
        return <Nav className="ml-auto" navbar>
          <NavItem>
            <Button outline color='success'>
              <Link to={'/profile'}>
                Profile
              </Link>
            </Button>
          </NavItem> 
          <NavItem><Button color="warning" onClick={this.logoutUser}>
            <Link to={'/'}>Logout</Link></Button>
          </NavItem> 
        </Nav>
    }

    private renderLogin() {
        return <Nav className="ml-auto" navbar>
            <NavItem><Button color="link"><Link to={'/login'}>
            Login</Link>
          </Button></NavItem> 
        </Nav>
    }

    private renderAdminMenu() {
        return <Nav navbar>
            <NavItem>
                <Button color="link">
                <Link to={ '/rides/table' }>
                    Rides
                </Link>
                </Button>
            </NavItem>
            
            <NavItem>
                <Button color="link">
                <Link to={ '/employees' }>
                    Employees
                </Link>
                </Button>
            </NavItem>
            <NavItem>
                <Button color="link">
                <Link to={ '/maintenance' }>
                    Maintenance
                </Link>
                </Button>
            </NavItem>
            <NavItem>
                <Button color="link">
                <Link to={ '/rides/report' }>
                    Report
                </Link>
                </Button>
            </NavItem>
        </Nav>
    }

    private renderCustomerMenu() {
        return <Nav navbar>
            <NavItem>
                <Button color="link">
                <Link to={ '/ticket/purchase' }>
                    Purchase Ticket
                </Link>
                </Button>
            </NavItem>
            <NavItem>
                <Button color="link">
                    <Link to={'/ridespublic'}>
                        Rides
                </Link>
                </Button>
            </NavItem>
        </Nav>
    }

    private renderEmployeeMenu() {
        return <Nav navbar>
            <NavItem>
                <Button color="link">
                <Link to={ '/ticket/scan' }>
                    Scan Ticket
                </Link>
                </Button>
            </NavItem>
        </Nav>
    }
}

export default connect(
    (state: ApplicationState) => state.login, // Selects which state properties are merged into the component's props
    LoginActions.actionCreators                 // Selects which action creators are merged into the component's props
)(NavMenu);
