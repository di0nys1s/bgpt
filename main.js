const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI();

app.post("/chat", async (req, res) => {
  try {
    const content = req.body.prompt;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content }],
      max_tokens: 1000,
    });

    res.send(response.choices[0].message);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

app.listen(8000, () => console.log("Server running on port 8000"));
