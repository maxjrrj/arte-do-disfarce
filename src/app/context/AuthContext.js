'use client'
import {createContext, useEffect, useState} from 'react';
import { useRouter, usePathname } from 'next/navigation'
import { setCookie, parseCookies, destroyCookie  } from "nookies"
import getNonPrivateRoutes from './../../components/PrivateRoute/getNonPrivateRoutes';
//import { Inter } from 'next/font/google'

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {

    //const inter = Inter({ subsets: ['latin'] })

    const {push} = useRouter()
    const [user, setUser] = useState(null)

    const path = usePathname()

    const nonPrivateRoutes = getNonPrivateRoutes()
    const privateRoute = nonPrivateRoutes.includes(path) ? false : true

    const [isAuthenticated, setAuthenticated] = useState(!!user)
       

    async function signIn({email, password}){

        const response = await fetch("/api/login", {method:'POST', headers: {"Content-Type": "application/json"},  body: JSON.stringify({email,password}) })
        const res = await response.json()
        
        setCookie(undefined, 'nextauth.token', res.token, {
            maxAge: 60*60*1 // 1 hour
        })

        push("/")
        setAuthenticated(true)
        return res

    }

    async function logout(){
        destroyCookie({}, 'nextauth.token')
        setAuthenticated(false)
    } 

    useEffect(()=> {

        const {'nextauth.token': token} = parseCookies()

        if(token){
            setAuthenticated(true)
            //LOGICA PARA RECUPERAR DADOS DO USUÁRIO
            setUser({
                user: {
                    name: "Max Jr",
                    email: "maxadsjr@gmail.com"
                }
            })
        } else {
            console.log("dentro do if " + token)
            push("/entrar")
        }

    }, [isAuthenticated, push])

    return (
        <>
            {!privateRoute &&  <AuthContext.Provider value={{isAuthenticated, signIn, logout}}>{children}</AuthContext.Provider>}
            {(privateRoute && isAuthenticated == true) && <AuthContext.Provider value={{isAuthenticated, signIn, logout}}>{children}</AuthContext.Provider>}
        </>
    )
}

export default AuthProvider;