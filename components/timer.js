class Timer {
    constructor() {
        this.sequence = 20 * 60 * 1000;
        // this.countdown = setInterval(() => this.initCountdown(), 1000);
        this.countdown = 0;

        this.initCountdown();
        this.setStorage();
        this.interval();
    }

    // initialise les données de temps (start = date et heure lors de la validation de la réservation) et (finish = start + 20mn)
    initCountdown() {
        this.start = new Date().getTime();
        this.finish = this.start + this.sequence;
    }

    // affiche le décompte
    display() {
        let distance = sessionStorage.bookingFinish - new Date().getTime();
        
        let minutes = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
        let secondes = Math.floor((distance % (60 * 1000)) / 1000);
        
        if(distance >= 0) {
            document.getElementById("booking-message").innerHTML = localStorage.firstName + " " + localStorage.lastName + ", " + "votre vélo à la " + sessionStorage.station + " à bien été reservé. Il est disponible durant " + minutes + " minutes " + secondes + " secondes.";
        } else {
            this.clear();
            document.getElementById("booking-message").innerHTML = "La réservation est expirée.";
        }
    }

    // supprime l'interval
    clear() {
        clearInterval(this.countdown);
    }

    // stocke date et heure lors de la validation de la réservation + la séquence (20mn)
    setStorage() {
        sessionStorage.setItem("bookingFinish", this.finish);
    }

    // rappel la fonction d'affichage toute les secondes
    interval() {
        this.countdown = setInterval(() => this.display(), 1000)
    }
}