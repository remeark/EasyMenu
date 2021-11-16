import React, { useState, useCallback } from 'react';
import { useTheme } from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

import { appFirebase } from '../../config/firebase';

import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { HeaderRestaurant } from '../../components/HeaderRestaurant';

import { 
    Container, 
    Body,
    Value,
    Title,
    TitleData,
    Form,
    Fields,
    Footer
} from './styles';


export function CardPayment(){
    const [selectItem, setSelectItem] = useState([]);
    const [valuePedido, setValuePedido] = useState(0);

    const [value, setValue] = React.useState('first');

    const theme = useTheme();

    const navigation = useNavigation();
    const route = useRoute();
    
    function QRCode(){
        navigation.navigate('PedidoApproved');
    }

    return(
        <Container>
                
            <Header isCompany={false}/>

            <HeaderRestaurant 
                name={route.params.restaurantName.toUpperCase()}
                table={`Mesa ${route.params.table}`}
            />

            <Body>                
                <Title>Pagamento</Title>

                <TitleData>Inserir dados do cartão</TitleData>

                <Form>
                    <Fields>
                        <Input
                            name="number"
                            placeholder="Número do cartão"
                            autoCapitalize="none"
                        />
                        
                        <Input 
                            name="name"
                            placeholder="Nome"
                        />

                        <Input 
                            name="expirationDate"
                            placeholder="Data do vencimento"
                        />

                        <Input 
                            name="code"
                            placeholder="Código de segurança"
                        />                  
                                
                    </Fields>

                    <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                        <RadioButton.Item label="Débito" value="debito"/>
                        <RadioButton.Item label="Crédito" value="credito"/>
                    </RadioButton.Group>

                    <Footer>

                        <Value>Valor do Pedido: {valuePedido.toLocaleString('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL'
                                                    })}
                        </Value>

                        <Button 
                                title="Efetuar Pagamento" 
                                onPress={QRCode}
                        />
                    </Footer>
                </Form>                 
            </Body>    
        </Container>
    )
};