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
    Header,
    Title,
    Form,
    Fields,
    ErrorRegister,
    ErrorRegisterText
} from './styles';
import { Input } from '../../components/Form/Input';

export function UserRegister(){   
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    const [errorRegister, setErrorRegister] = useState(false);

    const navigation = useNavigation();

    function Register(){
        appFirebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;

          database.collection("users").doc(user.uid).set({
            name: name,
            lastName: lastName,
            email: email
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });

          setErrorRegister(false);
          navigation.navigate("SignIn", { isCompany: false });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
          console.log(errorMessage);
          setErrorRegister(true);
        });      
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>     
            <Container>  
                
                <Header>
                    <Title>Cadastro Cliente</Title>
                </Header>
                
                <Form>
                    <Fields>
                        <Input
                            name="name"
                            placeholder="Nome"
                            autoCapitalize="none"
                            value={name}
                            onChangeText={(name) => setName(name)}
                        />

                        <Input
                            name="lastName"
                            placeholder="Sobrenome"
                            autoCapitalize="none"
                            value={lastName}
                            onChangeText={(lastName) => setLastName(lastName)}
                        />

                        <Input
                            name="email"
                            placeholder="E-mail"
                            autoCapitalize="none"
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

                        { errorRegister === true ?
                        <ErrorRegister>
                            <ErrorRegisterText>Erro ao registrar-se.</ErrorRegisterText>
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
    )
};