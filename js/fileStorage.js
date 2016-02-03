function FileStorage(teamName, totalTime, Lap1, Lap2, Lap3){

    var header = "Team Name,TotalTime,Lap1,Lap2,Lap3";

    this.save = function()
    {
        var date = getTodaysDate();
        var value = getCSVFormattedData();
        var key = teamName + value;
        localStorage.setItem(key, value);
        console.log(teamName + " has been stored");

    };


    function getTodaysDate()
    {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        return dd + '/' + mm + '/' + yyyy;

    };

    function getCSVFormattedData()
    {
        var data = teamName + "," + totalTime + "," + Lap1 + "," + Lap2 + "," + Lap3;
        return data;
    };


}