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
    const [productValue, setProductValue] = useState(0);
    const [productIngredients, setProductIngredients] = useState('');

    const [exists, setExists] = useState(false);

    const navigation = useNavigation();

    function registerProduct(){

        database.collection('company').doc('WEQ4d13uTKUKjoHLcoI20wXZsla2')
            .get().then(
            doc => {
            if (doc.exists) {
                database.collection('users').doc('WEQ4d13uTKUKjoHLcoI20wXZsla2').collection('cardapio').get().
                then(sub => {
                    if (sub.docs.length > 0) {
                        setExists(true);
                        console.log("true");
                    }
                });
            }
        });

        if(exists){
            database.collection("company").doc('WEQ4d13uTKUKjoHLcoI20wXZsla2').collection('cardapio').add({
                text: productName,
                observations: productIngredients,
                value: +productValue
            }).then(() => {
                navigation.navigate('RestaurantDashboard');
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        } else {
            database.collection("company").doc('WEQ4d13uTKUKjoHLcoI20wXZsla2').collection('cardapio').doc().set({
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
                                value={productName}
                                onChangeText={(productName) => setProductName(productName)}
                            />
                            
                            <Input
                                name="valor"
                                placeholder="Valor do produto"
                                value={productValue}
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