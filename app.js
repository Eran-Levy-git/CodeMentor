const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const WebSocket = require('ws');

// Sample code block data (replace this with your actual data)
const codeBlocks = [
    { id: 1, title: 'Async case', code: 'async function fetchData() {\n  // Async code here\n}', solution: 'E=MC^2' },
    { id: 2, title: 'Promises', code: 'function fetchData() {\n  return new Promise((resolve, reject) => {\n    // Promise code here\n  });\n}', solution: 'function fetchData() {\n  return new Promise((resolve, reject) => {\n    resolve("Data loaded successfully");\n  });\n}' },
    { id: 3, title: 'Callbacks', code: 'function fetchData(callback) {\n  // Callback code here\n}', solution: 'function fetchData(callback) {\n  setTimeout(() => {\n    callback("Data loaded successfully");\n  }, 2000);\n}' },
    { id: 4, title: 'Event handling', code: 'document.addEventListener("click", (event) => {\n  // Event handling code here\n});', solution: 'document.addEventListener("click", (event) => {\n  console.log("Clicked!");\n});' }
];

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

let isFirst = true;

app.get('/code-block/:id', (req, res) => {
    const codeBlockId = parseInt(req.params.id, 10);
    const selectedCodeBlock = codeBlocks.find((block) => block.id === codeBlockId);
    if (selectedCodeBlock) {
        res.render('code-block', { codeBlock: selectedCodeBlock, isFirst: isFirst });
        isFirst = false;
    } else {
        res.status(404).send('Code block not found.');
    }
});

const wss = new WebSocket.Server({ server });


wss.on('connection', (ws) => {
    ws.on('message', data =>  {
        const parsed = JSON.parse(data)
        if (parsed == 'Mentor'){
            isFirst = true;
        }
        else{
        // Broadcast the received message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(parsed));
            }
        });
        }
    });
});


// server.listen(3000, () => {
//     console.log(`Server started on port 3000`);
//   });
  
// Use PORT provided in environment or default to 3000
const port = process.env.PORT || 3000;

server.listen(port, "0.0.0.0", function () {
    // ...
});
