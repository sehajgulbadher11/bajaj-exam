# BFHL Backend Node.js Project

Hi there! Welcome to the backend repository for the BFHL qualifier exam. This project is a serverless Node.js application designed to handle various mathematical and AI-driven operations.

## What Does This Project Do?

This project exposes a REST API that can perform a variety of tasks based on the input you provide. Whether you need to calculate Fibonacci sequences, find prime numbers, compute LCM/HCF, or even chat with an AI, this API has you covered.

It's built to be lightweight and deployable on Vercel, ensuring fast response times and scalability.

## Getting Started

To get this project up and running locally or to deploy it, you'll need to set up a few things first.

### Prerequisites

- Node.js (Version 18.x recommended)
- A Google Gemini API Key

### Configuration

The project requires a couple of environment variables to function correctly. You can set these in your deployment environment or update them directly in `api/bfhl.js` for local testing (though environment variables are safer!).

| Variable | Description |
| :--- | :--- |
| `OFFICIAL_EMAIL` | Your registered email address (e.g., `your_email@bajajfinserv.in`). This will be included in every API response. |
| `GEMINI_API_KEY` | Your Google Gemini API Key. This is used to power the AI features of the API. |

## How to Use the API

The API endpoint is `POST /api/bfhl`. You send a JSON body with a specific key to trigger different operations.

### 1. Mathematical Operations

You can ask the API to crunch some numbers for you.

- **Fibonacci**: Get the first `n` numbers in the sequence. `n` must be an integer.
  - Input: `{ "fibonacci": 7 }`
  - Output: `[0, 1, 1, 2, 3, 5, 8]`

- **Prime Numbers**: Filter a list to find only the primes.
  - Input: `{ "prime": [2, 4, 7, 9, 11] }`
  - Output: `[2, 7, 11]`

- **LCM & HCF**: Calculate Least Common Multiple or Highest Common Factor.
  - Input: `{ "lcm": [12, 18, 24] }`
  - Output: `72`

- **HCF**: Calculate Highest Common Factor.
  - Input: `{ "hcf": [24, 36, 60] }`
  - Output: `12`

### 2. AI Implementation

We've integrated Google's Gemini 1.5 Flash model to answer your questions. The unique twist? The API creates a concise response by returning **only the first word** of the AI's answer (stripped of punctuation).

- **Example Request**:
  ```json
  { "AI": "What is the capital of India?" }
  ```
- **Example Response**:
  ```json
  {
    "is_success": true,
    "official_email": "your_email@example.com",
    "data": "New"
  }
  ```
  *(Note: The AI likely answered "New Delhi", and our API extracted just "New".)*

## Health Check

Want to make sure everything is running smoothly? Simply hit the health endpoint:
`GET /api/health`

---

Feel free to explore the code in `api/bfhl.js`. We've kept it clean and simple for easy review. Happy coding!
