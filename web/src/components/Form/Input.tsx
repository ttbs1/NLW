import React from "react";

type InputRefs = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

const Input = React.forwardRef<HTMLInputElement, InputRefs>((props, ref) => {
    return (

        <input
            {...props}
            ref={ref}
            className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
        />
    )
})

export default Input