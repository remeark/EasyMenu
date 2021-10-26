import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { appFirebase } from '../../config/firebase';

import {
    Container,
    HeaderContainer,
    UserWrapper,
    UserInfo,
    User,
    UserGreeting,
    UserName,
    LogoutButton,
    Icon
} from './styles';

export function Header({
    name
}){

    //const navigation = useNavigation();

    function signOut(){
        appFirebase.auth().signOut().then(() => {
            //navigation.navigate('SelectWay');
          }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorMessage);
          });
    }


    return(
        <HeaderContainer>
            <UserWrapper>
                <UserInfo>
                    
                    <User>
                        <UserGreeting>Olá, </UserGreeting>
                        <UserName>{name}</UserName>
                    </User>

                </UserInfo>

                <LogoutButton onPress={signOut}>
                    <Icon name="power"/>
                </LogoutButton>

            </UserWrapper>   
        </HeaderContainer>
    )
}