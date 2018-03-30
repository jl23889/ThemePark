import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>ThemePark</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
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
                            <NavLink to={ '/ridestatus' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> LookupRideStatus
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/ridetype' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> LookupRideType
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
