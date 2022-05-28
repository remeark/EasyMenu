import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import firebase from 'firebase';

import { appFirebase, database } from '../../config/firebase';

import { Button } from '../../components/Form/Button';
import { Header } from '../../components/Header';

import { 
    Container, 
    Body,
    HeaderButtons,
    Title,
    Icon,
    TitleProps,
    MenuList,
    MenuCard,
    TitleMenuCard,
    Observations,
    FooterMenuCard,
    ButtonTitle,
    ButtonDone,
    ButtonUndone
} from './styles';

export function RestaurantDashboard(){
    const [informations, setInformations] = useState([]);
    const [itens, setItens] = useState([]);

    const theme = useTheme();

    const navigation = useNavigation();
    //const route = useRoute();  
    
    function openPayments(){
        navigation.navigate('OpenPayment');
    } 
    
    function products(){
        navigation.navigate('Products');
    } 

    function qrCode(){
        navigation.navigate('QRCodeGenerator');
    } 

    async function doneProduct({id, cardPayment, numPedido, table, value}){

        if(!cardPayment){
            await database.collection("company").doc(appFirebase.auth().currentUser.uid).collection('finalizados').add({
                id: numPedido,
                mesa: table,
                value: +value
            }).then((doc) => {
                addItensFinalized(id, doc.id, numPedido);
    
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        }
        
        await database.collection("company").doc(appFirebase.auth().currentUser.uid).collection('pedidos').doc(id)
        .delete()
        .catch((error) => {
            console.error("Delete document failed ", error);
        });

        getPedidos();
    }

    async function addItensFinalized(id, finalizedId, numPedido){

        await database.collection('company').doc(appFirebase.auth().currentUser.uid).collection('pedidos').doc(id).collection('item')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                
                database.collection("company").doc(appFirebase.auth().currentUser.uid).collection('finalizados').doc(finalizedId).collection('item').add({
                    id: numPedido,
                    item: doc.data().item,
                    quantity: doc.data().quantity
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

    async function cancelProduct({id}){
        await database.collection("company").doc(appFirebase.auth().currentUser.uid).collection('pedidos').doc(id)
        .delete()
        .catch((error) => {
            console.error("Delete document failed ", error);
        });

        getPedidos();
    }

    function getQuantity(id, finalized){
        let count = 0;

        finalized.forEach(element => {
            if(id === element){
                count++;
            }
        }); 

        return count;
    }
    
    async function getPedidos(){
        setInformations([]);
        setItens([]);

        await database.collection('company').doc(appFirebase.auth().currentUser.uid).collection('pedidos')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                setInformations(informations => [...informations, {
                    id: doc.id,
                    numPedido: doc.data().id,
                    table: doc.data().mesa,
                    observations: doc.data().observations,
                    value: doc.data().value,
                    cardPayment: doc.data().cardPayment                    
                }]);

                database.collection('company').doc(appFirebase.auth().currentUser.uid).collection('pedidos').doc(doc.id).collection('item')
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((item) => {
                            setItens(itens => [...itens, {
                                id: doc.id,
                                idPedidoItem: item.data().id,
                                name: item.data().item,
                                quantity: Number(item.data().quantity)
                            }]);
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                });   
            });   
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }

    function refresh(){
        getPedidos();
    }
    
    useFocusEffect(useCallback(() => {
        getPedidos();
    }, []));
      

    return(
        <Container>                 
                <Header isCompany={true}/>

                <HeaderButtons>
                    <Button 
                            title="Pagamentos em Aberto" 
                            onPress={openPayments}
                    />
                    <Button 
                            title="Produtos" 
                            onPress={products}
                    />
                    <Button 
                            title="QR Code" 
                            onPress={qrCode}
                    />
                </HeaderButtons>

                <Body> 
                    <TitleProps>
                        <Title>Pedidos em aberto</Title>
                        <TouchableOpacity onPress={refresh}>
                            <Icon name="refresh-ccw"/>
                        </TouchableOpacity>
                    </TitleProps>


                    <MenuList 
                            data={informations.sort((a, b) => a.numPedido > b.numPedido)}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) =>
                            <MenuCard> 
                                <TitleMenuCard>
                                    Mesa {item.table} - Pedido {item.numPedido}
                                </TitleMenuCard>

                                <Observations>
                                    {   
                                        itens.map((itens) => itens.id === item.id 
                                            ? 
                                            <Observations key={itens.idPedidoItem + itens.name}> 
                                                {itens.name.toUpperCase()} - Qtd: {itens.quantity} {'\n'}
                                            </Observations> 
                                            : 
                                            <Observations key={itens.idPedidoItem + itens.name}/>)
                                    }                                    
                                </Observations>

                                <Observations>Observações: {item.observations.toUpperCase()}</Observations>

                                <FooterMenuCard>
                                    <ButtonDone
                                        onPress={() => doneProduct(item)}
                                    >   
                                        <ButtonTitle>Finalizar</ButtonTitle>
                                    </ButtonDone>

                                    <ButtonUndone
                                        onPress={() => cancelProduct(item)}
                                    >   
                                        <ButtonTitle>Cancelar</ButtonTitle>
                                    </ButtonUndone>    
                                </FooterMenuCard>
                            </MenuCard>
                            }
                    />
                </Body>

        </Container>
    )
};