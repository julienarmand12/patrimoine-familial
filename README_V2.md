# Patrimoine familial — V2 synchronisée

## Contenu
- `index.html` : application web responsive, connexion e-mail/mot de passe Supabase, création du foyer, ajout du second membre, synchronisation et mises à jour temps réel.
- `supabase_schema.sql` : tables, règles de sécurité RLS et fonctions SQL nécessaires.
- `README_V2.md` : procédure de mise en service.

## Mise en service

### A. Créer le projet Supabase
1. Aller sur https://supabase.com/ et créer un compte / projet.
2. Créer un projet nommé `patrimoine-familial` et choisir une région européenne (par exemple Paris si proposée).
3. Conserver le mot de passe de base de données dans un gestionnaire sécurisé. Il ne sera pas saisi dans l'application.
4. Dans le projet, ouvrir **SQL Editor > New query**, coller le contenu de `supabase_schema.sql`, puis cliquer **Run**.
5. Dans **Project Settings > API** (ou Connect), copier l'URL du projet et la clé publique `anon` / `publishable`. Ne jamais utiliser `service_role` / `secret` dans le navigateur.
6. Dans **Authentication > URL Configuration**, renseigner l'URL du site qui hébergera l'application comme Site URL et l'ajouter aux Redirect URLs. Pour les premiers tests, l'URL locale n'est pas nécessaire pour le flux e-mail/mot de passe.
7. Pour simplifier le premier essai, dans **Authentication > Providers > Email**, désactiver temporairement la confirmation d'e-mail. Réactiver ensuite la confirmation si souhaité. Les réglages exacts peuvent varier avec la version du tableau de bord.

### B. Héberger l'application en HTTPS
L'application doit être publiée sur un hébergement HTTPS pour être installable comme application. Une solution simple est GitHub Pages :
1. Créer un nouveau dépôt GitHub privé ou public nommé `patrimoine-familial`.
2. Y déposer `index.html` (à la racine). Le fichier SQL et ce guide peuvent être conservés dans le dépôt ou ailleurs.
3. Dans **Settings > Pages**, choisir le déploiement depuis la branche `main`, dossier `/root`, puis enregistrer.
4. Attendre la publication. GitHub fournira une adresse du type `https://VOTRE-COMPTE.github.io/patrimoine-familial/`.
5. Ajouter cette adresse dans les URL autorisées de Supabase Authentication.

### C. Connecter le premier téléphone
1. Ouvrir l'adresse GitHub Pages dans Chrome.
2. Appuyer sur **Connexion** en haut de l'application.
3. Renseigner l'URL Supabase et la clé publique, puis **Enregistrer la configuration**.
4. Créer le compte avec ton adresse e-mail et un mot de passe robuste.
5. Se connecter si nécessaire, puis créer l'espace familial.
6. Les données déjà présentes dans le navigateur sont envoyées au nouvel espace au premier enregistrement / à la création du foyer. Vérifier ensuite les montants.

### D. Connecter le deuxième téléphone
1. Ouvrir la même adresse web sur le téléphone de ta femme.
2. Renseigner la même URL Supabase et la même clé publique.
3. Elle crée son compte avec sa propre adresse e-mail.
4. Sur ton téléphone, dans Connexion, entrer l'adresse exacte de son compte et cliquer **Ajouter au foyer**.
5. Sur son téléphone, se connecter. Les données du foyer se chargent automatiquement.
6. Dans Chrome Android : menu ⋮ > **Ajouter à l'écran d'accueil** ou **Installer l'application**.

## Important — limites de cette V2
- Les données sont synchronisées sous forme d'un document JSON familial unique. C'est adapté à un foyer et un petit volume, mais deux modifications simultanées sur deux appareils peuvent se remplacer (règle du dernier enregistrement). Pour une utilisation financière critique, la prochaine évolution doit passer à des tables séparées et un journal de transactions avec gestion des conflits.
- Les pièces jointes et documents ne sont pas encore synchronisés : il faudra ajouter Supabase Storage et des règles d'accès.
- L'application ne se connecte pas directement aux banques. Les imports CSV/OFX et la catégorisation automatique seront une étape ultérieure.
- Les données restent en cache local sur chaque navigateur. Déconnexion ne les efface pas. Ne pas utiliser d'appareil partagé/public.
- La clé `anon` / `publishable` est destinée au navigateur et reste protégée par les règles RLS. Ne jamais publier une clé `service_role` / `secret`.
- Les valeurs immobilières et le crédit préremplis doivent être vérifiés avant de prendre des décisions.
