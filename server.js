const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Route to handle chatbot requests
app.post('/api/chat', async (req, res) => {
    const userInput = req.body.input;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userInput }],
                max_tokens: 150
            })
        });

        const data = await response.json();
        res.json(data.choices[0].message.content);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching response from OpenAI.");
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
