'use client'

const Api = async (path, options = { method: "GET", body: null, token: undefined }) => {  
  
  try {
    const response = await fetch("https://artedodisfarce.com/rest" + path, {
      method: options.method,
      body: options.body,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + options.token,
      },
    });
    
    return response;
    
  } catch (e) {
    console.log(e);

    return e;
  }
};

export default Api;
