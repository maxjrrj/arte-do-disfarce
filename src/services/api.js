import { parseCookies } from "nookies";

const Api = async (path, options = {method: "GET", body: null}) => {
    
    const {"nextauth.token": token} = parseCookies()
    
    try{
        const response = await fetch("https://investidev.com" + path, {
            method: options.method,
            body: options.body,
            headers: {
                "mode": "cors",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
                //"Acecpt": "application/json",
            }
        })
        
        const data = await response.json()
        return data
        
    }catch(e){
        console.log(e)
        throw e
    }
}

export default Api;