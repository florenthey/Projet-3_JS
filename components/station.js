class Station {
    constructor(station) {
        Object.assign(this, station); // affecte les propriétés de l'objet station à la classe

    }

// affiche les infos de la station selectionné
    display() {
        if(this.status === "OPEN") {
            document.getElementById("station-status").innerHTML = "Station ouverte"
        } else {
            document.getElementById("station-status").innerHTML = "Station fermée"
        }
        document.getElementById("station-name").innerHTML = this.name.replace(/^(.*?)\-/, "STATION "); // Regex: selectionne tout avant le "-"
        document.getElementById("station-address").innerHTML = this.address;
        document.getElementById("station-bikes").innerHTML = "Vélos restants: " + this.available_bikes;
        document.getElementById("station-stands").innerHTML = "Places libres: " + this.available_bike_stands;

        this.style();
    }

    style() {
        document.getElementById("station-name").style.fontSize ="40px";

        if(document.getElementById("station-status").innerHTML = "Station fermée") {
            document.getElementById("station-status").style.color = "#ca2437";
        }
        if (document.getElementById("station-status").innerHTML = "Station ouverte") {
            document.getElementById("station-status").style.color = "#5f8637";
        }
    }
}