import React, { useState, useCallback } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { appFirebase } from '../../config/firebase';

import { Button } from '../../components/Form/Button';
import { Header } from '../../components/Header';

import { 
    Container, 
    Body
} from './styles';

export function ClientDashboard(){

    const theme = useTheme();

    const navigation = useNavigation();
    //const route = useRoute();    
    
    function QRCode(){
        navigation.navigate('Menu');
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

                <Body> 

                    <Button 
                            title="Ler QR Code" 
                            onPress={QRCode}
                    />
                </Body>

        </Container>
    )
};