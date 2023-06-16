export async function POST(request){

    const response = await fetch(process.env.API_URL + "/token", {
      method: "POST",
      cache: 'no-store',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: "no-cors",
      body: JSON.stringify({
        Email: "user7@email.com",
        Password: "User@123"
      })
    })

    const res = await response.json()

    return Response.json(res)
}