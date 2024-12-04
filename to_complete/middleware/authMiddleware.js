const jwt = require('jsonwebtoken');
//donne accès aux variables d'environnement
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>} si le token est valid return true => next();
 */
module.exports = async function isAuthenticated(req, res, next) {
    // TODO: Récupérer le token dans les cookies et vérifier s'il est valide avec la méthode `jwt.verify`
    const token = req.cookies.auth_token;

        if (!token) {
        // TODO: Si le token est invalide, retourner une erreur 401
        return res.status(401).json({ message: 'Access denied: No token provided' });
        }
            // TODO: vérification du token avec jwt.verify
            try {
            // TODO: une fois le token récupéré, si il est valide, il est ajouté à la requete du user
            const decoded = await jwt.verify(token, SECRET_KEY);

            req.user = decoded;

            // permet de passer à la route suivante
            next();
            } catch (err) {
            // Si le token est invalide ou expiré, renvoie une erreur
            return res.status(401).json({ message: 'Access denied: Invalid or expired token' });
            }
};

