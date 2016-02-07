/**
 * Created by Shuvojit Saha on 2/4/2016.
 */
var ScoreGenerator = function (lap1, lap2, lap3, humanInterventionArr) {

    var minimumTime = 0;

    this.getScore = function () {
        var score = 0;
        var lapSecondList = [lap1, lap2, lap3];
        console.log(lapSecondList);
        lapSecondList = removeZeroSecond(lapSecondList);
        console.log(lapSecondList);
        if (lapSecondList === undefined || lapSecondList.length === 0) {
            score = 0;
        }
        else {
            lapSecondList = removeHumanInterventionLap(lapSecondList);
            if (lapSecondList === undefined || lapSecondList.length === 0) {
                score = -1;
            }
            else {
                //lapSecondList.sort();
				minimumTime = 1000000;
				var idx = 0;
				while(idx < lapSecondList.length){
					if(minimumTime > lapSecondList[idx]){
						minimumTime = lapSecondList[idx];
					}
					idx++;
				}
                score = 3000 / minimumTime;
            }
        }
        console.log(score);
        return score.toFixed(2);
    };

    /* function convertToSecond(lap) {
     var arr = lap.split(":", 3);
     /!*console.log(parseInt(arr[1]));*!/
     var seconds = ((parseInt(arr[0]) * 60) + (parseInt(arr[1])) + (parseFloat(arr[2]) * 0.01)).toFixed(2);
     console.log(seconds);
     return seconds;
     }*/

    function removeZeroSecond(lapSecondList) {
        var i = 0;
        while (i < lapSecondList.length) {
            if (lapSecondList[i] == 0.00) {
                lapSecondList.splice(i, 1);
                humanInterventionArr.splice(i, 1);
            }
            else {
                i++;
            }
        }
        return lapSecondList;
    };

    function removeHumanInterventionLap(lapSecondList) {
        var i = 0;
        while (i < lapSecondList.length) {
            if (humanInterventionArr[i] == 1) {
                lapSecondList.splice(i, 1);
                humanInterventionArr.splice(i, 1);
            }
            else {
                i++;
            }
        }
        return lapSecondList;
    }

    this.getMinimumTime = function () {
        return minimumTime;
    }


};