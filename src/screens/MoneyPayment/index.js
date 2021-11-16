import React, { useState, useCallback } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { appFirebase } from '../../config/firebase';

import { Button } from '../../components/Form/Button';
import { Header } from '../../components/Header';
import { HeaderRestaurant } from '../../components/HeaderRestaurant';

import { 
    Container, 
    Body,
    Title,
    ButtonDone,
    ButtonUndone,
    Buttons,
    ButtonTitle
} from './styles';

export function MoneyPayment(){

    const theme = useTheme();

    const navigation = useNavigation();
    const route = useRoute();    
    
    function returnToBegin(){
        navigation.navigate('ClientDashboard');
    }

    // useFocusEffect(useCallback(() => {
    //     const user = appFirebase.auth().currentUser;

    //     if (user) {
    //         console.log("logado");
    //     } else {
    //         console.log("na ologado");
    //     }
    // }, []));

    return(
        <Container>                 
                <Header isCompany={false}/>

                <HeaderRestaurant 
                    name={route.params.restaurantName.toUpperCase()}
                    table={`Mesa ${route.params.table}`}
                />

                <Body> 
                    <Title>Finalizar Pedido</Title>
                    <Title>Valor Total: {route.params.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Title>
                    <Buttons> 
                        <ButtonDone onPress={returnToBegin}>
                            <ButtonTitle>Finalizar</ButtonTitle>
                        </ButtonDone>
                        <ButtonUndone onPress={returnToBegin}>
                            <ButtonTitle>Cancelar</ButtonTitle>
                        </ButtonUndone>
                    </Buttons>
                </Body>

        </Container>
    )
};