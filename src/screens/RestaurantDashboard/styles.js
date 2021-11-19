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
    flex: 1;
    width: 100%;
    height: 100%; 

    padding: 0 24px;

`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`;

export const HeaderButtons = styled.View`
    margin-top: 10px;
    padding: 0 24px;
    height: 195px;

    justify-content: space-between;
    align-content: flex-start;
`;

export const TitleProps = styled.View`
    flex-direction: row;
    justify-content: space-between;

    align-items: center;
     
    margin-top: 20px;
    margin-bottom: 10px;
`;

export const Icon = styled(Feather)`
    color: ${({theme}) => theme.colors.text_dark};
    font-size: ${RFValue(22)}px;
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

export const Observations = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(13)}px;
    
    margin-top: 2px;
`;


export const FooterMenuCard = styled.View`
    flex-direction: row;
    justify-content: space-between;

    margin-top: 19px;
`;

export const TitleMenuCard = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;    
`;

export const Quantity = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(18)}px;  
`;

export const ButtonDone = styled(RectButton)`
    width: 45%;
    height: 10px;
    background-color: ${({theme}) => theme.colors.success};

    padding:18px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`;

export const ButtonUndone = styled(RectButton)`
    width: 45%;
    height: 10px;
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
