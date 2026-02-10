const axios = require('axios');

module.exports = async (req, res) => {
    const official_email = process.env.OFFICIAL_EMAIL || "sehaj1046.be23@chitkara.edu.in";
    const apiKey = process.env.GEMINI_API_KEY || "AIzaSyAV7Df8A864jja9RMajpoUCd7bpfe5L5Z8";

    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({
            is_success: false,
            official_email,
            error: "Method Not Allowed"
        });
    }

    const { body } = req;

    if (!body || typeof body !== 'object') {
        return res.status(400).json({
            is_success: false,
            official_email,
            error: "Invalid request body"
        });
    }

    const keys = Object.keys(body);
    if (keys.length !== 1) {
        return res.status(400).json({
            is_success: false,
            official_email,
            error: "Request body must contain exactly one key"
        });
    }

    const key = keys[0];
    const value = body[key];

    try {
        let result;

        switch (key) {
            case 'fibonacci':
                result = handleFibonacci(value);
                break;
            case 'prime':
                result = handlePrime(value);
                break;
            case 'lcm':
                result = handleLCM(value);
                break;
            case 'hcf':
                result = handleHCF(value);
                break;
            case 'AI':
                result = await handleAI(value, apiKey);
                break;
            default:
                return res.status(400).json({
                    is_success: false,
                    official_email,
                    error: "Unsupported key"
                });
        }

        return res.status(200).json({
            is_success: true,
            official_email,
            data: result
        });

    } catch (error) {
        console.error(error);
        return res.status(error.statusCode || 500).json({
            is_success: false,
            official_email,
            error: error.message || "Internal Server Error"
        });
    }
};

function handleFibonacci(n) {
    if (!Number.isInteger(n) || n < 0) {
        throw { statusCode: 400, message: "Input must be a non-negative integer" };
    }

    if (n > 100) {
        throw { statusCode: 400, message: "Input cannot exceed 100" };
    }

    if (n === 0) return [0];
    if (n === 1) return [0, 1];

    const seq = [0, 1];
    for (let i = 2; i <= n; i++) {
        seq.push(seq[i - 1] + seq[i - 2]);
    }
    return seq.slice(0, n);
}


function handlePrime(arr) {
    if (!Array.isArray(arr)) {
        throw { statusCode: 400, message: "Input must be an array" };
    }
    return arr.filter(num => {
        if (!Number.isInteger(num)) return false;
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    });
}

function handleLCM(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw { statusCode: 400, message: "Input must be a non-empty array" };
    }
    if (!arr.every(Number.isInteger)) {
        throw { statusCode: 400, message: "All inputs must be integers" };
    }

    const gcd = (a, b) => (!b ? a : gcd(b, a % b));
    const lcm = (a, b) => (a * b) / gcd(a, b);

    return arr.reduce((acc, curr) => lcm(acc, curr));
}

function handleHCF(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw { statusCode: 400, message: "Input must be a non-empty array" };
    }
    if (!arr.every(Number.isInteger)) {
        throw { statusCode: 400, message: "All inputs must be integers" };
    }

    const gcd = (a, b) => (!b ? a : gcd(b, a % b));

    return arr.reduce((acc, curr) => gcd(acc, curr));
}

async function handleAI(question, apiKey) {
    if (typeof question !== 'string') {
        throw { statusCode: 400, message: "Input must be a string" };
    }

    if (!apiKey) {
        throw { statusCode: 500, message: "Server misconfiguration: No API Key" };
    }

    try {

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await axios.post(url, {
            contents: [{
                parts: [{ text: question }]
            }]
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const candidate = response.data.candidates?.[0];
        const text = candidate?.content?.parts?.[0]?.text || "";

        if (!text) {
            throw new Error("Empty response from AI");
        }

        const content = text.trim();
        const firstWord = content.split(/\s+/)[0];
        return firstWord.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    } catch (error) {
        console.error("AI API Error:", error.response ? error.response.data : error.message);
        throw { statusCode: 500, message: "Error communicating with AI service" };
    }
}
