const formulario = document.forms[0];
const inptIP = document.querySelector('#input-ip')
const ipAdressElement = document.querySelector('#ip');
const locationElement = document.querySelector('#location');
const timeZoneElement = document.querySelector('#timeZone');
const ispElement = document.querySelector('#ISP');
let ipNumber = '8.8.8.8';
let latitude = 0;
let longitude = 0;





const getIP = () => {
    function getValue(evento) {
        evento.preventDefault()
        ipNumber = inptIP.value;
        console.log(ipNumber)
        getAsync()
    }


    formulario.addEventListener('submit', getValue);
}


const key = 'https://geo.ipify.org/api/v2/country?apiKey=at_fw5XoPFjFTLSRurkjlGJX6axsvDDq&ipAddress=8.8.8.8'

const getAsync = async () => {
    try {
        // const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=f24ced2d28ce4f688f903dd9bd50b952&ip=${ipNumber}`);
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_fw5XoPFjFTLSRurkjlGJX6axsvDDq&ipAddress=${ipNumber}`);
        const responseData = await response.json();
        console.log(response)
        console.log(responseData)
        const {
            ip,
            isp,
            location,
            messages
        } = responseData;

        document.querySelector('output').innerText = '';
        if (!response.ok) {
            document.querySelector('output').innerText = messages;
            return
        }
        latitude = location.lat;
        longitude = location.lng;
        addDom(ip, isp, location)
        updateMap(latitude, longitude);


    } catch (error) {
        console.log(error)
    }
}

getAsync()


/* adiciona e atualiza o html*/

const addDom = (ip, isp, location) => {
    ipAdressElement.innerText = ip;
    locationElement.innerText = `${location.region} - ${location.country}`;
    timeZoneElement.innerText = `UTC ${location.timezone}`;
    ispElement.innerText = isp;

}
/* atualiza posição do mapa*/

function updateMap(latitude, longitude) {

    map.panTo(new L.LatLng(latitude, longitude));
    marker.setLatLng([latitude, longitude]).update();
    /* popUp*/
    // marker.bindPopup(
    //     `
    //         <h3>${location.isp}</h3>   
    //          <p>${location.region} - ${location.country} - ${location.country} </p>   
    //      `
    // ).openPopup();
}





/* init map*/
var greenIcon = L.icon({
    iconUrl: './assets/images/icon-location.svg',
    iconSize: [46, 54], // size of the icon
    shadowSize: [0, 0], // size of the shadow
    iconAnchor: [22, 20], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

const map = L.map('map', {

}).setView([latitude, longitude], 13);

const marker = L.marker([latitude, longitude], {
    icon: greenIcon
}).addTo(map);
const popup = L.popup();



L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWx0YW1pcm94eHgiLCJhIjoiY2t4aTN1bDhzMnN3ajMwb2NwNHowNjdpMiJ9.jemmmBOttjOkpM0xmjDMbA", {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        minZoom: 12,
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "your.mapbox.access.token",
    }
).addTo(map)



getIP()