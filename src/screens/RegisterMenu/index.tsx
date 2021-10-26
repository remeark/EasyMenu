import React, { useState } from 'react';
import { 
    Keyboard, 
    TouchableWithoutFeedback,
} from 'react-native';

import { appFirebase } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Form/Button';

import { 
    Container,
    Title,
    Form,
    Fields,
    ErrorRegister,
    ErrorRegisterText
} from './styles';
import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';

export function RegisterMenu(){    

    const navigation = useNavigation();

    function registerProduct(){
        navigation.navigate('RestaurantDashboard');
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>     
            <Container>  
                <Header 
                    name='Restaurante'
                />
                    <Title> Cadastrar Produtos </Title>

                    <Form>
                        <Fields>
                            <Input
                                name="nomeProduto"
                                placeholder="Nome do produto"
                            />
                            
                            <Input
                                name="valor"
                                placeholder="Valor do produto"
                            /> 

                            <Input
                                name="ingredientes"
                                placeholder="Ingredientes"
                            />           
                                    
                        </Fields>

                        <Button 
                            title="Cadastrar Produto" 
                            onPress={registerProduct}
                        />
                    </Form>
            </Container>
        </TouchableWithoutFeedback>        
    )
};