import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ClientDashboard } from '../screens/ClientDashboard';
import { Menu } from '../screens/Menu';
import { CardPayment } from '../screens/CardPayment';
import { MoneyPayment } from '../screens/MoneyPayment';
import { PedidoApproved } from '../screens/PedidoApproved';
import { ItensRequest } from '../screens/ItensRequest';
import { ChoosePayment } from '../screens/ChoosePayment';
import { RestaurantDashboard } from '../screens/RestaurantDashboard';
import { RegisterMenu } from '../screens/RegisterMenu';
import { EditorMenu } from '../screens/EditorMenu';
import { Editor } from '../screens/Editor';

import { SelectWay } from '../screens/SelectWay';
import { SignIn } from '../screens/SignIn';
import { UserRegister } from '../screens/UserRegister';
import { Register } from '../screens/Register';
import { OpenPayment } from '../screens/OpenPayment';


const { Navigator, Screen } = createStackNavigator();

export function UserRoutes(){
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
                name="CardPayment"
                component={CardPayment}
            />
            <Screen 
                name="MoneyPayment"
                component={MoneyPayment}
            />
            <Screen 
                name="PedidoApproved"
                component={PedidoApproved}
            />  
            <Screen 
                name="RestaurantDashboard"
                component={RestaurantDashboard}
            />  
            <Screen
                name="OpenPayment"
                component={OpenPayment}
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