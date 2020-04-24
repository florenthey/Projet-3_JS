class BikeMap {
        constructor(mapContainer, mapID, city) {
        this.environment = new Environment();
        this.setCity(city);
        this.container = document.getElementById(mapContainer);
        this.mapID = document.getElementById(mapID);
        this.mapZoom = 12;
        this.map = L.map(this.mapID).setView([this.mapLat, this.mapLon], this.mapZoom);

        this.setMapLayer();
        this.getBikeData();
    }

    // définis la ville voulue par ses coordonnées
    setCity(city) {
        switch(city) {
            case "Nantes":
                this.mapLat = 47.2173;
                this.mapLon = -1.5534;
                this.bikeURL = "https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=" + this.environment.tokenBike;
                break;
        }
    }

    // définis les caractéristiques de la carte
    setMapLayer() {
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + this.environment.tokenMap, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: this.environment.tokenMap,
            dragging: false,
        }).addTo(this.map);
    }

    // récupère les données de l'API JCDecaux
    getBikeData() {
        fetch(this.bikeURL)
            .then(response => response.json())
            .then(data => this.setMarkers(data))
            .catch(error => alert("Désolé, une erreur est survenue! " + "( " + error + ")"))
    }

    // définis les caractéristiques des marqueurs
    getMarkerIcon(color) {
        return new L.Icon({
            iconUrl: 'assets/marker-icon-2x-' + color + '.png',
            shadowUrl: 'assets/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    }

    // déplois les marqueurs sur la carte
    setMarkers(stations) {
        stations.map(station => {
            let markerIcon = this.setMarkerIcon(station);

            L.marker(
                [station.position.lat, station.position.lng],
                {icon: markerIcon})
                .bindPopup(station.name.replace(/^(.*?)\-/, "STATION "))
                .openPopup()
                .on('click', e => this.onClickMarker(station))
                .addTo(this.map)
        });
    }

    // définis la couleur des marqueurs selon le nombre de vélos disponibles
    setMarkerIcon(station) { 
        let stands = Math.round(station.available_bikes / station.bike_stands * 100); // proportion vélo = nombre de vélos dispo divisé par nombre de vélos total
        
        let markerIcon = this.getMarkerIcon("green");
        if(stands === 0 || station.status === "CLOSED" ) {
            markerIcon = this.getMarkerIcon("red");
        } else if(stands < 30) {
            markerIcon = this.getMarkerIcon("orange");
        }

        return markerIcon;
    }

    // affichage lors du clique sur le marqueur
    onClickMarker(station) {
        let stationModel = new Station(station);
        stationModel.display();

        if(station.status === "CLOSED" || station.available_bikes === 0) {
            document.getElementById("form-booking").style.display = "none";
            document.getElementById("booking-closed").style.display = "flex";
        } else {
            document.getElementById("booking-closed").style.display = "none";
            new Booking("form-booking");
        }
    }
}