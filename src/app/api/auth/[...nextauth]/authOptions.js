import CredentialsProvider from "next-auth/providers/credentials";
import jwt_decode from "jwt-decode";

const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            email: { label: "email", type: "text" },
            password: {  label: "password", type: "password" }
          },
          async authorize(credentials, req) {

            let body = {
              Email: credentials.email,
              Password: credentials.password,
            }
            
            const response = await fetch("https://artedodisfarce.com/rest/token", {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
            const data = await response.json()

            const user = {token: data.token, user: jwt_decode(data.token), }
            
            
            if (user) {
              // Any object returned will be saved in `user` property of the JWT
              return user
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        })
      ],
      secret:'teste',
      pages: {
        signIn: '/entrar',
        //signOut: '/auth/signout',
        //error: '/auth/error', // Error code passed in query string as ?error=
        //verifyRequest: '/auth/verify-request', // (used for check email message)
        //newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
      },
      callbacks: {
  
        async jwt({token, user, session}){
          console.log(user)
          if(user){
            return {...user}
          } else {
            return {...token}
          }
        },
        
        async session(session){
          const exp = new Date(session.token.user.exp * 1000)
          const now = new Date()
  
          if(now > exp){
            return undefined
          }
  
          return session
        }
      }
  }

export { authOptions }