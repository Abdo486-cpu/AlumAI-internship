const fs = require("fs");

const profiles = [];
function readFileToString(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");
    for (let line of lines) {
      profiles.push(line + "");
    }
  } catch (err) {
    console.error(err);
    return ""; // Or handle the error as needed
  }
}
const filePath = "output.txt";
readFileToString(filePath);

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createClient } = require("@supabase/supabase-js");

const supabaseClient = createClient(
  "https://qqiwyxoyegggabkrsazd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxaXd5eG95ZWdnZ2Fia3JzYXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzMjgwMzEsImV4cCI6MjAzNjkwNDAzMX0.e7IxYrWBiEGw5q0bmbcWKYWW6EjpApi8QcGcKPC4bIw"
);

const apiKey = "AIzaSyBdAC5ms1f3Sp43AyoMQ26izDEEgimW-JM";

const genAI = new GoogleGenerativeAI(apiKey);

const modelEmd = genAI.getGenerativeModel({
  model: "text-embedding-004",
});

async function generateEmbeddings() {
  let pendingCount = 1;
  for (const document of profiles) {
    console.log("pending doc " + pendingCount + "...");
    const input = document.replace(/\n/g, "");

    // Turn each string (custom data) into an embedding
    const embeddingResponse = await modelEmd.embedContent(input);
    const embedding = embeddingResponse.embedding.values;

    // Store the embedding and the text in our supabase DB
    await supabaseClient.from("documents").insert({
      content: document,
      embedding,
    });
    console.log("completed doc " + pendingCount);
    pendingCount++;
  }
  console.log("Finished everything Hooray!!!");
}

generateEmbeddings();
