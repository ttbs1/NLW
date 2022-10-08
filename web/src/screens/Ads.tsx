import { useKeenSlider } from 'keen-slider/react';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-activity';
import { Link, useParams, useSearchParams } from 'react-router-dom'
import AdCard from '../components/AdCard';
import { getAds } from './../api';
import { ArrowArcLeft, Check } from 'phosphor-react'
import { useWindowSize } from '../util/useWindowSize';
import { FilterInput } from '../components/FilterInput';
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import ToggleGroupItems from '../components/Form/ToggleGroupItems';

export type Ad = {
    id: string,
    name: string,
    weekDays: string[],
    useVoiceChannel: boolean,
    yearsPlaying: number,
    hourStart: string,
    hourEnd: string,
    createdAt: string
}

function Ads() {
    const size = useWindowSize().width > 640

    let { id } = useParams();
    const [searchParams] = useSearchParams();
    let title = searchParams.get("game");
    let banner = searchParams.get("banner");
    const [ads, setAds] = useState<Ad[]>([]);
    const [fetchFlag, setFetchFlag] = useState(false);
    const [filterInputYears, setFilterInputYears] = useState<string>("");
    const [filterInputWeek, setFilterInputWeek] = useState<string[]>([]);
    const [filterInputVoice, setFilterInputVoice] = useState<boolean>(false);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: false,
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

    useEffect(() => {
        setTimeout(function () {
            instanceRef.current?.update
        }, 500)
        instanceRef.current?.update()
    }, [filterInputYears, filterInputVoice, filterInputWeek])

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

            <div className='max-w-full sm:pl-20 w-[100%]'>
                <div className='flex self-stretch justify-center sm:justify-start'>
                    <Link to={'/'} className='text-sm mt-3 sm:mt-0 sm:text-base py-2 px-3 sm:py-3 sm:px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex center items-center gap-3'>
                        <ArrowArcLeft size={24} />
                        {size ? "voltar" : ""}
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
                        {ads.filter(ad => {
                            if (ad.yearsPlaying >= parseInt(filterInputYears) || filterInputYears == "")
                                return ad
                        }).filter(ad => {
                            if (ad.useVoiceChannel || !filterInputVoice)
                                return ad
                        }).filter(ad => {
                            let aux = true
                            for(let x = 0; x < filterInputWeek.length; x++)
                                if (!ad.weekDays.toString().includes(filterInputWeek[x]))
                                    aux = false
                            
                                if (aux) return ad
                        }).map((ad) => {
                            return (
                                <AdCard key={ad.id} data={ad} />
                            )
                        })}
                    </div>}

                <div className='flex flex-col w-full justify-center content-center sm:flex-row sm:justify-start mt-2 py-6'>
                    <div className='flex justify-center sm:mr-6'>
                        <div className='flex items-center'>
                            <FilterInput placeholder="Time playing" type="number" min="0" max="50" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFilterInputYears(event.target.value)} />
                        </div>
                    </div>
                    <div className='flex justify-center text-white mt-4 sm:mt-0 sm:mr-6'>
                        <ToggleGroup.Root
                            type="multiple"
                            className="grid grid-cols-4 gap-2 items-center"
                            value={filterInputWeek}
                            onValueChange={setFilterInputWeek}
                        >
                            <ToggleGroupItems weekDays={filterInputWeek} bg="bg-zinc-700" />
                        </ToggleGroup.Root>
                    </div>
                    <div className='flex justify-center mt-4 sm:mt-0'>
                        <label className="flex gap-2 text-sm items-center text-white">
                            <Checkbox.Root
                                onCheckedChange={() => setFilterInputVoice(!filterInputVoice)}
                                className="w-6 h-6 p-1 rounded bg-zinc-700"
                            >
                                <Checkbox.Indicator>
                                    <Check className="w-4 h-4 text-emerald-400" />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            Uses voice channel
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ads