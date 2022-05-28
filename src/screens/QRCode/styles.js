import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background };    
`;

export const Body = styled.View`    
    width: 100%;
    height: 17%; 

    margin-top: 10px;
    padding: 0 24px;

    justify-content: space-between;
    align-content: flex-start;

    padding: 0 24px;

`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;    
    margin-top: 15px;
    margin-left: 20px;
`;

export const Form = styled.View`
    flex: 1;
    justify-content: space-between;
    width: 100%;

    padding: 24px;
`;

export const FormQrCode = styled.View`
    flex: 1;
    margin-top: 15px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const Fields = styled.View``;