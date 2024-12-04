![image](https://github.com/user-attachments/assets/eae238a9-c953-4c4b-982d-00c3f7807ca4)


<h1>Configuration du Projet Symfony et React</h1>

<h2>Partie Symfony</h2>
<p>Le projet est structuré en deux dossiers : <strong>symfony-folder</strong> et <strong>react-folder</strong>. Voici les étapes à suivre pour configurer la partie Symfony :</p>

<ol>
    <li><strong>Prérequis :</strong>
        <p>Assurez-vous que <strong>PHP</strong> et <strong>Composer</strong> sont installés sur votre machine. Vous pouvez vérifier leur installation avec les commandes suivantes dans un terminal :</p>
        <pre>php -v  / composer -v</pre>
    </li>
    <li><strong>Installation de Symfony CLI :</strong>
        <p>Pour installer Symfony CLI, commençons par l’installation de <strong>Scoop</strong> :</p>
        <pre>
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser  
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
        </pre>
        <p>Puis, installez Symfony CLI :</p>
        <pre>scoop install symfony-cli</pre>
        <p>Vérifiez l'installation avec :</p>
        <pre>symfony -v</pre>
        <div class="note">
            Si la commande ne fonctionne pas, essayez de redémarrer VSCode ou votre ordinateur pour actualiser la configuration.
        </div>
    </li>
    <li><strong>Installation des Dépendances :</strong>
        <p>Rendez-vous dans le dossier <strong>symfony-folder</strong> et exécutez la commande suivante pour installer les dépendances du projet (ce processus peut prendre du temps) :</p>
        <pre>composer install</pre>
    </li>
    <li><strong>Configuration pour les Requêtes entre Symfony et React :</strong>
        <p>Ajoutez le package <strong>nelmio/cors-bundle</strong> pour gérer les requêtes :</p>
        <pre>composer require nelmio/cors-bundle</pre>
    </li>
    <li><strong>Lancer le Serveur Symfony :</strong>
        <p>Démarrez le serveur Symfony avec :</p>
        <pre>symfony server:start</pre>
        <div class="note">
            Symfony doit être activé en premier pour que la partie React puisse accéder au Dashboard. Sinon, une page d’erreur s’affichera.
        </div>
    </li>
</ol>

<h2>Partie React</h2>
<p>Voici les étapes à suivre pour configurer la partie React :</p>

<ol>
    <li><strong>Prérequis :</strong>
        <p>Assurez-vous que <strong>Node.js</strong> et <strong>npm</strong> sont installés sur votre machine. Vous pouvez vérifier leur installation avec les commandes suivantes :</p>
        <pre>node -v  / npm -v</pre>
    </li>
    <li><strong>Installation des dépendances :</strong>
        <p>Installez toutes les dépendances du projet avec :</p>
        <pre>npm install</pre>
    </li>
    <li><strong>Renommer un dossier :</strong>
        <p>En raison d'un problème de casse (<em>CamelCase</em>), il est nécessaire de renommer le dossier <code>src/Pages</code> en <code>src/pages</code>.</p>
    </li>
    <li><strong>Démarrer l'application React :</strong>
        <p>Lancez l'application avec :</p>
        <pre>npm start</pre>
        <div class="note">
            Symfony doit être activé en premier pour que la partie React puisse accéder au Dashboard. Sinon, une page d’erreur s’affichera.
        </div>
    </li>
</ol>

</body>
</html>
