appControllers.controller("MainPageController", [
    "$scope", function($scope) {
        if (!mapGeolocation.isScriptLoaded) {
            var timer = setInterval(function() {
                if (mapGeolocation.isScriptLoaded) {
                    $.getJSON("./data.json", function(json) {
                        try {
                            mapGeolocation.init(common.prepareJson(json));
                        } catch (e) {
                            debugger;
                            alert(JSON.stringify(e));
                        }
                    });
                    clearInterval(timer);
                }
            }, 1000);
        } else {
            $.getJSON("./data.json", function(json) {
                try {
                    mapGeolocation.init(common.prepareJson(json));
                } catch (e) {
                    debugger;
                    alert(JSON.stringify(e));
                }
            });
        }
    }
]);
