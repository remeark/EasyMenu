import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { RestaurantDashboard } from '../screens/RestaurantDashboard';
import { RegisterMenu } from '../screens/RegisterMenu';
import { EditorMenu } from '../screens/EditorMenu';
import { Editor } from '../screens/Editor';

const { Navigator, Screen } = createStackNavigator();

export function RestaurantRoutes(){
    return(
        <Navigator screenOptions={{
            headerShown: false,
        }}>
            <Screen 
                name="RestaurantDashboard"
                component={RestaurantDashboard}
            />   
            <Screen 
                name="RegisterMenu"
                component={RegisterMenu}
            />
            <Screen 
                name="EditorMenu"
                component={EditorMenu}
            />
            <Screen 
                name="Editor"
                component={Editor}
            />                     
        </Navigator>
    )
}