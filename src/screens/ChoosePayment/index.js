import React, { useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute, StackActions  } from '@react-navigation/native';

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
        navigation.navigate('CardPayment', { 
            restaurantName: route.params.restaurantName, 
            itens: route.params.itens,
            table: route.params.table, 
            total: route.params.total, 
            observations: route.params.observations,            
            idRestaurant: route.params.idRestaurant });
    }

    function money(){
        navigation.navigate('MoneyPayment', { 
            restaurantName: route.params.restaurantName, 
            itens: route.params.itens,
            table: route.params.table, 
            total: route.params.total, 
            observations: route.params.observations,            
            idRestaurant: route.params.idRestaurant });
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
                    <Button 
                        title="Retornar ao Cardápio" 
                        onPress={() => navigation.dispatch(StackActions.pop(2))}
                    />   
                </HeaderButtons>                             

        </Container>
    )
};