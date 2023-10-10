"use client"
import { useState, useEffect } from "react";
import Api from '../../services/Api';
import React from 'react'
import Select from 'react-select'
import { useSession } from 'next-auth/react';

export default function MultiServicesSelect(props) {


  const session = useSession()
  const token = session?.data?.token
  
  const [options, setOptions] = useState([
    { value: '1', label: 'Teste' }
  ])

  useEffect(()=>{
    Api("/services",{token: token.token}).then(res => res.json())
      .then(data =>{
        console.log(data)
        let tempOptions = []
        data.forEach(service => tempOptions.push({value: service.id, label: service.name, price: service.price}));
        setOptions(tempOptions)
    })
  }, [session])

  return (

      <Select 
        
        className="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
        focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:leading-12 text-center text-xl font-lg"
        id="selectoptions"
        onChange={e => props.setServices(e)}
        options={options}
        styles={{control: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: "18px"
        })}}
        isMulti
       />
  );
}