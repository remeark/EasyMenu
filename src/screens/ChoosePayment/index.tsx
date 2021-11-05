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
    //const route = useRoute();    
    
    function card(){
        navigation.navigate('Payment');
    }

    function money(){
        navigation.navigate('PaymentApproved');
    }

    return(
        <Container>                 
                <Header 
                    name='Marinho'
                />

                <HeaderRestaurant 
                name="Restaurante"
                table="Mesa 40"
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