var fabricHelper = {
    getImageFromUrl: function (url, success_callback, fail_callback) {
        if (!('crossOrigin' in new Image())) {
            this.getImageFromUrl_IELT9(url, success_callback, fail_callback);
            return;
        }
        fabric.Image.fromURL(url, function (img) {
            if (img.width < 1 || img.height < 1) {
                fail_callback('Error loading', url)
            } else {
                success_callback(img);
            }
        }, {
            crossOrigin: 'anonymous'
        });
    },
    /**
     * createObjectURL better performance
     * https://www.bennadel.com/blog/2966-rendering-image-previews-using-object-urls-vs-base64-data-uris-in-angularjs.htm
      */
    getImageFromUrl_IELT9: function (url, success_callback, fail_callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.onload = function () {
            var urlCreator = window.URL || window.webkitURL;
            fabric.Image.fromURL(urlCreator.createObjectURL(this.response), function (img) {
                if (img.width < 1 || img.height < 1) {
                    fail_callback('Error loading', url)
                } else {
                    success_callback(img);
                }
            }, {
                crossOrigin: 'anonymous'
            });
        };
        xhr.onerror = function () {
            fail_callback('Error ajax loading', url);
        };
        xhr.send();
    }
};
