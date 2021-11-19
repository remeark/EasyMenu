import React, { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { appFirebase, database } from '../../config/firebase';

import { Button } from '../../components/Form/Button';
import { Loading } from '../../components/Loading';
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
    const [isLoading, setIsLoading] = useState(false);
    const [selectItem, setSelectItem] = useState([]);
    const [valuePedido, setValuePedido] = useState(0);
    const [restaurantName, setRestaurantName] = useState('');
    const [idRestaurant, setIdRestaurant] = useState('');
    const [cardapio, setCardapio] = useState([]);
    
    const theme = useTheme();

    const navigation = useNavigation();
    const route = useRoute();

    async function getRestaurant(){
        setIsLoading(true);

        await database.collection('company').where("email", "==", route.params.restaurant)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setRestaurantName(doc.data().name);

                // get RestaurantMenu();
                setCardapio([]);
                database.collection('company').doc(doc.id).collection('cardapio')
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            setCardapio(cardapio => [...cardapio, {
                                id: doc.id,
                                text: doc.data().text,
                                observations: doc.data().observations,
                                value: Number(doc.data().value)
                            }]);
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                });

                setIdRestaurant(doc.id);
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

        setIsLoading(false);
    }

    function addValue({ value, id }){
        setValuePedido(valuePedido + Number(value));
        
        setSelectItem(selectedItem => [...selectedItem, id]);  
    }
    
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
    
    function itensSelected(){
        if(selectItem.length > 0){
            navigation.navigate('ItensRequest', {   
                itens: selectItem, 
                total: valuePedido, 
                restaurantName: restaurantName, 
                table: route.params.table,
                idRestaurant: idRestaurant
            });
        }
        else {
            Alert.alert("Nenhum produto selecionado");
        }        
    }

    useEffect(() => {
        getRestaurant();
    }, []);

    return(
        <Container>                 
                <Header isCompany={false}/>

                {
                    isLoading ? 
                    <Loading />             
                : 
                <>

                <HeaderRestaurant 
                    name={restaurantName.toUpperCase()}
                    table={`Mesa ${route.params.table}`}
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
                            onPress={itensSelected}
                    />
                </Footer>
            </>
            }                                
        </Container>
    )
};