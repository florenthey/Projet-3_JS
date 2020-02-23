class BikeMap {

    constructor(mapContainer, mapID, lat, lon, zoom, bikeURL) {
        this.container = document.getElementById(mapContainer);
        this.mapID = document.getElementById(mapID);
        this.mapLat = lat;
        this.mapLon = lon;
        this.mapZoom = zoom;
        this.map = L.map(this.mapID).setView([this.mapLat, this.mapLon], this.mapZoom);
        this.bikeURL = bikeURL;
        
        this.setMapLayer();
        this.getBikeData();

        this.greenMarker = new L.Icon({
            iconUrl: 'assets/marker-icon-2x-green.png',
            shadowUrl: 'assets/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        this.redMarker = new L.Icon({
            iconUrl: 'assets/marker-icon-2x-red.png',
            shadowUrl: 'assets/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        this.orangeMarker = new L.Icon({
            iconUrl: 'assets/marker-icon-2x-orange.png',
            shadowUrl: 'assets/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        
    }

    // 
    setMapLayer() {
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=MY_TOKEN', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'MY_TOKEN'
        }).addTo(this.map);
    }

    getBikeData() {
        fetch(this.bikeURL)
            .then(response => response.json())
            .then(data => this.setMarkers(data))
            .catch(error => alert("Désolé, une erreur est survenue! " + "( " + error + ")"))
    }

    setMarkers(data) {
        this.stations = data;
        this.stations.map(marker => {

            if(marker.available_bikes <= 10) {
                L.marker([marker.position.lat, marker.position.lng], {icon: this.orangeMarker}).addTo(this.map)
            }
            if(marker.available_bikes >= 10) {
                L.marker([marker.position.lat, marker.position.lng], {icon: this.greenMarker}).addTo(this.map)
            }
            if(marker.available_bikes === 0) {
                L.marker([marker.position.lat, marker.position.lng], {icon: this.redMarker}).addTo(this.map)
            }
        });
    }

}