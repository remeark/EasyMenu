import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

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

export const Buttons = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`;

export const ButtonDone = styled(RectButton)`
    width: 48%;
    background-color: ${({theme}) => theme.colors.success};

    padding:18px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`;

export const ButtonUndone = styled(RectButton)`
    width: 48%;
    background-color: ${({theme}) => theme.colors.attention};

    padding:18px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`;

export const ButtonTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;

    color: ${({theme}) => theme.colors.shape};
`;  




