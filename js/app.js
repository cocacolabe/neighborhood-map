// hard coded data
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
        name: 'Brooklyn Zoo',
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

// Model: Blueprint for KO Location objects
var Location = function(data){
    this.name = ko.observable(data.name);
    // Create marker for each location
    this.marker = new google.maps.Marker({
        map: map,
        position: data.position,
        name: data.name,
        animation: google.maps.Animation.DROP,
    });
    
}

// ViewModel: Controls interaction between Model and View
var ViewModel = function(){
    var self = this;
    this.locationList = ko.observableArray([]);
    //for the dropdown list
    this.selectedLocation = ko.observable();

    this.selectionChange = function() {
        self.clickListShowMarker(self.selectedLocation());
    }

    initialLocation.forEach(function(listItem){
        
        // Create new Locatioin from listItem
        var newLoc = new Location(listItem);

        // Add listener to marker
        newLoc.marker.addListener('click', function(){
            self.clickListShowMarker(newLoc);
        });

        // Push Location to locationList
        self.locationList.push(newLoc);
        
    });

    
    var infowindow = new google.maps.InfoWindow({
        //   content: contentString

        });

    this.clickListShowMarker = function(location) {


    // var query = location.name;

    // Wikipedia api

 //Wikipedia AJAX request 
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + location.marker.name + '&format=json&callback=wikiCallback';
    var contentString = '<div>'+ location.marker.name+'<br>' ;
    console.log(contentString);
    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(response){
            var articleList = response[1];
            console.log(response);
            for (var i=0; i<articleList.length; i++){
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/'+articleStr;
                contentString += '<li><a href="'+url+'">'+articleStr+ '</a></li></div>';
            
            }
            // console.log(contentString);
            infowindow.setContent(contentString);
            infowindow.open(map, location.marker);
// clearTimeout(wikiRequestTimeout);
        }
    });
        // infowindow.setContent(contentString);
        // infowindow.open(map, location.marker);

    }
    


}

// Initialize and setup google map
var map;
function initMap() {
    var manhattan = {lat: 40.74135, lng: -73.99802};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: manhattan, 
    });
    ko.applyBindings(new ViewModel());
}
