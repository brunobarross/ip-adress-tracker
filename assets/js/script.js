const formulario = document.forms[0];
const inptIP = document.querySelector('#input-ip')
const ipAdressElement = document.querySelector('#ip');
const locationElement = document.querySelector('#location');
const timeZoneElement = document.querySelector('#timeZone');
const ispElement = document.querySelector('#ISP');
let ipNumber = '';
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




const getAsync = async () => {
    const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=f24ced2d28ce4f688f903dd9bd50b952&ip=${ipNumber}`);
    try {
        const responseData = await response.json();
        console.log(responseData)
        const {
            ip,
            isp,
            country_name,
            time_zone,
            latitude,
            longitude,
            organization,
            city
        } = responseData;
        document.querySelector('output').innerHTML = '';
        addDom(ip, isp, city, country_name, time_zone)
        updateMap(latitude, longitude, organization, city, country_name);
    } catch {
        if (!response.ok) {
            document.querySelector('output').innerText = 'Digite um endereço IP/DNS válido';
        }


    }
}

getAsync()


/* adiciona e atualiza o html*/

const addDom = (ip, isp, city, country_name, time_zone) => {
    ipAdressElement.innerText = ip;
    locationElement.innerText = `${city} - ${country_name}`;
    timeZoneElement.innerText = time_zone.name;
    ispElement.innerText = isp;

}
/* atualiza posição do mapa*/

function updateMap(latitude, longitude, organization, city, country_name) {
    map.panTo(new L.LatLng(latitude, longitude));
    marker.setLatLng([latitude, longitude]).update();
    //     /* popUp*/
    //     marker.bindPopup(
    //         `
    //         <h3>${organization}</h3>   
    //          <p>${city} - ${country_name} </p>   
    //      `
    //     ).openPopup();
    // }

}



/* init map*/
const map = L.map('map').setView([latitude, longitude], 13);
const marker = L.marker([latitude, longitude]).addTo(map);
const popup = L.popup();

L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWx0YW1pcm94eHgiLCJhIjoiY2t4aTN1bDhzMnN3ajMwb2NwNHowNjdpMiJ9.jemmmBOttjOkpM0xmjDMbA", {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "your.mapbox.access.token",
    }
).addTo(map)



getIP()