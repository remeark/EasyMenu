import React, { useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { appFirebase } from '../../config/firebase';

import { Button } from '../../components/Form/Button';
import { Header } from '../../components/Header';

import { 
    Container, 
    HeaderButtons,
    Title
} from './styles';
import { HeaderRestaurant } from '../../components/HeaderRestaurant';

export function ChoosePayment(){

    const theme = useTheme();

    const navigation = useNavigation();
    const route = useRoute();    
    
    function card(){
        navigation.navigate('CardPayment', { restaurantName: route.params.restaurantName, table: route.params.table });
    }

    function money(){
        navigation.navigate('PaymentApproved', { restaurantName: route.params.restaurantName, table: route.params.table });
    }

    return(
        <Container>                 
                <Header isCompany={false}/>

                <HeaderRestaurant 
                    name={route.params.restaurantName.toUpperCase()}
                    table={`Mesa ${route.params.table}`}
                />

                <Title>Pagamento</Title>

                <HeaderButtons>
                    <Button 
                            title="Cartão" 
                            onPress={card}
                    />
                    <Button 
                            title="Dinheiro" 
                            onPress={money}
                    />
                </HeaderButtons>                

        </Container>
    )
};