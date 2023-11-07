"use client"
import { useEffect, useState } from 'react';
import Api from '../../../services/Api';
import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/24/solid"
import { useSession } from 'next-auth/react';
import Modal from './../../../components/modal/index'
import { useRouter } from 'next/navigation'


export default function Relatorios(){
    const route = useRouter()
    const [transactions, setTransactions] = useState([])
    const [modal, setModal] = useState("")
    const session = useSession()
    const token = session.data.token.token

    const exibir = (transaction) => {

        let body =<>
            <table className='sm:w-full'>
                <tr><td className='w-1/2'><b>Data:</b></td><td>{new Date(transaction.transactionDate).toLocaleDateString("pt-br")}</td></tr>
                <tr><td><b>Barbeiro:</b></td><td>{transaction?.provider.name}</td></tr>
                <tr><td><b>Serviços:</b></td>
                    <td><select className='bg-gray-800 w-full'>{transaction.service.map(service => <option key={service.id}>{service.name}</option>)}</select></td>
                </tr>
                <tr><td><b>Valor:</b></td><td>R$ {transaction.value}</td></tr>

            </table>
            <div className='flex justify-between mt-2'>
                <button
                    data-modal-hide="defaultModal"
                    type="button"
                    onClick={() => {
                        aproveTransaction({id: transaction.id, status: "approved"})
                        setModal()
                    }}
                    className="w-5/12 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800"
                >
                    Aprovar
                </button>
                <button
                data-modal-hide="defaultModal"
                type="button"
                onClick={() => {
                    aproveTransaction({id: transaction.id, status: "repproved"})
                    setModal()
                }}
                className="w-5/12 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                Reprovar
                </button>
            </div>
            </>

        setModal(<Modal closeModal={() => setModal()} header={"Aprovar lançamento"} body={body} />)

    }

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
                .then(res => {
                    if (res.status == 200) return res.json()
                    return res
                })
                .then(data => {                   
                    if(data.status == 200){
                        setTransactions(data.transactions)
                    } else if(data.status == 403) {
                        setModal(<Modal closeModal={() => route.push('/admin/caixa')} header={"Não Autorizado"} body={"Você não tem permissão para acessar essa página."} />)
                    }
            })
            
        } catch(e) {
            console.log('erro: ')
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
                                <th className="p-3 w-2/12 sm:hidden md:table-cell">Serviços</th>
                                <th className="p-3 w-2/12 sm:hidden md:table-cell">Valor</th>
                                <th className="p-3 w-2/12 sm:table-cell md:hidden">Detalhes</th>
                                <th className="p-3 w-2/12 sm:hidden md:table-cell">Ação</th>
                            </tr>
                        
                        </thead>
                        <tbody>
                            {transactions.map(transaction => {
                                return(
                                    <tr key={transaction.id}>
                                        <td className="p-3 w-2/12 text-center">{new Date(transaction.transactionDate).toLocaleDateString("pt-br")}</td>
                                        <td className="p-3 text-center">{transaction.provider?.name}</td>
                                        <td className="p-3 text-center sm:hidden md:table-cell">

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
                                        <td className="p-3 text-center sm:hidden md:table-cell">R$ {transaction.type == 'cashInflow' ? parseFloat(transaction.value).toFixed(2,0) : parseFloat(transaction.value).toFixed(2,0) * -1}</td>
                                        <td className="p-3 text-center w-2/12 sm:table-cell md:hidden">
                                            <button onClick={() => exibir(transaction)} className='inline-flex items-center justify-center h-8 px-2 font-medium tracking-wide text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-800 focus:shadow-outline focus:outline-none'>
                                                Exibir
                                            </button>
                                        </td>
                                        <td className="p-3 text-center sm:hidden md:table-cell">
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
            {modal}
        </div>
    )
}