import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { UserRoutes } from './user.routes';
import { RestaurantRoutes } from './restaurant.routes';

import { useAuth } from '../hooks/auth';

export function Routes(){
    const { user } = useAuth();

    return (
        <NavigationContainer>
            <UserRoutes />
        </NavigationContainer>
    )
};