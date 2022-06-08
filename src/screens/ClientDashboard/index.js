import React, { useState, useEffect, useCallback } from 'react';
import {Text, StyleSheet, Alert} from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { appFirebase, database } from '../../config/firebase';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';

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

        if(dados === "email=" + email + "?mesa=" + mesa){
            navigation.navigate('Menu', { restaurant: email, table: mesa });
        }
        else{
            Alert.alert("QR Code inválido!");
            setScan(false);
            setScanned(false);
        }
    };   

    function scanRequest(){
        navigation.navigate('Menu', { restaurant: 'easy@gmail.com', table: '5' });

        setScan(true);
        setScanned(false);
    }

    function requestPermission(){
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            })();
    };

    useEffect(() => {
        requestPermission();
    }, []);

    useFocusEffect(useCallback(() => {
        setScan(false);
    }, []));

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
                        <Camera
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