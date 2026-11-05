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

      case '0':
      console.log(`Au revoir !`);
      continuer = false;
      break;

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
      
    }
    break;

      case '2': 
      console.log(listerPlants(donnees));
      break;

      
      case '3': {
        console.log('--- Rechercher ---');
        console.log('1. Par code');
        console.log('2. Par nom commun');
        console.log("3.espèces d'un groupe botanique");
        const sousChoix = await demander('Votre choix : ')
        // if (sousChoix === null){break} 
        

        if (sousChoix === '1'){
          const saisie = await demander('code : ');
          // if (saisie === null)
          //   break;
          const code = saisie.toUpperCase();
          const plant = trouverParId(donnees, code);
          if (plant) {
            console.log(formaterPlant(plant));
           }else{ 
            console.log(`Plant ${code} introuvable.`);
          }
           }else if (sousChoix === '2') {
            const saisie = await demander(`Nom ou partie du nom : `);
            // if (saisie === null)
            //   break;
            const texte = saisie.toLowerCase();
            const trouves = rechercherParNom(donnees, texte);
            console.log(`${trouves.length} espèce(s) dont le nom contient « ${texte} » :`);
            console.log(listerPlants(trouves));
           }else if (sousChoix === '3') {
            const saisie = await demander(`Groupe(angiosperme ou gymnosperme):`);
            // if (saisie === null)
            //   break;
            const groupe = saisie.toLowerCase();
            const trouves = filtrerParGroupe(donnees, groupe);
            console.log(`${trouves.length} espèce(s) du groupe ${groupe}:`);
            console.log(listerPlants(trouves));
            }else{ 
              console.log(`Choix inconnu : retour au menu.`)
            }
            
           }
           break;
    
      case '4': {
        console.log(`--- Trier ---`);
        console.log(`1. Par nombre de plants croissant`);
        const sousChoix = await demander(`Votre choix: `);
        // if (sousChoix === null)
        //   break;
        if (sousChoix === '1') {
        console.log (listerPlants(trierParNombrePlants(donnees)));
     }else{ 
      console.log(`Choix inconnu : retour au menu.`);
     }
     
   }
   break;
    
      case '5': {
        const parGroupe = syntheseParGroupe(donnees);
        const abondante = especeLaPlusAbondante(donnees);
        const faibles = stocksFaibles(donnees, SEUIL_STOCK_FAIBLE);

        console.log(`--- Synthèse de l'inventaire ---`)
        console.log(`Nombre d'espèces : ${donnees.length}`);
        console.log(`Stock total : ${totalPlants(donnees)} plants`);

        console.log(`Par groupe botanique :`);
        for (const [groupe, infos] of Object.entries(parGroupe)) {
          console.log(` ${groupe} : ${infos.especes} espèce(s), ${infos.plants} plants`);
        }
     
     if (abondante === null) {
      console.log(`Espèce la plus abondante : aucune donnée`);
     }else{
      console.log(`Espèce la plus abondante : ${abondante.id} | ${abondante.nomCommun} | ${abondante.groupe} | ${abondante.nombrePlants} plants | ${abondante.dateReleve}`);
     }

     console.log(`Stocks faibles (≤ ${SEUIL_STOCK_FAIBLE} plants): ${faibles.length}`);
     for (const plant of faibles) {
      console.log(` ${plant.id} | ${plant.nomCommun} | ${plant.groupe} | ${plant.nombrePlants} plants | ${plant.dateReleve}`);
     }
    console.log(`Rappel : le seuil de ${SEUIL_STOCK_FAIBLE} plants est un repère pédagogique de suivi, pas une recommandation de production.`);
    
  }
  break
     
      
      
      

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
