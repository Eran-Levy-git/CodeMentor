const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Code block data
const codeBlocks = [
  { id: 1, title: 'Async case', code: 'async function fetchData() {\n  // Async code here\n}' },
  { id: 2, title: 'Promises', code: 'function fetchData() {\n  return new Promise((resolve, reject) => {\n    // Promise code here\n  });\n}' },
  { id: 3, title: 'Callbacks', code: 'function fetchData(callback) {\n  // Callback code here\n}' },
  { id: 4, title: 'Event handling', code: 'document.addEventListener("click", (event) => {\n  // Event handling code here\n});' }
];

// Set up the view engine (EJS)
app.set('view engine', 'ejs');

// Set up the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Implement routes
app.use(express.static('public'));

// Route for the lobby page (index.html)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Route for the code block page (code-block.html)
app.get('/code-block/:id', (req, res) => {
    // Get the code block ID from the URL parameter
    const codeBlockId = parseInt(req.params.id, 10);


    // Find the code block in the sample data
    const selectedCodeBlock = codeBlocks.find((block) => block.id === codeBlockId);
    
    // If the code block is found, render the code-block.ejs template with the code block data
    if (selectedCodeBlock) {
    res.render('code-block', { codeBlock: selectedCodeBlock });
    } else {
    // If the code block is not found, display an error message
    res.status(404).send('Code block not found.');
    }
    });
