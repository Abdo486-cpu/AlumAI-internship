const { createClient } = require("@supabase/supabase-js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { oneLine, stripIndent } = require("common-tags");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3006;

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

app.use(express.json());
app.use(cors());

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
  const { query, username } = req.body;

  if (!query) {
    return res.status(400).send("Please Enter a message");
  }

  try {
    const { data: historyData, error: historyError } = await supabaseClient
      .from("users")
      .select("content")
      .eq("username", username);

    const { data: bothistoryData, error: bothistoryError } =
      await supabaseClient.from("users").select("bot").eq("username", username);

    if (historyError) throw historyError;

    const history = historyData[0].content;
    const bothistory = bothistoryData[0].bot;

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

    history.push(query);
    bothistory.push(text);
    // Save to history with the token
    const resp = await supabaseClient
      .from("users")
      .update({
        content: history,
        bot: bothistory,
      })
      .eq("username", username);
    res.send(text); // Send the response as text
  } catch (error) {
    console.error("Error handling query:", error);
    res.status(500).send("Internal Server Error");
  }
};

const test = async (req, res) => {
  const resp = await supabaseClient
    .from("users")
    .select("content")
    .eq("username", "abdo");
  res.send(resp);
};

const login = async (req, res) => {
  const { username, password } = req.query;
  const pass = await supabaseClient
    .from("users")
    .select("password")
    .eq("username", username);
  if (pass.data[0].password == parseInt(password)) {
    res.status(200).send("Logged in!");
  } else {
    res.status(401).send("Invalid username or password");
  }
};

const getChat = async (req, res) => {
  const { username } = req.query;
  
  // Fetch both content and bot messages
  const { data, error } = await supabaseClient
    .from("users")
    .select("content, bot")
    .eq("username", username);
  
  if (error) {
    res.status(500).send("Internal Server Error");
  } else if (data.length === 0) {
    res.status(404).send("No chat history found");
  } else {
    // Assuming content and bot columns contain arrays of messages
    const userMessages = data[0].content || [];
    const botMessages = data[0].bot || [];

    // Combine user and bot messages into a single array
    const combinedMessages = [];
    
    for (let i = 0; i < Math.max(userMessages.length, botMessages.length); i++) {
      if (i < userMessages.length) {
        combinedMessages.push({ sender: "user", text: userMessages[i] });
      }
      if (i < botMessages.length) {
        combinedMessages.push({ sender: "bot", text: botMessages[i] });
      }
    }

    res.send(combinedMessages);
  }
};


app.get("/login", login);
app.get("/test", test);
app.post("/getQuery", getQuery);
app.get("/getChat", getChat);
