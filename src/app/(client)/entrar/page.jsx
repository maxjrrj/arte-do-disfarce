"use client"
import { useState } from "react"
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Modal from './../../../components/modal/index'

export default function Entrar() {
  const session = useSession()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [modal, setModal] = useState("")
  
  async function login(e){

    e.preventDefault()
    try {
      const data = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false
      })
      if(data.error){
        console.log(data)
        setModal(<Modal closeModal={setModal} header={"Erro"} body={"Login ou senha incorretos."} />)
      } else {
        router.push('/admin/caixa')
      }

    } catch(error){
      console.log("erro aqui")
      console.log(error)
    }
  
  }
  
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-12 ">
            <img
              className="mx-auto h-100 w-auto rounded-xl"
              src="/images/artedodisfarcelogo.jpg"
              alt="Your Company"
            />
            {
            /*
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Acesse sua conta
              </h2>
            */
            }
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={e => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Senha
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Esqueceu a senha?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={e => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  onClick={e => login(e)}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Entrar
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Não tem uma conta?{' '}
              <a href="/registro" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Registre-se
              </a>
            </p>
          </div>
        </div>
        {modal}
      </>
    )
  }