import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from '../screens/SignIn';
import { UserRegister } from '../screens/UserRegister';
import { ClientDashboard } from '../screens/ClientDashboard';
import { SelectWay } from '../screens/SelectWay';
import { Register } from '../screens/Register';
import { RestaurantDashboard } from '../screens/RestaurantDashboard';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes(){
    return(
        <Navigator screenOptions={{
            headerShown: false,
        }}>
            <Screen 
                name="SelectWay"
                component={SelectWay}
            />
            <Screen 
                name="SignIn"
                component={SignIn}
            />
            <Screen 
                name="UserRegister"
                component={UserRegister}
            />
            <Screen 
                name="Register"
                component={Register}
            />
            <Screen 
                name="ClientDashboard"
                component={ClientDashboard}
            />
             <Screen 
                name="RestaurantDashboard"
                component={RestaurantDashboard}
            />              
        </Navigator>
    )
}