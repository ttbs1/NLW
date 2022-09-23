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
            getAds(id as string).then(data => setAds(data))
        }, 1000)
        document.title = "NLW eSports - "+ title
    }, [])

    return (
        <div className='max-w-[88%] mx-auto flex flex-col items-center m-20'>
            <img src={banner as string} />
            {ads.length == 0 ?
            <div className='mt-16 flex items-center align-middle h-[276.66px]'>
                <Spinner size={25} color={"white"} />
            </div>
            :
            <div ref={sliderRef} className='keen-slider mt-16 self-stretch h-[276.66px]'>
                {ads.map((ad) => { return (
                    <AdCard key={ad.id} data={ad} />
                )})}
            </div>}
        </div>
    );
}

export default Ads