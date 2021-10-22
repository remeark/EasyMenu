import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.shape };
    border-radius: 5px;

    padding: 17px 24px;

    margin-bottom: 16px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;    
`;

export const Observations = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(13)}px;
    
    margin-top: 2px;
`;

export const Footer = styled.View`
    flex-direction: row;
    justify-content: flex-end;

    margin-top: 19px;
`;

export const IconSelection = styled(Feather)`
    color: ${({theme}) => theme.colors.success};
    font-size: ${RFValue(25)}px;

    margin-left: 20px;
`;

export const IconUnselection = styled(Feather)`
    color: ${({theme}) => theme.colors.attention};
    font-size: ${RFValue(25)}px;
`;
