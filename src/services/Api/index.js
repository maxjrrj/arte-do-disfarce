import { parseCookies } from "nookies";

const Api = async (path, options = { method: "GET", body: null }) => {
  const { "nextauth.token": token } = parseCookies();

  try {
    const response = await fetch("https://localhost:7033" + path, {
      method: options.method,
      body: options.body,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    return response;
  } catch (e) {
    console.log(e);

    return e;
  }
};

export default Api;
