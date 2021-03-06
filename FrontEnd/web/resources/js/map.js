/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var locations = JSON.parse(document.getElementById('mapid').getAttribute('data'));

var markers = [];

var mymap = L.map('mapid').locate({setView: true, maxZoom: 13});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic3ludGg4dmUiLCJhIjoiY2p3ZG9jdzU1MDljZzQzbW9ycWF0cTRvMSJ9.tNErrHXjbYjmidsy8qa39w'
}).addTo(mymap);

add_locations();

function filter_locations(check) {
    
    markers.forEach(function(marker) {

        mymap.removeLayer(marker);
    });

    markers = [];

    locations.forEach(function(l) {

        if (check.length > 0) {
            
            if (check.includes(l.type)) {
                
                var new_marker = L.marker([l.long, l.lat]).addTo(mymap);
                markers.push(new_marker);
            }
            
        } else {
            
            var new_marker = L.marker([l.long, l.lat]).addTo(mymap);
            markers.push(new_marker);
        }
    });
}

var filters = document.getElementById('filter').addEventListener("change", function() {

    var check = [];

    document.querySelectorAll('.check').forEach(function(node) {

        if (node.checked) {

            check.push(Number(node.value));
        }
    });
    
    filter_locations(check);
});

function add_locations() {

    for (i = 0; i < locations.length; i++) {

        var new_marker = L.marker([locations[i].long, locations[i].lat]).addTo(mymap);
        markers.push(new_marker);
    }
}

function set_view(lng, lat) {
    
    
    mymap.panTo([lat, lng], 18);
}

