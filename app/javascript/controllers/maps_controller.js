import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "myMap", "latitude", "longitude"]

  connect() {
    if (document.getElementById('place_latitude').value.length === 0) {
      var center = [51.58959, -0.228408]
      }
      else {
      var center =[this.latitudeTarget.value, this.longitudeTarget.value]
      }
    const map = new Microsoft.Maps.Map(this.myMapTarget, {
      center: new Microsoft.Maps.Location(center[0], center[1]),
      zoom: 12
      });

      Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', function () {
        var options = {
        maxResults: 6,
        map: map
        };
        var manager = new Microsoft.Maps.AutosuggestManager(options)
        manager.attachAutosuggest('#searchBox', '#searchBoxContainer', selectedSuggestion);
        });
        
        function selectedSuggestion(suggestionResult) {
          map.entities.clear();
          map.setView({ bounds: suggestionResult.bestView });
          var pushpin = new Microsoft.Maps.Pushpin(suggestionResult.location);
          map.entities.push(pushpin);
          document.getElementById("place_latitude").value = suggestionResult.location.latitude 
          document.getElementById("place_longitude").value = suggestionResult.location.longitude 
          
          }
          
  }
  
}
