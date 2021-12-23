const formulario = document.forms[0];
let ip = '';
let latitude = 0;
let longitude = 0;





const getIP = () => {
    function getValue(evento) {
        const inptValue = document.querySelector('#input-ip').value;
        evento.preventDefault()
        ip = inptValue;
        console.log(ip)
        getAsync()
    }
    formulario.addEventListener('submit', getValue);
}



const getAsync = async () => {
    const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=f24ced2d28ce4f688f903dd9bd50b952&ip=${ip}`);
    const responseData = await response.json();
    console.log(responseData)
    map.panTo(new L.LatLng(responseData.latitude, responseData.longitude));
    marker.setLatLng([responseData.latitude, responseData.longitude]).update();
    marker.bindPopup(
        `
        <h3>${responseData.organization}</h3>   
         <p>${responseData.city} - ${responseData.country_name} </p>   
     `
        ).openPopup();



}

getAsync()




const map = L.map('map').setView([latitude, longitude], 13);
const marker = L.marker([latitude, longitude]).addTo(map);
const popup = L.popup();



L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWx0YW1pcm94eHgiLCJhIjoiY2t4aTN1bDhzMnN3ajMwb2NwNHowNjdpMiJ9.jemmmBOttjOkpM0xmjDMbA",
    {
        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "your.mapbox.access.token",
    }
).addTo(map);






getIP()