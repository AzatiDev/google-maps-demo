var mapGeolocation = {
    scriptLoaded: function() {
        mapGeolocation.isScriptLoaded = true;
    },

    DIRECTION_ROUTE_BUILDING_ERROR: "Route could not be found between the current location and destination.",
    DIRECTION_DETECTING_CODE_ONE: "The location acquisition process failed because the application does not have permission to use the Geolocation API.",
    DIRECTION_DETECTING_CODE_TWO: "The position of the device could not be determined. Ensure that location service is enabled.",
    DIRECTION_DETECTING_CODE_THREE: "Request timeout.",
    GOOGLE_MAPS_IS_NOT_LOADED: "Error occurred while loading google map.\nPlease restart the app to view the map.",

    isScriptLoaded: false,
    directionsDisplay: null,
    directionsService: null,
    init: function(data) {

        if (!mapGeolocation.isScriptLoaded) {
            common.showMessage(mapGeolocation.GOOGLE_MAPS_IS_NOT_LOADED);
            return;
        }

        var map = new google.maps.Map(document.getElementById('map_canvas'), {
            zoom: 11,
            center: { lat: parseFloat(data.start_point.la), lng: parseFloat(data.start_point.lo) },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var flightPlanCoordinates = new Array(); /*[
          { lat: 37.772, lng: -122.214 },
          { lat: 21.291, lng: -157.821 },
          { lat: -18.142, lng: 178.431 },
          { lat: -27.467, lng: 153.027 }
        ];*/

        //first point
        flightPlanCoordinates.push({ lat: parseFloat(data.start_point.la), lng: parseFloat(data.start_point.lo) });
        for (var i = 0; i < data.line_points.length; i++) {
            flightPlanCoordinates.push({ lat: parseFloat(data.line_points[i].la), lng: parseFloat(data.line_points[i].lo) });
        }
        //end point
        flightPlanCoordinates.push({ lat: parseFloat(data.end_point.la), lng: parseFloat(data.end_point.lo) });

        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FAFF18',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flightPath.setMap(map);

        var reportMarkerImage = new google.maps.MarkerImage("./img/report_circle.png",
            new google.maps.Size(21, 21),
            new google.maps.Point(0, 0),
            new google.maps.Point(10.5, 10.5));

        $.each(data.report_points, function(index, value) {
            var repMarker = new google.maps.Marker({
                position: new google.maps.LatLng((value.la), parseFloat(value.lo)),
                map: map,
                icon: reportMarkerImage
            });

            var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading" class="firstHeading">' + common.convertUnixTime(value.ts) + '</h1>' +
                '<div id="bodyContent">' +
                '<p>' +
                'altitude: ' + value.al + '</br>' +
                'longitude: ' + value.lo + '</br>' +
                'latitude: ' + value.la + '</br>' +
                '</p>' +
                '</div>' +
                '</div>';

            repMarker.addListener('click', function() {
                new google.maps.InfoWindow({
                    content: contentString
                }).open(map, repMarker);
            });

        });

        var startMarkerColor = "FE7569";
        var startMarkerImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + startMarkerColor,
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34));

        var startMarker = new google.maps.Marker({
            position: new google.maps.LatLng(parseFloat(data.start_point.la), parseFloat(data.start_point.lo)),
            map: map,
            icon: startMarkerImage
        });

        var endMarkerColor = "6775FB";
        var endMarkerImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + endMarkerColor,
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34));

        var endMarker = new google.maps.Marker({
            position: new google.maps.LatLng(parseFloat(data.end_point.la), parseFloat(data.end_point.lo)),
            map: map,
            icon: endMarkerImage
        });
    }
};
