import * as Dialog from "@radix-ui/react-dialog"
import { Check, GameController } from 'phosphor-react'
import Input from './Form/Input'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { useState, FormEvent } from "react"
import axios from "axios"
import { useForm, Controller, SubmitHandler, Resolver } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import ToggleGroupItems from "./Form/ToggleGroupItems"
import { any } from "zod"

type Props = {
    modalSelect: JSX.Element,
    callback: () => void
    setOpen: (open:boolean) => void
}

type FormValues = {
    game: string,
    name: string,
    yearsPlaying: number,
    discord: string,
    weekDays: string[],
    hourStart: string,
    hourEnd: string,
    useVoiceChannel: boolean
}

const schema = z.object({
    game: z.string({ required_error: "Selecione um jogo", invalid_type_error: "Selecione um jogo" }).length(36, { message: 'Erro ao selecionar jogo' }),
    name: z.string().min(3, { message: 'Esperado pelo menos 03 caracteres' }).max(50, { message: 'Excedido o máximo de 50 caracteres'}),
    yearsPlaying: z.number({ required_error: "Preencha este campo", invalid_type_error: "Preencha este campo" }).lte(50, { message: 'O máximo para este campo é 50' }).nonnegative({ message: 'Insira um número positivo' }),
    discord: z.string({ required_error: "Preencha este campo", invalid_type_error: "Preencha este campo" }).regex(new RegExp('^.{3,32}#[0-9]{4}$'), 'Seu id discord tem o fomrato: "some user#1234"'),
    weekDays: z.any().refine((arg: any) => arg.length != 0, {message: "Selecione pelo menos um dia"}),
    hourStart: z.string().length(5, { message: "Preencha corretamente o campo horas/minutos" }),
    hourEnd: z.string().length(5, { message: "Preencha corretamente o campo horas/minutos" }),
    useVoiceChannel: z.boolean()
});

export function CreateAdModal({ modalSelect, callback, setOpen }: Props) {

    const { control, handleSubmit, register, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<FormValues> = (data) => {    
        console.log("submited form")

        try {
            axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: data.yearsPlaying,
                discord: data.discord,
                weekDays: data.weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: data.useVoiceChannel
            })

            callback();
            setOpen(false)
        } catch (err) {
            alert('Erro ao criar anúncio!')
            console.log(err);
        }
    };

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg sm:w-[480px] shadow-lg shadow-black/25'>
                <Dialog.Title className='text-2xl sm:text-3xl font-black'>Publique um anúncio</Dialog.Title>


                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="game" className="text-sm sm:text-base font-semibold">Qual o game?</label>

                        <Controller
                            name="game"
                            control={control}
                            defaultValue={undefined}
                            render={({ field }) =>
                                <Select.Root onValueChange={field.onChange} value={field.value}>
                                    {modalSelect}
                                </Select.Root>
                            }
                        />
                        {errors?.game && <span className="text-[0.8rem] text-red-400">{errors.game.message}</span>}

                    </div>

                    <div className="flex flex-col gap-2 text-sm sm:text-base">
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input {...register("name")} placeholder="Como te chamam dentro do game?" />
                        {errors?.name && <span className="text-[0.8rem] text-red-400">{errors.name.message}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-6 text-sm sm:text-base">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                            <Input {...register("yearsPlaying", { valueAsNumber: true })} type="number" placeholder="Tudo bem ser ZERO" />
                            {errors?.yearsPlaying && <span className="text-[0.8rem] text-red-400">{errors.yearsPlaying.message}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord">Qual o seu Discord?</label>
                            <Input {...register("discord")} type="text" placeholder="Usuario#0000" />
                            {errors?.discord && <span className="text-[0.8rem] text-red-400">{errors.discord.message}</span>}
                        </div>
                    </div>

                    <div className="flex gap-6 text-sm sm:text-base">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="weekDays">Quando costuma jogar?</label>

                            <Controller
                                name="weekDays"
                                control={control}
                                defaultValue={[]}
                                render={({ field }) =>
                                    <ToggleGroup.Root
                                        type="multiple"
                                        className="grid grid-cols-4 gap-2"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <ToggleGroupItems weekDays={field.value} />
                                    </ToggleGroup.Root>
                                }
                            />
                            {errors?.weekDays && <span className="text-[0.8rem] text-red-400">{errors.weekDays.message}</span>}

                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="hourStart">Qual horário do dia?</label>
                            <div className="grid grid-cols-1 gap-2 min-w-[105px]">
                                <Input {...register("hourStart")} type="time" placeholder="De" />
                                {errors?.hourStart && <span className="text-[0.8rem] text-red-400">{errors.hourStart.message}</span>}
                                <Input {...register("hourEnd")} type="time" placeholder="Até" />
                                {errors?.hourEnd && <span className="text-[0.8rem] text-red-400">{errors.hourEnd.message}</span>}
                            </div>
                        </div>
                    </div>

                    <label className="mt-2 flex gap-2 text-sm items-center">
                        <Controller
                            name="useVoiceChannel"
                            control={control}
                            defaultValue={false}
                            render={({ field }) =>
                                <Checkbox.Root
                                    onCheckedChange={field.onChange}
                                    className="w-6 h-6 p-1 rounded bg-zinc-900">
                                    <Checkbox.Indicator>
                                        <Check className="w-4 h-4 text-emerald-400" />
                                    </Checkbox.Indicator>
                                </Checkbox.Root>
                            }
                        />

                        Costumo me conectar ao chat de voz
                    </label>

                    <footer className="mt-4 flex justify-end gap-4 text-sm sm:text-base">
                        <Dialog.Close
                            type="button"
                            className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                        >
                            Cancelar
                        </Dialog.Close>
                        <button
                            type="submit"
                            className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                        >
                            <GameController className="w-6 h-6" />
                            Encontrar duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}