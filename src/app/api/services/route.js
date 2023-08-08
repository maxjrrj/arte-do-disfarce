import { NextResponse } from 'next/server'

export async function GET(){
  
  try{
    
    const response = await fetch(process.env.API_URL + "/services", {
      mode: 'no-cors',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Acecpt': 'application/json',
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyQGdtYWlsLmNvbSIsIm5hbWVpZCI6IlZhbGRlY2lyIiwidXNlcklkIjoiMjM5MDRmYzItOTdhOS00ZDAxLWI5MTgtZTc4ZDExMTJhNmI2IiwiUm9sZUlkIjoiMDA1IiwibmJmIjoxNjkwOTI0NjgzLCJleHAiOjE2OTA5MzE4ODMsImlhdCI6MTY5MDkyNDY4MywiaXNzIjoiTXlBcHBJc3N1ZXIiLCJhdWQiOiJBdWRpZW5jZSJ9.LYVjCKECyxDYeukbYAQ6gCjp_wdmtjQiWVO3JwQQU5E"
      },
      mode: "no-cors",
    })

    const services  = await response.json()
    console.log(services)
    return NextResponse.json(services)

  }catch(e){
    console.log(e)
    return NextResponse.json({message: "usuario nao autorizado",code: '401'})
  }
  
}