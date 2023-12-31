"use client"
import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react';
import Api from "../../../services/Api";

const EmployeeSelect = (props) => {

    const [employees, setEmployees] = useState([{name:"roberson",id:"0000-0000-0000-0000"}])
    const session = useSession()
    const token = session.data.token

    useEffect(()=>{
        Api("/employees?page=0&rows=10",{token: token.token, method: "GET"})
            .then(res => {
                return res.json()
            })
            .then(data => {
                setEmployees(data)
            })
    },[])
    

    return (  
        <> 
            <label htmlFor="employees" className="text-lg font-lg leading-6 text-gray-900">Funcionarios</label>
            <div className="mt-2">
            <select onChange={(e)=> props.setEmployee(e.target.value)} name="employees" id="employees" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:leading-12 text-center text-2xl font-lg ">
                <option value={null}></option>
                {employees.map(employee => <option key={employee.id} value={employee.id}>{employee.name}</option>)}
            </select>
            </div>
        </>
    )
}

export default EmployeeSelect;