import { useKeenSlider } from 'keen-slider/react';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-activity';
import { Link, useParams, useSearchParams } from 'react-router-dom'
import AdCard from '../components/AdCard';
import { getAds } from './../api';
import { ArrowArcLeft } from 'phosphor-react'
import { useWindowSize } from '../util/useWindowSize';

export type Ad = {
    id: string,
    name: string,
    weekDays: string[],
    useVoiceChannel: boolean,
    yearsPlaying: number,
    hourStart: string,
    hourEnd: string
}

function Ads() {
    const size = useWindowSize().width > 640

    let { id } = useParams();
    const [searchParams] = useSearchParams();
    let title = searchParams.get("game");
    let banner = searchParams.get("banner");
    const [ads, setAds] = useState<Ad[]>([]);
    const [fetchFlag, setFetchFlag] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            mode: "free-snap",
            slides: {
                origin: size ? "auto" : "center",
                perView: 'auto',
                spacing: 30
            },
        }, [])

    useEffect(() => {
        setTimeout(function () {
            getAds(id as string).then(data => {
                setAds(data)
                setFetchFlag(true)
            })
        }, 1000)
        document.title = "NLW eSports - " + title

    }, [])

    return (
        <div className='max-w-[88%] mx-auto flex flex-col sm:flex-row items-center m-20'>
            <div>
                <div className='flex self-stretch justify-center'>
                    <img src={banner as string} className="h-64 2xl:h-auto" />
                </div>

                <h1 className='text-3xl text-white font-semibold mt-10 text-center sm:text-left'>
                    <span>{title}</span>
                    <p className='text-lg'>Conecte-se e comece a jogar!</p>
                </h1>
            </div>
            <div className='max-w-full sm:min-w-[50%] sm:pl-20'>
                <div className='flex self-stretch justify-center sm:justify-start'>
                    <Link to={'/'} className='text-sm mt-3 sm:mt-0 sm:text-base py-2 px-3 sm:py-3 sm:px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex center items-center gap-3'>
                        <ArrowArcLeft size={24} />
                        {size ? "voltar":""}
                    </Link>
                </div>
                {ads.length == 0 ? (
                    !fetchFlag ?
                        <div className='mt-14 flex items-center self-stretch justify-center align-middle h-[276.66px]'>
                            <Spinner size={25} color={"white"} />
                        </div>
                        :
                        <div className='mt-14 flex items-start align-middle h-[276.66px]'>
                            <span className='text-white'>Esse jogo ainda não possui nenhum anúncio publicado.</span>
                        </div>
                )
                    :
                    <div ref={sliderRef} className='keen-slider mt-8 self-stretch h-[276.66px]'>
                        {ads.map((ad) => {
                            return (
                                <AdCard key={ad.id} data={ad} />
                            )
                        })}
                    </div>}
            </div>
        </div>
    );
}

export default Ads