import { Link } from 'react-router-dom'

type GameBannerProps = {
    id: string;
    bannerUrl: string;
    title: string;
    adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
    return (
        <Link to={`/games/${props.id}/ads?game=${props.title}&banner=${props.bannerUrl}`} className='relative rounded-lg overflow-hidden keen-slider__slide min-w-[200px]'>
            <img src={props.bannerUrl} alt="" />
            <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
                <strong className='font-bold text-white block'>{props.title}</strong>
                <span className='text-zinc-300 text-sm block'>{props.adsCount} { props.adsCount == 1 ? "anúncio":"anúncios" }</span>
            </div>
        </Link>
    )
}