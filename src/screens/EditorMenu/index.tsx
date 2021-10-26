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
} from './styles';

import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';

export function EditorMenu(){    

    //const navigation = useNavigation();

    function qrcode(){
        console.log('qrcode');
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>     
            <Container>  
                <Header 
                    name='Restaurante'
                />
                    <Title> Editar Produtos </Title>

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
                            title="Editar Produto" 
                            onPress={qrcode}
                        />
                    </Form>
            </Container>
        </TouchableWithoutFeedback>        
    )
};