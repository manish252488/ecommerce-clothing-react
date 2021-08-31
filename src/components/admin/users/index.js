/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Chip } from '@material-ui/core';
import { PeopleOutlined } from '@material-ui/icons';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../../../store/actions';
import AdminBaseComponent from '../../common/layout/admin/admin-base-component/AdminBaseComponent';
import Table from '../../common/Table';
export default function Users(props){
    const columns = {'name':'Name','roleId': 'Role','source': 'Source', 'status': 'Account Status', 'createdDate': 'Created', 'updatedDate':'Last Updated'};
    const dispatch = useDispatch();
    const users = useSelector(({admin})=> admin.users)
    useEffect(()=>{
        dispatch(listUsers())
        getUsers()
    },[])
    const getUsers = () => {
        let obj =[];
    if(users){
        users.forEach(data=>{
            let temp = {...data}
            temp.createdDate = moment(data.createdDate).format('MMMM Do YYYY, h:mm:ss a')
            temp.updatedDate = moment(data.updatedDate).format('MMMM Do YYYY, h:mm:ss a')
            temp.status = data.status===0? <Chip avatar={<Avatar>😔</Avatar>} label="In-Active" color="secondary"/>:<Chip avatar={<Avatar>😃</Avatar>} label="Active" color="primary"/>
            obj.push(temp)
        })
        return obj;
    }else 
        return []
    }
    return <AdminBaseComponent icon={<PeopleOutlined/>} title="Users" >
        <Table columns={columns} datasource={getUsers()}/>
    </AdminBaseComponent>
}

