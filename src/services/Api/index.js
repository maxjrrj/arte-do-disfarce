//import { parseCookies } from "nookies";

const Api = async (path, options = {method: "GET", body: null}) => {
    
    //const {"nextauth.token": token} = parseCookies()
    
    try{
        const response = await fetch("https://investidev.com" + path, {
            method: options.method,
            body: options.body,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI1QGdtYWlsLmNvbSIsIm5hbWVpZCI6IkZlbGlwZSBTbWl0aCIsInVzZXJJZCI6ImNlNjdjYWRkLTlmYjMtNGQ2Ni05NjYwLTAxYzExZTM0ZjJjOSIsInJvbGUiOiJNYW5hZ2VyIiwibmJmIjoxNjkxNTg2NjU2LCJleHAiOjE2OTE1OTM4NTYsImlhdCI6MTY5MTU4NjY1NiwiaXNzIjoiTXlBcHBJc3N1ZXIiLCJhdWQiOiJBdWRpZW5jZSJ9.-7PHQwFnhR7mw-4ZdGdmlTPGytO2l86LaRAd-S79jmQ" 
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