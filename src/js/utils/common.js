var common = {
    openLink: function(url) {
        window.open(url, '_system', 'location=no');
    },

    showMessage: function(message) {
        if (common.isDevice() && navigator.notification) {
            navigator.notification.alert(message, null, "      ");
        } else {
            alert(message);
        }
    },

    isDevice: function() {
        return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/);
    },

    prepareJson: function(data) {
        var startPoint = null;
        var endPoint = null;

        var linePoints = new Array();
        var reportPoints = new Array();

        for (var i = 0; i < data.L199.track.length; i++) {
            if (data.L199.track[i].ty == "1") {
                startPoint = data.L199.track[i];
            } else if (data.L199.track[i].ty == "3") {
                reportPoints.push(data.L199.track[i]);
            } else if (data.L199.track[i].ty == "5") {
                linePoints.push(data.L199.track[i]);
            } else if (data.L199.track[i].ty == "7") {
                endPoint = data.L199.track[i];
            }
        }
        return {
            start_point: startPoint,
            end_point: endPoint,
            line_points: linePoints,
            report_points: reportPoints
        }
    },

    convertUnixTime: function(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = "0" + a.getMinutes();
        var sec = "0" + a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min.substr(-2) + ':' + sec.substr(-2);
        return time;
    }
};
