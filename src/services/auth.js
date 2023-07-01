const  signIn = async () => {

    const response = await fetch("https://127.0.0.1:7033/token", {
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

export default signIn