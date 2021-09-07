/**
 * File Name: geo.js
 *
 * Revision History:
 *       Karan Sharma, 2021-04-25 : Created
 */
function getPosition() {

    try {
        if (navigator.geolocation != null) {
            var options = {
                enableHighAccuracy: true,
                timeout: 60000,
                maximumAge: 200
            };


            function successCallback(position) {
                var coordinates = position.coords;
                var lat = coordinates.latitude;
                var lon = coordinates.longitude;
                var alt = coordinates.altitude;

                var type = google.maps.MapTypeId.ROADMAP;

                if ($("#radRoad").prop("checked")) {
                    type = google.maps.MapTypeId.ROADMAP;
                    console.info("road is selected");
                }
                else if ($("#radSatellite").prop("checked")) {
                    type = google.maps.MapTypeId.SATELLITE;
                }
                else if ($("#radHybrid").prop("checked")) {
                    type = google.maps.MapTypeId.HYBRID;
                    console.info("Hybrid is selected");


                }
                else if ($("#radTerrain").prop("checked")) {
                    type = google.maps.MapTypeId.TERRAIN;
                }

                function showPosition() {
                    console.info("Latitude: " + lat);
                    console.info("Longitude: " + lon);
                    console.info("Altitude: " + alt);

                }

                function showPositionOnMap() {
                    var latlon = lat + "," + lon;
                    var zoom = 14;
                    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center=" +
                        latlon + "&zoom=" + zoom +
                        "&size=400x300&sensor=false";

                    $("#mapHolder").prop("src", img_url);
                }

                function showPositionOnMapWithMarker() {
                    var pos = {
                        lat: lat,
                        lng: lon
                    };

                    var options={
                        zoom:12,
                        center: pos,
                        mapTypeId: type
                    };

                    var map = new google.maps.Map(document.getElementById("map-canvas"), options);
                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        title: "College"
                    });

                }

                showPosition();
                showPositionOnMap();
                showPositionOnMapWithMarker();


            }

            function errorCallback(error) {
                switch (error.code) {
                    case error.TIMEOUT:
                        console.error("Error: TIMEOUT " + error.message);
                        break;
                    case error.PERMISSION_DENIED:
                        console.error("Error: PERMISSION_DENIED " + error.message);
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.error("Error: POSITION_UNAVAILABLE " + error.message);
                        break;
                    default:
                        console.error("Error: unknown:  " + error.code + " - " + error.message);
                        break;

                }
            }

            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

        }
        else {
            console.error("HTML5 geolocation is not supported");
        }

    } catch (e) {
        console.error("Exception in getPosition() - " + e);


    }


}
