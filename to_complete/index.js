const express = require('express');
const jwt = require('jsonwebtoken');
const isAuthenticated = require('./middleware/authMiddleware'); // Assurez-vous que votre middleware authMiddleware est correctement configuré
var cookieParser = require('cookie-parser');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

//import du tableau users
const users = require('./models/users.json');


app.get('/login', (req, res) => {
  res.send(`
        <html>
            <body>
                <h2>Login</h2>
                <form action="/login" method="POST">
                    <label for="username">Username:</label><br>
                    <input type="text" id="username" name="username"><br>
                    <label for="password">Password:</label><br>
                    <input type="password" id="password" name="password"><br><br>
                    <input type="submit" value="Submit">
                </form>
            </body>
        </html>
    `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // TODO: Rediriger l'utilisateur vers la route `/user`
    // Créer un token JWT pour l'utilisateur
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    // Stocke le token dans un cookie (methode du cookieParser)
    res.cookie('auth_token', token, { httpOnly: true });
    // Redirige l'utilisateur vers la route /user
    return res.redirect('/user');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// TODO: Ajouter un middleware pour l'authentification avec JWT
app.get('/user', isAuthenticated, (req, res) => {
  res.json({ message: 'Welcome, user!' });
});

// TODO: Ajouter un middleware pour l'authentification avec JWT
app.get('/admin', isAuthenticated, (req, res) => {
  if (req.user.role === 'admin') {
    res.json({ message: 'Welcome, admin!' });
  } else {
    res.status(403).send('Access denied');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



/* 
Sources pour compléter les TODO:
- Outil d'encodage décodage de JWT : https://jwt.io/
  - Vérification de la validité du JWT : https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
  - Stockage du JWT dans un cookie : https://www.npmjs.com/package/cookie-parser
*/
