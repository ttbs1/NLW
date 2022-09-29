import * as Select from '@radix-ui/react-select'
import { CaretDown } from 'phosphor-react'
import { styled } from '@stitches/react';
import { Game } from '../../screens/Games';

type Props = {
    data: Game[]
}

const StyledTrigger = styled(Select.Trigger, {
    '&[data-placeholder]': { color: '#71717A' },
});

function CustomSelect( {data}: Props ) {
    return (
        <>
            <StyledTrigger className="w-[100%] h-11 py-3 px-4 bg-zinc-900 rounded text-sm flex justify-between items-center text-white">
                <Select.Value placeholder="Selecione o game que deseja jogar" />
                <Select.Icon>
                    <CaretDown className="text-[24px] text-zinc-500" />
                </Select.Icon>
            </StyledTrigger>

            <Select.Portal>
                <Select.Content className="w-[100%] py-3 px-4 bg-zinc-700 rounded text-sm">
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                        <Select.Group>
                            <Select.Label className="py-1 text-zinc-500">
                                Games
                            </Select.Label>
                            {data.map((item) => {
                                return (
                                    <Select.Item key={item.id} value={item.id} className="text-white h-11 hover:bg-violet-500 items-center flex rounded-lg px-3">
                                        <Select.ItemText>
                                            {item.title}
                                        </Select.ItemText>
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                )
                            })}
                        </Select.Group>

                        <Select.Separator />
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                </Select.Content>
            </Select.Portal>
        </>
    )
}

export default CustomSelect