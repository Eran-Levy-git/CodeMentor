const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Sample code block data (replace this with your actual data)
const codeBlocks = [
    { id: 1, title: 'Async case', code: 'async function fetchData() {\n  // Async code here\n}', solution: 'async function fetchData() {\n  return fetch("https://api.example.com/data");\n}' },
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
        res.render('code-block', { codeBlock: selectedCodeBlock , isFirst: isFirst});
        isFirst = false
    } else {
        res.status(404).send('Code block not found.');
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // Listen for code changes from clients and broadcast to others
    socket.on('code-change', (data) => {
        // Broadcast the updated code to all connected clients (including the sender)
        socket.emit('codeUpdate', data);
    });
});
io.on('connection', (socket) => {
    socket.on('code-change', (data) => {
        io.emit('code-change', data);
    });
});


  const ip = '192.168.1.160';
server.listen(3000, ip, () => {
    console.log(`listening on ${ip}:${3000}`);
  });
