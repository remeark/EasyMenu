import React, { useState, useCallback } from 'react';
import { useTheme } from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

import { appFirebase } from '../../config/firebase';

import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { HeaderRestaurant } from '../../components/HeaderRestaurant';

import { 
    Container, 
    Body,
    Value,
    Title,
    TitleData,
    Form,
    Fields,
    Footer,
    MenuList,
    MenuCard
} from './styles';


export function ItensRequest(){
    const [selectItem, setSelectItem] = useState([]);
    const [valuePedido, setValuePedido] = useState(0);

    const [value, setValue] = React.useState('first');

    const theme = useTheme();

    const navigation = useNavigation();
    //const route = useRoute();
    
    function QRCode(){
        navigation.navigate('ChoosePayment');
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
                <Title>Itens do Pedido</Title> 

                <MenuList 
                    data={cardapio}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                    <MenuCard>
                        <TitleData>Quantidade: 1 </TitleData>
                        <TitleData>{item.text} - R$ {item.value}</TitleData>
                    </MenuCard>
                    }
                />              
                
                <Form>
                    <Fields>
                            <TitleData>Observações</TitleData>
                            <Input
                                name="observations"
                                placeholder="Retirar tomate, maionese a parte..."
                                autoCapitalize="none"
                            />    
                    </Fields>
                </Form>
                <Footer>     
                        <Value>Valor do Pedido: {valuePedido.toLocaleString('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL'
                                                    })}
                        </Value>

                        <Button 
                                title="Finalizar Pedido" 
                                onPress={QRCode}
                        />
                    </Footer> 
            </Body>     
        </Container>
    )
};