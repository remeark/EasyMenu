import React, { useState, useCallback } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { appFirebase } from '../../config/firebase';

import { Button } from '../../components/Form/Button';

import { 
    Container, 
    Header,
    UserWrapper,
    UserInfo,
    User,
    UserGreeting,
    UserName,
    Icon,
    LogoutButton,
    Body
} from './styles';

export function ClientDashboard(){

    const theme = useTheme();

    const navigation = useNavigation();
    const route = useRoute();

    function signOut(){
        appFirebase.auth().signOut().then(() => {
            navigation.navigate('SelectWay');
          }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorMessage);
          });
    }
    
    function QRCode(){
        console.log('qrcode');
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
                <Header>
                    <UserWrapper>
                        <UserInfo>
                            
                            <User>
                                <UserGreeting>Olá, </UserGreeting>
                                <UserName>Marinho</UserName>
                            </User>

                        </UserInfo>

                        <LogoutButton onPress={signOut}>
                            <Icon name="power"/>
                        </LogoutButton>

                    </UserWrapper>   
                </Header>  

                <Body> 

                    <Button 
                            title="Ler QR Code" 
                            onPress={QRCode}
                    />
                </Body>

        </Container>
    )
};