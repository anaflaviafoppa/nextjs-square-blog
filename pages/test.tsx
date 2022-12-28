import React, {useState} from 'react';

function Test(props) {
    const [counter, setCounter] = useState(0);

    return (
        <div>
            <h1>TEST</h1>
            <p>counter: {counter}</p>
            <button onClick={() => setCounter(counter+1)}>ADD</button>
        </div>
    );
}

export default Test;
