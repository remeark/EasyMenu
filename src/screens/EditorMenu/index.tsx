import React, { 
    useState, 
    useEffect 
} from 'react';
import { 
    Keyboard, 
    TouchableWithoutFeedback,
} from 'react-native';

import { appFirebase, database } from '../../config/firebase';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '../../components/Form/Button';

import { 
    Container,
    Title,
    Form,
    Fields,
    DeleteText
} from './styles';

import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';

export function EditorMenu(){    
    const [productName, setProductName] = useState('');
    const [productValue, setProductValue] = useState(0);
    const [productIngredients, setProductIngredients] = useState('');

    const navigation = useNavigation();
    const route = useRoute();

    function updateProduct(){
        database.collection('company').doc('WEQ4d13uTKUKjoHLcoI20wXZsla2').collection('cardapio').doc(route.params.idItem).update({
            text: productName,
            observations: productIngredients,
            value: +productValue
        })
        .then(() => {
            console.log("Document successfully updated!");
            navigation.navigate('Editor');
        }).catch((error) =>{
            console.log("Document error");
        });
    }

    function deleteItem(){
        database.collection('company').doc('WEQ4d13uTKUKjoHLcoI20wXZsla2').collection('cardapio').doc(route.params.idItem).delete().then(() => {
            console.log("Document successfully deleted!");
            navigation.navigate('Editor');
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    useEffect(() => {
        database.collection('company').doc('WEQ4d13uTKUKjoHLcoI20wXZsla2').collection('cardapio').doc(route.params.idItem)
        .get()
        .then((doc) => {
                setProductName(doc.data().text);
                setProductIngredients(doc.data().observations);
                setProductValue(doc.data().value.toString());
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>     
            <Container>  
            <Header isCompany={true}/>

                    <Title> Editar Produtos </Title>

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
                                value={productValue}
                                onChangeText={(productValue) => setProductValue(productValue)}
                            /> 

                            <Input
                                name="ingredientes"
                                placeholder="Ingredientes"
                                value={productIngredients}
                                onChangeText={(productIngredients) => setProductIngredients(productIngredients)}
                            />   

                            <DeleteText 
                                onPress={deleteItem}> 
                                Excluir Item
                            </DeleteText>       
                                    
                        </Fields>                        

                        <Button 
                            title="Editar Produto" 
                            onPress={updateProduct}
                        />
                    </Form>
            </Container>
        </TouchableWithoutFeedback>        
    )
};