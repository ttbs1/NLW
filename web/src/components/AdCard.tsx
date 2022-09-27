import { GameController } from 'phosphor-react';
import { Ad } from './../screens/Ads'
import * as Dialog from '@radix-ui/react-dialog'
import DiscordModal from './DiscordModal';

type Props = {
    data: Ad;
}

function AdCard({ data }: Props) {


    return (
        <div className='relative bg-[#2A2634] rounded-lg overflow-hidden keen-slider__slide min-w-[210px] max-w-[210px] p-4'>
            <p className='text-[#c4c4c6] text-sm'>Nome</p>
            <strong className='font-bold text-white block mb-1'>{data.name}</strong>
            <p className='text-[#c4c4c6] text-sm'>Tempo de jogo</p>
            <strong className='font-bold text-white block mb-1'>{data.yearsPlaying}</strong>
            <p className='text-[#c4c4c6] text-sm'>Disponibilidade</p>
            <strong className='font-bold text-white block mb-1'>{`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}</strong>
            <p className='text-[#c4c4c6] text-sm'>Chamada de áudio?</p>
            <strong className={`font-bold text-white block mb-2 ${data.useVoiceChannel ? 'text-emerald-400' : 'text-red-400'}`}>{data.useVoiceChannel ? "Sim" : "Não"}</strong>
            <Dialog.Root>
                <Dialog.Trigger
                    type="submit"
                    className="bg-violet-500 text-sm text-white px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                >
                    <GameController className="w-6 h-6" />
                    <span>Encontrar duo</span>
                </Dialog.Trigger>
                <DiscordModal adId={data.id} />
            </Dialog.Root>
        </div>
    )
}

export default AdCard