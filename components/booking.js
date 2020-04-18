class Booking {
    constructor() {
        document.getElementById("form-booking").style.display = "flex";
        document.getElementById("map-legend").style.display = "none";
        document.getElementById("form-submit").addEventListener("click", () => this.create());
        new Canvas();

        this.initSettings();
    }

    // teste si LocalStorage est disponible
    storageAvailable(type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return false;
        }
    }

    // récupère les valeurs de l'utilisateur et les stock dans localStorage et sessionStorage
    setDataStorage() {
        if(document.getElementById("station-status").innerHTML === "Station ouverte" && document.getElementById("station-bikes").innerHTML != "Vélos restants: 0") {
            localStorage.firstName = document.getElementById("firstName").value;
            localStorage.lastName = document.getElementById("lastName").value;
            sessionStorage.station = document.getElementById("station-name").innerHTML;
            
        } else {
            alert("Désolé, la réservation de vélo est indisponible à la " + document.getElementById("station-name").innerHTML)
        }
    }

    create() {
        if(this.checkInputs()) {
            sessionStorage.removeItem("bookingFinish");
            this.setDataStorage();
            new Timer();
            document.getElementById("form-booking").style.display = "none";
        }
    }

    // vérification des valeurs d'inputs
    checkInputs() {
        const regex = RegExp(/^[a-zA-Z]{2,30}$/);
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const firstResult = regex.test(firstName);
        const lastResult = regex.test(lastName);
        const lastDisplay = document.getElementById("lastname-error").style.display = "flex";
        const firstDisplay = document.getElementById("firstname-error").style.display = "flex";

        if(lastResult === false) {
            lastDisplay;
        }
        if(firstResult === false) {
            firstDisplay;
        } 
        if(lastResult === true && lastDisplay) {
            document.getElementById("lastname-error").style.display = "none";
        } 
        if(firstResult === true && firstDisplay) {
            document.getElementById("firstname-error").style.display = "none";
        } 
        if (lastResult === true && firstResult === true){
            return firstResult && lastResult;
        }
    }

    // initialise le store
    initSettings() {
        if(!this.storageAvailable("localStorage")) {
            alert("Désolé, la version de votre navigateur web est trop ancienne et ne prend pas en compte la propriété localStorage. Vous ne pourrez pas utiliser les fonctionnalités de notre site. Pour y avoir accès, veuiller mettre à jour votre navigateur.");
        } else if (localStorage.firstName) {
            this.setDataInput();
        }
    }

    // affiche les données de l'utilisateur
    setDataInput() {
        document.getElementById("firstName").value = localStorage.firstName;
        document.getElementById("lastName").value = localStorage.lastName;
    }
}