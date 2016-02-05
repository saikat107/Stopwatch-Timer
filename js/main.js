/**
 * Created by Shuvojit Saha on 2/2/2016.
 */

$(document).ready(function () {

    var btnStart = $('#btnTimerStart');
    var btnReset = $('#btnTimerReset');
    /* var hours = $('#hours');*/
    var minutes = $('#minutes');
    var seconds = $('#seconds');
    var milli = $('#milliSeconds');

    //lap one buttons
    var lapOneBtnStart = $('#lapOneStart');
    var lapOneBtnStop = $('#lapOneStop');
    var lapOneBtnHumanIntervention = $('#lapOneBtnHandIntervention');
    /* var lapOneHour = $('#lapOneHour');*/
    var lapOneMinute = $('#lapOneMinute');
    var lapOneSecond = $('#lapOneSecond');
    var lapOneMilliSecond = $('#lapOneMilliSecond');


    //lap two buttons
    var lapTwoBtnStart = $('#lapTwoBtnStart');
    var lapTwoBtnStop = $('#lapTwoBtnStop');
    var lapTwoBtnHumarIntervention = $('#lapTwoBtnHandIntervention');
    /* var lapTwoHour = $('#lapTwoHour');*/
    var lapTwoMinute = $('#lapTwoMinute');
    var lapTwoSecond = $('#lapTwoSecond');
    var lapTwoMilliSecond = $('#lapTwoMilliSecond');

    //lap three buttons
    var lapThreeBtnStart = $('#lapThreeBtnStart');
    var lapThreeBtnStop = $('#lapThreeBtnStop');
    /* var lapThreeHour = $('#lapThreeHour');*/
    var lapThreeMinute = $('#lapThreeMinute');
    var lapThreeSecond = $('#lapThreeSecond');
    var lapThreeMilliSecond = $('#lapThreeMilliSecond');
    var btnSave = $('#btnSave');
    var btnCancel = $('#btnCancel');
    var teamName = $('#teamName');
    var downLoadAnchor = $('#download');
    var popUpDialog = $('#myModal');
    var btnTrash = $('#btnTrash');

    var fileCreator = new FileCreator();
    var mainWatch = new StopWatchTimer(milli, seconds, minutes, true);
    var lapOneWatch = new StopWatchTimer(lapOneMilliSecond, lapOneSecond, lapOneMinute, false);
    var lapTwoWatch = new StopWatchTimer(lapTwoMilliSecond, lapTwoSecond, lapTwoMinute, false);
    var lapThreeWatch = new StopWatchTimer(lapThreeMilliSecond, lapThreeSecond, lapThreeMinute, false);

    var lapOneFlag = false;
    var lapTwoFlag = false;
    var lapThreeFlag = false;
    var mainFlagInterrupt = 0;
    var countHumanIntervention = 0;
    var trashFlag = false;


    /* $('#myModal2').modal();*/
    function setTrashBtnVisibility() {
        if (localStorage.length > 0) {
            btnTrash.attr('class', 'btn btn-danger active');
            downLoadAnchor.attr("class", "btn btn-primary active");
            trashFlag = true;
            setDownload();
        }
    }

    setTrashBtnVisibility();


    //trash button click
    btnTrash.click(function () {
        if (trashFlag) {
            $('#delete-file-modal').modal();
            $('#confirm-delete-button').click(function () {
                localStorage.clear();
                trashFlag = false;
                btnTrash.attr('class', 'btn btn-danger disabled');
                downLoadAnchor.attr("class", "btn btn-primary disabled");
                showModel("Success", "Previous all stored data has been deleted");
            });
        }
    });

    btnStart.click(function () {
        var btnText = null;
        var btnAttr = null;
        if (!mainWatch.isOn) {
            mainWatch.start();
            btnText = 'Stop';
            btnAttr = 'btn btn-danger active';
            mainFlagInterrupt = 1;
            disableReset();

        }
        else {
            mainWatch.stop();
            btnText = 'Start';
            btnAttr = 'btn btn-success active';
            mainFlagInterrupt = 2;
            enableReset();
        }
        btnStart.text(btnText);
        btnStart.attr('class', btnAttr);

    });

    btnReset.click(function () {
        if (mainFlagInterrupt == 2) {
            resetAll();
        }
    });

    function disableReset() {
        btnReset.attr('class', 'btn btn-default disabled');
        btnSave.attr('class', 'btn btn-primary disabled');
        btnCancel.attr('class', 'btn btn-danger disabled');
        enableOtherLap();
        /*lapOneBtnStart.attr('class', 'btn btn-primary active');*/
    };

    function enableOtherLap() {
        if (lapOneWatch.state == 3 || lapOneWatch.state == 0) {
            lapOneBtnStart.attr('class', 'btn btn-primary active');
        }
        else if (lapTwoWatch.state == 3 || lapTwoWatch.state == 0) {
            lapTwoBtnStart.attr('class', 'btn btn-primary active');
        }
        else if (lapThreeWatch.state == 3 || lapThreeWatch.state == 0) {
            lapThreeBtnStart.attr('class', 'btn btn-primary active');
        }
    }

    function enableReset() {
        btnReset.attr('class', 'btn btn-default active');
        disableOtherLap();
        btnSave.attr('class', 'btn btn-primary active');
        btnCancel.attr('class', 'btn btn-danger active');

        /*lapOneBtnStart.attr('class', 'btn btn-primary disabled');*/
    };

    function disableOtherLap() {
        if (lapOneWatch.state == 1 || lapOneWatch.state == 0) {
            lapOneWatch.stop();
            lapOneWatch.state = 3;
        }
        else if (lapTwoWatch.state == 1 || lapTwoWatch.state == 0) {
            lapTwoWatch.stop();
            lapTwoWatch.state = 3;
        }
        else if (lapThreeWatch.state == 1 || lapThreeWatch.state == 0) {
            lapThreeWatch.stop();
            lapThreeWatch.state = 3;
        }
        lapOneBtnStart.attr('class', 'btn btn-primary disabled');
        lapOneBtnStop.attr('class', 'btn btn-danger disabled');
        lapOneBtnHumanIntervention.attr('class', 'btn btn-warning disabled');
        lapTwoBtnStart.attr('class', 'btn btn-primary disabled');
        lapTwoBtnStop.attr('class', 'btn btn-danger disabled');
        lapTwoBtnHumarIntervention.attr('class', 'btn btn-warning disabled');
        lapThreeBtnStart.attr('class', 'btn btn-primary disabled');
        lapThreeBtnStop.attr('class', 'btn btn-danger disabled');
    };


    //lapOne button onClick methods
    lapOneBtnStart.click(function () {
        if (mainFlagInterrupt == 1 && (lapOneWatch.state == 0 || lapOneWatch.state == 3)) {
            lapOneWatch.start();
            lapOneBtnStart.attr('class', 'btn btn-primary disabled');
            lapOneBtnStop.attr('class', 'btn btn-danger active');
            lapOneBtnHumanIntervention.attr('class', 'btn btn-warning active');
        }
    });

    lapOneBtnStop.click(function () {
        if (lapOneWatch.state == 1) {
            stopLapOne();
        }
    });

    lapOneBtnHumanIntervention.click(function () {
        if (lapOneWatch.state == 1) {
            countHumanIntervention++;
            lapOneWatch.setHumanIntervention(1);
            stopLapOne();
        }
    });

    function stopLapOne() {
        lapOneWatch.stop();
        lapOneBtnStop.attr('class', 'btn btn-danger disabled');
        lapOneBtnHumanIntervention.attr('class', 'btn btn-danger disabled');
        lapTwoBtnStart.attr('class', 'btn btn-primary active');
        lapOneFlag = true;
    };


    //lap Two button onClick methods
    lapTwoBtnStart.click(function () {
        if (lapOneFlag && mainFlagInterrupt == 1 && (lapTwoWatch.state == 0 || lapTwoWatch.state == 3)) {
            lapTwoWatch.start();
            lapTwoBtnStart.attr('class', 'btn btn-primary disabled');
            lapTwoBtnStop.attr('class', 'btn btn-danger active');
            lapTwoBtnHumarIntervention.attr('class', 'btn btn-warning active');
        }
    });

    lapTwoBtnStop.click(function () {
        if (lapTwoWatch.state == 1) {
            stopLapTwo();
        }
    });

    lapTwoBtnHumarIntervention.click(function () {
        if (lapTwoWatch.state == 1) {
            countHumanIntervention++;
            lapTwoWatch.setHumanIntervention(1);
            stopLapTwo();
        }
    });

    function stopLapTwo() {
        lapTwoWatch.stop();
        lapTwoBtnStop.attr('class', 'btn btn-danger disabled');
        lapTwoBtnHumarIntervention.attr('class', 'btn btn-warning disabled');
        lapThreeBtnStart.attr('class', 'btn btn-primary active');
        lapTwoFlag = true;
    }


    //lap three buttons onClick methods
    lapThreeBtnStart.click(function () {
        if (lapTwoFlag && mainFlagInterrupt == 1 && (lapThreeWatch.state == 0 || lapThreeWatch.state == 3)) {
            lapThreeWatch.start();
            lapThreeBtnStart.attr('class', 'btn btn-primary disabled');
            lapThreeBtnStop.attr('class', 'btn btn-danger active');
        }
    });

    lapThreeBtnStop.click(function () {
        if (lapThreeWatch.state == 1) {
            lapThreeWatch.stop();
            lapThreeBtnStop.attr('class', 'btn btn-danger disabled');
            lapThreeFlag = true;
        }
    });


    // data saving buttons
    btnSave.click(function () {
        console.log("btn save click");
        if (localStorage && mainFlagInterrupt == 2) {
            var team = teamName.val();
            if (team != null && team != '') {
                /*console.log("Team name found" + team);*/
                var totalTime = mainWatch.getTime();
                var lap1 = lapOneWatch.getTime();
                var lap2 = lapTwoWatch.getTime();
                var lap3 = lapThreeWatch.getTime();
                var humanInterventionArr = [
                    lapOneWatch.getHumanIntervention(),
                    lapTwoWatch.getHumanIntervention(),
                    lapThreeWatch.getHumanIntervention()];
                var scoreGen = new ScoreGenerator(lap1, lap2, lap3, humanInterventionArr);
                var score = scoreGen.getScore();
                var minimumTime = scoreGen.getMinimumTime();
                var penalty = countHumanIntervention;
                var bonus = 0;
                console.log(countHumanIntervention);
                if (score == 0.00) {
                    showModel("Warning", "Laps have not been started yet");
                }
                else if (score == -1) {
                    showModel("Warning", "Submitted laps have human interventions");
                }
                else {
                    storeScore(team, totalTime, lap1, lap2, lap3, minimumTime, score, penalty, bonus);
                }
            }
            else {
                showModel("Warning", "Plz enter team name first");
            }
        }
    });

    function storeScore(team, totalTime, lap1, lap2, lap3, minimumTime, score, penalty, bonus) {
        var fileStorage = new FileStorage();
        if (fileStorage.isTeamNameExist()) {
            showModel("Warning", "Data already exist");
        }
        else {
            var radioChecked = false;
            var tmpScore = (score - (penalty * 20) + (bonus * 100)).toFixed(2);
           /* var msg = "Score is " + tmpScore + "<br />" +
                "Human intervention " + penalty + " times" + "<br />";*/
            var model = $('#myModal2');
            $('#scoreTitle').text("Bonus Score");
            /*$('.scoreMsg').text(msg);*/
            $('input[type=radio]').click(function () {
                var option = $(this).val();
                if (option == 1) {
                    bonus = 1;
                    tmpScore = (score - (penalty * 20) + (bonus * 100)).toFixed(2);
                    /*msg = "Score is " + tmpScore + "<br />" +
                     "Human intervention " + penalty + " times" + "<br />";
                     $('.scoreMsg').html(msg);*/
                    radioChecked = true;
                }
                else if (radioChecked && option == 0) {
                    bonus = 0;
                    radioChecked = false;
                    tmpScore = (score - (penalty * 20) + (bonus * 100)).toFixed(2);
                    /* msg = "Score is " + tmpScore + "<br />" +
                     "Human intervention " + penalty + " times" + "<br />";
                     $('.scoreMsg').html(msg);*/
                }
            });
            $('#saveDataBtn').click(function () {
                fileStorage = new FileStorage(team, totalTime, lap1, lap2, lap3,
                    minimumTime, penalty, penalty * 20, bonus * 100, tmpScore);
                fileStorage.save();
                trashFlag = true;
                setDownload();
                setTrashBtnVisibility();
                showModel("Success", "Data has been stored", "Team " + team + "'s score is " + tmpScore);
                resetAll();
            });
            model.modal();
        }
    };

    btnCancel.click(function () {
        if (mainFlagInterrupt == 2) {
            resetAll();
        }
    });

    //reset all
    function resetAll() {
        teamName.val("");
        mainWatch.reset();
        lapOneWatch.reset();
        lapTwoWatch.reset();
        lapThreeWatch.reset();
        btnSave.attr('class', 'btn btn-primary disabled');
        btnCancel.attr('class', 'btn btn-danger disabled');
        countHumanIntervention = 0;
        lapOneFlag = false;
        lapTwoFlag = false;
        lapThreeFlag = false;
    };


    function showModel(modelType, message, scoreMsg) {
        var modelHeader = $('.modal-title');
        var modelBody = $('.modelMsg');
        var headerColor = null;
        var msgBodyColor = null;
        switch (modelType.toUpperCase()) {
            case "WARNING":
                headerColor = "#ED6A5A";
                msgBodyColor = "#E8D547";
                break;
            case "SUCCESS":
                headerColor = "#35C4B6";
                msgBodyColor = "#5BC0EB";
                break;
            case "ERROR":
                break;
        }
        modelHeader.css("color", headerColor);
        modelHeader.css("font-weight", "bold");
        modelHeader.text(modelType + "!");
        modelBody.css("color", msgBodyColor);
        modelBody.css("font-weight", "bold");
        if (scoreMsg == null || scoreMsg == undefined) {
            modelBody.text(message);
            popUpDialog.modal();
        }
        else {
            modelBody.text(message);
            $('.scoreMsg').text(scoreMsg);
            $('#myModal3').modal();
        }

    };


    function setDownload() {
        fileCreator.createFile();
        var url = fileCreator.getDownloadUrl();
        console.log(url);
        downLoadAnchor.attr("download", "Result.csv");
        downLoadAnchor.attr("href", url);
        console.log(downLoadAnchor);
    };

    /* function getCurrentPath() {
     var currentUrl = location.pathname;
     var reg = new RegExp('%20', 'g');
     currentUrl = currentUrl.replace(reg, ' ');
     reg = new RegExp('/', 'g');
     currentUrl = currentUrl.replace(reg, '\\');
     var currentPath = currentUrl.slice(0, -10);
     return currentPath;
     };
     */

});