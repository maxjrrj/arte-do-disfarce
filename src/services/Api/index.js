'use client'

const Api = async (path, options = { method: "GET", body: null, token: undefined }) => {  
  
  const response = await fetch("https://artedodisfarce.com/rest" + path, {
    method: options.method,
    body: options.body,
    mode: "cors",
    muteHttpExceptions: true,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + options.token,
    },
  });
  
  return response;

};

export default Api;
