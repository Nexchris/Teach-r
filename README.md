Partie Symfony

Le projet est structuré en deux dossiers : symfony-folder et react-folder. Voici les étapes à suivre pour configurer la partie Symfony :

1. Prérequis :  Assurez-vous que PHP et Composer sont installés sur votre machine. Vous pouvez vérifier leur installation avec les commandes suivantes dans un terminal : 
php -v  / composer -v  

2. Installation de Symfony CLI : 
Pour installer Symfony CLI, commençons l’installation par Scoop qui va nous permettre d’installer Symfony en deux étapes, la première, l’installation de Scoop :

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser  
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression  

Puis l’installation de Symfony CLI :
scoop install symfony-cli  

Vérifiez l'installation de Symfony :
symfony -v  

Si la commande ne fonctionne pas, essayez de redémarrer VSCode ou votre ordinateur pour actualiser la configuration.

3. Installation des Dépendances :  Rendez-vous dans le dossier symfony-folder. Exécutez la commande suivante pour installer les dépendances du projet (ce processus peut prendre du temps) :
composer install  

4. Configuration pour les Requêtes entre Symfony et React : Ajoutez le package nelmio/cors-bundle pour gérer les requêtes entre symfony-folder et react-folder :

composer require nelmio/cors-bundle 
 
5. Lancer le Serveur Symfony,  enfin, démarrez le serveur Symfony avec la commande :
symfony server:start  : Symfony doit être activé en premier pour que la partie React puisse arriver au Dashboard sinon une page d’erreur s’affichera








Partie React

Le projet est structuré en deux dossiers : symfony-folder et react-folder. Voici les étapes à suivre pour configurer la partie React:

1. Prérequis :  Assurez-vous que Nodejs et npm sont installés sur votre machine. Vous pouvez vérifier leur installation avec les commandes suivantes dans un terminal : 
node-v  / npm -v  

2. Installation des dépendances : Installez toutes les dépendances du projet avec la commande suivante :
npm install  

3. En raison d'un problème de casse (CamelCase), il est nécessaire de commencer par renommer le dossier dans le répertoire src, en passant de Pages à pages.

4. Démarrer l'application React : Maintenant que tous les dépendances installées, lancez l'application avec :
npm start    : Symfony doit être activé en premier pour que la partie React puisse arriver au Dashboard sinon une page d’erreur s’affichera
