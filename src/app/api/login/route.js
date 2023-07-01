import { NextResponse } from 'next/server'

export async function POST(request){
    
  const {email, password} = await request.json()
  
  try{
    
    const response = await fetch(process.env.API_URL + "/token", {
      mode: 'no-cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: "no-cors",

      body: JSON.stringify({
        Email: email,
        Password: password
      })
    })

    const {token} = await response.json()
    const res = {message: "usuario autorizado",token ,code: '200'}
    return NextResponse.json(res)

  }catch(e){
    console.log(e)
    return NextResponse.json({message: "usuario nao autorizado",code: '401'})
  }
  
}