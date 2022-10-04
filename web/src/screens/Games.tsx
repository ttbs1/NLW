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
import Alert from '../components/Alert'
import * as Toast from '@radix-ui/react-toast'
import { keyframes, styled } from '@stitches/react'
import { useWindowSize } from '../util/useWindowSize'

export type Game = {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    }
}

function Games() {
    const size = useWindowSize().width > 640

    const [games, setGames] = useState<Game[]>([]);
    const [gamesUpdated, setGamesUpdated] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [filterInput, setFilterInput] = useState<string>("");

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            //loop only when filter find more than 5 games
            loop: games.filter(game => { if (game.title.toLocaleLowerCase().includes(filterInput.toLowerCase()) || filterInput == "") return game }).length > 5 ? true : false,
            mode: "free-snap",
            slides: {
                origin: size ? 'auto':'center',
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
            setOpenAlert(true)
        }
        else
            didMount.current = true
    }, [gamesUpdated])

    useEffect(() => {
        setTimeout(function () {
            instanceRef.current?.update
        }, 500)
        instanceRef.current?.update()
    }, [filterInput])

    const modalSelect = (
        <CustomSelect data={games} />
    )

    return (
        <div className='max-w-[88%] 2xl:max-w-[1344px] mx-auto flex flex-col items-center m-20'>
            <img src={logoImg} alt="" />

            <h1 className='text-6xl text-white font-black mt-20 text-center'>
                Seu <span className='bg-nlw-gradient text-transparent bg-clip-text'>duo</span> está aqui.
            </h1>

            <input onChange={(event => setFilterInput(event.target.value))} />

            {games.length == 0 ?
                <div className='mt-16 flex items-center align-middle h-[266.66px]'>
                    <Spinner size={25} color={"white"} />
                </div>
                :
                <div ref={sliderRef} className='keen-slider mt-16 self-stretch'>
                    {
                        games.filter(game => {
                            if (game.title.toLocaleLowerCase().includes(filterInput.toLowerCase()) || filterInput == "")
                                return game
                        }).map((game) => {
                            return <GameBanner
                                key={game.id}
                                id={game.id}
                                bannerUrl={game.bannerUrl}
                                title={game.title}
                                adsCount={game._count.ads} />
                        })
                    }
                </div>
            }
            <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
                <CreateAdBanner />
                <CreateAdModal modalSelect={modalSelect} callback={() => setGamesUpdated(!gamesUpdated)} setOpen={(open: boolean) => setOpenModal(open)} />
                { /* BOA ALTERNATIVA AO REACT CONTEXT (EVITAR PROP DRILLING) */}
            </Dialog.Root>

            <Toast.Provider swipeDirection='down'>


                <StyledToast open={openAlert} onOpenChange={setOpenAlert} type="foreground" duration={4000} className='grid bg-nlw-gradient pt-1 self-stretch rounded-lg overflow-hidden'>
                    <Alert />
                </StyledToast>
                <Toast.Viewport className='fixed bottom-0 right-0 flex m-8 w-96 max-w-fit' />
            </Toast.Provider>
        </div>
    )
}


//configs alert animation

const hide = keyframes({
    '0%': { opacity: 1 },
    '100%': { opacity: 0 },
});

const slideIn = keyframes({
    from: { transform: `translateX(calc(100% + ${32}px))` },
    to: { transform: 'translateX(0)' },
});

const swipeOut = keyframes({
    from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
    to: { transform: `translateX(calc(100% + ${32}px))` },
});

const StyledToast = styled(Toast.Root, {
    '@media (prefers-reduced-motion: no-preference)': {
        '&[data-state="open"]': {
            animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
        },
        '&[data-state="closed"]': {
            animation: `${hide} 100ms ease-in`,
        },
        '&[data-swipe="move"]': {
            transform: 'translateX(var(--radix-toast-swipe-move-x))',
        },
        '&[data-swipe="cancel"]': {
            transform: 'translateX(0)',
            transition: 'transform 200ms ease-out',
        },
        '&[data-swipe="end"]': {
            animation: `${swipeOut} 100ms ease-out`,
        },
    },
});

export default Games
