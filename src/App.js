// Create a react component that inputs a textarea message and then perfome a fetch request to localhost:3001 gets back a respond as a data.message and displays that message in a box below
import React,{useState} from "react";
import './App.css';

function App() {
  const [message,setMessage] = useState("");
  const [response,setResponse] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3001",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({message})
    }).then(res => res.json()).then(data => setResponse(data.message));
  }
  
  return (
    <div className="App">
      <img id = "background" src = "https://i.pinimg.com/originals/05/8c/39/058c394af48e2d61cb986127fc1e2287.jpg" width={300} height={400}></img>
      <h1>ChatGPT ChatApp</h1>
      <form onSubmit={handleSubmit} onKeyDown={e => {if (e.key === "Enter") handleSubmit(e)}}>
        <textarea value={message} placeholder="Input your question" onChange={(e) => setMessage(e.target.value)}></textarea>
        <button type="submit">Send</button>
      </form>
      {response && <div><b>ChatGPT: </b> {response}</div>}
      <p style={{padding: 6, backgroundColor: "beige"}}>Made by Cooper Wang and Yiran Hu</p>
    </div>
  );
}

export default App;