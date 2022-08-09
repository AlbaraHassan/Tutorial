import { useState } from "react"

function App() {
    const [ count, setCount ] = useState(0)
    const [ error, setError ] = useState(false)
    const [counterArray, setCounterArray] = useState([])

    const increaseValue = () => {
        if (error) {
            setError(false)
        }
        setCount(count + 1)
        setCounterArray([...counterArray, count+1])
    }

    const decreaseValue = () => {
        if (count === 0) {
            setError(true)
            return
        }
        setCount(count - 1)
        setCounterArray([...counterArray, count-1])

    }

    return (
        <div>
            <div style={{ display: "flex" }}>
                <button onClick={decreaseValue}>-</button>
                <p style={{ height: "20px", margin: 0 }}>{count}</p>
                <button onClick={increaseValue}>+</button>
            </div>

            {error && (<div style={{ background: "red" }}>Cannot decrease more!</div>)}

        {counterArray.map((el)=> <div>{el}</div>)}

        </div>
    );
}

export default App;
