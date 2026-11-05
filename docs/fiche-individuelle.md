# Fiche individuelle

> Une page, avant la livraison. Prénom, nom, compte GitHub : 
CHEICK OUMAR SERIFOU
https://github.com/miantomaoumar-netizen

1. **Une fonction que j'ai écrite**, et comment elle marche :  `chargerJson(chemin)`, dans `src/stockage.js`. Elle lit le fichier JSON des plants et renvoie le tableau qu'il contient, pour que l'application puisse afficher l'inventaire au démarrage.
   - Elle est `async` parce que lire un fichier prend du temps, et `await` attend la fin de la lecture avant de continuer.
   - `readFile(chemin, 'utf8')` lit le fichier et donne son contenu sous forme de texte.
   `JSON.parse(contenu)` transforme ce texte en vrai tableau JavaScript, que la fonction renvoie.
   - Sa partenaire `enregistrerJson` fait l'inverse : `JSON.stringify(enregistrements, null, 2)` met le tableau en texte indenté de 2 espaces, puis `writeFile` l'écrit dans le fichier.


2. **Une difficulté, et sa solution** : Ma difficulté était sur le changement de l'adresse su debut après le clonage du projet, il fallait que je change pour y mettre mon accès et sa solution était de taper la commande git remote set-url origin https://github.com/miantomaoumar-netizen/brief-2-inventaire-pepiniere.git


3. **L'entraide** (qui m'a aidé, qui j'ai aidé, sur quoi) : Je remercie Mr Kamagate Salia pour m'avoir aider à changer d'adresse pour pouvoir faire mes commits sur Github
