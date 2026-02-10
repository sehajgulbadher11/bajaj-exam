# SehajGulbadher_2310991046_sehaj1046.be23@chitkara.edu.in_

Welcome!
This repository contains the backend solution for the Qualifier Exam. It is a serverless Node.js REST API that performs mathematical operations and basic AI-based question answering.
The project is lightweight, easy to understand, and deployed on Vercel for fast and scalable performance.

🚀 What Does This API Do?
This API accepts JSON input and performs different operations based on the request:


Generate Fibonacci sequences


Filter prime numbers


Calculate LCM and HCF


Answer questions using Google Gemini AI


Provide a health check endpoint


All responses follow a consistent structure and include your registered email.

🛠 Tech Stack


Node.js (18.x)


Serverless Functions


Vercel Deployment


Google Gemini 1.5 Flash AI



📦 Getting Started
Prerequisites
Make sure you have:


Node.js (v18 recommended)


A valid Google Gemini API Key



⚙ Configuration
The application uses environment variables for configuration.
Variable NameDescriptionOFFICIAL_EMAILYour registered email (example: your_email@bajajfinserv.in)GEMINI_API_KEYGoogle Gemini API key for AI responses
👉 You can set these:


In Vercel Environment Variables (recommended)


Or directly inside api/bfhl.js for local testing



📡 API Usage
Endpoint
POST /api/bfhl

Send a JSON body with one operation at a time.

🔢 Mathematical Operations
Fibonacci Sequence
Returns the first n Fibonacci numbers.
Request
{ "fibonacci": 7 }

Response
[0, 1, 1, 2, 3, 5, 8]


Prime Number Filter
Filters only prime numbers from a list.
Request
{ "prime": [2, 4, 7, 9, 11] }

Response
[2, 7, 11]


LCM (Least Common Multiple)
Request
{ "lcm": [12, 18, 24] }

Response
72


HCF (Highest Common Factor)
Request
{ "hcf": [24, 36, 60] }

Response
12


🤖 AI Feature (Gemini)
The API uses Google Gemini 1.5 Flash to answer questions.
⚠️ Important Rule:
Only the first word of the AI response is returned (without punctuation).
Example
Request
{ "AI": "What is the capital of India?" }

Response
{
  "is_success": true,
  "official_email": "your_email@example.com",
  "data": "New"
}

(Gemini answered “New Delhi”, API extracted only “New”)

❤️ Health Check
To verify the API is running:
GET /api/health

Returns a simple success response.

📂 Code Structure


api/bfhl.js → Main API logic


Clean, readable, and easy to review for evaluation



✅ Final Notes


One request = one operation


Designed strictly as per qualifier requirements


Optimized for clarity, correctness, and deployment


Happy coding 🚀
