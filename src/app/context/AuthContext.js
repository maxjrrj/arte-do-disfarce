'use client'
import {createContext, useEffect, useState} from 'react';
import { useRouter, usePathname } from 'next/navigation'
import { setCookie, parseCookies, destroyCookie  } from "nookies"
import getNonPrivateRoutes from './../../components/PrivateRoute/getNonPrivateRoutes';
import Api from '../../services/Api';

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {

    const {push} = useRouter()
    const [user, setUser] = useState()
    const [token, setToken] = useState()
    const path = usePathname()
    const privateRoute = getNonPrivateRoutes().includes(path) ? false : true
    const [isAuthenticated, setAuthenticated] = useState(!!user)


    useEffect(()=> {

        const {'nextauth.token': token} =  parseCookies()
        
        function parseJwt (token) {
            return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        }

        if(token){

            let jwt = parseJwt(token)
            
            try{
                Api("/users/" + jwt.userId)
                .then(res => {

                    if(!res){
                        push("/entrar")
                    } else {
                        setAuthenticated(true)
                        setUser({name: res.name, email: res.email})
                    }
                  })
            
            }catch(e){
                console.log(e)
            }

        } else if(!token){
            push('/entrar')
        }

    }, [isAuthenticated, push, path])
       

    async function signIn({email, password}){
        
        try{
            const response = await fetch("https://investidev.com/token", {
            //const response = await fetch("https://investidev.com/token", {
              mode: 'cors',
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                Email: email,
                Password: password
              })
            })
        
            const {token} = await response.json()
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
        setAuthenticated(false)
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