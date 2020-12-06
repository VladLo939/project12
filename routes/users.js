const userRouter = require('express').Router();
const fs = require('fs').promises;

userRouter.get('/users', (req, res) => {
  fs.readFile('./data/users.json', 'utf-8')
    .then((users) => {
      // eslint-disable-next-line no-param-reassign
      users = JSON.parse(users);
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(404).json({ message: 'Ошибка при чтении' });
    });
});

userRouter.get('/users/:id', (req, res) => {
  fs.readFile('./data/users.json', 'utf-8')
    .then((data) => {
      const idToSearch = req.params.id;
      // eslint-disable-next-line no-underscore-dangle
      const user = JSON.parse(data).find((item) => item._id === idToSearch);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
    }).catch(() => {
      res.status(500).json({ error: 'На сервере произошла ошибка' });
    });
});

module.exports = userRouter;
