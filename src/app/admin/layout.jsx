'use client'
import './../globals.css'
import Dashboard from './../../components/dashboard/index';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

const metadata = {
  title: 'Arte do Disfarce',
  description: '',
}

export default function AdmLayout({children}) {

  const session = useSession()
  const router = useRouter()
  
  const isAuthorizaded = (role) => ['Admin', 'Manager', 'Employee'].some(allowed => allowed == role) 

  useEffect(() => {
   if(session.status == 'unauthenticated'){
      router.push('/entrar')
    } else if(session.status == 'authenticated' && !isAuthorizaded(session.data.token.user.role)){
      router.push('/')
    }
  },[session])
  
  if(session.status == 'authenticated') {

    if(session.data.token.user.role != 'Client'){
  
      return (
        <>
          <main className="h-full bg-gray-100">
            <Dashboard>
              {children}
            </Dashboard>
          </main>
        </>
      ) 
    } 
  }else if(session.status == 'loading'){
    return (
      <div>carregando...</div>
    )
  }else if(session.status == 'unauthenticated'){

    return (
      <div>nao autenticado</div>
    )

  } 
}