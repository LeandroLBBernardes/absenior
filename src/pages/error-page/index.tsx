import './styles.scss'

export default function ErrorPage() {
    return(
        <div className="grid grid-cols-1 h-screen w-full error-page">
            <div className="flex flex-col justify-center text-center">
                <h1>Erro 404!</h1>
                <h3>Página não encontrada.</h3>
            </div>
        </div>
    );
}