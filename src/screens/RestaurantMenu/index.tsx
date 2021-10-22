import React, { useState, useCallback } from 'react';
import { useTheme } from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { appFirebase } from '../../config/firebase';

import { Button } from '../../components/Form/Button';
import { Header } from '../../components/Header';
import { HeaderRestaurant } from '../../components/HeaderRestaurant';
import { MenuCard } from '../../components/MenuCard';

import { 
    Container, 
    Body,
    Footer,
    Value,
    Title,
    MenuList
} from './styles';


export function RestaurantMenu(){
    const [selectItem, setSelectItem] = useState('');

    const theme = useTheme();

    function verifyItem(){      
        console.log("opa " + selectItem);
    }

    //const navigation = useNavigation();
    //const route = useRoute();    
    
    function QRCode(){
        console.log('qrcode');
    }

    // useFocusEffect(useCallback(() => {
    //     const user = appFirebase.auth().currentUser;

    //     if (user) {
    //         console.log("logado");
    //     } else {
    //         console.log("na ologado");
    //     }
    // }, []));

    const cardapio = [
        {
          id: "1",
          text: "Xis Salada",
          observations: "Pão, bife, ovo, queijo, tomate e alface",
          value: "25"
        },
        {
          id: "2",
          text: "Xis Frango",
          observations: "Pão, bife, ovo, queijo, tomate e alface",
          value: "25"
        },
        {
          id: "3",
          text: "Xis Coração",
          observations: "Pão, bife, ovo, queijo, tomate e alface",
          value: "25"
        },
        {
            id: "4",
            text: "Xis Coração",
            observations: "Pão, bife, ovo, queijo, tomate e alface",
            value: "25"
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
                    <Title>Cardápio</Title>

                    
                        <MenuList 
                            data={cardapio}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => 
                            <TouchableOpacity onPress={verifyItem}>
                                <MenuCard 
                                    data={item}
                                />
                            </TouchableOpacity>
                            }
                        />
                    
                    
                </Body>

                <Footer>
                    <Value>Valor do Pedido: R$ 25,00</Value>

                    <Button 
                            title="Efetuar Pedido" 
                            onPress={QRCode}
                    />
                </Footer>

        </Container>
    )
};