import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import { appFirebase, database } from '../../config/firebase';

import { Button } from '../../components/Form/Button';
import { Header } from '../../components/Header';
import { HeaderRestaurant } from '../../components/HeaderRestaurant';
import { Loading } from '../../components/Loading';

import { 
    Container, 
    Body,
    Title,
    MenuList,
    MenuCard,
    Observations,
    TitleMenuCard,
    FooterMenuCard,
    ButtonTitle,
    ButtonDone,
    ButtonUndone,
    TitleProps,
    Icon
} from './styles';

export function OpenPayment(){
    const [isLoading, setIsLoading] = useState(true);
    const [informations, setInformations] = useState([]);
    const [itens, setItens] = useState([]);

    const theme = useTheme();

    const navigation = useNavigation();
    
    function editorItem({ id }){
        //navigation.navigate('EditorMenu', { idItem: id });
    }

    async function renderOpenPayment(){
        setIsLoading(true);
        setInformations([]);
        setItens([]);

        await database.collection('company').doc(appFirebase.auth().currentUser.uid).collection('finalizados')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                setInformations(informations => [...informations, {
                    id: doc.id,
                    idPedido: doc.data().id,
                    table: doc.data().mesa,
                    value: doc.data().value                   
                }]);

                database.collection('company').doc(appFirebase.auth().currentUser.uid).collection('finalizados').doc(doc.id).collection('item')
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

        setIsLoading(false);
    }

    async function doneProduct({id}){
        
        await database.collection("company").doc(appFirebase.auth().currentUser.uid).collection('finalizados').doc(id)
        .delete()
        .catch((error) => {
            console.error("Delete document failed ", error);
        });

        renderOpenPayment();
    }

    function refresh(){
        renderOpenPayment();
    }

    useEffect(() => {
        renderOpenPayment();
    }, []);

    return(
        <Container>              
                <Header isCompany={true}/>

                {
                    isLoading ? 
                    <Loading />             
                : 
                <>  

                <Body>

                    <TitleProps>
                        <Title>Pagamentos em aberto</Title>
                        <TouchableOpacity onPress={refresh}>
                            <Icon name="refresh-ccw"/>
                        </TouchableOpacity>
                    </TitleProps>

                    <MenuList 
                        data={informations.sort((a, b) => a.idPedido > b.idPedido)}
                        keyExtractor={item => item.idPedido}
                        renderItem={({ item }) =>
                        <MenuCard> 
                            <TitleMenuCard>
                                Mesa {item.table} - Pedido {item.idPedido}
                            </TitleMenuCard>

                            <Observations>
                                {   
                                    itens.map(itens => itens.id === item.id 
                                        ? 
                                        <Observations key={itens.idPedidoItem + itens.name}> 
                                            {itens.name.toUpperCase()} - Qtd: {itens.quantity} {'\n'}
                                        </Observations> 
                                        : 
                                        <Observations key={itens.idPedidoItem + itens.name}/>)
                                }                                    
                            </Observations>

                            <Observations>Valor do Pedido: {item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}</Observations>

                            <FooterMenuCard>
                                <ButtonDone
                                    onPress={() => doneProduct(item)}
                                >   
                                    <ButtonTitle>Finalizar</ButtonTitle>
                                </ButtonDone> 
                            </FooterMenuCard>
                        </MenuCard>
                        }
                    /> 
                </Body>
            </>    
            } 
                
        </Container>
    )
};