import { createClient } from "@supabase/supabase-js";
// import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";


// intialize supabase client
const supabaseClient = createClient("https://qqiwyxoyegggabkrsazd.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxaXd5eG95ZWdnZ2Fia3JzYXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzMjgwMzEsImV4cCI6MjAzNjkwNDAzMX0.e7IxYrWBiEGw5q0bmbcWKYWW6EjpApi8QcGcKPC4bIw")

// generate embeddings
async function generateEmbeddings() {
    // intialize openai API
    // const openai = new OpenAI({apiKey: 'sk-proj-4E6i7f4FrcOfD8uMLL1eT3BlbkFJDI4rSBzWbfX2INsssQAh'})
    const apiKey = 'AIzaSyBdAC5ms1f3Sp43AyoMQ26izDEEgimW-JM'; // Replace with your actual key


    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
    model: "text-embedding-004",
    });


    // custom data

    const documents = ["Linkedin link: (https://www.linkedin.com/in/mohan-bhyravabhotla-bb44b35), Fullname: (Mohan Bhyravabhotla), State: (California), Employers: (Oracle Corp.; Sun Micro Systems; Fujitsu ICIM; DDE ORG Systems), Experience: (Sr. Director, Oracle Cloud Production Engineering; Systems - Consultant; Territory Services Manager; Customer Support Engineer), job title: ()","Linkedin link: (https://www.linkedin.com/in/veronica-villano-3352037), Fullname: (Veronica Villano), State: (California), Employers: (PP Sothebys Realty), Experience: (Real Estate Agent), job title: (Real Estate Agent at PP Sothebys Realty)","Linkedin link: (https://www.linkedin.com/in/anh-ko-4a894b16), Fullname: (Anh Ko), State: (California), Employers: (Kaiser Permanente; Kaiser Permanente; Kaiser Permanente; Kaiser Permanente; Wells Fargo Bank; Wells Fargo Financial), Experience: (Senior Manager, Delivery System Strategy; Interim, Executive Consultant to NCAL COO of Hospital and Health Plan at Kaiser; Business Consultant Specialist; Consultant/Sr Finance Analyst/Senior Consultant; Business Specialist; Store Manager), job title: ()","Linkedin link: (https://www.linkedin.com/in/hollymcclain), Fullname: (Holly McClain, M.Ed), State: (), Employers: (Holly McClain Coaching; The NADP-The National Association of Divorce Professionals; Center Joint Unified School District; Santa Clara Unified School District; Job Rooster; Fremont Unified School District), Experience: (Certified Life Coach ; Senior Education Coordinator; School Counselor; Guidance Counselor; Employment Specialist; Educator), job title: (Counselor and Certified Life Coach | Supporting teens and young adults)","Linkedin link: (https://www.linkedin.com/in/haydenmckeeperry), Fullname: (Hayden Perry), State: (California), Employers: (The Stylish Sabbatical; MIXT; f'real foods; f'real foods; PayPal; Peet's Coffee; Peet's Coffee; Independent Marketing Consultant; Tucker Alan Inc.; Williams Sonoma, Inc.; Aidells Sausage Company; Safeway Inc.; Ford Motor Company), Experience: (Founder; Vice President of Marketing; Senior Director of Marketing; Director of Marketing; Head of Consumer Growth Marketing for Xoom, a PayPal Service; Director of Marketing; Senior Marketing Manager; Consultant; Consultant and Senior Consultant; Marketing Manager; Associate Brand Manager; Analyst; Marketing Leadership Intern), job title: (marketing executive turned entrepreneur)","Linkedin link: (https://www.linkedin.com/in/aaron-m-gabriel-cfp®-cima®-8742796), Fullname: (Aaron M. Gabriel, CFP®, CIMA®), State: (California), Employers: (The Gabriel Group; The Gabriel Group; A.G. Edwards; KEMPER Securities; Franklin/Templeton Group), Experience: (President; Branch Manager / Senior V.P., Investments; V.P.-INVESTMENTS, CFP, CIMA; V.P.-Investments; Management Training Program), job title: (President at The Gabriel Group. Branch Manager, Raymond James)","Linkedin link: (https://www.linkedin.com/in/missy-norquist-5858241), Fullname: (Missy Norquist), State: (California), Employers: (Apple Inc.; Apple Inc.; National Semiconductor; National Semiconductor; National Semiconductor), Experience: (People Privacy Leader; Recruiting Operations/Recruiting Compliance Manager; Global Staffing Operations Manager; Staffing Program Manager; University Recruiter), job title: (People Privacy)","Linkedin link: (https://www.linkedin.com/in/denis-mcgue), Fullname: (Denis McGue), State: (), Employers: (RETIRED!; McWhorters Stationers; Drug Plastics and Glass Co., Inc.; PMZ Real Estate), Experience: (RETIRED!; Assistant Manager; Account Manager; Commercial Real Estate Agent), job title: (Working at what God puts in front of me.)","Linkedin link: (https://www.linkedin.com/in/christina-nguyen-jones-10ab5242), Fullname: (Christina Nguyen-Jones), State: (), Employers: (Self-employed; Alexander Doll Company, Inc.; Avalon Apparel; Active Apparel Group; RTA; MATE the Label; Topson Downs of California, Inc.; AG Jeans; APOLLO  APPAREL; Rachel Roy; Nordstrom), Experience: (Independent Contractor: Fashion Broker, Production, Tech Design, Product Development; Design Associate / Patternmaker; Technical Designer; Senior Technical Designer; Production Technical Designer; Development & Production Manager; Technical Designer; Contemporary Technical Designer; Denim Designer; Design Assistant; Salesperson/ Customer Care), job title: (Production, Tech Design, Product Development Professional)","Linkedin link: (https://www.linkedin.com/in/bill-gegg-a6474623), Fullname: (Bill Gegg), State: (California), Employers: (None; City of Antioch), Experience: (Retired but volunteering; Director of Information Systems), job title: (Retired but volunteering at Monument Crises Center)"]
    
    let pendingCount = 0;

    for (const document of documents) {
        pendingCount++;
        const input = document.replace(/\n/g, '');
        console.log("pending doc "+pendingCount+"...")

        // turn each string in an embedding

        // const embeddingResponse = await openai.embeddings.create({
        //     model: "text-embedding-ada-002",
        //     input
        // })

        // const [{ embedding }] = embeddingResponse.data.data;

        const embeddingResponse = await model.embedContent(input);
        const embedding = embeddingResponse.embedding.values;

        // store the embedding in our DB

        await supabaseClient.from('documents').insert({
            content: document,
            embedding
        })
        console.log("comlepted doc "+pendingCount)
        
    }

}

async function askQuestion() {
    try {
      const { data, error } = await supabaseClient.functions.invoke('ask_custom_data', {
        body: JSON.stringify({ query: "What is Mohan Bhyravabhotla experiences?" }),
      });
  
      if (error) {
        console.error('Error calling Edge Function:', error);
        return;
      }
  
      // Assuming data is a JSON string
      const parsedData = JSON.parse(data);
      console.log('Function response:', parsedData);
    } catch (error) {
      console.error('Unexpected error:', error);
    }
}

import { FunctionsHttpError, FunctionsRelayError, FunctionsFetchError } from '@supabase/supabase-js'

const { data, error } = await supabaseClient.functions.invoke('hello', {
  headers: { 'my-custom-header': 'my-custom-header-value' },
  body: { name: 'bar' },
})

if (error instanceof FunctionsHttpError) {
  const errorMessage = await error.context.json()
  console.log('Function returned an error', errorMessage)
} else if (error instanceof FunctionsRelayError) {
  console.log('Relay error:', error.message)
} else if (error instanceof FunctionsFetchError) {
  console.log('Fetch error:', error.message)
}
  
askQuestion();
