import React, { useState } from 'react';
import { 
    Keyboard, 
    TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { appFirebase, database } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Form/Button';

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    ErrorRegister,
    ErrorRegisterText
} from './styles';
import { Input } from '../../components/Form/Input';

export function Register(){    
    const [name, setName] = useState('');
    const [CNPJ, setCNPJ] = useState('');
    const [address, setAddress] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorRegister, setErrorRegister] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigation = useNavigation();

    function Register(){
        if(!name || !CNPJ || !cellphone || !telephone){
            setErrorRegister(true);
            setErrorMessage("Você deve preencher todos os campos.");

            return;
        }

        appFirebase.auth().createUserWithEmailAndPassword(email.trim(), password.trim())
        .then((userCredential) => {
            var user = userCredential.user;

            database.collection('company').doc(user.uid).set({
              name: name,
              cnpj: CNPJ.trim(),
              address: address,
              cellphone: cellphone,
              telephone: telephone,
              email: email.trim()
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });            
  
            setErrorRegister(false);
            navigation.navigate("SignIn", { isCompany: true });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          if(errorCode === "auth/invalid-email"){
            setErrorMessage("O e-mail não está correto.");
          } else {
            setErrorMessage("A senha deve ter pelo menos 6 caracteres.");
          }

          setErrorRegister(true);
        });      
    }

    return (
        <KeyboardAwareScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>     
                <Container>  
                    
                    <Header>
                        <Title>Cadastro Empresa</Title>
                    </Header>
                    
                    <Form>
                        <Fields>
                            <Input
                                name="Nome"
                                placeholder="Nome"
                                autoCapitalize="none"
                                value={name}
                                onChangeText={(name) => setName(name)}
                            />
                            
                            <Input 
                                name="cpnj"
                                placeholder="CNPJ"
                                value={CNPJ}
                                onChangeText={(cnpj) => setCNPJ(cnpj)}
                            />

                            <Input 
                                name="endereco"
                                placeholder="Endereço"
                                value={address}
                                onChangeText={(address) => setAddress(address)}
                            />

                            <Input 
                                name="fixo"
                                placeholder="Telefone Fixo"
                                value={telephone}
                                onChangeText={(telephone) => setTelephone(telephone)}
                            />

                            <Input 
                                name="celular"
                                placeholder="Celular"
                                value={cellphone}
                                onChangeText={(cellphone) => setCellphone(cellphone)}
                            />
                            
                            <Input 
                                name="email"
                                placeholder="E-mail"
                                value={email}
                                onChangeText={(email) => setEmail(email)}
                            />

                            <Input 
                                name="password"
                                placeholder="Senha"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={(password) => setPassword(password)}
                            />              

                            { errorRegister ?
                            <ErrorRegister>
                                <ErrorRegisterText>{errorMessage}</ErrorRegisterText>
                            </ErrorRegister>
                            :
                            <ErrorRegister />                  
                            }               
                                    
                        </Fields>

                        <Button 
                            title="Registrar" 
                            onPress={Register}
                        />
                    </Form>
                </Container>
            </TouchableWithoutFeedback>  
        </KeyboardAwareScrollView>      
    )
};