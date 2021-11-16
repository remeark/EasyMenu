import React, { useState, useContext }from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { UserRoutes } from './user.routes';

import { appFirebase } from '../config/firebase';

export function Routes(){    
    return (
        <NavigationContainer>          
            <UserRoutes />
        </NavigationContainer>
    )
};