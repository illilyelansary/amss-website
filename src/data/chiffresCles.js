// src/data/chiffresCles.js
// Résultats chiffrés de l’année 2025, repris du « Rapport annuel d’activités 2025 » remis au
// Ministère de l’Administration territoriale (accord-cadre n°0026/0286MATCL, daté du 31/12/2025).
// À mettre à jour chaque année avec le nouveau rapport. `projet` = code du projet (lien vers sa fiche).
export const SOURCE_CHIFFRES = {
  annee: 2025,
  libelle: 'Rapport annuel d’activités 2025 de l’AMSS (accord-cadre MATCL)',
}

export const chiffresCles = {
  EDUCATION: [
    { valeur: '798', libelle: 'enfants des centres SSA/P évalués et transférés à l’école classique (Tombouctou et Mountougoula)', projet: 'SSAP-TBK' },
    { valeur: '528', libelle: 'enfants, dont 309 filles, inscrits dans 20 centres SSA/P pour 2025-2026 à Tombouctou et Alafia', projet: 'SSAP-TBK' },
    { valeur: '6 853', libelle: 'enfants déplacés et hôtes inscrits ou réinscrits à l’école (Ségou et San)', projet: 'CEPEACH' },
    { valeur: '968', libelle: 'candidats au DEF, dont 691 filles, soutenus par des cours d’appui dans 25 écoles', projet: 'DEFI' },
  ],
  SANTE: [
    { valeur: '874', libelle: 'enfants malnutris pris en charge dans les cercles de Gao et d’Ansongo', projet: 'GFFO-SC' },
    { valeur: '3 098', libelle: 'enfants souffrant de malnutrition aiguë et 4 061 femmes enceintes et allaitantes assistés à Tombouctou et Taoudénit (PAM)' },
    { valeur: '1 750', libelle: 'adolescentes et adolescents touchés par les activités de santé sexuelle et reproductive (Bandiagara, Douentza)', projet: 'HUM-VBG' },
  ],
  WASH: [
    { valeur: '12 070', libelle: 'personnes touchées par la promotion de l’hygiène dans le centre et le nord', projet: 'BHA-WASH-NFI' },
    { valeur: '6 + 60', libelle: 'points d’eau et latrines réhabilités après les inondations du cercle de Diré', projet: 'FHRAOC-DIRE' },
    { valeur: '37', libelle: 'artisans réparateurs formés à l’entretien des points d’eau (Diré et région de Tombouctou)', projet: 'DIVERSIF-GIZ' },
  ],
  PROTECTION: [
    { valeur: '3 618', libelle: 'survivantes de VBG identifiées et assistées (médical, psychosocial, référencement)', projet: 'BHA-WASH-NFI' },
    { valeur: '9 818', libelle: 'enfants ayant bénéficié de services de protection directe', projet: 'BHA-WASH-NFI' },
    { valeur: '13 437', libelle: 'personnes sensibilisées aux risques des engins explosifs à Gao, Ménaka et Ségou (UNHCR)' },
    { valeur: '500', libelle: 'jugements supplétifs d’actes de naissance obtenus pour des enfants à risque (Ansongo, Gounzoureye)', projet: 'PBC' },
  ],
  SECALIM: [
    { valeur: '3 614', libelle: 'ménages agropastoraux et maraîchers dotés en intrants à Tombouctou et Taoudénit', projet: 'RSMVC-WHH' },
    { valeur: '13 451', libelle: 'bénéficiaires de l’assistance alimentaire et nutritionnelle à Tombouctou et Taoudénit (PAM)' },
    { valeur: '4 008 t', libelle: 'd’engrais subventionnés suivis dans 150 communes du centre et du sud', projet: 'PDAZAM' },
    { valeur: '25 630', libelle: 'membres des groupes d’épargne EPC, dont 95 % de femmes (899 groupes encadrés)', projet: 'EPC-TBK' },
  ],
  GOUV: [
    { valeur: '1 008', libelle: 'jeunes leaders, dont 50 % de femmes, formés à la gouvernance locale dans 35 communes', projet: 'PGLR-PLUS' },
    { valeur: '206', libelle: 'jeunes ont créé leur micro-entreprise ; 706 jeunes accompagnés vers l’emploi', projet: 'PACCVC' },
    { valeur: '355', libelle: 'acteurs de 72 organisations de la société civile formés à la gestion des risques de sécurité', projet: 'PARTAGE' },
  ],
}
