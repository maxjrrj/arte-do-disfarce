import CardPlan from '../../../components/card-plan/index';

export default function Planoss(){
    return(
        <main className="flex flex-col items-center justify-between lg:p-24 sm:px-8">
            <h1 className="text-2xl">Todos os Planos</h1>

            <div className="w-full flex lg:flex-row sm:flex-col items-center justify-around mt-5">
                <CardPlan/>
                <CardPlan/>
                <CardPlan/>
            </div>
        </main>
    )
}