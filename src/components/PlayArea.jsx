import { useState } from "react";

import { fourWordDictionary } from "../assets/fourWordsDictionary.js";
import { fiveWordDictionary } from "../assets/fiveWordsDictionary.js";
import { sixWordDictionary } from "../assets/sixWordsDictionary.js";

export default function WordleArea({wordleLength}) {
    const [currentGuess,setCurrentGuess]=useState("");
    const [wordGrid,setWordGrid]=useState(()=>{
        if(wordleLength===4)
            return [["","","",""],["","","",""],["","","",""],["","","",""],["","","",""],["","","",""]]
        else if(wordleLength===5)
            return [["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""]]
        else if(wordleLength===6)
            return [["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""]]
    });
    const [currentRow,setCurrentRow]=useState(0);
    const [isUserWon,setUserWon]=useState("Playing");
    const currentWordDictionary = wordleLength === 4 ? fourWordDictionary : wordleLength === 5 ? fiveWordDictionary : sixWordDictionary;

    const randomIndex=Math.floor(Math.random()*currentWordDictionary.length);
    const generatedWord=currentWordDictionary[randomIndex];
    
    const [answerWord,setAnswerWord]=useState(generatedWord.toUpperCase());

    function userInput(event) {
        setCurrentGuess((event.target.value).toUpperCase());
    }

    function handleOutputGrid(guess) {
        if (guess.length!==wordleLength)
            return;
        if (currentRow>4) 
            setUserWon("Lost");

        const letterRow=[...guess];

        setWordGrid(prev=>{
            const newGrid=[...prev];
            newGrid[currentRow]=letterRow;
            return newGrid;
        });
        setCurrentRow(prev=>prev+1);
                
        if (guess===answerWord) {
            setUserWon("Won");
        }
    }

    const [buttonText,setButtonText]=useState("Answer");

    function handleUserGuess() {
        let isValid=false;

        for(let i=0;i<currentWordDictionary.length;i++) {
            if(currentGuess===currentWordDictionary[i])
                isValid=true;
        }

        if(isValid) {
            handleOutputGrid(currentGuess);
            setCurrentGuess("");
        } 
        else {
            setButtonText("Invalid!");

            setTimeout(()=>{
                setButtonText("Answer")
            },2000);
        }
    }

    function isCorrectChecking(indexX,indexY) {
        const checkChar={};

        for(const char of answerWord) {
            if(checkChar[char]===undefined)
                checkChar[char]=0;
            checkChar[char]+=1;
        }
        
        if (wordGrid[indexX][indexY]!=="") {
            for(let i=0;i<wordleLength;i++) {
                if(wordGrid[indexX][i]===answerWord[i])
                    checkChar[wordGrid[indexX][i]]-=1;
            }

            if(wordGrid[indexX][indexY]===answerWord[indexY])
                return "green";

            for (let i=0;i<indexY;i++) {
                const prevLetter=wordGrid[indexX][i];
                if (prevLetter!==""&&prevLetter!==answerWord[i]&&checkChar[prevLetter]>0)
                    checkChar[prevLetter]--;
            }

            if (checkChar[wordGrid[indexX][indexY]]>0)
                return "yellow";
        }
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleUserGuess();
        }
    }

    function handleGiveUp() {
        setUserWon("Lost");
    }

    function playAgain() {
        setUserWon("Playing");
        setCurrentGuess("");
        setWordGrid(()=>{
        if(wordleLength===4)
            return [["","","",""],["","","",""],["","","",""],["","","",""],["","","",""],["","","",""]]
        else if(wordleLength===5)
            return [["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""]]
        else if(wordleLength===6)
            return [["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""]]
        });
        setCurrentRow(0);

        const newIndex=Math.floor(Math.random()*currentWordDictionary.length);
        const newWord=currentWordDictionary[newIndex];
        setAnswerWord(newWord);
    }

    let lowerScreenOutput;

    if(isUserWon==="Won") {
        lowerScreenOutput=
        <div className="announcement-div">
            <h2>You Won!</h2>
            <p>Correct Answer: {answerWord}</p>
            <button id="play-again-button" onClick={playAgain}>Play Again</button>
        </div>
    }
    else if(isUserWon==="Playing") {
        lowerScreenOutput=
        <>
            <div id="input-div">         
                <input type="text" placeholder="Enter Your Answer" id="answer-input-field" onChange={userInput} minLength={wordleLength} maxLength={wordleLength} onKeyDown={handleKeyDown} value={currentGuess}/>
                <button id="answer-submit-button" onClick={handleUserGuess}>{buttonText}</button>
            </div>
            <div id="give-up-div">
                <button id="give-up-button" className={`${currentRow>=1?"active":"inactive"}`} onClick={handleGiveUp}>Give Up</button>
            </div>
        </>     
    }
    else if(isUserWon==="Lost") {
        lowerScreenOutput=
        <div className="announcement-div">
            <h2>You Lost!</h2>
            <p>Correct Answer: {answerWord}</p>
            <button id="play-again-button" onClick={playAgain}>Play Again</button>
        </div>;
    }

    return (
        <div id="play-area-flex">
            <div id="play-area-div">
                <h2 id="wordaholics-title">{wordleLength===5?"Five Letter Wordaholics":wordleLength===4?"Four Letter Wordaholics":"Six Letter Wordaholics"}</h2>
                <div className={`${wordleLength===5?"five-grid":wordleLength===4?"four-grid":"six-grid"}`}>
                    {wordGrid.map((row, rowIndex) =>
                        row.map((letter, colIndex) => (
                            <div key={`${rowIndex},${colIndex}`} className={`grid-box ${isCorrectChecking(rowIndex, colIndex)}`}>
                                {letter}
                            </div>
                        ))
                    )}
                </div>
                {lowerScreenOutput}
            </div>
        </div>
    )
}