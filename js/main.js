/**
 * Created by Shuvojit Saha on 2/2/2016.
 */

$(document).ready(function () {
    console.log('Hello World');
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


    var mainWatch = new StopWatchTimer(milli, seconds, minutes, hours, true);
    var lapOneWatch = new StopWatchTimer(lapOneMilliSecond, lapOneSecond, lapOneMinute, lapOneHour, false);
    var lapTwoWatch = new StopWatchTimer(lapTwoMilliSecond, lapTwoSecond, lapTwoMinute, lapTwoHour, false);
    var lapThreeWatch = new StopWatchTimer(lapThreeMilliSecond, lapThreeSecond, lapThreeMinute, lapThreeHour, false);

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

    });


    btnCancel.click(function () {

    });

    btnExport.click(function () {

    });

});