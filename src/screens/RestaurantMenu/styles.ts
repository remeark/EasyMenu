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
    height: 100%;   

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
