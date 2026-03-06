import { useState } from "react";

export default function Header({handleClick}) {

    return (
        <header>
            <div id="header-flex">
                <div id="heading-flex">
                    <div id="wordaholics-logo-container">
                        <img src="./WordaholicsFinalLogo.png" alt="Wordaholics Logo" id="wordaholics-logo"></img>
                        <h1 id="header-title">Wordaholics</h1>
                    </div>
                    <br></br>
                    <p id="header-subtitle">Guess the word. Own the grid.</p>
                </div>
                <div id="right-header-flex">
                    <button className="header-button" onClick={handleClick}>What is Wordaholics?</button>
                </div>
            </div>

            
        </header>
    )
}