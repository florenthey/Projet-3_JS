# Projet3_OOP_JS_RoueLibre
fetch bike station (JCDecaux API) and display on a map (Leaflet):

Projet 3 OpenClassRooms:

## Diaporama
Vous devez afficher en haut de la page un diaporama de photos et de textes expliquant le fonctionnement de l'application. La logique du diaporama doit être écrite par vos soins. L’utilisation de tout plugin automatisant la logique de l’application est proscrite.
Le diaporama passe automatiquement à la diaporama suivante toutes les 5 secondes. L’utilisateur peut toutefois choisir de mettre le diaporama en pause. Il peut également reculer ou avancer manuellement à l’aide d’un clic de souris, ainsi qu’avec les touches gauche et droite de son clavier.

## Carte des vélos
En dessous du diaporama se trouve une carte affichant en temps réel la liste des stations de location de vélos ainsi que leur disponibilité.  La localisation de toutes les stations de vélos est affichée à l’aide de marqueurs.
La localisation et l'état de chaque station (ouverte, en travaux, combien de vélos et de places sont disponibles, etc.) est fourni via la plateforme OpenData de JC Decaux.
Un clic sur un marqueur affiche l’état de la station dans un panneau construit en HTML et CSS à côté de la carte. 
Les données doivent provenir de l'API temps réel.
La carte doit être générée dynamiquement via un service de cartographie.

Il doit être possible de réserver un vélo disponible à la station sélectionnée en :
    indiquant son nom et son prénom,
    signant dans un champ libre implémenté à l’aide de l’API HTML5 Canvas.

Vous devez écrire vous même le code du Canvas. Aucun plugin n’est autorisé.
Une fois la réservation validée, un vélo est marqué comme réservé à cette station.
Pour ce projet, la réservation ne sera pas communiquée à un serveur. 
Seul le navigateur de l'utilisateur "retiendra" que le vélo a été réservé.
Les données de réservation seront stockées dans le navigateur à l’aide de l’API Web Storage et affichées en dessous du panneau. 
L'état de la réservation (s’il y en a une) est ainsi affiché, avec un décompte dynamique du temps restant avant expiration de la réservation.
Une réservation expire automatiquement au bout de 20 minutes et également lorsque le navigateur web se referme.
Le nom et le prénom sont toutefois conservés par le navigateur pour préremplir le formulaire de réservation lors d'un prochain usage, même si le navigateur a été fermé.
Il ne peut y avoir qu'une réservation à la fois. Si une nouvelle réservation a lieu, elle remplace la précédente.

Le code JavaScript doit être conçu en Programmation Orientée Objet.


### Créer des objets simples en JavaScript, contenant des méthodes et des propriétés

    Le code JavaScript est développé en Orienté Objet
    Le diaporama est conforme et fonctionnel
    Aucun plugin n’est utilisé pour la logique de l’application (Diaporama, Canvas, Carte)

### Récupérer des données de formulaires en utilisant le langage JavaScript

    Le canvas est fonctionnel
    Le nom et prénom utilisent l’API LocalStorage
    Les informations de réservations utilisent l’API SessionStorage
    Les données de réservation sont affichées en dessous de la carte, s'il y a une réservation en cours

### Faire des requêtes HTTP en langage JavaScript

    La carte est récupérée dynamiquement depuis un web service cartographique
    Les informations sur les stations utilisent l’API Live de JC Decaux

### Écrire un code source lisible

    Le code est correctement indenté
    Les noms de classes, de méthode et de variables sont explicites (indifféremment en français ou en anglais)
    Il y a une seule classe par fichier

