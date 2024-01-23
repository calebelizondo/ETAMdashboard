const app = require('express')();
const PORT = 8080;

// Endpoint for all programs
app.get('/get-all-trends', (req, res) => {
    res.send('Get all trends!');
});

// Endpoint for specific program
app.get('/get-specific-program', (req, res) => {
    res.send('Get specific program!');
});

app.listen(
    PORT, 
    () => console.log(`Server running on port ${PORT}`)
);
