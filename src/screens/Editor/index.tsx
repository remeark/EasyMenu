import React, { useState, useCallback } from 'react';
import { useTheme } from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { appFirebase } from '../../config/firebase';

import { Button } from '../../components/Form/Button';
import { Header } from '../../components/Header';
import { HeaderRestaurant } from '../../components/HeaderRestaurant';

import { 
    Container, 
    Body,
    Footer,
    Value,
    Title,
    MenuList,
    MenuCard,
    Observations,
    IconUnselection,
    IconSelection,
    FooterMenuCard,
    TitleMenuCard,
    Quantity
} from './styles';
import { Background } from 'victory-core';


export function Editor(){
    const [selectItem, setSelectItem] = useState([]);
    const [valuePedido, setValuePedido] = useState(0);

    const theme = useTheme();

    const navigation = useNavigation();
    
    function gotoitem(){
        navigation.navigate('EditorMenu');
    }

    const cardapio = [
        {
          id: "1",
          text: "Xis Salada",
          observations: "Pão, bife, ovo, queijo, tomate e alface",
          value: 25
        },
        {
          id: "2",
          text: "Xis Frango",
          observations: "Pão, bife, ovo, queijo, tomate e alface",
          value: 25
        },
        {
          id: "3",
          text: "Xis Coração",
          observations: "Pão, bife, ovo, queijo, tomate e alface",
          value: 25
        },
        {
            id: "4",
            text: "Xis Coração",
            observations: "Pão, bife, ovo, queijo, tomate e alface",
            value: 25
        },
        {
            id: "5",
            text: "Xis Coração",
            observations: "Pão, bife, ovo, queijo, tomate e alface",
            value: 25
        },
        {
            id: "6",
            text: "Xis Coração",
            observations: "Pão, bife, ovo, queijo, tomate e alface",
            value: 25
        },
        {
            id: "7",
            text: "Xis Coração",
            observations: "Pão, bife, ovo, queijo, tomate e alface",
            value: 25
        },
        {
            id: "8",
            text: "Xis Coração",
            observations: "Pão, bife, ovo, queijo, tomate e alface",
            value: 25
        },

      ];

    return(
        <Container>                 
                <Header 
                    name='Restaurante'
                />

                <Body>

                <Title>Editar Produtos </Title>
                    
                <MenuList 
                    data={cardapio}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                    <TouchableOpacity onPress={gotoitem}> 
                        <MenuCard style={
                            selectItem.some(index => index === item.id)
                            ? {
                                backgroundColor: theme.colors.success_light,
                                }
                            : {
                                backgroundColor: theme.colors.shape
                                }}> 
                            <TitleMenuCard>
                                {item.text} - {item.value.toLocaleString('pt-BR', { style: 'currency',currency: 'BRL'})}
                            </TitleMenuCard>

                            <Observations>
                                {item.observations}
                            </Observations>
                        </MenuCard>
                    </TouchableOpacity>
                    }
                />               

                </Body>
        </Container>
    )
};