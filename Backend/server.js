const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors()); 
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

app.post('/chat', async (req, res) => {
  console.log("Got a request! Body:", req.body);
  try {
    const { model, messages } = req.body;

    const response = await openai.chat.completions.create({
      model: model || "gpt-3.5-turbo", 
      messages: messages,
    });

    console.log("OpenAI Response successful!");
    res.json(response.choices[0].message); 
  } catch (error) {
    console.error("DETAILED ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});



const PORT = process.env.PORT || 3030;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));