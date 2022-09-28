import * as Dialog from "@radix-ui/react-dialog"
import { CheckCircle, Clipboard, X } from "phosphor-react"
import { useEffect, useState } from "react"
import { getDiscord } from "../api"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Spinner } from "react-activity"

type Props = {
    adId: string
}

type apiResponse = {
    discord: string
}

function DiscordModal({ adId }: Props) {

    const [discord, setDiscord] = useState<apiResponse>()
    const [copying, setCopying] = useState<boolean>(false)
    const [copied, setCopied] = useState<boolean>(false)

    useEffect(() => {
        getDiscord(adId).
            then(data => setDiscord(data))
    }, [])

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
            <Dialog.Content 
                className='fixed bg-[#2A2634] py-8 px-10 text-white text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[85%] sm:w-[480px] shadow-lg shadow-black/25'
                onCloseAutoFocus={() => {
                    setCopying(false)
                    setCopying(false)
                }} 
            >

                <div className="text-zinc-500 flex self-stretch justify-end">
                    <Dialog.Close type="button">
                        <X size={24} />
                    </Dialog.Close>
                </div>
                <div className="flex flex-col gap-2 items-center pt-2 pb-6">
                    <label htmlFor="icon" className="text-sm sm:text-base text-emerald-400">
                        <CheckCircle size={64} weight={"bold"} />
                    </label>
                </div>

                <Dialog.Title className='text-2xl font-black'>Let's play!</Dialog.Title>



                <div className="flex flex-col gap-2 mb-6">
                    <label htmlFor="subtitle" className="text-sm sm:text-base text-zinc-400">Agora é só começar a jogar!</label>
                </div>

                <div className="flex flex-col gap-2 items-center my-2">
                    <label htmlFor="icon" className="text-sm sm:text-base">Adicione no discord</label>
                </div>

                <div className="flex flex-col gap-2 items-center">
                    <CopyToClipboard
                        text={discord?.discord || ""}
                        onCopy={() =>
                            setTimeout(function () {
                                setCopied(true)
                            }, 300)
                        }
                    >

                        <button
                            onClick={() => setCopying(true)}
                            type="submit"
                            className={`w-[80%] bg-zinc-900 text-sm text-zinc-200 px-5 h-12 rounded-md font-semibold flex justify-center items-center gap-3 ${copied || copying ? "" : "hover:bg-violet-600"}`}
                        >

                            {copying ? (copied ? <span className="text-emerald-400 flex">Copied to clipboard! <Clipboard size={19} /> </span> : <Spinner size={12} />) : discord?.discord}
                        </button>
                    </CopyToClipboard>

                </div>


            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default DiscordModal