const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors());

// Forward API requests to OpenAI
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://api.openai.com/v1',
    changeOrigin: true,
    headers: {
      Authorization: `Bearer YOUR_OPENAI_API_KEY`,
    },
  })
);

app.post('/chat', (req, res) => {
  const { message } = req.body;
  // Send the message to OpenAI and return the response
  const reply = `This is a sample bot reply to "${message}"`; // Replace this with your OpenAI integration code
  res.json({ reply });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
