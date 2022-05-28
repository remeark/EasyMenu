import React, { useState, useEffect } from 'react';
import {Text, StyleSheet} from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { appFirebase, database } from '../../config/firebase';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { Button } from '../../components/Form/Button';
import { Header } from '../../components/Header';

import { 
    Container, 
    Body
} from './styles';

export function ClientDashboard(){   
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false); 
    const [scan, setScan] = useState(false);

    const theme = useTheme();

    const navigation = useNavigation();
    //const route = useRoute();    
    
    function QRCode(){
        navigation.navigate('Menu', { dados: data });
    }        

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        setScan(false);

        const dados = data;
        // A partir do 6 caractere do email e a partir do 6 caractere a mesa
        const email   = dados.substring(6, dados.lastIndexOf("?"));
        const mesa = dados.substring(dados.lastIndexOf("?") + 6);
        
        navigation.navigate('Menu', { restaurant: email, table: mesa });
    };   

    function scanRequest(){

        //navigation.navigate('Menu', { restaurant: 'peninha@gmail.com', table: '4' });

        setScan(true);
        setScanned(false);
    }

    useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <Text>Solicitando permissão da câmera</Text>;
    }
    if (hasPermission === false) {
        return <Text>Sem acesso à câmera, favor atualizar o aplicativo.</Text>;
    }

    return(
        <Container>                 
                <Header isCompany={false}/>

                <Body> 
                    {scan ?
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                            style={StyleSheet.absoluteFillObject}
                        /> :
                        <Button 
                            title="Ler QR Code" 
                            onPress={scanRequest}
                        />
                    }
                </Body>

        </Container>
    )
};