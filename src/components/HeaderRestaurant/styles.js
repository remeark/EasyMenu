import styled from 'styled-components/native';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    width: 100%;
    height: 10%;    

    justify-content: center;
    align-items: center;  
    
    background-color: ${({ theme }) => theme.colors.secondary_light };
    
`;

export const RestaurantTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold };
    color: ${({ theme }) => theme.colors.text_dark };

    font-size: ${RFValue(20)}px;
`;

export const RestaurantTable = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium };
    color: ${({ theme }) => theme.colors.text_dark };
    font-size: ${RFValue(15)}px;
`;