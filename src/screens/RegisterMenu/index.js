import React, { useState } from 'react';
import { 
    Keyboard, 
    TouchableWithoutFeedback,
} from 'react-native';

import { appFirebase, database } from '../../config/firebase';
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
    const [productName, setProductName] = useState('');
    const [productValue, setProductValue] = useState('');
    const [productIngredients, setProductIngredients] = useState('');

    const [exists, setExists] = useState(false);

    const navigation = useNavigation();

    function registerProduct(){
        
        database.collection("company").doc(appFirebase.auth().currentUser.uid).collection('cardapio').add({
            text: productName,
            observations: productIngredients,
            value: +productValue
        }).then(() => {
            navigation.navigate('RestaurantDashboard');
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });        
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>     
            <Container>  
                <Header isCompany={true}/>

                    <Title> Cadastrar Produtos </Title>

                    <Form>
                        <Fields>
                            <Input
                                name="nomeProduto"
                                placeholder="Nome do produto"
                                value={productName}
                                onChangeText={(productName) => setProductName(productName)}
                            />
                            
                            <Input
                                name="valor"
                                placeholder="Valor do produto"
                                keyboardType = 'numeric'
                                value={productValue.toString()}
                                onChangeText={(productValue) => setProductValue(productValue)}
                            /> 

                            <Input
                                name="ingredientes"
                                placeholder="Ingredientes"
                                value={productIngredients}
                                onChangeText={(productIngredients) => setProductIngredients(productIngredients)}
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