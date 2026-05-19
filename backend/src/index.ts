import express from 'express';

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3002;
app.get('/hi', (req, res) => {
    res.send('Hello World!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});