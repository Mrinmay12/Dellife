import React, { useState } from "react";

import googleTransliterate from "google-input-tool";
// import ContextWrapper from './components/Context/ContextWrapper';
// import AppRouter from './components/Routing/AppRouter';
// import HooksHome from './components/Hooks/Home';
// import LifeCycle from './components/LifeCycles/LifeCycles';

export default function TextEditor() {
  const [translatedText, setTranslatedText] = useState([]);
  function handleChange(e) {
    let currentInput = e.target.value.split(" ");
    // currentInput = currentInput[currentInput.length - 1];
    // if (e.target.value[e.target.value.length - 1] !== " ") {
    //   getSuggestions(currentInput);
    // } else {
    //   // e.target.value = "hi";
    // }
    currentInput.forEach((word, index) => getSuggestions(word, index));
  }
  function getSuggestions(input, index) {    
    let sourceText = input;
    let inputLanguage = "bn-t-i0-und";
    let maxResult = 1;
    let request = new XMLHttpRequest();

    googleTransliterate(request, sourceText, inputLanguage, maxResult).then(
      function (response) {
        let text = JSON.parse(JSON.stringify(translatedText));
        text[index] = response[0][0];
        setTranslatedText(text);
        console.log(input, index, text);
        // console.log(text);
      }
    );
  }

  return (
    <div className="App">
      <textarea id="textarea" onChange={handleChange} value={translatedText} />
      <h6>Translate to Hindi</h6>
      <p>{translatedText.join(" ")}</p>
      {/* <AppRouter /> */}
      {/* <ContextWrapper /> */}
      {/* <HooksHome /> */}
      {/* <LifeCycle /> */}
    </div>
  );
}
