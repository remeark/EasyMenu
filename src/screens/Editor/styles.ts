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
    width: 100%;
    height: 100%; 

    padding: 0 24px;

`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;

    margin-bottom: 16px;
    
    margin-top: 5px;
`;

export const MenuList = styled(FlatList).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: 15
    }
})`

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

export const MenuCard = styled.View`
    background-color: ${({ theme }) => theme.colors.shape };
    border-radius: 5px;

    padding: 17px 24px;

    margin-bottom: 16px;
`;

export const Observations = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(13)}px;
    
    margin-top: 2px;
`;


export const FooterMenuCard = styled.View`
    flex-direction: row;
    justify-content: flex-end;

    margin-top: 19px;
`;

export const IconSelection = styled(Feather)`
    color: ${({theme}) => theme.colors.success};
    font-size: ${RFValue(25)}px; 
    
    margin-left: 5px;
`;

export const IconUnselection = styled(Feather)`
    color: ${({theme}) => theme.colors.attention};
    font-size: ${RFValue(25)}px;
    margin-right: 5px;
`;

export const TitleMenuCard = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;    
`;

export const Quantity = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(18)}px;  
`;



