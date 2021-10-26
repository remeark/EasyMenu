import React, { useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { appFirebase } from '../../config/firebase';

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
                <Header 
                    name='Restaurante'
                />

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
                        <Icon name="refresh-ccw"/>
                    </TitleProps>


                    <MenuList 
                            data={cardapio}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) =>
                            <MenuCard> 
                                <TitleMenuCard>
                                    Mesa 45 - Pedido 2032
                                </TitleMenuCard>

                                <Observations>
                                    1 - {item.text} - sem tomate {'\n'}
                                    2 - {item.text} - sem ervilha {'\n'}
                                    3 - {item.text} - sem salada {'\n'}
                                </Observations>

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