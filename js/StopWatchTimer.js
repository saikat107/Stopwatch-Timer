/**
 * Created by Shuvojit Saha on 2/2/2016.
 */
function StopWatchTimer(elementMilli, elementSecond, elementMinute, isMainWatch) {

    var time = 0;
    var interval;
    var offset;
    this.isOn = false;
    this.state = 0;
    var second = 0;
    var millisecond = 0;
    var hour = 0;
    var minute = 0;

    function update() {
        if (this.isOn) {
            time += delta();
        }
        timeFormatter(time);
        /*console.log(time);*/
    };

    function delta() {
        var now = Date.now();
        var timePassed = now - offset;
        offset = now;
        return timePassed;
    };

    function setSeconds(seconds) {
        seconds = ("0" + seconds).slice(-2);
        second = seconds;
        elementSecond.text(seconds);
        /*console.log(seconds + '.');*/
    }

    function setMinutes(minutes) {
        minutes = ("0" + minutes).slice(-2);
        minute =  minutes;
        elementMinute.text(minutes);
        /* console.log(minutes + ':');*/
    }

    function setMilliSeconds(milliSeconds) {
        if (isMainWatch) {
            milliSeconds = ("0" + milliSeconds).slice(-3);
        }
        else {
            milliSeconds = ("0" + milliSeconds).slice(-2);
        }
        millisecond = milliSeconds;
        elementMilli.text(milliSeconds);
        /* console.log(milliSeconds);*/
    }

    function setHours(hours) {
        hours = ("0" + (parseInt(hours) - 6)).slice(-2);
        hour = hours;
       /* elementHour.text(hours);*/
        /* console.log(hours + ':');*/
    }

    function timeFormatter(timeInMilliseconds) {
        var time = new Date(timeInMilliseconds);
        var milliseconds = time.getMilliseconds();
        var seconds = time.getSeconds();
        var minutes = time.getMinutes();
        var hours = time.getHours();
        /* console.log(hours + ":" + minutes + ":" + seconds + "." +hours);*/
        setMilliSeconds(milliseconds);
        setSeconds(seconds);
        setMinutes(minutes);
        setHours(hours);
    };

    this.start = function () {
        if (!this.isOn) {
            interval = setInterval(update.bind(this), 10);
            offset = Date.now();
            this.isOn = true;
            this.state = 1;
        }
    };
    this.stop = function () {
        if (this.isOn) {
            clearInterval(interval);
            interval = null;
            this.isOn = false;
            this.state = 2;
        }
    };

    this.reset = function () {
        time = 0;
        this.state = 0;
        this.isOn = false;
        update();
    };

    this.getTime = function () {
        var time = hour + ":" + minute + ":" + second + ":" + millisecond;
        return time;
    }

}