
import React from 'react';
import { Router } from 'react-router';
import History from '../../@history';
import AppRoute from '../../navigation/AppRoute';
import AdminBaseScreen from '../common/layout/admin/AdminBaseScreen';
import { AdminDashboardRoutes } from './Admin.routes';
export default function AdminDashboard(props){
    return <AdminBaseScreen>
        <Router history={History}>
           <AppRoute routes={[AdminDashboardRoutes]}/>
        </Router>
    </AdminBaseScreen>
}