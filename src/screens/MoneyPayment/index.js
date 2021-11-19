import React, { useState, useCallback } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import firebase from 'firebase';

import { appFirebase, database } from '../../config/firebase';

import { Button } from '../../components/Form/Button';
import { Header } from '../../components/Header';
import { HeaderRestaurant } from '../../components/HeaderRestaurant';

import { 
    Container, 
    Body,
    Title,
    ButtonDone,
    ButtonUndone,
    Buttons,
    ButtonTitle
} from './styles';

export function MoneyPayment(){

    const theme = useTheme();

    const navigation = useNavigation();
    const route = useRoute();

    function finalize(){         
        
        let date = new Date();
        let idPedido = date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();

        database.collection("company").doc(route.params.idRestaurant).collection('pedidos').add({
            id: idPedido,
            mesa: route.params.table,
            observations: route.params.observations,
            value: +route.params.total,
            cardPayment: false
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
        navigation.navigate('ClientDashboard');
    }

    // useFocusEffect(useCallback(() => {
    //     const user = appFirebase.auth().currentUser;

    //     if (user) {
    //         console.log("logado");
    //     } else {
    //         console.log("na ologado");
    //     }
    // }, []));

    return(
        <Container>                 
                <Header isCompany={false}/>

                <HeaderRestaurant 
                    name={route.params.restaurantName.toUpperCase()}
                    table={`Mesa ${route.params.table}`}
                />

                <Body> 
                    <Title>Finalizar Pedido</Title>
                    <Title>Valor Total: {route.params.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Title>
                    <Buttons> 
                        <ButtonDone onPress={finalize}>
                            <ButtonTitle>Finalizar</ButtonTitle>
                        </ButtonDone>
                        <ButtonUndone onPress={cancel}>
                            <ButtonTitle>Cancelar</ButtonTitle>
                        </ButtonUndone>
                    </Buttons>
                </Body>

        </Container>
    )
};