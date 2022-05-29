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
    const [errorMessage, setErrorMessage] = useState('');

    const [errorRegister, setErrorRegister] = useState(true);

    const navigation = useNavigation();

    function Register(){
        if(!name || !lastName){
            setErrorRegister(true);
            setErrorMessage("Você deve preencher nome e sobrenome.");

            return;
        }
        appFirebase.auth().createUserWithEmailAndPassword(email.trim(), password.trim())
        .then((userCredential) => {
          var user = userCredential.user;

          database.collection("users").doc(user.uid).set({
            name: name,
            lastName: lastName,
            email: email.trim()
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
          
          if(errorCode === "auth/invalid-email"){
              setErrorMessage("O e-mail não está correto.");
          } else {
              setErrorMessage("A senha deve ter pelo menos 6 caracteres.");
          }
        
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

                    </Fields>

                    { errorRegister ?
                        <ErrorRegister>
                            <ErrorRegisterText>{errorMessage}</ErrorRegisterText>
                        </ErrorRegister>
                        :
                        <ErrorRegister />                  
                    }     

                    <Button 
                        title="Registrar" 
                        onPress={Register}
                    />
                </Form>
            </Container>
        </TouchableWithoutFeedback>        
    )
};