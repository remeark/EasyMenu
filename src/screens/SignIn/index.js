import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { appFirebase, database } from '../../config/firebase';

import { Input } from '../../components/Form/Input';
import { Button} from '../../components/Form/Button';

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper,
    ButtonLogin,
    ErrorLoginText,
    ErrorLogin,
    RegisterText,
    ErrorText
} from './styles';

export function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();

    const theme = useTheme();     

    function Login(){
        setIsLoading(true);
        
        appFirebase.auth().signInWithEmailAndPassword(email.trim(), password.trim())
        .then((userCredential) => {
            var user = userCredential.user;
            
            setErrorLogin(false);

            try {
                if(route.params.isCompany) {
                    database.collection('company').doc(appFirebase.auth().currentUser.uid).get().then(doc => {
                        if(doc.data()?.cnpj){
                            navigation.navigate('RestaurantDashboard', { isCompany: route.params.isCompany })
                        }                        
                    });
                } else {
                    database.collection('users').doc(appFirebase.auth().currentUser.uid).get().then(doc => {
                        if(doc.data().name){
                            navigation.navigate('ClientDashboard', { isCompany: route.params.isCompany })
                        }
                    });
                }                
            } catch (error) {
                console.log(error);
            }
        })
        .catch((error) => { 
            console.log(error);
            
            setErrorLogin(true);
        });
    };

    useEffect(() => {
        appFirebase.auth().onAuthStateChanged((user) => {
            if (user) {
                try {
                    if ( route.params.isCompany ) {
                        database.collection('company').doc(appFirebase.auth().currentUser.uid).get().then(doc => {
                            if(doc.data()?.cnpj){
                                navigation.navigate('RestaurantDashboard', { isCompany: route.params.isCompany, email: email })
                            }                        
                        });
                    } else {
                        database.collection('users').doc(appFirebase.auth().currentUser.uid).get().then(doc => {
                            if(doc.data().name){
                                navigation.navigate('ClientDashboard', { isCompany: route.params.isCompany })
                            }
                        });
                    }                
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }, []);

    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <MaterialIcons 
                        name="menu-book"
                        size={RFValue(80)}
                        color="#FFF"
                    />

                    <Title>
                        Easy Menu {'\n'}
                    </Title>

                </TitleWrapper>

                <SignInTitle>
                    Faça seu login com {'\n'}
                    seu e-mail e senha
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <Input
                        name="email"
                        placeholder="E-mail"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                    />
                    
                    <Input 
                        name="password"
                        placeholder="Senha"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                    />      
                </FooterWrapper>

                <ErrorText>
                    { errorLogin === true ?
                        <ErrorLogin>
                            <ErrorLoginText>O e-mail ou a senha estão incorretos.</ErrorLoginText>
                        </ErrorLogin>
                    :
                    isLoading && 
                        <ActivityIndicator 
                            color={theme.colors.shape}
                            style={{marginTop: 18}}                    
                        />                    
                    } 
                </ErrorText>

                <ButtonLogin> 
                    <Button 
                        title="Entrar"
                        onPress={Login} 
                    />  
                </ButtonLogin>

                <RegisterText 
                    onPress={() => route.params.isCompany ? navigation.navigate('Register') : navigation.navigate('UserRegister')}> 
                    Registre-se já 
                </RegisterText>
                
            </Footer>

        </Container>
    )
};