var fabricHelper = {
    getImageFromUrl: function (url, success_callback, fail_callback) {
        if (!('crossOrigin' in new Image())) {
            this.getImageFromUrl_IELT9_Base64(url, success_callback, fail_callback);
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
            console.log(this.getResponseHeader('content-type'));
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
    },

    /**
     * http://stackoverflow.com/questions/27886677/javascript-get-extension-from-base64-image
     */
    getImageFromUrl_IELT9_Base64: function (url, success_callback, fail_callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.onload = function () {
            var reader = new window.FileReader();
            reader.readAsDataURL(this.response);
            reader.onloadend = function () {
                var base64String = reader.result;
                fabric.Image.fromURL(base64String, function (img) {
                    if (img.width < 1 || img.height < 1) {
                        fail_callback('Error loading', url)
                    } else {
                        success_callback(img);
                    }
                }, {
                    crossOrigin: 'anonymous'
                });
            }
        };
        xhr.onerror = function () {
            fail_callback('Error ajax loading', url);
        };
        xhr.send();
    }
};
