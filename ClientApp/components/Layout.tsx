import * as React from 'react';
import NavMenu from './NavMenu';

export class Layout extends React.Component<{}, {}> {
    public render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <img className='bg' src="http://b40ad1317d45595cd0df-4d1987fef3a36cccd5478db4931039f0.r84.cf3.rackcdn.com/assets/media/2018/01/APAC-theme-parks-blog.jpg" />
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