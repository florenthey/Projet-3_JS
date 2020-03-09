class Booking {
    constructor(form) {
        document.getElementById("form-booking").style.display = "flex";
        this.form = document.getElementById(form).onclick = this.setDataStorage;
        //this.message = document.getElementById("booking-message").innerHTML = localStorage.firstName + " " + localStorage.lastName + ", " + "votre vélo à la " + sessionStorage.station + " à bien été reservé.";
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
        localStorage.firstName = document.getElementById("firstName").value;
        localStorage.lastName = document.getElementById("lastName").value;
        sessionStorage.station = document.getElementById("station-name").innerHTML;
    }

    // initialise le store
    initSettings() {
        if (!this.storageAvailable("localStorage")) {
            alert("Désolé, la version de votre navigateur web est trop ancienne et ne prend pas en compte la propriété localStorage. Vous ne pourrez pas utiliser les fonctionnalités de notre site. Pour y avoir accès, veuiller mettre à jour votre navigateur.");
        } else if (localStorage.firstName) {
            this.setDataInput();
        }
    }

    // affiche les données de l'utilisateur
    setDataInput() {
        document.getElementById("firstName").value = localStorage.firstName;
        document.getElementById("lastName").value = localStorage.lastName;
        //this.message;
    }

}