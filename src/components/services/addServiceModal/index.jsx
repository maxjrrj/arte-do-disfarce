"use client"
import {useSession} from 'next-auth/react'
import Api from "../../../services/Api";
import { useEffect, useState } from "react";

const AddServiceModal = (props) => {
    const session = useSession()
    const token = session.data.token.token
    const [serviceName, setServiceName] = useState()
    const [servicePrice, setServicePrice] = useState()
    const [serviceDuration, setServiceDuration] = useState()

    const addService = () => {
        Api("/services", {method: "POST", body: JSON.stringify({name: serviceName, price: servicePrice, duration: serviceDuration }), token: token }).then(service => {
            console.log(service)
            props.close()
        })  
    }

    return (
        
        <div style={{backgroundColor: "#00000085"}} className="h-full  w-full top-0 left-0 absolute ml-auto flex flex-col justify-center items-center">

            <div className="bg-gray-800 rounded-t-lg border-b-0 text-white text-center
                            sm:h-2/10  sm:w-10/12 sm:text-xl p-1
                            lg:w-2/3 lg:h-12">
                Editar Serviço
            </div>

            <div className="bg-white pt-6
                            sm:h-1/3 sm:w-10/12  sm:flex-col sm:p-2 sm:rounded-b-lg sm:min-h-330 lg:min-h-100
                            lg:h-48 lg:w-2/3 lg:flex lg:justify-between">

                <div className="lg:flex lg:flex-row lg:justify-around">
                    <div className="lg:w-3/12 sm:w-full">
                        <label htmlFor="valor" className="text-lg leading-6  text-gray-900">
                            Nome
                        </label>
                        <div className="mt-2">
                            <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            onChange={e => setServiceName(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                                        focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:leading-12 text-center text-2xl font-lg"
                            />
                        </div>
                    </div>
                    <div className="lg:w-3/12 sm:w-full">
                        <label htmlFor="valor" className="text-lg font-lg leading-6  text-gray-900">
                            Preço
                        </label>
                        <div className="mt-2">
                            <input
                            id="price"
                            name="price"
                            type="number"
                            autoComplete="price"
                            onChange={e => setServicePrice(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                                        focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:leading-12 text-center text-2xl font-lg"
                            />
                        </div>
                    </div>
                    <div className="lg:w-3/12 sm:w-full">
                        <label htmlFor="valor" className="text-lg font-lg leading-6  text-gray-900">
                            Duração
                        </label>
                        <div className="mt-2">
                            <input
                            id="duration"
                            name="duration"
                            type="number"
                            autoComplete="duration"
                            onChange={e => setServiceDuration(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                                        focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:leading-12 text-center text-2xl font-lg"
                            />
                        </div>
                    </div>  
                </div>
                
                <div className="lg:w-full sm:w-full sm:mt-5 flex sm:justify-end">
                    <button className="lg:bg-green-200 lg:w-1/6 lg:h-12 sm:w-1/2 sm:h-12 mr-3 rounded-lg sm:bg-green-500 sm:text-white lg:hover:bg-green-500 lg:hover:text-white active:text-gray mt-auto" onClick={() => addService()}><b>Criar</b></button>
                    <button className="lg:bg-gray-500 lg:w-1/6 lg:h-12 sm:w-1/2 sm:h-12 mr-3 rounded-lg sm:bg-gray-800 sm:text-white lg:hover:bg-gray-800 lg:hover:text-white active:text-gray mt-auto" onClick={() => props.close()}><b>Fechar</b></button>
                </div>
            </div>
        </div>
    )

}

export default AddServiceModal;