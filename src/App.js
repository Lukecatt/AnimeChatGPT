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
      <img id = "background" src = "https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/313213085_560354866094016_3323667496409923842_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=iOhsAQ0OeCMAX9UlZK-&_nc_ht=scontent-lga3-1.xx&oh=00_AfBia3kieOa33UwLnhYLvtr1gzTzM0O4vr6yZHaXPjJCCg&oe=63E6A2F0" width={300} height={300}></img>
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