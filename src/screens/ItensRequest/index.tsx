import React, { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import firebase from 'firebase';

import { appFirebase, database } from '../../config/firebase';

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
    const [cardapio, setCardapio] = useState([]);

    const [value, setValue] = React.useState('first');

    const theme = useTheme();

    const navigation = useNavigation();
    const route = useRoute();

    function getItens(){
        setCardapio([]);

        database.collection('company').doc(route.params.idRestaurant).collection('cardapio').where(firebase.firestore.FieldPath.documentId(), 'in', route.params.itens)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setCardapio(cardapio => [...cardapio, {
                    id: doc.id,
                    text: doc.data().text,
                    observations: doc.data().observations,
                    value: doc.data().value,
                    quantity: getQuantity(doc.id)
                }]);
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }

    function getQuantity(id){
        let count = 0;

        route.params.itens.forEach(element => {
            if(id === element){
                count++;
            }
        }); 
        
        return count;
    }
    
    function QRCode(){
        //navigation.navigate('ChoosePayment');
    }

    useEffect(() => {
        getItens();

    }, []);

    return(
        <Container>
                
            <Header 
                name='Marinho'
            />

                <HeaderRestaurant 
                    name={route.params.restaurantName.toUpperCase()}
                    table={`Mesa ${route.params.table}`}
                />


            <Body>                
                <Title>Itens do Pedido</Title> 

                <MenuList 
                    data={cardapio}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                    <MenuCard>
                        <TitleData>{item.text} - R$ {item.value * item.quantity}</TitleData>
                        <TitleData>Quantidade: {item.quantity} </TitleData>
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
                        <Value>Valor do Pedido: {route.params.total.toLocaleString('pt-BR', {
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