const { createClient } = require("@supabase/supabase-js");
const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { oneLine, stripIndent } = require("common-tags");
const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


const app = express();
const port = 3006;
const secret = 'chatbot-secret';

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// intialize supabase client
const supabaseClient = createClient(
  "https://qqiwyxoyegggabkrsazd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxaXd5eG95ZWdnZ2Fia3JzYXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzMjgwMzEsImV4cCI6MjAzNjkwNDAzMX0.e7IxYrWBiEGw5q0bmbcWKYWW6EjpApi8QcGcKPC4bIw"
);

const apiKey = "AIzaSyBdAC5ms1f3Sp43AyoMQ26izDEEgimW-JM";

const genAI = new GoogleGenerativeAI(apiKey);

const modelEmd = genAI.getGenerativeModel({
  model: "text-embedding-004",
});

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateToken = () => {
  const payload = {};
  const options = { expiresIn: '7d' }; // Token valid for 7 days
  return jwt.sign(payload, secret, options);
};

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Generate a new token
app.post('/token', (req, res) => {
  const token = generateToken();
  res.json({ token });
});

// Get chat history for authenticated user
app.get('/chat-history', authenticateToken, async (req, res) => {
  const token = req.headers['authorization'];
  const { data, error } = await supabaseClient
    .from('history')
    .select('*')
    .eq('token', token);

  if (error) {
    console.error("Error fetching chat history:", error);
    return res.status(500).send("Internal Server Error");
  }

  res.json({ history: data });
});

// // Save chat message for authenticated user
// app.post('/save-chat', authenticateToken, async (req, res) => {
//   const token = req.headers['authorization'];
//   const { message } = req.body;

//   const { data, error } = await supabaseClient
//     .from('history')
//     .insert({ token, content: message });

//   if (error) {
//     console.error("Error saving chat message:", error);
//     return res.status(500).send("Internal Server Error");
//   }

//   res.sendStatus(200);
// });

async function askQuestion() {
  const query =
    "who is from the state California? and what is their background? and who has most qualifications and what are they?";
  const embeddingResponse = await modelEmd.embedContent(query);
  const embedding = embeddingResponse.embedding.values;

  const { data: documents, error } = await supabaseClient.rpc(
    "match_documents12",
    {
      query_embedding: embedding,
      match_threshold: 0.2,
      match_count: 10,
    }
  );

  let contextText = "";

  for (let i = 0; i < documents.length; i++) {
    const document = documents[i];
    const content = document.content;
    contextText += `${content.trim()}---\n`;
  }

  const prompt = stripIndent`${oneLine`
    You are a representative that is very helpful when it comes to talking about AlumAI database! Only ever answer
    truthfully and be as helpful as you can!"`}
    Context sections:
    ${contextText}
    Question: """
    ${query}
    """
    Answer as simple text:
  `;

  // generate response
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
}

const getQuery = async (req, res) => {
  console.log("Received request");
  const { query } = req.body;
  const token = req.headers['authorization'];

  if (!query) {
    return res.status(400).send("Please Enter a message");
  }

  try {
    // Fetch the chat history with the token
    const { data: historyData, error: historyError } = await supabaseClient
      .from('history')
      .select('content')
      .eq('token', 'abdo');

    if (historyError) throw historyError;

    const history = historyData[0].content;

    const embeddingResponse = await modelEmd.embedContent(query);
    const embedding = embeddingResponse.embedding.values;

    const { data: documents, error } = await supabaseClient.rpc(
      "match_documents12",
      {
        query_embedding: embedding,
        match_threshold: 0.2,
        match_count: 10,
      }
    );

    if (error) {
      throw new Error(error.message);
    }

    let contextText = "";

    for (let i = 0; i < documents.length; i++) {
      const document = documents[i];
      const content = document.content;
      contextText += `${content.trim()}---\n`;
    }

    const prompt = stripIndent`${oneLine`
      You are a representative that is very helpful when it comes to talking about AlumAI database! Only ever answer
      truthfully and be as helpful as you can! and please add the html tags like <br /> <li> <p> <h> <b> and so on to be formatted correctly on the frontend and add more space between objects"`}
      Context sections:
      ${contextText}
      Question: """
      ${query}
      """
      Here is chat History: """
      ${history}
      """
      Answer as simple text:
    `;

    // generate response
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = await response.text();

      
    history.push(query)
    console.log(history)
    // Save to history with the token
    const resp = await supabaseClient.from("history").update({
      content: history
    }).eq('token','abdo');
    res.send(text); // Send the response as text
  } catch (error) {
    console.error("Error handling query:", error);
    res.status(500).send("Internal Server Error");
  }
};

app.post("/getQuery", authenticateToken, getQuery);
