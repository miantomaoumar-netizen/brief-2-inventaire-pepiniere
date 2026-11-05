// Inventaire de la pépinière — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { GROUPES, ajouterPlant, formaterPlant, listerPlants, trouverParId } from './src/registre.js';
import { filtrerParGroupe, rechercherParNom, trierParNombrePlants } from './src/recherche.js';
import { SEUIL_STOCK_FAIBLE, especeLaPlusAbondante, stocksFaibles, syntheseParGroupe, totalPlants } from './src/synthese.js';

const FICHIER_DONNEES = 'donnees/plants.json';

function afficherMenu() {
  console.log(` 
    --------------------- MENU ---------------------
    1. Ajouter un plant
    2. Lister l'inventaire
    3. Rechercher (code, nom, groupe)
    4. Trier (nombre de plants)
    5. Synthèse des quantités
    0. Quitter`)
}

async function main() {
  ouvrirSaisie();
  console.log("==================================================");
  console.log("  INVENTAIRE DE LA PÉPINIÈRE")
  console.log("  Pépinière pédagogique")
  console.log("==================================================")

  let donnees = [];
  try {
    donnees = await chargerJson (FICHIER_DONNEES)
    console.log(`${donnees.length} espèce(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
  } catch (erreur) {
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. L'inventaire démarre vide.`);
  }

  let continuer = true;
  while (continuer) {
    afficherMenu();
    const choix = await demander(`Votre choix : `);
    if (choix === null) { 
      break;
  }

  try {
    switch (choix) {
      case '1': { 
        console.log(`--- Ajouter un plant ---`);
        const id = (await demander(`Code du plant (ex. N11) :`)).toUpperCase();
        const nomCommun = (await demander(`Nom commun (ex. papayer) :`)).toLowerCase();
        const groupe = (await demander(`Groupe botanique (${GROUPES.join(' ou ')}):`)).toLowerCase();
        const nombrePlants = await demander(`Nombre de plants (entier) :`);
        const dateReleve = await demander(`Date du relevé (AAAA-MM-JJ) :`);

        const erreurs = ajouterPlant(donnees, { id, nomCommun, groupe, nombrePlants, dateReleve});

        if (erreurs.length > 0) {
          for(const erreur of erreurs) {
            console.log(erreur)
          }
        } else { 
      await enregistrerJson(FICHIER_DONNEES, donnees);
      const plantAjout = trouverParId(donnees, id);
      console.log(`Plant $(id) ajouté. L'inventaire compte ${donnees.length} espèce(s).`);
      console.log(formaterPlant(plantAjout));
     }
      break;
    }

      case '2':
      console.log(listerPlants(donnees));
      break;

      
      case '3': 
      case '4':
      case '5':
        throw new Error('TODO : pas encore codé');
     
      
      
      case 'O':
      console.log(`Au revoir !`);
      continuer = false;
      break;

      default:
        console.log(`Choix inconnu: « ${choix} ».Tapez un chiffre du menu.`);
       }
   } catch (erreur) { 
    if (erreur.message.startsWith(`TODO`)){
      console.log(`À compléter : ${erreur.message}`);
     }else{ 
      console.log(`Erreur inattendue : ${erreur.message}`);
    }
   }
  }
  fermerSaisie();
 }
 
main();
