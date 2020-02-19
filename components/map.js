class BikeMap {

    constructor(mapContainer, mapID, lat, lon, zoom) {
        this.container = document.getElementById(mapContainer);
        this.mapID = document.getElementById(mapID);
        this.mapLat = lat;
        this.mapLon = lon;
        this.mapZoom = zoom;
        this.map = L.map(this.mapID).setView([this.mapLat, this.mapLon], this.mapZoom);
        this.layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={myToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'myToken'
        }).addTo(this.map);
    }
}