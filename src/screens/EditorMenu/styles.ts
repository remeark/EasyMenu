import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.secondary};

    width: 100%;
    height: ${RFValue(113)}px;

    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;    
    margin-top: 15px;
    margin-left: 20px;
`;

export const Body = styled.View`
    flex: 1;
    padding: 0 24px;

    width: 100%;
    height: 100%;   

`;

export const Form = styled.View`
    flex: 1;
    justify-content: space-between;
    width: 100%;

    padding: 24px;
`;

export const Fields = styled.View``;

export const ErrorRegister = styled.View`
    flex: 1;
`;

export const ErrorRegisterText = styled.Text`
    font-family:${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.attention};
`;

export const DeleteText = styled.Text`
    font-family:${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.attention};
    font-size: ${RFValue(14)}px;   

    text-align: center;
    justify-content: flex-start;
`;
