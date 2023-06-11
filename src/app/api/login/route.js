import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');

export async function GET(request){
    console.log(dns)
    const response = await fetch(process.env.API_URL + "/token", {
      method: "POST",
      cache: 'no-store',
      mode: "no-cors",
      body: {
        "Email": "user7@email.com",
        "Password": "User@123"
      }
    }).then(r => console.log(r))
    
    return Response.json({name:"fodase"})
}