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
    Title
} from './styles';

export function PaymentApproved(){

    const theme = useTheme();

    const navigation = useNavigation();
    //const route = useRoute();    
    
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
                <Header 
                    name='Marinho'
                />

                <HeaderRestaurant 
                    name="Restaurante"
                    table="Mesa 40"
                />

                <Body> 
                    <Title>Pagamento aprovado!</Title>
                    <Button 
                            title="Retornar ao início" 
                            onPress={returnToBegin}
                    />
                </Body>

        </Container>
    )
};