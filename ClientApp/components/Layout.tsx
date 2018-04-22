import * as React from 'react';
import NavMenu from './NavMenu';

export class Layout extends React.Component<{}, {}> {
    public render() {
        return (
            <div className='container-fluid'>
                <img className='bg' src="https://cdn.pixabay.com/photo/2014/01/01/13/33/amusement-park-237200_1280.jpg" />
                <div className='row'>
                    <div className='col-sm-3'>
                        <NavMenu />
                    </div>
                    <div className='col-sm-9'>
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}
