import React, { useState, useCallback } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Button } from '../../components/Form/Button';
import { Header } from '../../components/Header';
import { HeaderRestaurant } from '../../components/HeaderRestaurant';

import { 
    Container, 
    Body,
    Title
} from './styles';

export function PedidoApproved(){

    const navigation = useNavigation();
    const route = useRoute();    
    
    function returnToBegin(){
        navigation.navigate('ClientDashboard');
    }  

    return(
        <Container>                 
                <Header isCompany={false}/>

                <HeaderRestaurant 
                    name={route.params.restaurantName.toUpperCase()}
                    table={`Mesa ${route.params.table}`}
                />

                <Body> 
                    <Title>Pedido aprovado! - Nº {route.params.idPedido}</Title>
                    <Button 
                            title="Retornar ao início" 
                            onPress={returnToBegin}
                    />
                </Body>

        </Container>
    )
};