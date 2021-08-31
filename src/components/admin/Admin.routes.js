import React from "react";
import { Redirect } from "react-router";
import AdminDashboard from ".";
import authRoles from "../../config/authRoles";
import Transactions from "./transactions";
import Users from "./users";

export const defaultPath = "/admin";

const AdminRoutes = {
    auth: authRoles.admin,
    routes: [{
        path: "/",
        component: ()=><Redirect to={defaultPath}/>,
        exact: true
    },{
        path: defaultPath,
        component: AdminDashboard,
        exact: true
    },{
        path: defaultPath +'/:screen',
        component: AdminDashboard,
        exact: true
    }]
}
export default AdminRoutes


export const AdminDashboardRoutes ={
    auth: authRoles.admin,
    routes: [{
        path: defaultPath+ '/users',
        component: Users,
        exact: true
    },{
        path: defaultPath+ '/transactions',
        component: Transactions,
        exact: true
    },
    {
        path: defaultPath,
        component: ()=><Redirect to={defaultPath+'/users'}/>
    }]
}