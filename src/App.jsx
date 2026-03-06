import {useState} from "react";

import Header from "./components/Header.jsx";
import WordleInfo from "./components/WordleInfo.jsx";
import PlayArea from "./components/PlayArea.jsx";
import Selector from "./components/Selector.jsx";

function App() {
  const [isInfoButtonClick,setInfoButtonClick]=useState(false);
  const [wordleLength,setWordleLength]=useState(5);

  function handleInfoButtonClick() {
    setInfoButtonClick(isInfoButtonClick=>!isInfoButtonClick);
  }

  function findWordleLength(value) {
    setWordleLength(value);
  }

  return (
    <>
      <div id="background-gradient">
        <Header handleClick={handleInfoButtonClick}/>
        <div id="main-area-flex">
          {isInfoButtonClick?<WordleInfo />:<><Selector findWordleLength={findWordleLength}/><PlayArea key={wordleLength} wordleLength={wordleLength}/></>}
        </div>
      </div>
    </>
  )
}

export default App
