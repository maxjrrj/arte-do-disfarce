"use client"
import { Fragment, useState, useEffect } from 'react'
import Link from 'next/link';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  KeyIcon,
  Bars3Icon,
  ChartPieIcon,
  ArrowTrendingUpIcon,
  ScissorsIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const products = [
  { name: 'Todos os planos', description: 'Planos para você economizar e ficar na régua', href: '#', icon: ChartPieIcon },
  { name: 'Barba', description: 'Barba sempre bem feita', href: '#', icon: ArrowTrendingUpIcon },
  { name: 'Cabelo', description: 'Atualize a régua com aquele precinho', href: '#', icon: ScissorsIcon },
  { name: 'Vantagens de Assinar', description: 'Benefícios de Assinar', href: '#', icon: SquaresPlusIcon },
  { name: 'Compra Segura', description: 'Pagamentos realizados via PagSeguro', href: '#', icon: KeyIcon },
]
const callsToAction = [
  { name: 'Confira', href: '#', icon: PlayCircleIcon },
  { name: 'WhatsApp', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  const session = useSession()
  const router = useRouter()
  
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authenticated, setAuthenticated] = useState(session.status)
  useEffect(() => {
    setAuthenticated(session.status)
  }, [session.status])

  const logout = (e) => {
    e.preventDefault()
    signOut({redirect: false})

  }
 

  return (
    <div className="" style={{background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8547794117647058) 10%, rgba(0,0,0,0.5970763305322129) 30%, rgba(0,0,0,0.3981967787114846) 50%, rgba(0,0,0,0.20211834733893552) 70%, rgba(0,0,0,0.10127801120448177) 90%, rgba(0,0,0,0) 100%)', position: 'fixed', width: '100vw', top: 0}}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex flex-row">
            <span className="sr-only">Arte do Disfarce</span>
            <img  className="h-8 w-auto rounded-xl" src="/images/artedodisfarcelogo.jpg" alt="" />
            <div className="text-white ml-3 text-lg"><strong>Arte do Disfarce</strong></div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 text-white">
              Assinaturas
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <Link href={item.href} className="block font-semibold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 ">
                  {callsToAction.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <Link href="#" className="text-sm font-semibold leading-6 text-gray-900 text-white">
            Serviços
          </Link>
          <Link href="#" className="text-sm font-semibold leading-6 text-gray-900 text-white">
            Sobre Nós
          </Link>
          <Link href="/contato" className="text-sm font-semibold leading-6 text-gray-900 text-white">
            Contato
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          
          {authenticated == "unauthenticated" ? (
            <Link href="/entrar" className="text-sm font-semibold leading-6 text-gray-900 text-white">
              <span>Entrar</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          ):(
            <Link onClick={(e)=> logout(e)} href="#" className="text-sm font-semibold leading-6 text-gray-900 text-white">
              <span>Sair</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
          
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-md sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Arte do Disfarce</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Assinaturas
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Serviços
                </Link>
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Sobre Nós
                </Link>
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Contato
                </Link>
              </div>
              <div className="py-6">
                <Link
                  onClick={()=>setMobileMenuOpen(false)}
                  href="/entrar"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Entrar
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}