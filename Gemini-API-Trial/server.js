const { createClient } = require("@supabase/supabase-js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { oneLine, stripIndent } = require("common-tags");
// var bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3005;
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

// generate embeddings
async function generateEmbeddings() {
  // custom data
  const documents = [
    "Linkedin link: (https://www.linkedin.com/in/mohan-bhyravabhotla-bb44b35), Fullname: (Mohan Bhyravabhotla), State: (California), Employers: (Oracle Corp.; Sun Micro Systems; Fujitsu ICIM; DDE ORG Systems), Experience: (Sr. Director, Oracle Cloud Production Engineering; Systems - Consultant; Territory Services Manager; Customer Support Engineer), job title: ()",
    "Linkedin link: (https://www.linkedin.com/in/veronica-villano-3352037), Fullname: (Veronica Villano), State: (California), Employers: (PP Sothebys Realty), Experience: (Real Estate Agent), job title: (Real Estate Agent at PP Sothebys Realty)",
    "Linkedin link: (https://www.linkedin.com/in/anh-ko-4a894b16), Fullname: (Anh Ko), State: (California), Employers: (Kaiser Permanente; Kaiser Permanente; Kaiser Permanente; Kaiser Permanente; Wells Fargo Bank; Wells Fargo Financial), Experience: (Senior Manager, Delivery System Strategy; Interim, Executive Consultant to NCAL COO of Hospital and Health Plan at Kaiser; Business Consultant Specialist; Consultant/Sr Finance Analyst/Senior Consultant; Business Specialist; Store Manager), job title: ()",
    "Linkedin link: (https://www.linkedin.com/in/hollymcclain), Fullname: (Holly McClain, M.Ed), State: (), Employers: (Holly McClain Coaching; The NADP-The National Association of Divorce Professionals; Center Joint Unified School District; Santa Clara Unified School District; Job Rooster; Fremont Unified School District), Experience: (Certified Life Coach ; Senior Education Coordinator; School Counselor; Guidance Counselor; Employment Specialist; Educator), job title: (Counselor and Certified Life Coach | Supporting teens and young adults)",
    "Linkedin link: (https://www.linkedin.com/in/haydenmckeeperry), Fullname: (Hayden Perry), State: (California), Employers: (The Stylish Sabbatical; MIXT; f'real foods; f'real foods; PayPal; Peet's Coffee; Peet's Coffee; Independent Marketing Consultant; Tucker Alan Inc.; Williams Sonoma, Inc.; Aidells Sausage Company; Safeway Inc.; Ford Motor Company), Experience: (Founder; Vice President of Marketing; Senior Director of Marketing; Director of Marketing; Head of Consumer Growth Marketing for Xoom, a PayPal Service; Director of Marketing; Senior Marketing Manager; Consultant; Consultant and Senior Consultant; Marketing Manager; Associate Brand Manager; Analyst; Marketing Leadership Intern), job title: (marketing executive turned entrepreneur)",
    "Linkedin link: (https://www.linkedin.com/in/aaron-m-gabriel-cfp®-cima®-8742796), Fullname: (Aaron M. Gabriel, CFP®, CIMA®), State: (California), Employers: (The Gabriel Group; The Gabriel Group; A.G. Edwards; KEMPER Securities; Franklin/Templeton Group), Experience: (President; Branch Manager / Senior V.P., Investments; V.P.-INVESTMENTS, CFP, CIMA; V.P.-Investments; Management Training Program), job title: (President at The Gabriel Group. Branch Manager, Raymond James)",
    "Linkedin link: (https://www.linkedin.com/in/missy-norquist-5858241), Fullname: (Missy Norquist), State: (California), Employers: (Apple Inc.; Apple Inc.; National Semiconductor; National Semiconductor; National Semiconductor), Experience: (People Privacy Leader; Recruiting Operations/Recruiting Compliance Manager; Global Staffing Operations Manager; Staffing Program Manager; University Recruiter), job title: (People Privacy)",
    "Linkedin link: (https://www.linkedin.com/in/denis-mcgue), Fullname: (Denis McGue), State: (), Employers: (RETIRED!; McWhorters Stationers; Drug Plastics and Glass Co., Inc.; PMZ Real Estate), Experience: (RETIRED!; Assistant Manager; Account Manager; Commercial Real Estate Agent), job title: (Working at what God puts in front of me.)",
    "Linkedin link: (https://www.linkedin.com/in/christina-nguyen-jones-10ab5242), Fullname: (Christina Nguyen-Jones), State: (), Employers: (Self-employed; Alexander Doll Company, Inc.; Avalon Apparel; Active Apparel Group; RTA; MATE the Label; Topson Downs of California, Inc.; AG Jeans; APOLLO  APPAREL; Rachel Roy; Nordstrom), Experience: (Independent Contractor: Fashion Broker, Production, Tech Design, Product Development; Design Associate / Patternmaker; Technical Designer; Senior Technical Designer; Production Technical Designer; Development & Production Manager; Technical Designer; Contemporary Technical Designer; Denim Designer; Design Assistant; Salesperson/ Customer Care), job title: (Production, Tech Design, Product Development Professional)",
    "Linkedin link: (https://www.linkedin.com/in/bill-gegg-a6474623), Fullname: (Bill Gegg), State: (California), Employers: (None; City of Antioch), Experience: (Retired but volunteering; Director of Information Systems), job title: (Retired but volunteering at Monument Crises Center)",
  ];

  let pendingCount = 0;

  for (const document of documents) {
    pendingCount++;
    const input = document.replace(/\n/g, "");
    console.log("pending doc " + pendingCount + "...");
    const embeddingResponse = await modelEmd.embedContent(input);
    const embedding = embeddingResponse.embedding.values;

    // store the embedding in our DB
    await supabaseClient.from("documents").insert({
      content: document,
      embedding,
    });
    console.log("comlepted doc " + pendingCount);
  }
}

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

  if (!query) {
    return res.status(400).send("Please Enter a message");
  }

  try {
    const embeddingResponse = await modelEmd.embedContent(query);
    const embedding = embeddingResponse.embedding.values;
    const history = await supabaseClient.from("history").select();

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
    const text = await response.text(); // Make sure to await the text method
    console.log(text);

    // Save to history
    await supabaseClient.from("history").insert({
      content: query,
    });

    res.send(text); // Send the response as text
  } catch (error) {
    console.error("Error handling query:", error);
    res.status(500).send("Internal Server Error");
  }
};

app.put("/getResponse", getQuery);
