"use client"
import { useEffect, useState } from 'react';
import Api from '../../../services/Api';
import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/24/solid"
import { useSession } from 'next-auth/react';


export default function Relatorios(){

    const [transactions, setTransactions] = useState([])
    const session = useSession()
    const token = session.data.token.token

    const aproveTransaction = ({id, status}) => {
        let transaction = transactions.find(transaction => transaction.id == id)
        transaction.status = status
        transaction.provider = transaction.provider?.id
        console.log(token)
        Api("/transactions/" + id, {method: "PUT", body: JSON.stringify(transaction), token: token}).then(res => res?.json()).then(response => {
            console.log(response)
            if(response.status == 200){
                let newTransactions = transactions.filter(t => t.id != id)
                setTransactions(newTransactions)
            }
        })
        
    }

    useEffect(()=> {
        try {
            Api(`/transactions?initial_date=2023-08-08 23:59:00&final_date=2023-08-08 23:59:00&type=both&status=pending`, {
                method: "GET", token:token})
                .then(res => res.json())
                .then(data => {
                    console.log(data.transactions)                    
                    if(data.status == 200){
                        setTransactions(data.transactions)
                    } else if(data.status == 403) {
                        window.alert("Não autorizado")
                    }
                })
                
        } catch(e) {
            console.log(e)
        }  
    }, [])
    

    return(
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-start">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Aprovações</h1>
                </div>
            </header>
            <main>

                <div className="mx-auto lg:max-w-7xl sm:max-w-full sm:px-6 lg:px-8 mt-8">
                    <table className="w-full ">
                        <thead className="">
                            <tr className="bg-gray-300 rounded-lg">
                                <th className="p-3 w-2/12">Data</th>
                                <th className="p-3 w-2/12">Colaborador</th>
                                <th className="p-3 w-2/12">Serviços</th>
                                <th className="p-3 w-2/12">Valor</th>
                                <th className="p-3 w-2/12">Ação</th>
                            </tr>
                        
                        </thead>
                        <tbody>
                            {transactions.map(transaction => {
                                return(
                                    <tr key={transaction.id}>
                                        <td className="p-3 w-2/12 text-center">{new Date(transaction.transactionDate).toLocaleDateString("pt-br")}</td>
                                        <td className="p-3 text-center">{transaction.provider?.name}</td>
                                        <td className="p-3 text-center">

                                            <select defaultValue={'DEFAULT'} className="bg-gray-100 appearance-none w-8/12 text-center focus:outline-none">
                                                     {transaction.service[0] == undefined ?
                                                        <option value="DEFAULT" className="cursor-pointer focus:border-none"> Exibir</option> : 
                                                        <option readOnly value="DEFAULT"> --------</option>} 
                                                    {transaction.service.map(service => {
                                                        if (service.name.length < 1) return false
                                                        return <option key={service.id} value="" className="rounded-none h-full text-center" disabled>{service.name}</option>
                                                    })}
                                                
                                            </select>

                                        </td>
                                        <td className="p-3 text-center">R$ {transaction.type == 'cashInflow' ? parseFloat(transaction.value).toFixed(2,0) : parseFloat(transaction.value).toFixed(2,0) * -1}</td>
                                        <td className="p-3 text-center">
                                            <span className="cursor-pointer " onClick={() => aproveTransaction({id: transaction.id, status: "approved"})} title="Aprovar">
                                                <CheckCircleIcon className="h-6 w-6 text-green-500 inline"/>
                                            </span>
                                            <span className="cursor-pointer" onClick={() => aproveTransaction({id: transaction.id, status: "repproved"})} title="Reprovar">
                                                <XCircleIcon className="h-6 w-6 text-red-500 inline"/>
                                            </span>
                                        </td>
                                    </tr>
                                )
                                    
                            })}

                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}