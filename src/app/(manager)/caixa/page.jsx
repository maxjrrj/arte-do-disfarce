"use client"
import MultiServicesSelect from '../../../components/services/index';
import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import EmployeeSelect from '@/components/employee/select';
import Api from './../../../services/Api';



export default function Caixa(){
    const [valor, setValor] = useState()
    const [data, setData] = useState(new Date().toISOString().split("T")[0])
    const [categoria, setCategoria] = useState("service")
    const [descricao, setDescricao] = useState()
    const [cliente, setCliente] = useState()
    const [services, setServices] = useState()
    const [employee, setEmployee] = useState("")

    function handleSubmit(event, type){
        event.preventDefault()
        let servicos = services.map(s => s.value)
        console.log(servicos)
        Api("/transactions", {
            body: JSON.stringify({ 
                createdBy: "Max",
                transactionDate: data,
                value: valor,
                type: type,
                category: categoria,
                description: descricao,
                client: cliente,
                provider: employee,
                services: servicos}),
            method: "POST"
        }).then(res => {
            
            console.log(res)
            window.alert("produto criado")
            document.querySelectorAll("input").forEach(i => i.value = "")
            document.getElementById("employees").value = ""
            } 
        )
        
    }
    return(
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Caixa</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <form id="form" className="space-y-6"  >

                    <div className="w-full flex">
                        <div className="w-1/2 flex justify-around">
                            <button className="bg-green-500 w-8/12 h-12 rounded-lg text-white" onClick={e => handleSubmit(e, "cashInflow")}><b>Entrada</b></button>
                        </div>

                        <div className="w-1/2 flex justify-around">
                            <button className="bg-red-500 w-8/12 h-12 rounded-lg text-white" onClick={e => handleSubmit(e, "cashOutflow")}><b>Saída</b></button>
                        </div>
                    </div>

                    <div className="w-full flex justify-between sm:flex-col lg:flex-row">
                        <div className="lg:w-3/12 sm:w-full">
                            <label htmlFor="valor" className="text-lg font-lg leading-6  text-gray-900">
                                Valor
                            </label>
                            <div className="mt-2">
                                <input
                                id="valor"
                                name="valor"
                                type="number"
                                autoComplete="valor"
                                onChange={e => setValor(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                                            focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:leading-12 text-center text-2xl font-lg"
                                />
                            </div>
                        </div>

                        <div className="lg:w-3/12 sm:w-full">
                            <label htmlFor="valor" className="text-lg font-lg leading-6  text-gray-900">
                                Data
                            </label>
                            <div className="mt-2">
                                <input
                                id="data"
                                name="data"
                                type="date"
                                autoComplete="data"
                                value={data}
                                onChange={e => setData(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                                            focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:leading-12 text-center text-2xl font-lg"
                                />
                            </div>
                        </div>

                        <div className="lg:w-3/12 sm:w-full">
                            <label htmlFor="valor" className="text-lg font-lg leading-6  text-gray-900">
                                Categoria
                            </label>
                            <div className="mt-2">
                                <select name="categoria" id="categoria" onChange={e => setCategoria(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                                              focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:leading-12 text-center text-2xl font-lg">
                                    <option disabled></option>
                                    <option value="servico">Serviço</option>
                                    <option value="produto">Produto</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex justify-between sm:flex-col lg:flex-row">
                        <div className="lg:w-3/12 sm:w-full">
                            <label htmlFor="valor" className="text-lg font-lg leading-6  text-gray-900">
                                Descrição
                            </label>
                            <div className="mt-2">
                                <input
                                id="descricao"
                                name="descricao"
                                type="text"
                                autoComplete="descricao"
                                onChange={e => setDescricao(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                                            focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:leading-12 text-center text-2xl font-lg"
                                />
                            </div>
                        </div>

                        <div className="lg:w-3/12 sm:w-full">
                            <label htmlFor="valor" className="text-lg font-lg leading-6  text-gray-900">
                                Cliente
                            </label>
                            <div className="mt-2">
                                <input
                                id="cliente"
                                name="cliente"
                                type="select"
                                autoComplete="cliente"
                                onChange={e => setCliente(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                                            focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:leading-12 text-center text-2xl font-lg"
                                />
                            </div>
                        </div>

                        <div className="lg:w-3/12 sm:w-full">
                            <EmployeeSelect setEmployee={setEmployee} />
                        </div>       
                    </div>

                    <div className="lg:w-3/12 sm:w-full justify-between">
                        <label htmlFor="valor" className="text-lg font-lg leading-6  text-gray-900">
                            Serviço
                        </label>
                        <div className="mt-2">
                            <MultiServicesSelect setServices={setServices} />
                        </div>
                    </div>
                </form>
                </div>
            </main>
        </div>
    )
}