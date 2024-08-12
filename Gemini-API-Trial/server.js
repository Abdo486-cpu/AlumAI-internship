const { createClient } = require("@supabase/supabase-js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { oneLine, stripIndent } = require("common-tags");
const express = require("express");
const cors = require("cors");
const csv = require("fast-csv");
const fs = require("fs");
const path = require("path");
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
  const filePath = "frontend/public/files/export/users.csv";

  // Remove the file
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error removing file: ${err}`);
      return;
    }

    console.log(`File has been successfully removed.`);
  });
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
        match_threshold: 0.5,
        match_count: 100,
      }
    );

    if (error) {
      throw new Error(error.message);
    }

    let contextText = [];
    let morethan = false;
    if (documents.length > 5) {
      morethan = true;
      const csvStream = csv.format({ headers: true });

      const writableStream = fs.createWriteStream(
        "frontend/public/files/export/users.csv"
      );

      csvStream.pipe(writableStream);

      if (documents.length > 0) {
        documents.map((user) => {
          const content = user.content;

          // Extract data using regex or string manipulation
          const profileUrlMatch = content.match(/Linkedin Profile:\((.*?)\)/);
          const fullNameMatch = content.match(/fullname:\((.*?)\)/);
          const dobMatch = content.match(/DOB:\s?\((.*?)\)/);
          const emailMatch = content.match(/email:\((.*?)\)/);
          const locationMatch = content.match(/location:\((.*?)\)/);
          const companiesMatch = content.match(/companies:\((.*?)\)/);
          const positionsMatch = content.match(/positions:\((.*?)\)/);
          const currentRoleMatch = content.match(/current role:\((.*?)\)/);
          const degreeMatch = content.match(/degree:\((.*?)\)/);
          const graduationYearsMatch = content.match(
            /graduation year:\((.*?)\)/
          );

          // Write each field into the corresponding CSV column
          csvStream.write({
            "LinkedIn Profile": profileUrlMatch ? profileUrlMatch[1] : "",
            "Full Name": fullNameMatch ? fullNameMatch[1] : "",
            "Date of Birth": dobMatch ? dobMatch[1] : "",
            Email: emailMatch ? emailMatch[1] : "",
            Location: locationMatch ? locationMatch[1] : "",
            Companies: companiesMatch ? companiesMatch[1] : "",
            Positions: positionsMatch ? positionsMatch[1] : "",
            "Current Role": currentRoleMatch ? currentRoleMatch[1] : "",
            Degree: degreeMatch ? degreeMatch[1] : "",
            "Graduation Year": graduationYearsMatch
              ? graduationYearsMatch[1]
              : "",
          });
        });
      }

      // if (documents.length > 0) {
      //   documents.map((user) => {
      //     csvStream.write({
      //       individual: user.content,
      //     });
      //   });
      // }
      // csvStream.end();
      writableStream.end();
    }

    for (let i = 0; i < documents.length; i++) {
      const document = documents[i];
      contextText.push(document.content);
    }

    let prompt = stripIndent`${oneLine`
      You are a representative that is very helpful when it comes to talking about the AlumAI database! Only ever answer truthfully and be as helpful as you can!
      For any question related to specific fields (e.g., profileURL, fullName, dob, email, location, companies, positions, currentRole, degree, graduationYears),
      focus your answer on the corresponding part in the database.

      For any question related to specific fields, focus your answer on the corresponding part in the database, and make sure to search in a case-insensitive manner:
      - If the question asks "provide me with the details of Mohan bhyravabhotla " search only in the "fullName" field.
      - If the question asks "Can you list alumni who currently work at Oracle?" search in the company field on a company has the name "Oracle"
      - If the question is about "people who worked at a company called Hill," focus on the "companies" field.
      - If the question includes terms like "company," "companies," or "worked at," search only in the "companies" field.
      - If the question includes terms like "name" or "person named," search only in the "fullName" or "lastName" fields.
      - If the question includes terms like "date of birth," "dob," or "born in," search only in the "dob" field.
      - If the question includes terms like "email," "contact," or "email address," search only in the "email" field.
      - If the question includes terms like "location," "based in," or "lives in," search only in the "location" field.
      - If the question includes terms like "position," "job title," or "role," search only in the "positions" field.
      - If the question includes terms like "current role" or "current position," search only in the "currentRole" field.
      - If the question includes terms like "degree" or "studied," search only in the "degree" field.
      - If the question includes terms like "graduation year" or "graduated in," search only in the "graduationYears" field.
      - If the question includes terms like "profile," "profile URL," or "LinkedIn," search only in the "profileURL" field.

      - If the question involves a company or companies, strictly focus on the "companies" field and ignore any similarities with names.
      - If the question involves an individual's name, search within the "fullName" or "firstName" and "lastName" fields only.
      - For questions related to date of birth (e.g., born year, DOB), search within the "dob" field.
      - For each specific field (profileURL, fullName, dob, email, location, companies, positions, currentRole, degree, graduationYears),
        provide an answer based solely on the data in that specific field.

      -If the question is related to multiple fields, provide a brief answer for each field.
      -If the question is related to a specific individual, provide a brief answer for that individual.
      -If the question is related to multiple individuals, provide a brief answer for each individual.

      Please format the response using HTML tags like <br /> <li> <p> <h> <b>, and ensure there is adequate space between objects for better readability.`}
      Context sections:
      ${contextText}
      Question: """
      ${query}
      """
      Here is chat History: """
      ${history}
      """
      Answer as simple text (only show a max of 5 results):
    `;

    // let prompt = stripIndent`${oneLine`
    //   You are a representative that is very helpful when it comes to talking about AlumAI database! Only ever answer
    //   truthfully and be as helpful as you can! and please add the html tags like <br /> <li> <p> <h> <b> and so on to be formatted correctly on the frontend and add more space between objects"`}
    //   Context sections:
    //   ${contextText}
    //   Question: """
    //   ${query}
    //   """
    //   Here is chat History: """
    //   ${history}
    //   """
    //   Answer as simple text (only show a max of 5 results):
    // `;

    if (morethan) {
      prompt += `add the message (to check more individuals download csv file) to be shown at the end of the message`;
    }

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
    res.send({ content: text, downloadUrl: `/files/export/users.csv` }); // Send the response as text
  } catch (error) {
    console.error("Error handling query:", error);
    res.status(500).send("Internal Server Error");
  }
};

