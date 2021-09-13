import { Container } from '@material-ui/core';
import React from 'react';
import AppBaseScreen from '../common/layout/user/AppBaseScreen';
import CategoryCard from './components/CategoryCard';

export default function Categories(){
    return (
        <AppBaseScreen>
            <Container>
                {
                    [0, 1, 2].map((data, index) => <CategoryCard data={data}/>)
                }
            </Container>
        </AppBaseScreen>
    )
}