import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: 55%;

    background-color: ${({theme}) => theme.colors.secondary};

    justify-content: flex-end;
    align-items: center;
`;

export const TitleWrapper = styled.View`
    align-items: center;
`;

export const Title = styled.Text`
    font-family:${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(30)}px;

    text-align: center;

    margin-top: 10px;
`;

export const SignInTitle = styled.Text`
    font-family:${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(16)}px;

    text-align: center;

    margin-top: 50px;
    margin-bottom: 67px;
`;

export const Footer = styled.View`
    background-color: ${({theme}) => theme.colors.text};
    
    width: 100%;
    height: 45%;
`;

export const FooterWrapper = styled.View`
    margin-top: ${RFPercentage(-4)}px;

    padding: 0 32px;

    justify-content: space-between;
`;

export const ButtonLogin = styled.View`
    padding: 0 32px;

    margin-top: ${RFPercentage(5)}px;
`;

export const ErrorLogin = styled.View`
    flex: 1;
`;

export const ErrorLoginText = styled.Text`
    font-family:${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.attention};
`;

export const RegisterText = styled.Text`
    font-family:${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};

    margin-top: 10px;
    text-align: center;
`;


