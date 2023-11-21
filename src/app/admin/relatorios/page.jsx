"use client"
import { useEffect, useState } from 'react';
import EmployeeSelect from './../../../components/employee/select/index';
import Api from '../../../services/Api';
import { useSession } from 'next-auth/react';

export default function Relatorios(){
    const session = useSession()
    const [dataInicial, setDataInicial] = useState()
    const [dataFinal, setDataFinal] = useState()
    const [transactions, setTransactions] = useState([])
    const [total, setTotal] = useState(0)
    const [entrada, setEntrada] = useState(false)
    const [saida, setSaida] = useState(false)
    const [employee, setEmployee] = useState("")

    function findTransactions(){

        const type = handleType()
        

        if(!dataInicial || !dataFinal){
            var date = new Date()
            var primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split("T")[0]
            var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split("T")[0]   
        }

        try
        {
            Api(`/transactions?initial_date=${dataInicial ? dataInicial : primeiroDia} 00:00:00&final_date=${dataFinal ? dataFinal : ultimoDia} 23:59:59&type=${type}${employee == "" ? "": "&provider=" + employee }`, {
                method: "GET", token: session.data.token.token})
                .then(res => res.json())
                .then(data => {
                    if(data.status == 200){
                        setTransactions(data.transactions)
                    } else if(data.status == 403) {
                        window.alert("Não autorizado")
                    }
                })     
        } 
        catch(e)
        {
            console.log(e)
        }        
        
    }

    const handleType = () => {
        
        if(entrada == true && saida == true){
            return 'both'
        }
        else if(entrada == true && saida == false){
            return 'cashInflow'
        }
        else if(entrada == false && saida == true){
            return 'cashOutflow'
        }

        
    }

    function handleButtonCollor(tipo){
        if(tipo == 'entrada'){
            setEntrada(!entrada)
        }
        else if(tipo == 'saida'){
            setSaida(!saida)
        }
    }
    
    useEffect(()=> {
        let count = 0
        transactions.forEach(t => {
            t.type == 'cashInflow' ? count += t.value : count -= t.value 
        })
        setTotal(count)
    }, [transactions, entrada, saida])

    return(
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Relatórios</h1>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">R$ {total.toFixed(2)}</h1>
                </div>
            </header>
            {/*<main>*/}
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    
                    <div className="w-full flex justify-between sm:flex-col lg:flex-row ">


                        <div className="lg:w-3/12 lg:px-6 sm:w-full">
                            <label htmlFor="valor" className="text-lg font-lg leading-6  text-gray-900">
                                Data Inicial
                            </label>
                            <div className="mt-2">
                                <input
                                id="valor"
                                name="valor"
                                type="date"
                                autoComplete="valor"
                                onChange={e => setDataInicial(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                                            focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:leading-12 text-center text-2xl font-lg"
                                />
                            </div>
                        </div>

                        <div className="lg:w-3/12 lg:px-6 sm:w-full">
                            <label htmlFor="valor" className="text-lg font-lg leading-6  text-gray-900">
                                Data Final
                            </label>
                            <div className="mt-2">
                                <input
                                id="data"
                                name="data"
                                type="date"
                                autoComplete="data"
                                onChange={e => setDataFinal(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                                            focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:leading-12 text-center text-2xl font-lg"
                                />
                            </div>
                        </div>

                        <div className='lg:w-2/12'>
                            <EmployeeSelect setEmployee={setEmployee} />
                        </div>
                        


                        <div className="lg:w-1/3 sm:w-full sm:mt-3 flex justify-around">

                            <div className="lg:w-7/12 sm:w-6/12 flex">

                                <button className={`bg-gray-200 w-5/12 h-12 sm:ml-auto mt-auto mr-3 rounded-lg lg:hover:bg-green-500 lg:hover:text-white text-gray ${entrada && 'bg-green-500 text-white'}`}  
                                        onClick={() => handleButtonCollor('entrada')}><b>Entrada</b></button>

                                <button className={`bg-gray-200 w-5/12 h-12 mr-3 rounded-lg lg:hover:bg-red-500 lg:hover:text-white active: text-gray mt-auto  ${saida && 'bg-red-500 text-white'}`} 
                                        onClick={() => handleButtonCollor('saida')}><b>Saída</b></button>
                            </div>

                            <div className="lg:w-5/12 sm:w-5/12 flex">
                                <button className="bg-gray-800 w-full h-12 rounded-lg text-white mt-auto" onClick={e => findTransactions()}><b>Buscar</b></button>
                            </div>
                        </div>
                        

                    </div>
                    
                </div>

                <div className="mx-auto lg:max-w-7xl sm:max-w-full sm:px-6 lg:px-8 ">
                    <table className="w-full ">
                        <thead className="">
                            <tr className="bg-gray-300 rounded-lg">
                                <th className="p-3 w-2/12">Data</th>
                                <th className="p-3 w-2/12">Colaborador</th>
                                <th className="p-3 w-2/12">Serviços</th>
                                <th className="p-3 w-2/12">Valor</th>
                                <th className="p-3 w-2/12 sm:hidden">Tipo</th>
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
                                                    <option readOnly value="DEFAULT"> --------</option> :
                                                    <option value="DEFAULT" className="cursor-pointer focus:border-none"> Exibir</option>
                                                } 
                                                {transaction.service.map(service => {
                                                    if (service.name.length < 1) return false
                                                    return <option key={service.id} value="" className="rounded-none h-full text-center" disabled>{service.name}</option>
                                                })}
                                            </select>
                                           
                                        </td>
                                        <td className="p-3 text-center">R$ {transaction.type == 'cashInflow' ? parseFloat(transaction.value).toFixed(2,0) : parseFloat(transaction.value).toFixed(2,0) * -1}</td>
                                        <td className="p-3 text-center sm:hidden">{transaction.type == "cashInflow" ? <b className="text-green-500">Entrada</b> : <b className="text-red-500">Saída</b>}</td>
                                    </tr>
                                )
                                    
                            })}

                        </tbody>
                    </table>
                </div>
            {/*</main>*/}
        </div>
    )
}