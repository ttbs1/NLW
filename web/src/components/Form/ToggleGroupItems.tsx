import * as ToggleGroup from "@radix-ui/react-toggle-group"

type Props = {
    weekDays: string[],
    bg: string
}

function ToggleGroupItems({weekDays, bg}: Props) {
    return (
        <>
            <ToggleGroup.Item
                value="0"
                title="Domingo"
                className={`w-8 h-8 rounded ${weekDays.includes("0") ? "bg-violet-500" : bg}`}
            >
                D
            </ToggleGroup.Item>
            <ToggleGroup.Item
                value="1"
                title="Segunda"
                className={`w-8 h-8 rounded ${weekDays.includes("1") ? "bg-violet-500" : bg}`}
            >
                S
            </ToggleGroup.Item>
            <ToggleGroup.Item
                value="2"
                title="Terça"
                className={`w-8 h-8 rounded ${weekDays.includes("2") ? "bg-violet-500" : bg}`}
            >
                T
            </ToggleGroup.Item>
            <ToggleGroup.Item
                value="3"
                title="Quarta"
                className={`w-8 h-8 rounded ${weekDays.includes("3") ? "bg-violet-500" : bg}`}
            >
                Q
            </ToggleGroup.Item>
            <ToggleGroup.Item
                value="4"
                title="Quinta"
                className={`w-8 h-8 rounded ${weekDays.includes("4") ? "bg-violet-500" : bg}`}
            >
                Q
            </ToggleGroup.Item>
            <ToggleGroup.Item
                value="5"
                title="Sexta"
                className={`w-8 h-8 rounded ${weekDays.includes("5") ? "bg-violet-500" : bg}`}
            >
                S
            </ToggleGroup.Item>
            <ToggleGroup.Item
                value="6"
                title="Sábado"
                className={`w-8 h-8 rounded ${weekDays.includes("6") ? "bg-violet-500" : bg}`}
            >
                S
            </ToggleGroup.Item>
        </>
    )
}

export default ToggleGroupItems