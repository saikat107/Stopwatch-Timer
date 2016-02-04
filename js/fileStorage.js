function FileStorage(teamName, totalTime, Lap1, Lap2, Lap3, score, penalty, bonus) {


    this.save = function () {
        var date = getTodaysDate();
        console.log(date);
        var key = teamName + "-" + date;
        var value = getCSVFormattedData();
        console.log("Key" + key);
        localStorage.setItem(key, value);
        /* console.log(teamName + " has been stored");*/

    };


    function getTodaysDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        return dd + '/' + mm + '/' + yyyy;

    };

    function getCSVFormattedData() {
        var data = teamName + "," + totalTime + "," + Lap1 + "," + Lap2 + "," + Lap3 + "," + score + "," + penalty + "," + bonus;
        return data;
    };

    this.isTeamNameExist = function (teamName) {
        var res = false;
        if (localStorage.length > 0) {
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                key = key.split("-", 2);
                var storedTeamName = key[0];
                if (storedTeamName == teamName) {
                    res = true;
                    break;
                }
            }
        }
        return res;
    };


}