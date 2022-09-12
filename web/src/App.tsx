type ButtonProps = {
    title: string;
}

function Button (props: ButtonProps) {
    return (
        <button>
            {props.title}
        </button>
    )
}

function App() {
    return (
        <>
            <Button title="send 1" />
            <Button title="send 1" />
            <Button title="send 3" />
        </>
    )
}

export default App
