import modelText from './modelText'; 
import React, { useState } from 'react';
const { GoogleGenerativeAI } = require("@google/generative-ai");

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState("");
  // const [istesting, setIstest] = useState("");


  // Create a Gemini API instance
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

  // Function to handle changes in the input field
  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

// const test = async (event) => {
//   setIstest(modelText);
// };

  // Function to handle form submission
  const handleSubmit = async (event) => {

    setIsLoading("loading ...");
    event.preventDefault();
    if (!question) return;
    
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
          parts: [{ text: modelText }],  // Corrected usage here
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    // Send the question to the model and handle the response
    const result = await chat.sendMessage(question);
    const apiResponse = await result.response;
    setResponse(apiResponse.text());

    setIsLoading("Done!");
  };

  return (
    <div className="App">
      <h1>AI model test</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={handleInputChange}
          placeholder="Type your question here"
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <p>Response:</p>
        <p>{response}</p>
      </div>
    <span>console: {isLoading}</span>
{/* 
    <button onClick={test}>test</button>
    <span>test: {istesting}</span>
     */}
    </div>
  );
}

export default App;
