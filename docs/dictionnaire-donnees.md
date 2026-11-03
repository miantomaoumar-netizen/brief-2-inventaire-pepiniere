# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — | `N09` |
| `nomCommun` |Nom commun de l'espèce | texte |non vide | — |`pin` |
| `groupe` |Groupe botanique, fourni et validé par le coach |texte |`gymnosperme` | — |`gymnosperme` | 
| `nombrePlants`|Nombre de plants disponibles | nombre entier | entier positif ou nul |plants |`8` |
| `dateReleve` |Date du comptage |format `AAAA-MM-JJ` |date valide | — |`2026-10-24` |

**Listes de valeurs autorisées** : `groupe` = `angiosperme` ou `gymnosperme`

**Sources** : `SUJET.md`(section << Les données >>); `donnees/plants.json` ; fiche botanique remise par le coach agronomie
