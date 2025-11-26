const express = require('express');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', apiRoutes);

async function startServer (){
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Serves running on http://localhost:${PORT}`);
    });
}
startServer();
