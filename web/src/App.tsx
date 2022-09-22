import './styles/main.css'
import * as Dialog from "@radix-ui/react-dialog"
import logoImg from './assets/logo-nlw-esports.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { useEffect, useState } from 'react'
import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'
import { useKeenSlider } from 'keen-slider/react'
//import './styles/keen-slider.css'
import 'keen-slider/keen-slider.min.css'

export type Game = {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    }
}

function App() {

    const [games, setGames] = useState<Game[]>([]);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            mode: "free-snap",
            slides: {
                origin: 'center',
                perView: 'auto',
                spacing: 30
            },
        },
        [

        ]
    )

    useEffect(() => {
        axios('http://localhost:3333/games')
            .then(response => setGames(response.data))


        //GAMBIARRA, CORRIGIR DEPOIS, TROCAR 0.1s POR DEPOIS QUE O REACT TERMINAR DE ATUALIZAR O CONTEÚDO NO DOM
        let delayInMilliseconds = 100; //0.1 second

        setTimeout(function () {
            //your code to be executed after 0.1 second
            instanceRef.current?.update({
                loop: true,
                mode: "free-snap",
                slides: {
                    origin: 'center',
                    perView: 'auto',
                    spacing: 30
                }
            })
        }, delayInMilliseconds);

    }, [])


    return (
        <div className='max-w-[1344px] mx-auto flex flex-col items-center m-20'>
            <img src={logoImg} alt="" />

            <h1 className='text-6xl text-white font-black mt-20'>
                Seu <span className='bg-nlw-gradient text-transparent bg-clip-text'>duo</span> está aqui.
            </h1>
            
            <div ref={sliderRef} className='keen-slider mt-16 self-stretch'>
                {games.map((game) => {
                    return <GameBanner
                        key={game.id}
                        bannerUrl={game.bannerUrl}
                        title={game.title}
                        adsCount={game._count.ads} />
                })}
            </div>
            
            <Dialog.Root>
                <CreateAdBanner />
                <CreateAdModal data={games} />
            </Dialog.Root>
        </div>
    )
}

export default App
