import { Link, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../../store/actions';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflow: 'clip',
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    links: {
        color: '#fff',
        textTransform: 'uppercase',
        textDecoration: 'none',
        marginLeft: 10,
        fontSize: 12,
        minWidth: 90
    }}))
export default function NavLinks(){
    const dispatch =  useDispatch()
    const classes = useStyles();
    const categories = useSelector(({products}) => products.categories)
    useEffect(() => {
        dispatch(getCategories())
    }, [])
    if(!categories || categories?.length <= 0) {
        return null
    }
    return <div className={classes.root}>
        {
            categories.map((val, index) => (
                <Link key={index} className={classes.links}>{val.name}</Link>
            ))
        }
    </div>
}