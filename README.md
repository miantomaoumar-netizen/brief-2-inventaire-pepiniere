# Inventaire de la pépinière

> Projet individuel du SAS DFS, brief 2 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte
 Cet outil est destiné au responsable d'une pépinière pédagogique, qui suit ses plants au quotidien. il observe les etiquettes, compte les plants de chaque espèce et reporte la classification botanique fournie. Son besoin est de retrouver rapidement une espèce de connaitre son groupe botanique et de voir les quantités disponibles. Il saisit au clavier, à travers un menu dans le terminal, le code de son espèce, son nom commun, son groupe, son nombre de plants et la date relevé. Le programme lui affiche la liste des inventaires, les résultats d'une recherche par code et une synthèse : stock total, espèces et plants par groupe, espèce la plus abondante et stocks faibles (10 plants ou moins). L'outil ne reconnait pas les espèces : le groupe botanique vient de la fiche fournie par le coach, et les indications certaines sont signalées.

## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-2-inventaire-pepiniere.git
cd brief-2-inventaire-pepiniere
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [x] Données lues et enregistrées dans `donnees/plants.json`
- [x] Ajouter un plant, saisies invalides refusées sans arrêter le programme
- [x] Lister l'inventaire, message si l'inventaire est vide
- [x] Rechercher par code ou par nom ; filtrer par groupe botanique
- [x] Trier par nombre de plants
- [x] Synthèse : stock total, espèces et plants par groupe, espèce la plus abondante, stocks faibles (≤ 10 plants)
- [ ] Bonus : supprimer et modifier un plant (choix 6 et 7)
- [ ] Bonus : tri décroissant, groupe le plus fourni 

## Données
Le fichier `donnees/plants.json` contient 11 lignes, une par espèce. Chaque ligne a cinq champs: `id`, `nomCommun`, `groupe`, `nombrePlants`, `dateReleve` (voir[Dictionnaire des données](docs/dictionnaire-donnees.md)). L'unité est le plant et les données sont fictives et les groupes botaniques sont fournis par le coach

## Limites

✏️ *Au moins trois. Par exemple : le seuil de 10 plants est un repère de suivi, pas une recommandation de production.*

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

CHEICK OUMAR SERIFOU
https://github.com/miantomaoumar-netizen
Entraide :
