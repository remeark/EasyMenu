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
} from './styles';

export function Products(){
    const [isLoading, setIsLoading] = useState(true);
    const [informations, setInformations] = useState([]);
    const [itens, setItens] = useState([]);

    const theme = useTheme();

    const navigation = useNavigation();   
    
    function registerProduct(){
        navigation.navigate('RegisterMenu');
    }

    function editorProduct(){
        navigation.navigate('Editor');
    }

    return(
        <Container>              
                <Header isCompany={true}/>
                <Body>
                    <Button 
                            title="Cadastrar Produtos" 
                            onPress={registerProduct}
                    />
                    <Button 
                            title="Editar Produtos" 
                            onPress={editorProduct}
                    />
                </Body>                
        </Container>
    )
};