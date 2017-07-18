"use strict";
var initialLocation = [
    {
        name: 'Bronx Zoo',
        position: {lat: 40.850595, lng: -73.876998},
    },

    {
        name: 'Central Park Zoo',
        position: {lat: 40.767778, lng: -73.971834},
    },

    {
        name: 'Brooklyn Zoo NY',
        position: {lat: 40.711663, lng: -73.935463},
    },

        {
        name: 'Queens Zoo',
        position: {lat: 40.744434, lng: -73.849741},
    },

        {
        name: 'Staten Island Zoo',
        position: {lat: 40.625124, lng: -74.115370},
    }
]

var Location = function(data){
    this.name = ko.observable(data.name);
}

var ViewModel = function(){
    var self = this;
    this.locationList = ko.observableArray([]);
    initialLocation.forEach(function(listItem){
        self.locationList.push( new Location(listItem) );
    });
    
    this.currentLocation = ko.observable( this.locationList()[0]);
    
}

//add a blank array for all the listing markers
var markers = [];
// Display google map
      function initMap() {
        var manhattan = {lat: 40.74135, lng: -73.99802};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: manhattan,
        });

        var largeInfowindow = new google.maps.InfoWindow();
        //The following group uses the location array to create an array of markers on initialize.

        for(var i=0; i<initialLocation.length; i++){
            //Get the position from the location array
            var position = initialLocation[i].position;
            var name = initialLocation[i].name;

            // create a marker per location, and put into markers array.
            var marker = new google.maps.Marker({
                map: map,
                position: position,
                name: name,
                animation: google.maps.Animation.DROP,
                id: i
            });
            //push the marker to our array of markers
            markers.push(marker);
            //create an onclick event to open an infowindow 
            marker.addListener('click', function(){
            populateInfoWindow(this,largeInfowindow);
        });
        
            function populateInfoWindow(marker, infowindow){
                //check to make sure the infowindow is not already opened on this marker
                if(infowindow.marker != marker){
                    infowindow.marker = marker;
                    infowindow.setCountent('<div>'+ marker.name+'</div>');
                    infowindow.open(map,marker);
                    //make sure the marker property is cleared if the infowindow is closed
                    infowindow.addListener('closeclock',function(){
                        infowindow.setMarker(null);
                    });
                } 
            }
        }

        // var marker = new google.maps.Marker({
        //   position: {lat: 40.767778, lng: -73.971834},
        //   map: map
        // });

        // var infowindow = new google.maps.InfoWindow({

        //     content: 'test'
        // });
        // marker.addListener('click', function(){
        //     infowindow.open(map, marker);
        // });
      }
  
ko.applyBindings(new ViewModel());