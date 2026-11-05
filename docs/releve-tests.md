# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** : refaites à la main les résultats de référence de `SUJET.md`, puis comparez avec votre programme. 

Stock Total : 30 + 45 + 20 + 50 + 25 + 18 + 12 + 22 + 8 + 10 = 240
Angiospermes : 8 espèces  et Gymnospermes : 2 espèces
Plants angiosperme : 30 + 45 + 20 + 50 + 25 + 18 + 12 + 22 = 222
Plants gymnosperme : 8 + 10 = 18
Les lignes à 10 ou moins sont N09(pin) et N10(cycas) : 8 + 10 = 18 plants

**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action | Attendu | Obtenu | Testeur |
| --- | --- | --- | --- |
| Ajouter plant N11 valide | Plant ajouté | Plant 011 ajouté,l'inventaire compte 11 espèce(s) | moi |
| Ajouter N01 valide | le Plant est refusé | Cet id existe déja |moi |
|Voir la liste de l'inventaire |Liste de l'inventaire |la liste de l'inventaire et les ajouts |moi |
| Rechercher par nom de l'espèce | les infos de l'èspece |l'espèce cherché | moi |
| Trier les nombres de plants| trier par nombre de plants croissant |le nombre de plants croissant | moi |
| Synthèse des quantités | informations sur notre inventaire | synthèse de l'inventaire | moi |

**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : 
Kamagate Salia
Kone Pagadjoufougou
Toure Emmannuel
