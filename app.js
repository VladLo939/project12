const path = require('path');
const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/cards', cardRouter);
app.get('/users', userRouter);
app.get('/users/:id', userRouter);
app.use((req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

app.listen(PORT, () => {
});
