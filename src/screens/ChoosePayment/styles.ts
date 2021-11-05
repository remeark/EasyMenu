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

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;

    margin-top: 15px;
    padding: 0 24px;
`;

export const HeaderButtons = styled.View`
    margin-top: 10px;
    padding: 0 24px;
    height: 130px;

    justify-content: space-between;
    align-content: flex-start;
`;

