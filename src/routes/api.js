const { Router } = require('express');
const app = Router();
const User = require('../controllers/User');

app.get('/users', User.index);
app.delete('/users/:userId', User.remove);
app.post('/auth/signup', User.create);
app.post('/auth/login', User.login);

app.get('/users/:useremail', User.getByEmail);



module.exports = app;