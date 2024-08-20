import React, {useState} from 'react';
import AdminDashboard from './AdminDashboard';
import PageNotFound from '../PageNotFound/PageNotFound';


function AdminDashboardParent(props){

   const dashbordView =  localStorage.getItem("accessToken") ? true : false
    return (
        dashbordView ? <AdminDashboard/> : <PageNotFound/>
    )

}

export default AdminDashboardParent;