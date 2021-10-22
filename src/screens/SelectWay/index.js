import React, { useState, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Button} from '../../components/Form/Button';

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper,
} from './styles';

export function SelectWay(){

    const navigation = useNavigation();

    const theme = useTheme();

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
                    Você é uma empresa ou cliente?
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <Button 
                        title="Empresa"
                        onPress={() => navigation.navigate("SignIn", { isCompany: true })}
                        style={{
                            backgroundColor: theme.colors.attention
                        }}
                    />

                    <Button 
                        title="Cliente"
                        onPress={() => navigation.navigate("SignIn", { isCompany: false })}
                        style={{
                            backgroundColor: theme.colors.attention,
                            marginTop: 10
                        }}
                    />     
                </FooterWrapper>
                
            </Footer>

        </Container>
    )
};