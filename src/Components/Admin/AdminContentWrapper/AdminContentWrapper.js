import React from 'react';
import AdminDashBoardContent from "../AdminDashBoardContent/AdminDashBoardContent"



function AdminContentWrapper(props){
const {viewManage} = props;
    return(
        <React.Fragment>
            <AdminDashBoardContent viewManage={props.viewManage}/>
        </React.Fragment>
    )
}

export default AdminContentWrapper;