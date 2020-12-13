const cardRouter = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const cardPath = path.join('./data', 'cards.json');

cardRouter.get('/cards', (req, res) => {
  fs.readFile(cardPath, 'utf-8')
    .then((data) => {
      const resData = JSON.parse(data);
      res.status(200).json(resData);
    }).catch(() => {
      res.status(500).json({ message: 'Ошибка при чтении' });
    });
});

module.exports = cardRouter;
