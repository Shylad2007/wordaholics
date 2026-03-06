import { useState } from "react";

export default function Selector({findWordleLength}) {
    const [holdWordleLength,setWordleLength]=useState(5);

    function sendWordleSelector(event) {
        setWordleLength(+event.target.value);
    }

    function handleSelector() {
        findWordleLength(holdWordleLength);
    }
    return (
        <div id="wordaholics-selector-flex">
            <div id="wordaholics-length-selector">
                <p>Choose Your Difficulty:</p>
                <select id="difficulty-menu" onChange={sendWordleSelector} defaultValue={5}>
                    <option value={4}>4 Letter Wordaholics (Easy)</option>
                    <option value={5}>5 Letter Wordaholics (Medium)</option>
                    <option value={6}>6 Letter Wordaholics (Hard)</option>
                </select>
                <button id="difficulty-select-button" onClick={handleSelector}>Select</button>
            </div>
        </div>
    )
}