class Timer {
    constructor() {
        this.sequence = 20 * 60 * 1000;
        // this.countdown = setInterval(() => this.initCountdown(), 1000);
        this.countdown = 0;

        this.initCountdown();
        this.setStorage();
        this.interval();
    }

    initCountdown() {
        this.start = new Date().getTime();
        this.finish = this.start + this.sequence;
    }

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

    clear() {
        clearInterval(this.countdown);
    }

    setStorage() {
        sessionStorage.setItem("bookingFinish", this.finish);
    }

    interval() {
        this.countdown = setInterval(() => this.display(), 1000)
    }
}