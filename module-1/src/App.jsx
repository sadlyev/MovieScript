import { useState } from "react";
import "./App.css";

function App() {
  const [titleText,  setTitleText] = useState("")
  const [titleLists, setTitleList] = useState([])

  const handleText = (e) => {
    setTitleText(e.target.value)
  }

  const handleList = (e) => {
    e.preventDefault();
     setTitleList(prevTitleLists => [...prevTitleLists, titleText])
     setTitleText(" ")
  }

  console.log(titleLists)
  return (
    <div>
      <form onSubmit={handleList}>
        <label>
          <input placeholder="Title" value={titleText} onChange={handleText}></input>
        </label>
        <button type="submit">Add Element</button>
      </form>
      <ul>

        {titleLists.map((item, index) => item.length > 1 ? <li key={index}>{item}</li> : null) }



      </ul>
    </div>
  );
}

export default App;
