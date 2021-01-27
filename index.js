const fs = require('fs');
const express = require('express');
const app = express();
const accounts = require('./accounts.json');

app.put('https://to-do-list-app-api.herokuapp.com//add/:username/:password', (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
    const account = { username: username, password: password };
    accounts.push(account);
    fs.writeFile('./accounts.json', JSON.stringify(accounts), (err) => {
        if (err) console.log(`Error: ${err}`);
        console.log(accounts)
    })
    res.send(accounts);
});

app.get('https://to-do-list-app-api.herokuapp.com//get/:username/:password', (req, res) => {
    const account = accounts.find(c => c.username === req.params.username && c.password === req.params.password);
    if (!account) return res.status(404).send('The account with the given usernmae/password was not found.')
    res.send(account);
})

app.listen(3000, () => console.log('Listening on port 3000...'));
