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

    setCity(city) {
        switch(city) {
            case "Nantes":
                this.mapLat = 47.2173;
                this.mapLon = -1.5534;
                this.bikeURL = "https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=" + this.environment.tokenBike;
                break;
        }
    }
    
    setMapLayer() {
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + this.environment.tokenMap, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: this.environment.tokenMap,
        }).addTo(this.map);
    }

    getBikeData() {
        fetch(this.bikeURL)
            .then(response => response.json())
            .then(data => this.setMarkers(data))
            .catch(error => alert("Désolé, une erreur est survenue! " + "( " + error + ")"))
    }

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

    onClickMarker(station) {
        let stationModel = new Station(station);
        stationModel.display();
        
        new Booking("form-booking");
    }
}