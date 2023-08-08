"use client"
import Image from "next/image"
import useDeviceSize from '../../components/custom-hooks/windowResize'
import Link from 'next/link'

export default function Home() {
  var [width, height] = useDeviceSize()
  return (
    <>
      <div style={{height: '450px', overflow: 'hidden', width: '100%'}}>
        <Image width={width} height={height} alt="Panel" src={"/images/barba_home_panel.jpg"} className="lg:mb-2 lg:-mt-24"/>
      </div>

      <main className="flex flex-col items-center justify-between lg:p-24 sm:px-8">
        <div className="w-full flex lg:flex-row sm:flex-col xl:-mt-36 lg:-mt-36 sm:-mt-48 ">

          <div className="lg:w-5/12 sm:w-full sm:my-2 sm:p-4 bg-slate-100 h-80 rounded-md lg:m-auto">

            <h4 className="text-center sm:mb-6">Por que assinar?</h4>

            <p className="sm:mb-6">Com nossos planos de assinatura, você pode manter a régua atualizada com um preço mais baixo.</p>
            <p>Além de contar com serviços mais baratos, você terá descontos exclusivos em todos os produtos</p>

            <p className="sm:text-center sm:mt-4">
              <Link href="/planos" className="rounded-full bg-red-400 sm:p-2">Confira nossos planos</Link>
            </p>
          </div>


          <div className="lg:w-5/12 sm:w-full sm:my-2 sm:p-4 bg-slate-100 h-80 rounded-md lg:m-auto">
            Assinatura Anual
          </div>


        </div>
      </main>
    </>
  )
}
