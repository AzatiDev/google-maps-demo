var App = angular.module(constants.APP_NAMESPACE_NAME, ["ui.router", "appControllers"]);
var appControllers = angular.module('appControllers', []);

var appConstr = {
    initialize: function() {
        appConstr.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, true);
    },

    onDeviceReady: function() {
        if (navigator.splashscreen) {
            setTimeout(function() {
                navigator.splashscreen.hide();
            }, 1000);
        }
        angular.bootstrap(document, [constants.APP_NAMESPACE_NAME]);
    },
};

if (common.isDevice()) {
    document.addEventListener("deviceready", appConstr.initialize, true);
} else {
    $(document).ready(appConstr.onDeviceReady);
}
