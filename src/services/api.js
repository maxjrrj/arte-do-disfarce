//import { parseCookies } from "nookies";

const Api = async (path, options = {method: "GET", body: null}) => {
    
    //const {"nextauth.token": token} = parseCookies()
    
    try{
        const response = await fetch("https://investidev.com" + path, {
            method: options.method,
            body: options.body,
            headers: {
                "mode": "cors",
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI0QGdtYWlsLmNvbSIsIm5hbWVpZCI6IkZlbGlwZSBTbWl0aCIsInVzZXJJZCI6Ijg1YjZjZTFhLWU4MjktNDUzMi1hZmE1LWEwNDExMWNmNWYwMSIsInJvbGUiOiJFbXBsb3llZSIsIm5iZiI6MTY5MTUzODQ4MCwiZXhwIjoxNjkxNTQ1NjgwLCJpYXQiOjE2OTE1Mzg0ODAsImlzcyI6Ik15QXBwSXNzdWVyIiwiYXVkIjoiQXVkaWVuY2UifQ.ZWbpX4O5pHK5fQztqUsgwMvLCIhoPkirGHigNmIk46U" //+ token,
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