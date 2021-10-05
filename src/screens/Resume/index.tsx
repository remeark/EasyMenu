import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HistoryCard } from '../../components/HistoryCard';

import { 
    Container,
    Header,
    Title
} from './styles';

import { categories } from '../../utils/categories';

interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

export function Resume(){

    async function loadData(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted
            .filter((expensive : TransactionData) => expensive.type === 'negative');

        const totalByCategory = [];

        categories.forEach(category => {
            let categorySum = 0;

            expensives.forEach((expensive : TransactionData) => {
                if(expensive.category === category.key){
                    categorySum += Number(expensive.amount);
                }
            });
        })
    }

    useEffect(() => {
        loadData();
    }, []);

    return(
        <Container>
            <Header>
                <Title>Resumo por Categoria</Title>
            </Header>

            <HistoryCard 
            title="Compras"
            amount="150,00"
            color="red"
            />

        </Container>
    )
};