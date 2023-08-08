import { NextResponse } from 'next/server'



export async function GET(request){

  const { searchParams } = new URL(request.url)
  const initialDate = searchParams.get('initialDate')
  const finalDate = searchParams.get('finalDate')
  const type = searchParams.get('type')
  const token = searchParams.get('token')
  
  try{
  
  const response = await fetch(process.env.API_URL + "/transactions?initial_date=" + initialDate + " 00:00:01&final_date=" + finalDate + " 23:59:00&type=" + type, {
  
    mode: 'no-cors',
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Acecpt': 'application/json',
      "Authorization": "Bearer " + token
    }
  })
  console.log(response)
  const transactions = await response.json()

  return NextResponse.json(transactions)

}catch(e){
  console.log(e)
  return NextResponse.json({message: "usuario nao autorizado",code: '401'})
}

}

export async function POST(request){

    const {transactionDate, value, type, category, description, client, provider, token} = await request.json()
    

  try{
    
    const response = await fetch(process.env.API_URL + "/transactions", {
      mode: 'no-cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Acecpt': 'application/json',
        "Authorization": "Bearer " + token
      },
      mode: "no-cors",

      body: JSON.stringify({
        createdBy: "Max",
        transactionDate: transactionDate,
        value: value,
        type: type,
        category: category,
        description: description,
        client: client,
        provider: provider
      })
    })

    const services  = await response.json()
    console.log(services)
    return NextResponse.json(services)

  }catch(e){
    console.log(e)
    return NextResponse.json({message: "usuario nao autorizado",code: '401'})
  }
  
}

