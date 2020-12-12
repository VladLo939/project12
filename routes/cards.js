const cardRouter = require('express').Router();
const fs = require('fs').promises;

cardRouter.get('/cards', (req, res) => {
  fs.readFile('./data/cards.json', 'utf-8')
    .then((data) => {
      const resData = JSON.parse(data);
      res.status(200).json(resData);
    }).catch(() => {
      res.status(500).json({ message: 'Ошибка при чтении' });
    });
});

module.exports = cardRouter;
