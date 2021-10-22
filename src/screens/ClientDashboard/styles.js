import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background };
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(15)}px;

    background-color: ${({theme}) => theme.colors.secondary};

    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
    padding-top: 45px;
`;

export const UserWrapper = styled.View`
    width: 100%;
    padding: 10px 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const User = styled.View`
    margin-left: 17px;
    flex-direction: row;
`;

export const UserGreeting = styled.Text`
    color: ${({theme}) => theme.colors.shape};

    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular};
`;

export const UserName = styled.Text`
    color: ${({theme}) => theme.colors.shape};

    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.bold};
`;

export const LogoutButton = styled(BorderlessButton)`
`;

export const Icon = styled(Feather)`
    color: ${({theme}) => theme.colors.text_dark};
    font-size: ${RFValue(24)}px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;

    margin-bottom: 16px;    
`;

export const Body = styled.View`
    width: 100%;
    padding-top: ${RFValue(50)}px;

`;
