const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const questions = {
  Technology: [
    { id: 1, question: 'What is your preferred IDE?' },
    { id: 2, question: 'Do you contribute to open source projects?' },
  ],
  Health: [
    { id: 1, question: 'How many hours do you sleep daily?' },
    { id: 2, question: 'Do you follow a specific diet plan?' },
  ],
  Education: [
    { id: 1, question: 'Do you prefer online courses over traditional classes?' },
    { id: 2, question: 'Have you published any research papers?' },
  ],
};

app.get('/questions', (req, res) => {
  const { topic } = req.query;
  res.json(questions[topic] || []);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