const test = async (req, res) => {
  const filePath = "frontend/public/files/export/users.csv";

  // Remove the file
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error removing file: ${err}`);
      return;
    }

    console.log(`File ${filePath} has been successfully removed.`);
  });
  const d = ["fafas1", "2eqeqw", "3231", "abd"];
  const csvStream = csv.format({ headers: true });

  if (!fs.existsSync("frontend/public/files/export/")) {
    if (!fs.existsSync("frontend/public/files")) {
      fs.mkdirSync("frontend/public/files/");
    }
    if (!fs.existsSync("frontend/public/files/export/")) {
      fs.mkdirSync("./frontend/public/files/export/");
    }
  }

  const writableStream = fs.createWriteStream(
    "frontend/public/files/export/users.csv"
  );

  csvStream.pipe(writableStream);

  writableStream.on("finish", function () {
    res.json({
      downloadUrl: `/files/export/users.csv`,
    });
  });

  if (d.length > 0) {
    d.map((user) => {
      csvStream.write({
        username: user,
      });
    });
  }
  csvStream.end();
  writableStream.end();
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

    for (
      let i = 0;
      i < Math.max(userMessages.length, botMessages.length);
      i++
    ) {
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

app.use("/files", express.static(path.join(__dirname, "public/files")));
app.get("/login", login);
app.get("/test", test);
app.post("/getQuery", getQuery);
app.get("/getChat", getChat);
