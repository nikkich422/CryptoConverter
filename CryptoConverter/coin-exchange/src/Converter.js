import React, { useState, useEffect } from 'react'
import { Card, Form, Input, Select } from 'antd';

function Converter() {
    const url = 'https://api.coingecko.com/api/v3/exchange_rates';
    const defaultFirstSelectValue = "Bitcoin";
    const defaultSecondSelectValue = "Ether";

    const [CryptoList, SetcryptoList] = useState([]);
    const [inputValue, setInputValue] = useState("0");
    const [firstSelect, setFirstSelect] = useState(defaultFirstSelectValue);
    const [secondSelect, setSecondSelect] = useState(defaultSecondSelectValue);
    const [result, setResult] = useState("0");

    useEffect(() =>{
         fetchData();
    }, []);

    async function fetchData() {
        const response = await fetch(url);
        const jsonData = await response.json();

        const data = jsonData.rates;
        // const tempArray = [];
        // Object.entries(data).forEach(item =>{
        //     const tempObj = {
        //         value: item[1].name,
        //         label: item[1].name,
        //         rate: item[1].value
        //     }
        //     tempArray.push(tempObj);
        // })

        const tempArray = Object.entries(data).map(item => {
            return{
                value: item[1].name,
                label: item[1].name,
                rate: item[1].value
            }
        })
        SetcryptoList(tempArray);
    }

    useEffect(() =>{
        
        if(CryptoList.length == 0) return;

        const firstSelectRate = CryptoList.find((item) =>{
            return item.value === firstSelect;
        }).rate;
        const secondSelectRate = CryptoList.find((item) =>{
            return item.value === secondSelect;
        }).rate;

        const resultValue = (inputValue * secondSelectRate)/firstSelectRate;
        setResult(resultValue.toFixed(6));

    },[inputValue, firstSelect, secondSelect]);


  return (
    <div className='container'>
        <Card className='crypto-card' title={<h1>Crypto Converter</h1>}>
            <Form>
                 <Form.Item>
                    <Input onChange={(event) => setInputValue(event.target.value)} />
                 </Form.Item>
            </Form>
            <div className='select-box'>
                <Select onChange={(value) => setFirstSelect(value)} style={{width: '200px'}} defaultValue={defaultFirstSelectValue} options={CryptoList}/>
                <Select onChange={(value) => setSecondSelect(value)} style={{width: '200px'}} defaultValue={defaultSecondSelectValue} options={CryptoList}/>
            </div>
            <p>{inputValue} {firstSelect} = {result}</p>
        </Card>
    </div>
  )
}

export default Converter