import React, { useState, useEffect, useCallback } from 'react';
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
} from './styles';

export function Editor(){
    const [isLoading, setIsLoading] = useState(true);
    const [usingEffect, setUsingEffect] = useState(true);
    const [cardapio, setCardapio] = useState([]);
    const [valuePedido, setValuePedido] = useState(0);

    const theme = useTheme();

    const navigation = useNavigation();
    
    function editorItem({ id }){
        navigation.navigate('EditorMenu', { idItem: id });
    }

    async function renderMenu(){
        setIsLoading(true);
        setCardapio([]);

        await database.collection('company').doc(appFirebase.auth().currentUser.uid).collection('cardapio')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setCardapio(cardapio => [...cardapio, {
                    id: doc.id,
                    text: doc.data().text,
                    observations: doc.data().observations,
                    value: doc.data().value
                }]);
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

        setIsLoading(false);
    }

    useFocusEffect(useCallback(() => {
        renderMenu();
    }, []));

    return(
        <Container>              
                <Header isCompany={true}/>

                {
                    isLoading ? 
                    <Loading />             
                : 
                <>  

                <Body>

                <Title>Editar Produtos </Title>

                    <MenuList 
                        data={cardapio.sort((a, b) => a.text > b.text)}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => editorItem(item)}> 
                            <MenuCard> 
                                <TitleMenuCard>
                                    {item.text} - {item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}
                                </TitleMenuCard>

                                <Observations>
                                    {item.observations}
                                </Observations>
                            </MenuCard>
                        </TouchableOpacity>
                        }
                    /> 
                </Body>
            </>    
            } 
                
        </Container>
    )
};