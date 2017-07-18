var initialLocation = [
    {
        name: 'Bronx Zoo',
        latlng: {lat: 40.850595, lng: -73.876998},
    },

    {
        name: 'Central Park Zoo',
        latlng: {lat: 40.767778, lng: -73.971834},
    },

    {
        name: 'Brooklyn Zoo NY',
        latlng: {lat: 40.711663, lng: -73.935463},
    },

        {
        name: 'Queens Zoo',
        latlng: {lat: 40.744434, lng: -73.849741},
    },

        {
        name: 'Staten Island Zoo',
        latlng: {lat: 40.625124, lng: -74.115370},
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

      function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }
  
ko.applyBindings(new ViewModel());