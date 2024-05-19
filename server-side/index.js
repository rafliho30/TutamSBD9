const express = require('express');
var cors = require('cors');

const { pool } = require('./config/db.config.js');
const NotesController = require('./routes/NotesRoute.js');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use('/my-notes', NotesController)


pool.connect(() => {
    console.log('Connected to database from port 5432');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
