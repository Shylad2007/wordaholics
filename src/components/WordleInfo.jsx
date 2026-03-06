export default function WordleInfo() {
    return(
        <div id="info-flex">
        <div id="info-div">
            <h1 id="info-heading">Wordaholics</h1>
            <p>Wordaholics is a Wordle-inspired puzzle: guess the hidden 4, 5, or 6 letter word in six tries.</p>
            <br></br>
            <p>After each guess, the game provides feedback using colors:-</p>
            <br></br>
            <div className="grid-box info-tile">T</div>
            <p> A blue tile shows the letter is not in the word at all.</p>
            <br></br>
            <div className="grid-box yellow info-tile">T</div>
            <p>A yellow tile indicates the letter is in the word but placed incorrectly.</p>
            <br></br>
            <div className="grid-box green info-tile">T</div>
            <p>A green tile means the letter is correct and in the right position.</p>
            <h3 id="developer-name">Developer: Piyush Sohanda</h3>
        </div>
        </div>
    )
}