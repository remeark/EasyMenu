import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ClientDashboard } from '../screens/ClientDashboard';
import { Menu } from '../screens/Menu';
import { Payment } from '../screens/Payment';
import { PaymentApproved } from '../screens/PaymentApproved';
import { ItensRequest } from '../screens/ItensRequest';
import { ChoosePayment } from '../screens/ChoosePayment';

const { Navigator, Screen } = createStackNavigator();

export function UserRoutes(){
    return(
        <Navigator screenOptions={{
            headerShown: false,
        }}>
            <Screen 
                name="ClientDashboard"
                component={ClientDashboard}
            />   
            <Screen 
                name="Menu"
                component={Menu}
            />
            <Screen 
                name="ItensRequest"
                component={ItensRequest}
            />
            <Screen 
                name="ChoosePayment"
                component={ChoosePayment}
            />
            <Screen 
                name="Payment"
                component={Payment}
            />
            <Screen 
                name="PaymentApproved"
                component={PaymentApproved}
            />                     
        </Navigator>
    )
}