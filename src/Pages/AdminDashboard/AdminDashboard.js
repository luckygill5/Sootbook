import React, {useState, useEffect} from 'react';
import AdminSideNav from "../../Components/Admin/AdminSideNav/AdminSideNav";
import AdminContentWrapper from"../../Components/Admin/AdminContentWrapper/AdminContentWrapper";
// import {withRouter} from 'react-router'
import './AdminDashboard.scss'

function AdminDashboard(props){

    const [expandView, setExpandView] = useState(false);
    const [MenuSelected, setMenuSelected] = useState('')

    function handleExpandView(){
        setExpandView(!expandView)
    }

    const handleSelecteMenu = (event) => {
        setMenuSelected(event)
    }

    useEffect(() => {
        document.scrollingElement.scrollTop = 0;

    }, [])
return(
    <React.Fragment>
        <div className='admin_dashboardWrapper'>
            <AdminSideNav 
            expandControl={() => handleExpandView()} 
            SelecteMenuOption={(e) => handleSelecteMenu(e)}
            />
            <AdminContentWrapper 
            viewManage={expandView}
            viewcontrol={MenuSelected}
            />
        </div>
    </React.Fragment>
)
}

export default AdminDashboard;