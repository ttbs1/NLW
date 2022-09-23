import { MagnifyingGlassPlus } from 'phosphor-react'
import * as Dialog from "@radix-ui/react-dialog"

export function CreateAdBanner() {
    return (
        <div className='bg-nlw-gradient mt-8 pt-1 self-stretch rounded-lg overflow-hidden'>
            <div className='bg-[#2a2634] px-8 py-6 block sm:flex justify-between items-center'>
                <div>
                    <strong className='text-sm sm:text-2xl text-white font-black block'>Não encontrou seu duo?</strong>
                    <span className='text-sm sm:text-base text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
                </div>
                <div className='flex justify-around sm:block'>
                    <Dialog.Trigger className='text-sm mt-3 sm:mt-0 sm:text-base py-2 px-3 sm:py-3 sm:px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex center items-center gap-3'>
                        <MagnifyingGlassPlus size={24} />
                        Publicar anúncio
                    </Dialog.Trigger>
                </div>
            </div>
        </div>
    )
}