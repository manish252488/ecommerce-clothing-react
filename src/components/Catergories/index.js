import React, { useEffect } from 'react';
import AppBaseScreen from '../common/layout/user/AppBaseScreen';
import { renderIfElse } from '../../config/Utils';
import LoadingScreen from '../common/Loader.js';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../store/actions';
import { Container, makeStyles } from '@material-ui/core';
import CategoryCard from './components/CategoryCard';
const useStyles = makeStyles(theme => ({

}))
export default function Categories({ data }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector(({ orders }) => orders.categories)
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  if(!categories){
    return <LoadingScreen/>
  }
  return (
    <Container>
      {
        categories.map((val, index) => <CategoryCard data={val} />)
      }
    </Container>)

}