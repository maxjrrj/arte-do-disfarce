export default function CardPlan(){
    return (
        <div className="sm:w-4/5 lg:w-full m-4">
            <div className="w-full h-8 bg-gray-200 text-center rounded-t-lg align-middle"> Corte de Cabelo Anual</div>

            <div className="lg:h-60 sm:h-60 flex flex-col justify-around bg-green-50 text-center">
                <p>
                    Mantenha a régua atualizada por apenas R$ 80,00
                </p>
                <p>
                    Tenha disponível 1 corte por semana e conte com desconto em todos os nossos produtos.
                </p>
                <form action="https://pagseguro.uol.com.br/pre-approvals/request.html" method="post">
                <input type="hidden" name="code" value="AF70549E3434124CC4063F8938ADDF38" />
                <input type="hidden" name="iot" value="button" />
                <input type="image" src="https://stc.pagseguro.uol.com.br/public/img/botoes/assinaturas/99x61-assinar-assina.gif" name="submit" alt="Pague com PagBank - É rápido, grátis e seguro!" width="99" height="61" />
                </form>
            </div>
        </div>
    )
}