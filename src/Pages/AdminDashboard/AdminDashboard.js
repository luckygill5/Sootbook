import React, { useState, useEffect } from 'react';
import AdminSideNav from '../../Components/Admin/AdminSideNav/AdminSideNav';
import AdminContentWrapper from '../../Components/Admin/AdminContentWrapper/AdminContentWrapper';
// import {withRouter} from 'react-router'
import './AdminDashboard.scss';

function AdminDashboard(props) {
    const [expandView, setExpandView] = useState(false);
    const [MenuSelected, setMenuSelected] = useState('');
    const [breadcrumbUpdate, setBreadCrumbUpdate] = useState('');

    function handleExpandView() {
        setExpandView(!expandView);
    }

    const handleSelecteMenu = event => {
        setMenuSelected(event);
    };

    const handleUpdateBreadCrumb = event => {
        setBreadCrumbUpdate(event);
    };

    useEffect(() => {
        document.scrollingElement.scrollTop = 0;

    }, [])
return(
    <React.Fragment>
        <div className='admin_dashboardWrapper'>
            <AdminSideNav 
            expandControl={() => handleExpandView()} 
            SelecteMenuOption={(e) => handleSelecteMenu(e)}
            updateBreadCrumb ={(e) => handleUpdateBreadCrumb(e)}
            />
            <AdminContentWrapper 
            viewManage={expandView}
            viewcontrol={MenuSelected}
            breadcrumbUpdateData={breadcrumbUpdate}
            updateBreadCrumb ={(e) => handleUpdateBreadCrumb(e)}
            />
        </div>
    </React.Fragment>
)
}

export default AdminDashboard;
