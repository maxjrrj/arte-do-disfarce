"use client";
import { useState } from "react";
import Api from "./../../../services/Api/index";

/*
import Api from './../../../services/Api/index';
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```


  <div className="w-full md:w-1/2 px-3">
  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
    Sobrenome
  </label>
  <input 
    id="grid-last-name" 
    type="text" 
    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
    placeholder="Doe"/>
</div>
*/
export default function Registro() {
  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [repetirSenha, setRepetirSenha] = useState();

  async function registrar(e) {
    e.preventDefault();
    if (senha != repetirSenha) {
      window.alert("As senhas devem ser iguais");
      console.log(nome, cpf, email, senha, repetirSenha);
    } else {
      Api("/users", {
        method: "POST",
        body: JSON.stringify({
          Email: email,
          Password: senha,
          Name: nome,
          RoleId: "003",
          Cpf: cpf,
        }),
      })
        .then((r) => r?.json())
        .then((response) => {
          if (response.status == 201) {
            window.alert("Usuário Registrado!");
          } else {
            window.alert("Erro ao Registrar-se");
          }
        });
    }
  }
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Registre-se
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setNome(e.target.value)}
                  id="nome"
                  name="nome"
                  type="nome"
                  autoComplete="nome"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                CPF
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setCpf(e.target.value)}
                  id="cpf"
                  name="cpf"
                  type="cpf"
                  autoComplete="cpf"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Senha
                </label>
                {/*

                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Esqueceu a senha?
                    </a>
                  </div>
                */}
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => setSenha(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Repetir Senha
                </label>
                {/*

                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Esqueceu a senha?
                    </a>
                  </div>
                */}
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => setRepetirSenha(e.target.value)}
                  id="repeat-password"
                  name="repeat-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={registrar}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrar
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Já tem uma conta?{" "}
            <a
              href="/entrar"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Entrar
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
