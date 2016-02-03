/**
 * Created by Shuvojit Saha on 2/3/2016.
 */
var FileCreator = function () {
    var header = "Team Name,TotalTime,Lap1,Lap2,Lap3";
    url = null;

    function retrieveDataFromStorage() {
        var data = [];
        data[0] = header;
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
           /* console.log('Key = ' + key + " value = " + value);*/
            data[i + 1] = value;
            /*console.log(data[i + 1]);*/
        }
        return data;
    };

    this.createFile = function () {
        var data = retrieveDataFromStorage();
        var blob = new Blob([], {type: "text/plain"});
       /* console.log(data.length);*/
        for (var i = 0; i < data.length; i++) {
            blob = new Blob([blob, data[i] + "\n"], {type: "text/plain"});
            /*console.log(data[i]);*/
        }
        url = URL.createObjectURL(blob);
        /*console.log(url);*/
        /*var url = URL.createObjectURL(blob);
        console.log("file created");*/
        /*return url;*/
    };

    this.getDownloadUrl = function ()
    {
        return url;
    }




};