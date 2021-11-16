import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

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
    
    function registerProduct(){
        navigation.navigate('RegisterMenu');
    }

    function editorProduct(){
        navigation.navigate('Editor');
    }

    function doneProduct(){
        console.log('done');
    }

    function cancelProduct(){
        console.log('cancel');
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
                }]);

                database.collection('company').doc(appFirebase.auth().currentUser.uid).collection('pedidos').doc(doc.id).collection('item')
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((item) => {
                            setItens(itens => [...itens, {
                                id: doc.id,
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
                            title="Cadastrar Produtos" 
                            onPress={registerProduct}
                    />
                    <Button 
                            title="Editar Produtos" 
                            onPress={editorProduct}
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
                                        itens.map(itens => itens.id === item.id ? <Observations key={item.name}> {itens.name.toUpperCase()} - Qtd: {itens.quantity} {'\n'}</Observations> : <Observations/>)
                                    }                                    
                                </Observations>

                                <Observations>Observações: {item.observations.toUpperCase()}</Observations>

                                <FooterMenuCard>
                                    <ButtonDone
                                        onPress={doneProduct}
                                    >   
                                        <ButtonTitle>Finalizar</ButtonTitle>
                                    </ButtonDone>

                                    <ButtonUndone
                                        onPress={cancelProduct}
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