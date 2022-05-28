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
    height: 18%; 

    margin-top: 10px;
    padding: 0 24px;

    justify-content: space-between;
    align-content: flex-start;

    padding: 0 24px;

`;