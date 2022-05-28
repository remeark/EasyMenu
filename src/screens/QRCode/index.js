import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { ToastAndroid } from "react-native";
import QRCode from 'react-native-qrcode-svg';

import { appFirebase, database } from '../../config/firebase';

import { Button } from '../../components/Form/Button';
import { Header } from '../../components/Header';

import { 
    Container, 
    Body,
    Title,
    Form,
    Fields,
    FormQrCode,
} from './styles';
import { Input } from '../../components/Form/Input';

export function QRCodeGenerator(){    
    const [table, setTable] = useState('');
    const [email, setEmail] = useState('');    
    const [generate, setGenerate] = useState(false);

    const [svg, setSvg] = useState('');

    const viewRef = useRef();
    
    function handleQrCode(){      

        if(table != ''){    
            setGenerate(true);
        }        
    }

    const getSvgPath = async () => {
        svg.toDataURL((data) => {
            const shareImageBase64 = {
              title: "QR",
              message: "Ehi, this is my QR code",
              url: `data:image/png;base64,${data}`
            };
            console.log(shareImageBase64.url);
            //Share.open(shareImageBase64);
        });
    }
   
   
    useEffect(() => {
        database.collection('company').doc(appFirebase.auth().currentUser.uid).get().then(doc => {
            setEmail(doc.data().email);
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }, []);

    return(
        <Container>              
                <Header isCompany={true}/>

                    {
                        !generate ?                         
                    <>                     
                        <Title>Gerar QR Code </Title>

                        <Form>
                                <Fields>
                                    <Input
                                        name="mesa"
                                        placeholder="Número da Mesa"
                                        value={table}
                                        onChangeText={(table) => setTable(table)}
                                    />
                                </Fields>  

                                <Button 
                                        title="Gerar QR Code" 
                                        onPress={handleQrCode}                                        
                                />

                            </Form>
                    </>
                    : 
                        <FormQrCode>                        
                            <QRCode
                                value={"email=" + email + "?mesa=" + table}
                                size={300}
                                getRef={(c) => (setSvg(c))}
                            />
                            {/* <Title onPress={getSvgPath}>Salvar</Title> */}
                        </FormQrCode>
                    }
                    

        </Container>
    )
};