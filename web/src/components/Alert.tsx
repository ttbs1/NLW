import * as Toast from '@radix-ui/react-toast';
import { X } from 'phosphor-react'
import { keyframes } from '@stitches/react'

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

export default () => (
    <div className='bg-[#2a2634] px-8 py-6 block'>
        <Toast.Close className='text-white absolute top-8 right-8'><X/></Toast.Close>
        <Toast.Title className='text-base sm:text-lg text-white font-semibold block'>Anúncio criado</Toast.Title>
        <Toast.Description className='text-xs sm:text-sm text-zinc-400 block'>Agora é só aguardar seu duo!</Toast.Description>
    </div>
);