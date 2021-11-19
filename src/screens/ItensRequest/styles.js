import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background };
    
`;

export const Body = styled.View`
    flex: 1;
    padding: 0 24px;

    width: 100%; 

`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;

    margin-bottom: 8px;
    
    margin-top: 5px;
`;

export const TitleData = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;

    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
`;

export const Footer = styled.View`
    width: 100%;

    padding: 0 32px;

    align-items: center;
    justify-content: flex-end;

    margin-bottom: 15px;
`;

export const Value = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium };
    color: ${({ theme }) => theme.colors.text_dark };
    font-size: ${RFValue(15)}px;
`;

export const Form = styled.View`
    justify-content: space-between;
    width: 100%;

    padding: 10px;
`;

export const Fields = styled.View`
    align-items: center;
    justify-content: flex-end;
`;

export const ErrorRegister = styled.View`
    flex: 1;
`;

export const ErrorRegisterText = styled.Text`
    font-family:${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.attention};
`;

export const MenuList = styled(FlatList).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: 15
    }
})`

`;

export const MenuCard = styled.View`
    background-color: ${({ theme }) => theme.colors.shape };
    border-radius: 5px;

    padding: 17px 24px;

    margin-bottom: 16px;
`;