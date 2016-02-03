/**
 * Created by Shuvojit Saha on 2/2/2016.
 */

$(document).ready(function () {

    var btnStart = $('#btnTimerStart');
    var btnReset = $('#btnTimerReset');
    var btnExport = $('#btnFileExport');
    var hours = $('#hours');
    var minutes = $('#minutes');
    var seconds = $('#seconds');
    var milli = $('#milliSeconds');
    var lapOneBtnStart = $('#lapOneStart');
    var lapOneBtnStop = $('#lapOneStop');
    var lapOneHour = $('#lapOneHour');
    var lapOneMinute = $('#lapOneMinute');
    var lapOneSecond = $('#lapOneSecond');
    var lapOneMilliSecond = $('#lapOneMilliSecond');
    var lapTwoBtnStart = $('#lapTwoBtnStart');
    var lapTwoBtnStop = $('#lapTwoBtnStop');
    var lapTwoHour = $('#lapTwoHour');
    var lapTwoMinute = $('#lapTwoMinute');
    var lapTwoSecond = $('#lapTwoSecond');
    var lapTwoMilliSecond = $('#lapTwoMilliSecond');
    var lapThreeBtnStart = $('#lapThreeBtnStart');
    var lapThreeBtnStop = $('#lapThreeBtnStop');
    var lapThreeHour = $('#lapThreeHour');
    var lapThreeMinute = $('#lapThreeMinute');
    var lapThreeSecond = $('#lapThreeSecond');
    var lapThreeMilliSecond = $('#lapThreeMilliSecond');
    var btnSave = $('#btnSave');
    var btnCancel = $('#btnCancel');
    var teamName = $('#teamName');
    var downLoadAnchor = $('#download');

    var fileCreator = new FileCreator();
    var mainWatch = new StopWatchTimer(milli, seconds, minutes, hours, true);
    var lapOneWatch = new StopWatchTimer(lapOneMilliSecond, lapOneSecond, lapOneMinute, lapOneHour, false);
    var lapTwoWatch = new StopWatchTimer(lapTwoMilliSecond, lapTwoSecond, lapTwoMinute, lapTwoHour, false);
    var lapThreeWatch = new StopWatchTimer(lapThreeMilliSecond, lapThreeSecond, lapThreeMinute, lapThreeHour, false);

    if (localStorage) {
        // LocalStorage is supported!
        console.log("local storage supported");
    } else {
        // No support. Use a fallback such as browser cookies or store on the server.
        console.log("local storage not supported");
    }

    btnStart.click(function () {
        var btnText = null;
        var btnAttr = null;
        if (!mainWatch.isOn) {
            mainWatch.start();
            btnText = 'Stop';
            btnAttr = 'btn btn-danger active';
            disableReset();

        }
        else {
            mainWatch.stop();
            btnText = 'Start';
            btnAttr = 'btn btn-success active';
            enableReset();
        }
        btnStart.text(btnText);
        btnStart.attr('class', btnAttr);

    });

    btnReset.click(function () {
        mainWatch.reset();
        lapOneWatch.reset();
        lapTwoWatch.reset();
        lapThreeWatch.reset();
        btnSave.attr('class', 'btn btn-primary disabled');
        btnCancel.attr('class', 'btn btn-danger disabled');
    });

    function disableReset() {
        btnReset.attr('class', 'btn btn-default disabled');
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

        /*lapOneBtnStart.attr('class', 'btn btn-primary disabled');*/
    };

    function disableOtherLap() {
        if (lapOneWatch.state == 1) {
            lapOneWatch.stop();
            lapOneWatch.state = 3;
            lapOneBtnStop.attr('class', 'btn btn-danger disabled');
        }
        else if (lapTwoWatch.state == 1) {
            lapTwoWatch.stop();
            lapTwoWatch.state = 3;
            lapTwoBtnStop.attr('class', 'btn btn-danger disabled');
        }
        else if (lapTwoWatch.state == 0) {
            lapTwoBtnStart.attr('class', 'btn btn-primary disabled');
        }
        else if (lapThreeWatch.state == 0) {
            lapThreeBtnStart.attr('class', 'btn btn-primary disabled');
        }
        else if (lapThreeWatch.state == 1) {
            lapThreeWatch.stop();
            lapThreeWatch.state = 3;
            lapThreeBtnStop.attr('class', 'btn btn-danger disabled');
        }
    }

    lapOneBtnStart.click(function () {

        lapOneWatch.start();
        lapOneBtnStart.attr('class', 'btn btn-primary disabled');
        lapOneBtnStop.attr('class', 'btn btn-danger active');

    });

    lapOneBtnStop.click(function () {
        lapOneWatch.stop();
        lapOneBtnStop.attr('class', 'btn btn-danger disabled');
        lapTwoBtnStart.attr('class', 'btn btn-primary active');
    });

    lapTwoBtnStart.click(function () {

        lapTwoWatch.start();
        lapTwoBtnStart.attr('class', 'btn btn-primary disabled');
        lapTwoBtnStop.attr('class', 'btn btn-danger active');

    });

    lapTwoBtnStop.click(function () {
        lapTwoWatch.stop();
        lapTwoBtnStop.attr('class', 'btn btn-danger disabled');
        lapThreeBtnStart.attr('class', 'btn btn-primary active');
    });

    lapThreeBtnStart.click(function () {

        lapThreeWatch.start();
        lapThreeBtnStart.attr('class', 'btn btn-primary disabled');
        lapThreeBtnStop.attr('class', 'btn btn-danger active');

    });

    lapThreeBtnStop.click(function () {
        lapThreeWatch.stop();
        lapThreeBtnStop.attr('class', 'btn btn-danger disabled');
        btnSave.attr('class', 'btn btn-primary active');
        btnCancel.attr('class', 'btn btn-danger active');
    });

    btnSave.click(function () {
        console.log("btn save click");
        if (localStorage) {
            var team = teamName.val();
            if (team != null && team != '') {
                setSessionDataEnabled();
                console.log("Team name found" + team);
                var totalTime = mainWatch.getTime();
                var lap1 = lapOneWatch.getTime();
                var lap2 = lapTwoWatch.getTime();
                var lap3 = lapThreeWatch.getTime();
                var fileStore = new FileStorage(team, totalTime, lap1, lap2, lap3);
                fileStore.save();

                fileCreator.createFile();
                var url = fileCreator.createFile();
                /*downLoadAnchor.attr('href', url);
                downLoadAnchor.attr('download', 'Result.csv');*/
            }
            setDownload();
        }
    });

    function setSessionDataEnabled() {
        if (typeof(Storage) !== "undefined") {
            if (!sessionStorage.enabled) {
               sessionStorage.enabled = 1;
            }
        }
    };


    btnCancel.click(function () {

    });


    function setDownload()
    {
        var url = fileCreator.getDownloadUrl();
        downLoadAnchor.attr("download", "Shuvo.csv");
        downLoadAnchor.attr("href", url);
        console.log(downLoadAnchor);
    };

    function getCurrentPath() {
        var currentUrl = location.pathname;
        var reg = new RegExp('%20', 'g');
        currentUrl = currentUrl.replace(reg, ' ');
        reg = new RegExp('/', 'g');
        currentUrl = currentUrl.replace(reg, '\\');
        var currentPath = currentUrl.slice(0, -10);
        return currentPath;
    }


});