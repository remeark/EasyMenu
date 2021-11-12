import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { UserRoutes } from './user.routes';
import { RestaurantRoutes } from './restaurant.routes';

import { useAuth } from '../hooks/auth';

export function Routes(){

    return (
        <NavigationContainer>
            <UserRoutes />
        </NavigationContainer>
    )
};