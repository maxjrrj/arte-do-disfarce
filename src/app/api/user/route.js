import { NextResponse } from 'next/server'

export async function GET(request){
    
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('user')
  const token = searchParams.get('token')
  
  try{
    
    const response = await fetch(process.env.API_URL + "/users/" + userId , {
      mode: 'no-cors',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: "no-cors"
    })

    const user = await response.json()
    const res = {message: "usuario autorizado",user ,code: '200'}
    return NextResponse.json(res)

  }catch(e){
    console.log(e)
    return NextResponse.json({message: "usuario nao autorizado",code: '401'})
  }
  
}