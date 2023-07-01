'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PrivateRoute = ({children}) => {

    const {push} = useRouter()
    const isAuthenticated = false
    
    useEffect(() => {
        if(!isAuthenticated){
            push('/entrar')
        }
        
    }, [isAuthenticated, push])

    return(
        <>
            {!isAuthenticated && <p>usuario não autenticado</p>}
            {isAuthenticated && children}
        </>        
    )

}

export default PrivateRoute;