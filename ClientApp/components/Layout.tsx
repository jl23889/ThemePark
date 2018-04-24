import * as React from 'react';
import NavMenu from './NavMenu';

export class Layout extends React.Component<{}, {}> {
    public render() {
        return (
            <div className='container-fluid'>
                <img className="bg"
                src="https://cdnb.artstation.com/p/assets/images/images/002/385/415/large/todd-white-earthexplorersthemepark-finalhighrescolor-02.jpg"/>
                <NavMenu/>
                <div className='row mt-3 pt-3'>
                    <div className='col-12'>
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}