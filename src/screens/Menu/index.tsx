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


export function Menu(){
    const [selectItem, setSelectItem] = useState([]);
    const [valuePedido, setValuePedido] = useState(0);

    const theme = useTheme();

    const navigation = useNavigation();
    //const route = useRoute();
    
    function removeValue({ value, id }){
        let quantity = selectItem.filter(quantity => quantity === id).length;

        if((valuePedido - Number(value)) * quantity < 0){
            setValuePedido(0);
        } else {
            setValuePedido(valuePedido - Number(value) * quantity);   
        } 

        setSelectItem(oldState => oldState.filter(
            index => index !== id
        ));
    }

    function addValue({ value, id }){
        setValuePedido(valuePedido + Number(value));
        
        setSelectItem(selectedItem => [...selectedItem, id]);  
    }
    
    function QRCode(){
        navigation.navigate('ItensRequest');
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
      ];

    return(
        <Container>                 
                <Header 
                    name='Marinho'
                />

                <HeaderRestaurant 
                    name="Restaurante"
                    table="Mesa 40"
                />

                <Body>

                <Title>Cardápio </Title>
                    
                <MenuList 
                    data={cardapio}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
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

                        <FooterMenuCard>
                            <TouchableOpacity onPress={() => removeValue(item)}>
                                <IconUnselection name="x"/>
                            </TouchableOpacity>
                            <Quantity> 
                                {selectItem.filter(x => x === item.id).length}
                            </Quantity>
                            <TouchableOpacity onPress={() => addValue(item)}> 
                                <IconSelection name="check"/>      
                            </TouchableOpacity>          
                        </FooterMenuCard>
                    </MenuCard>
                    }
                />               

                </Body>

                <Footer>
                    <Value>Valor do Pedido: {valuePedido.toLocaleString('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                })}
                    </Value>

                    <Button 
                            title="Efetuar Pedido" 
                            onPress={QRCode}
                    />
                </Footer>

        </Container>
    )
};