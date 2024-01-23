
const app = require('express')();
const PORT = 8080;


//endpoint for specific program
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//endpoint for all programs
app.get('/all', (req, res) => {
    res.send('Hello World!');
});

app.listen(
    PORT, 
    () => console.log(`Server running on port ${PORT}`)
);