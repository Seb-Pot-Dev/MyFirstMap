

/*
 "L" est un namespace de Leaflet utilisé pour accéder aux fonctions et classes de la bibliothèque de Leaflet.

Par exemple, pour créer une carte, j'utilise la méthode L.map() de Leaflet.
De même, pour créer un marqueur, j'utilise la méthode L.marker(). 

*/

// Créer une carte Leaflet centrée sur les coordonnées du centre de Strasbourg [48.583328, 7.75] et avec un niveau de zoom de 14
var map = L.map('map').setView([48.583328, 7.75], 14);

// Ajouter une couche de tuiles OpenStreetMap à la carte, avec un maximum de zoom de 19 et une attribution
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Créer un marqueur aux coordonnées [48.583328, 7.75] et l'ajouter à la carte
var marker1 = L.marker([48.583328, 7.75]).addTo(map);

var marker2 = L.marker([48.5849, 7.7526]).addTo(map);

// Créer un popup pour le marker1
marker1.bindPopup("<b>Hello world!</b><br>I am a popup.");

// Créer un popup pour le marker2
marker2.bindPopup("<b>Hello world!</b><br>I am another popup.");


//Créer un popup lorsque l'on clique sur un endroit non marked de la map et indique les coordonnées

    //stockage de la fonction popup() de Leaflet dans la variable popup
    var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);


// Créer un tableau de coordonnées pour le polygone de l'agglomération de Strasbourg
//(revoir la précision)

var polygonCoords = [  [48.623860, 7.727798],
[48.604371, 7.693883],
[48.575899, 7.686080],
[48.568368, 7.729530],
[48.556536, 7.741879],
[48.540214, 7.740874],
[48.520945, 7.753266],
[48.517002, 7.802228],
[48.525297, 7.830220],
[48.548539, 7.848697],
[48.563863, 7.858974],
[48.586015, 7.840496],
[48.605270, 7.820451],
[48.610125, 7.795036],
[48.623860, 7.727798]
];
// Créer un polygone à partir des coordonnées stockées dans var polygonCoords et l'ajouter à la carte
var myPolygon = L.polygon(polygonCoords, {
    color: 'red',
    fillColor: 'transparent',
    weight: 2
}).addTo(map);


/* ---- AJOUT DE LIEUX (en session) ------- */

// Définir la classe "Spots"
class Spots {
    constructor(name, description, lat, lng) {
      this.name = name;
      this.description = description;
      this.lat = lat;
      this.lng = lng;
    }
  }
  
  // Créer un tableau pour stocker les spots
  const spots = [];
  
  // Écouter l'événement de soumission du formulaire
  document.getElementById('my-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le formulaire de se soumettre normalement
  
    // Récupérer les valeurs des champs du formulaire
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const lat = parseFloat(document.getElementById('lat').value);
    const lng = parseFloat(document.getElementById('lng').value);
  

//Si le point est placé dans le polygon de l'agglo de Strasbourg
    if (myPolygon.contains([lat, lng])) {
    // Créer un nouvel objet de spots
    const spot = new Spots(name, description, lat, lng);
  
    // Ajouter le spot au tableau
    spots.push(spot);
  
    // Créer un nouvel objet de marqueur
    const marker = L.marker([lat, lng]).addTo(map);
  
    // Ajouter des informations au marqueur
    marker.bindPopup(`<b>${name}</b><br>${description}`).openPopup();
  }
  else {
    alert('Le lieu doit être situé dans agglomération Strasbourgeoise');
  }
});

    //afficher le tableau de spots dans la console
    console.log(spots); 


  
