import React, { useState, useCallback } from 'react';
import { StripeProvider, CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { useTheme } from 'styled-components';
import { Alert, TouchableOpacity, StyleSheet } from 'react-native';
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
    Footer
} from './styles';

const API_URL = "http://192.168.100.22:3000";

export function CardPayment(){
    const [selectItem, setSelectItem] = useState([]);
    const [email, setEmail] = useState();
    const [cardDetails, setCardDetails] = useState();
    const {confirmPayment, loading} = useConfirmPayment();
    const [value, setValue] = React.useState('first');
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();

    const fetchPaymentIntentClientSecret = async () => {
        const params = {
            amount: route.params.total
        }
        const response = await fetch(`${API_URL}/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const {clientSecret, error} = await response.json();
        return {clientSecret, error};
    }
    
    const handlePayment = async () => {
        if(!cardDetails?.complete || !email){
            Alert.alert("Por favor, insira o e-mail e o número do cartão.");
            return;
        }
        const billingDetails = {
            email: email,
        }

        try {
            const {clientSecret, error} = await fetchPaymentIntentClientSecret();
            
            if(error){
                console.log("Não foi possível realizar o pagamento.");
            } else {
                const { paymentIntent, error } = await confirmPayment(clientSecret, {
                    type: "Card",
                    billingDetails: billingDetails,
                });

                if(error){
                    Alert.alert(`Pagamento não confirmado ${error.message}`);
                } else if(paymentIntent){
                    Alert.alert("Pagamento realizado!");
                    console.log("Pagamento realizado ", paymentIntent);
                }
            }
        } catch (e){
            console.log(e);
        }
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
                                    
                        </Fields>

                        <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                            <RadioButton.Item label="Débito" value="debito"/>
                            <RadioButton.Item label="Crédito" value="credito"/>
                        </RadioButton.Group>

                        <Footer>

                            <Value>Valor do Pedido: {route.params.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </Value>

                            <Button 
                                    title="Efetuar Pagamento" 
                                    onPress={handlePayment}
                                    disabled={loading}
                            />
                        </Footer>
                    </Form>                 
                </Body>    
            </Container>
        </StripeProvider>
    )
};