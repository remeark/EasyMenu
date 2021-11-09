import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { appFirebase, database } from '../../config/firebase';

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

export function Header(){
    const [userName, setUserName] = useState('');
    const navigation = useNavigation();
    // const route = useRoute();

    // if(route.params.isCompany) {
    //     database.collection('company').doc(appFirebase.auth().currentUser.uid).get().then(doc => {
    //         setUserName(doc.data().name);
    //     });
    // }
    // else {
    //     database.collection('users').doc(appFirebase.auth().currentUser.uid).get().then(doc => {
    //         setUserName(doc.data().name);
    //     });
    // }       

    function signOut(){
        appFirebase.auth().signOut().then(() => {
            navigation.navigate('SelectWay');
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
                        <UserName>{userName}</UserName>
                    </User>

                </UserInfo>

                <LogoutButton onPress={signOut}>
                    <Icon name="power"/>
                </LogoutButton>

            </UserWrapper>   
        </HeaderContainer>
    )
}