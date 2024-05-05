
import React, { useState } from 'react';
const { GoogleGenerativeAI } = require("@google/generative-ai");

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  // Create a Gemini API instance
  // const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

  const genAI = new GoogleGenerativeAI("AIzaSyD1x0nHFxmJa_to18lqnwPJADy6FoN99yg");


  // Function to handle changes in the input field
  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
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
          parts: [{ text: "I'm here to help. What would you like to know?" }],
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
  };

  return (
    <div className="App">
      <h1>Ask Me Anything!</h1>
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
    </div>
  );
}

export default App;




//_____________-

