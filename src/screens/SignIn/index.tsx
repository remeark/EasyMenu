import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

import GoogleSvg from '../../assets/google.svg';

import { useAuth } from '../../hooks/auth';
import { appFirebase } from '../../config/firebase';

import { SignInSocialButton } from '../../components/SignInSocialButton';
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
    ButtonLogin
} from './styles';

export function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const { signInWithGoogle, signInWithApple } = useAuth();

    const theme = useTheme();    

    function TODOLOGIN(){
        appFirebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            setErrorLogin(false);
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
                    <SignInSocialButton 
                        title="Entrar com Google"
                        svg={GoogleSvg}
                    />

                    <Input
                        name="email"
                        placeholder="E-mail"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(email : any) => setEmail(email)}
                    />
                    
                    <Input 
                        name="password"
                        placeholder="Senha"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(password : any) => setPassword(password)}
                    />    
                    { errorLogin === true ?
                        <Text>O e-mail ou a senha estão incorretos.</Text>
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
                        onPress={TODOLOGIN} 
                    />  
                </ButtonLogin>
                
            </Footer>

        </Container>
    )
};