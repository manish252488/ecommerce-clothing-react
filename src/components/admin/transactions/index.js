import { ListOutlined, PeopleOutlined } from '@material-ui/icons';
import React from 'react';
import AdminBaseComponent from '../../common/layout/admin/admin-base-component/AdminBaseComponent';
export default function Transactions(props){
    return <AdminBaseComponent icon={<ListOutlined/>} title="Transactions" rightComponents={[<PeopleOutlined/>,<PeopleOutlined/>]}>
 
    </AdminBaseComponent>
}