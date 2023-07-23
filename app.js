const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

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

app.get('/code-block/:id', (req, res) => {
    const codeBlockId = parseInt(req.params.id, 10);
    const selectedCodeBlock = codeBlocks.find((block) => block.id === codeBlockId);

    if (selectedCodeBlock) {
        res.render('code-block', { codeBlock: selectedCodeBlock });
    } else {
        res.status(404).send('Code block not found.');
    }
});

io.on('connection', (socket) => {
    let isMentor = false;

    // Handle the first user (mentor) who opens the code block page
    socket.on('set-mentor', () => {
        if (!isMentor) {
            isMentor = true;
            socket.emit('is-mentor', true);
        }
    });

    // Emit code block data to new students
    socket.on('join-as-student', () => {
        if (!isMentor) {
            socket.emit('code-update', codeBlocks[0].code);
        }
    });

    // Handle code updates from students
    socket.on('code-update', (code) => {
        if (!isMentor) {
            socket.broadcast.emit('code-update', code);
            // Bonus feature: Check if student's code matches the solution
            const currentCodeBlockId = parseInt(socket.handshake.headers.referer.split('/').pop(), 10);
            const currentCodeBlock = codeBlocks.find((block) => block.id === currentCodeBlockId);
            if (currentCodeBlock && code === currentCodeBlock.solution) {
                socket.emit('correct-solution');
            } else {
                socket.emit('incorrect-solution');
            }
        }
    });
});

http.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
