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

    align-items: center;
    justify-content: center;

`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;

    margin-bottom: 10px;
    
    margin-top: 5px;
`;




