import React from 'react';

import {
    Container,
    RestaurantTitle,
    RestaurantTable
} from './styles';

export function HeaderRestaurant({
    name,
    table
}){
    return(
        <Container>
            <RestaurantTitle>
                {name}
            </RestaurantTitle>
            <RestaurantTable>
                {table}
            </RestaurantTable>
        </Container>
    )
}