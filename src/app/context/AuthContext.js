'use client'
import {createContext, useEffect, useState} from 'react';
import { useRouter, usePathname } from 'next/navigation'
import { setCookie, parseCookies, destroyCookie  } from "nookies"
import getNonPrivateRoutes, {isAllowedRoute} from './../../components/PrivateRoute/getNonPrivateRoutes';
import Api from '../../services/Api';

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {

    const {push} = useRouter()
    const path = usePathname()
    var privateRoute = getNonPrivateRoutes().includes(path) ? false : true
    var {'nextauth.token': token} =  parseCookies()
    var user = {name: "", email: "", role: "" }
    const [isAuthenticated, setAuthenticated] = useState(!!token)


    useEffect(()=> {
        
        const parseJwt = (token) => JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        
        if(!getNonPrivateRoutes().includes(path) && token != undefined){

            let jwt = parseJwt(token)
            try{
                Api("/users/" + jwt.userId).then(res => {
                    if(!res){
                        push("/entrar")
                    } else {
                        user = {name: res.name, email: res.email, role: res.roleId}
                        setAuthenticated(true)
                    }
                })
            }catch(e){
                console.log("Sessão expirada")
                push("/")
            }    
        }else if (!getNonPrivateRoutes().includes(path) && token == undefined){
            console.log("Usuário não autenticado")
            push("/")
        } else if(getNonPrivateRoutes().includes(path)) {
            
        } else {
            push("/")
        }

    }, [isAuthenticated, push, path])
       

    async function signIn({email, password}){
        
        try{
            const response = await fetch("https://localhost:7033/token", {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json"
              },
              body: JSON.stringify({
                Email: email,
                Password: password
              })
            })
        
            const {token} = await response.json()
            destroyCookie({}, 'nextauth.token')
            setCookie(undefined, 'nextauth.token', token, {
                maxAge: 60*60*1 // 1 hour
            })

            push("/")
            setAuthenticated(true)
            return {code:"200"}
        
        }catch(e){
            console.log(e)
        }

    }

    async function signOut(){
        destroyCookie({}, 'nextauth.token')
        setAuthenticated(false);
    } 

    if(!privateRoute){
        return (
            
                <AuthContext.Provider value={{isAuthenticated, signIn, signOut, user}}>
                    {children}
                </AuthContext.Provider>
            
        )
    } else if(privateRoute && isAuthenticated == true){
        return(
            <>
                <AuthContext.Provider value={{isAuthenticated, signIn, signOut, user}}>
                    {children}
                </AuthContext.Provider>
            </>
        )
    }

    
}

export default AuthProvider;