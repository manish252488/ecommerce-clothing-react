import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { logoIcon } from '../../../assets';
import './index.less'
export default function LoadingScreen(){


    return <div className="root">
            <div>
            <img src={logoIcon} alt="logo" className="image"/>
            </div>
            <div>
            <CircularProgress color="primary" />
            </div>
    </div>
}