const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());

const fruits = [
  {
    name: 'Orange Juice',
    category: 'Drinks',
    price: 14.99,
    id: '46313244dfsafsa561321',
  },
  {
    name: 'Apples',
    category: 'fruits',
    price: 4.99,
    id: '465613fdsafsa21131231321',
  },
  {
    name: 'Tomatos',
    category: 'vegetables',
    price: 6.39,
    id: '462414fdsafa561321',
  },
  {
    name: 'Coffee',
    category: 'Drinks',
    price: 3.15,
    id: '4656fdasfa142141321',
  },
  {
    name: 'Sweet Paper',
    category: 'Vegetables',
    price: 12.15,
    id: '46561421fasafs41321',
  },
  {
    name: 'Grapes',
    category: 'FRUITS',
    price: 20.49,
    id: '46561fdasfa421414321',
  },
  {
    name: 'Pears',
    category: 'Fruits',
    price: 1.35,
    id: '4656142421fdasfa41141321',
  },
  {
    name: 'Team',
    category: 'Drinks',
    price: 0.4,
    id: '4656121413fdas4213131321',
  },
];

app.put('/fruits', (req, res) => {
  const fruit = fruits.find((fruit) => req.body.id === fruit.id);

  fruit.nameUser = req.body.nameUser;
  fruit.number = req.body.number;

  res.send(fruits);
  res.sendStatus(201);
});

app.get('/fruits', (req, res) => {
  res.send(JSON.stringify(fruits));
});

app.listen(8888, () => {
  console.log('server is working');
});
