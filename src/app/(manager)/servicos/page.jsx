"use client"
import Api from "@/services/Api";
import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon, SquaresPlusIcon} from "@heroicons/react/24/outline";
import UpdateServiceModal from '../../../components/services/updateServiceModal/index';
import AddServiceModal from '../../../components/services/addServiceModal/index';

const Servicos = () => {

    const [services, setServices] = useState([{id: "", name: "", duration: 0, price: 0}])
    const [modal, setModal] = useState("")

    const closeModal = () => {
        setModal(null)
    }

     
    const refreshModal= () => {
        Api("/services").then(res => setServices(res))
    }

    const editService = (id) => {
        setModal(<UpdateServiceModal id={id} close={closeModal} />)
        refreshModal()
    }

    const addService = () => {
        setModal(<AddServiceModal close={closeModal} />)
        refreshModal()
    }

    useEffect(()=>{
        refreshModal()
    },[])
    return (
        <>
        
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Serviços</h1>
                    <div className="flex" title="Desativar">
                        Novo <SquaresPlusIcon onClick={() => addService()} className="h-6 w-6 text-gray-800 inline hover:cursor-pointer"/>
                    </div>
                </div>
            </header>
            <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex justify-between">

                <div className="lg:w-8/12 sm:w-full bg-red-500">
                    
                    <table className="w-full bg-gray-200 rounded">
                        <thead className="bg-gray-800 text-white rounded">
                            <tr>
                                <th className="w-4/12 text-left p-2">Nome</th>
                                <th className="w-3/12 text-left p-2">Preço</th>
                                <th className="w-3/12 text-left p-2">Duração</th>
                                <th className="w-2/12 p-2">⚙️</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(service => {
                                return (
                                    <tr key={service.id}>
                                        <td style={{borderBottom: "1px solid black"}} className="p-2">{service.name}</td>
                                        <td style={{borderBottom: "1px solid black"}} className="p-2">R$ {service.price.toFixed(2,"0")}</td>
                                        <td style={{borderBottom: "1px solid black"}} className="p-2">{service.duration} min</td>
                                        <td style={{borderBottom: "1px solid black"}} className="p-2">
                                            <div className="w-1/2 inline-block" title="Editar">
                                                <PencilIcon className="h-6 w-6 text-black-500 inline hover:cursor-pointer" onClick={() => editService(service.id)} />
                                            </div>
                                            <div className="w-1/2 inline-block" title="Desativar">
                                                <TrashIcon className="h-6 w-6 text-red-500 inline hover:cursor-pointer"/>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            
                        </tbody>
                    </table>
                    
                </div>

                {modal}
                
            </main>
        </>
    )
}


export default Servicos;