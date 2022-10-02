import './../styles/main.css'
import * as Dialog from "@radix-ui/react-dialog"
import logoImg from './../assets/logo-nlw-esports.svg'
import { GameBanner } from './../components/GameBanner'
import { CreateAdBanner } from './../components/CreateAdBanner'
import { useEffect, useRef, useState } from 'react'
import { CreateAdModal } from './../components/CreateAdModal'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { getGames } from './../api'
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"
import CustomSelect from '../components/Form/CustomSelect'

export type Game = {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    }
}

function Games() {

    const [games, setGames] = useState<Game[]>([]);
    const [gamesUpdated, setGamesUpdated] = useState<boolean>(false);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            mode: "free-snap",
            slides: {
                origin: 'center',
                perView: 'auto',
                spacing: 30
            },
        }, [])

    const didMount = useRef(false)
    useEffect(() => {
        setTimeout(function () {
            getGames().then(data => setGames(data));
        }, 1000) //CHANGE THE NUMBER 0 BY THE MILISECONDS YOU WANT TO DELAY API RESPONSE TO PREVIEW THE LOADING COMPONENT

        if (didMount.current) {
            alert("Anuncio criado")
            const event = new KeyboardEvent("keydown", {
                'key': 'Escape'
            });
            document.dispatchEvent(event);
        }
        else
            didMount.current = true
    }, [gamesUpdated])


    const modalSelect = (
        <CustomSelect data={games} />
    )

    return (
        <div className='max-w-[88%] 2xl:max-w-[1344px] mx-auto flex flex-col items-center m-20'>
            <img src={logoImg} alt="" />

            <h1 className='text-6xl text-white font-black mt-20 text-center'>
                Seu <span className='bg-nlw-gradient text-transparent bg-clip-text'>duo</span> está aqui.
            </h1>

            {games.length == 0 ?
                <div className='mt-16 flex items-center align-middle h-[266.66px]'>
                    <Spinner size={25} color={"white"} />
                </div>
                :
                <div ref={sliderRef} className='keen-slider mt-16 self-stretch'>
                    {games.map((game) => {
                        return <GameBanner
                            key={game.id}
                            id={game.id}
                            bannerUrl={game.bannerUrl}
                            title={game.title}
                            adsCount={game._count.ads} />
                    })}
                </div>
            }
            <Dialog.Root>
                <CreateAdBanner />
                <CreateAdModal modalSelect={modalSelect} callback={() => setGamesUpdated(!gamesUpdated)} />
                { /* BOA ALTERNATIVA AO REACT CONTEXT (EVITAR PROP DRILLING) */}
            </Dialog.Root>
        </div>
    )
}

export default Games
