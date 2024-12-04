### Pour lancer le projet ###
node to_complete/index.js


## La sécurisation par JWT ##

Un JWT (Json Web Token) est un jeton composé de trois parties qui sont encrytées en base64Url afin d'être envoyé facilement par l'url:
- Le header (qui contient le mode d'encryptage et le type de jeton)
- Le payload (qui contient la charge utile, notamment des "claims", c’est-à-dire des informations contextuelles comme l’identifiant 
  de l’utilisateur, son rôle ou d’autres données nécessaires à l’application).
- La signature électronique, qui est générée en combinant un secret (ou une clé privée) avec le header et le payload encodés.


Le JWT est auto-contenu, ce qui veut dire qu’il regroupe à lui seul toutes les informations nécessaires pour valider une requête.
Si une donnée est modifiée dans le payload, par exemple pour tenter de changer un rôle, la signature ne correspondra plus au contenu
et sera automatiquement rejetée. Sans le secret ou la clé privée, il est impossible de générer une signature valide, ce qui renforce la sécurité.

Le jeton ainsi créé est associé à l’utilisateur authentifié et est utilisé pour sécuriser toutes ses requêtes.

Deux façon sont utilisées pour transmettre un token jwt :
- Dans les headers HTTP, via le champ Authorization: Bearer token, pour les appels API.
- Dans un cookie (comme dans ce projet), souvent avec l’attribut HttpOnly et Secure, pour sécuriser les échanges et protéger contre les attaques XSS.

Le JWT est dit stateless, ceci veut dire que le serveur n’a pas besoin de garder en mémoire les infos sur l’utilisateur : tout est déjà dans le jeton. 
Cela rend le système plus léger, surtout pour des applications avec beaucoup de connexions  d’utilisateurs . Par contre, une fois le token créé,
il reste valable jusqu’à expiration, sauf si on met en place un mécanisme spécial pour le révoquer. Une durée de vie courte est donc recommandée avec
un refresh token. 