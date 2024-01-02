const app = require('express')();
const PORT = 8080;

app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.listen(
    PORT, 
    () => console.log(`Server running on port ${PORT}`)
);