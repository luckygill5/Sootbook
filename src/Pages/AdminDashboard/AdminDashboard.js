import React, {useState, useEffect} from 'react';
import AdminSideNav from "../../Components/Admin/AdminSideNav/AdminSideNav";
import AdminContentWrapper from"../../Components/Admin/AdminContentWrapper/AdminContentWrapper";
// import {withRouter} from 'react-router'
import './AdminDashboard.scss'

function AdminDashboard(props){

    const [expandView, setExpandView] = useState(false);

    function handleExpandView(){
        setExpandView(!expandView)
    }

    useEffect(() => {
        document.scrollingElement.scrollTop = 0;

    }, [])
return(
    <React.Fragment>
        <div className='admin_dashboardWrapper'>
            <AdminSideNav expandControl={() => handleExpandView()}/>
            <AdminContentWrapper viewManage={expandView}/>
        </div>
    </React.Fragment>
)
}

export default AdminDashboard;