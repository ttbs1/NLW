import { useKeenSlider } from 'keen-slider/react';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-activity';
import { useParams, useSearchParams } from 'react-router-dom'
import AdCard from '../components/AdCard';
import { getAds } from './../api'

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

    let { id } = useParams();
    const [searchParams] = useSearchParams();
    let title = searchParams.get("game");
    let banner = searchParams.get("banner");
    const [ads, setAds] = useState<Ad[]>([]);
    const [fetchFlag, setFetchFlag] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: false,
            mode: "free-snap",
            slides: {
                origin: 'center',
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
        <div className='max-w-[88%] mx-auto flex flex-col items-center m-20'>
            <img src={banner as string} className="h-64 2xl:h-auto" />

            <h1 className='text-5xl text-white font-semibold mt-10 text-center'>
                <span>{title}</span>
                <p className='text-lg'>Conecte-se e comece a jogar!</p>
            </h1>

            {ads.length == 0 ? ( 
                !fetchFlag ?
                <div className='mt-14 flex items-center align-middle h-[276.66px]'>
                    <Spinner size={25} color={"white"} />
                </div>
                :
                <div className='mt-14 flex items-start align-middle h-[276.66px]'>
                    <span className='text-white'>Esse jogo ainda não possui nenhum anúncio publicado.</span>
                </div>
            )
                :
                <div ref={sliderRef} className='keen-slider mt-14 self-stretch h-[276.66px]'>
                    {ads.map((ad) => {
                        return (
                            <AdCard key={ad.id} data={ad} />
                        )
                    })}
                </div>}
        </div>
    );
}

export default Ads