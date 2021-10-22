import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { appFirebase } from '../../config/firebase';

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
    RegisterText
} from './styles';

export function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const route = useRoute();
    const isCompany = route.params.isCompany;

    const theme = useTheme();     

    function Login(){
        appFirebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            setIsLoading(true);
            setErrorLogin(false);

            navigation.navigate('ClientDashboard');
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;  
            
            setErrorLogin(true);
        });
    }

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
                    uma das contas abaixo
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

                </FooterWrapper>

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