

export function FilterInput({...rest}) {
    return (
        <div className='flex mt-8 bg-nlw-gradient pt-1 rounded'>
            <span className='bg-[#2a2634] rounded-l text-white font-bold h-10 px-8 py-2'>Filtro</span>
            <input
                {...rest}
                className='rounded-r h-10 px-3 w-48 focus:w-72 max-w-[62vw] sm:max-w-full focus:transition-all focus:outline-none bg-zinc-700 text-white'
            />
        </div>
    )
}