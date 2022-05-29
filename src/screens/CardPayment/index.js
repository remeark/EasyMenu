import React, { useState, useCallback } from 'react';
import { StripeProvider, CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { useTheme } from 'styled-components';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

import firebase from 'firebase';
import { database } from '../../config/firebase';

import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { HeaderRestaurant } from '../../components/HeaderRestaurant';
import {Loading} from '../../components/Loading';

import { 
    Container, 
    Body,
    Value,
    Title,
    TitleData,
    Form,
    Fields,
    Footer,
    ButtonDone,
    ButtonUndone,
    Buttons,
    ButtonTitle
} from './styles';

const API_URL = "https://us-central1-easymenu-befe0.cloudfunctions.net/api";

export function CardPayment(){
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState();
    const [cardDetails, setCardDetails] = useState();
    const {confirmPayment, loading} = useConfirmPayment();
    const [value, setValue] = React.useState('credit');
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();

    const fetchPaymentIntentClientSecret = async () => {      
        const response = await fetch(`${API_URL}/create-payment-intent/${route.params.total}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const {clientSecret, error} = await response.json();
        return {clientSecret, error};
    }
    
    const handlePayment = async () => {
        setIsLoading(true);

        if(!cardDetails?.complete || !email){
            Alert.alert("Por favor, insira o e-mail e o número do cartão.");
            return;
        }

        const billingDetails = {
            email: email.trim(),
        }

        try {
            const {clientSecret, error} = await fetchPaymentIntentClientSecret();
            
            if(error){
                console.log(error);
                console.log("Não foi possível realizar o pagamento.");
            } else {
                const { paymentIntent, error } = await confirmPayment(clientSecret, {
                    type: "Card",
                    billingDetails: billingDetails,
                });

                if(error){
                    Alert.alert(`Pagamento não confirmado.`);
                } else if(paymentIntent){
                    Alert.alert("Pagamento realizado!");
                    console.log("Pagamento realizado ", paymentIntent);
                    finalize();
                }
            }
        } catch (e){
            console.log(e);
        }

        setIsLoading(false);
    }

    function finalize(){         
        
        let date = new Date();
        let idPedido = date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();

        database.collection("company").doc(route.params.idRestaurant).collection('pedidos').add({
            id: idPedido,
            mesa: route.params.table,
            observations: route.params.observations,
            value: +route.params.total,
            cardPayment: true
        }).then((doc) => {
            addItens(doc.id, idPedido);

            navigation.navigate('PedidoApproved', {
                idPedido: idPedido,
                table: route.params.table,
                restaurantName: route.params.restaurantName
            });

        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });        
    }

    function addItens(id, idPedido){

        database.collection('company').doc(route.params.idRestaurant).collection('cardapio').where(firebase.firestore.FieldPath.documentId(), 'in', route.params.itens)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                
                database.collection("company").doc(route.params.idRestaurant).collection('pedidos').doc(id).collection('item').add({
                    id: idPedido,
                    item: doc.data().text,
                    quantity: getQuantity(doc.id)
                })
                .catch((error) => {
                    console.error("Error adding itens: ", error);
                });

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

    function cancel(){
        navigation.goBack();
    }

    return(
        <StripeProvider publishableKey='pk_test_51L4SddBaAkz8QEc2Woi13XCaeAIcuk99H7YdaD7YCnMZuBv8nvpaC5blw9Vgqbm2TYE1LqVgi5ecJDaZmlE20KfS00iUhIae4W'>
            <Container>
                    
                <Header isCompany={false}/>

                <HeaderRestaurant 
                    name={route.params.restaurantName.toUpperCase()}
                    table={`Mesa ${route.params.table}`}
                />

                <Body>                
                    <Title>Pagamento</Title>

                    <TitleData>Inserir dados</TitleData>

                    <Form>
                        <Fields>
                            <Input 
                                name="email"
                                placeholder="E-mail"
                                value={email}
                                onChangeText={(email) => setEmail(email)}
                            />

                            <CardField 
                                postalCodeEnabled={false}
                                placeholder={{
                                    number: "0000 0000 0000 0000",
                                }}
                                style={{
                                    height: 50,
                                }}
                                onCardChange={cardDetails => {
                                    setCardDetails(cardDetails);
                                }}
                            />

                            <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                                <RadioButton.Item label="Crédito" value="credit"/>
                                {/* <RadioButton.Item label="Débito" value="debit"/>                             */}
                            </RadioButton.Group>
                                    
                        </Fields>

                        <Footer>

                            <Value>Valor do Pedido: {route.params.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </Value>

                            {
                                isLoading ? 
                                <Loading />             
                                : 
                                <>
                                <Buttons> 
                                    <ButtonDone onPress={handlePayment}>
                                        <ButtonTitle>Finalizar</ButtonTitle>
                                    </ButtonDone>
                                    <ButtonUndone onPress={cancel}>
                                        <ButtonTitle>Cancelar</ButtonTitle>
                                    </ButtonUndone>
                                </Buttons>
                                </>
                            }
                        </Footer>
                    </Form>                 
                </Body>    
            </Container>
        </StripeProvider>
    )
};