import modelText from './modelText'; 
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';
const { GoogleGenerativeAI } = require("@google/generative-ai");


function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState("Hey there! My name is Arnav Gupta. I am an AI model trained on data about Arnav Gupta. You can think of me as a digital version of Arnav Gupta, here to assist you with any questions or information you need. Feel free to ask me anything about my experiences, education, skills, and more. I'm excited to connect with you and help in any way I can!");
  const [isLoading, setIsLoading] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
    // console.log("Event: "+event.target.value);
    // console.log("question: "+question);
    
    (!event.target.value.trim()) ? setBtnDisabled(true) : setBtnDisabled(false);
  };


  // Function to handle form submission
  const handleSubmit = async (event) => {

    setIsLoading("Console: Loading ...");
    setIsSpinning(true);
    event.preventDefault();

    // Start the chat session with the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: question }],
        },
        {
          role: "model",
          parts: [{ text: modelText }], 
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });
//use when trying to implement multi chat
    // Send the question to the model and handle the response
    // const result = await chat.sendMessage(question);
    // const apiResponse = await result.response;
    // setResponse(prev => prev + "\n" + apiResponse.text());
    // setQuestion(""); 

    const result = await chat.sendMessage(question);
    const apiResponse = await result.response;
    setResponse(apiResponse.text());
    setIsLoading("Console: Done!");
    setIsSpinning(false);
  };

  

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center mb-4">Talk to Arnav Gupta</h1>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="mb-3">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={question}
                  onChange={handleQuestionChange}
                  placeholder="Type your question here"
                />
                <button id='submitBtn' type="submit" className="btn btn-primary" disabled ={btnDisabled}> Ask a Question </button> 
              </form>
              {isSpinning ? (
                <div className=" ">
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
               ) : null}
              <div className="chat-responses p-3 rounded" style={{ height: "300px", overflowY: "auto", background: "#f8f9fa" }}>
                <p className='text-center'>
                  <ReactMarkdown>{response}</ReactMarkdown>
                </p>
              </div>
              <small className="text-muted">{isLoading}</small>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}




export default App;
