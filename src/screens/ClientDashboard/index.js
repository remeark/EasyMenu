import React, { useState, useCallback } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { appFirebase, database } from '../../config/firebase';

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

    return(
        <Container>                 
                <Header />

                <Body> 

                    <Button 
                            title="Ler QR Code" 
                            onPress={QRCode}
                    />
                </Body>

        </Container>
    )
};