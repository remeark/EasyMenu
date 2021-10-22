import React from 'react';

import { categories } from '../../utils/categories';

import { 
    Container,
    Title,
    Observations,
    Footer,
    IconSelection,
    IconUnselection
} from './styles';

export function MenuCard({ data, onPress }){

    return (
        
        <Container>
            <Title>
                {data.text} -  {data.value}
            </Title>

            <Observations>
                {data.observations}
            </Observations>

            <Footer>
                <IconUnselection name="x"/>
                <IconSelection name="check"/>                
            </Footer>
        </Container>
    )
};