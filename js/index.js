$(document).ready(function () {

  var breakcount = parseInt($("#break-length").html());
  var sessioncount = parseInt($("#session-length").html());
  var counter;
  var sessionTimer;
  var breakTimer;
  var timerType = 0; // toggle between 0 & 1. 0 for session timer, 1 for break timer 
  var paused = true;
  var buzzer = $("#beep")[0];
  $("#time-left").hide();


  $("#break-decrement").click(function () {
    if (breakcount > 1) {
      breakcount -= 1;
      $("#break-length").html(breakcount);
    }
  });
  $("#break-increment").click(function () {
    if (breakcount < 60) {
      breakcount += 1;
      $("#break-length").html(breakcount);
    }
  });
  $("#session-decrement").click(function () {
    $("#time-left").show();
    if (sessioncount > 10) {
      sessioncount -= 1;
      $("#session-length").html(sessioncount);
      $("#time-left").html(sessioncount + ":00");
    } else
    if (sessioncount > 1) {
      sessioncount -= 1;
      $("#session-length").html(sessioncount);
      $("#time-left").html("0" + sessioncount + ":00");
    }
  });
  $("#session-increment").click(function () {
    $("#time-left").show();
    if (sessioncount >= 9 && sessioncount < 60) {
      sessioncount += 1;
      $("#session-length").html(sessioncount);
      $("#time-left").html(sessioncount + ":00");
    } else
    if (sessioncount < 10) {
      sessioncount += 1;
      $("#session-length").html(sessioncount);
      $("#time-left").html("0" + sessioncount + ":00");
    }
  });


  // breakTimer setup
  breakTimer = function breakTimer() {
    timerType = 1;
    //    breakcount = parseInt($("#break-length").html());
    counter = setInterval(timer, 1000);
    //   breakcount *= 60;
    function timer() {
      $("#timer-label").html('Break');
      $("#timer-label").css("color", "#0EC518");
      $("#time-left").css("color", "#0EC518");
      //      breakcount -= 1;
      if (breakcount >= 10 * 60) {// timer display when 10mins and above
        if (breakcount % 60 >= 10) {
          $("#time-left").html(Math.floor(breakcount / 60) + ":" + breakcount % 60);
        } else
        {
          $("#time-left").html(Math.floor(breakcount / 60) + ":" + "0" + breakcount % 60);
        }
      } else
      if (breakcount >= 1 * 60) {// timer display when 1min and more
        if (breakcount % 60 >= 10) {
          $("#time-left").html("0" + Math.floor(breakcount / 60) + ":" + breakcount % 60);
        } else
        {
          $("#time-left").html("0" + Math.floor(breakcount / 60) + ":" + "0" + breakcount % 60);
        }
      } else
      if (breakcount > 0) {// timer display when under 1min
        if (breakcount % 60 >= 10) {
          $("#time-left").html("0" + Math.floor(breakcount / 60) + ":" + breakcount % 60);
          $("#time-left").css("color", "green");
          $("#timer-label").css("color", "green");
        } else
        {
          $("#time-left").html("0" + Math.floor(breakcount / 60) + ":" + "0" + breakcount % 60);
          $("#time-left").css("color", "green");
          $("#timer-label").css("color", "green");
        }
      } else
      if (breakcount === 0) {
        $("#time-left").html("0" + breakcount + ":00");
        $("#time-left").css("color", "green");
        $("#timer-label").css("color", "green");
        buzzer.play();
        clearInterval(counter);
        sessionTimer();
        breakcount = parseInt($("#break-length").html()) * 60 + 1;
      }
      breakcount -= 1;
    }
  };


  // sessionTimer setup
  sessionTimer = function sessionTimer() {
    timerType = 0;
    //    sessioncount = parseInt($("#session-length").html());
    counter = setInterval(timer, 1000);
    //  sessioncount *= 60;
    function timer() {
      //     sessioncount -= 1;
      $("#timer-label").html('Session');
      $("#timer-label").css("color", "tomato");
      $("#time-left").css("color", "tomato");
      sessioncount -= 1;
      if (sessioncount >= 10 * 60) {// timer display when 10mins and above
        if (sessioncount % 60 >= 10) {
          $("#time-left").html(Math.floor(sessioncount / 60) + ":" + sessioncount % 60);
        } else
        {
          $("#time-left").html(Math.floor(sessioncount / 60) + ":" + "0" + sessioncount % 60);
        }
      } else
      if (sessioncount >= 1 * 60) {// timer display when 1min and above
        if (sessioncount % 60 >= 10) {
          $("#time-left").html("0" + Math.floor(sessioncount / 60) + ":" + sessioncount % 60);
        } else
        {
          $("#time-left").html("0" + Math.floor(sessioncount / 60) + ":" + "0" + sessioncount % 60);
        }
      } else
      if (sessioncount > 0) {// timer display when under 1min
        if (sessioncount % 60 >= 10) {
          $("#time-left").html("0" + Math.floor(sessioncount / 60) + ":" + sessioncount % 60);
          $("#time-left").css("color", "red");
          $("#timer-label").css("color", "red");
        } else
        {
          $("#time-left").html("0" + Math.floor(sessioncount / 60) + ":" + "0" + sessioncount % 60);
          $("#time-left").css("color", "red");
          $("#timer-label").css("color", "red");
        }
      } else
      if (sessioncount === 0) {
        $("#time-left").html("0" + sessioncount + ":00");
        $("#time-left").css("color", "red");
        $("#timer-label").css("color", "red");
        buzzer.play();
        clearInterval(counter);
        breakTimer();
        sessioncount = parseInt($("#session-length").html()) * 60 + 1;
      }
      //   sessioncount -= 1;
    }
  };




  $("#start_stop").click(function () {
    if (paused === true) {
      if (timerType === 0) {
        sessioncount *= 60;
        breakcount *= 60;
        sessionTimer();
        paused = false;
        $("#time-left").show();
        $("#break-decrement").hide();
        $("#break-increment").hide();
        $("#session-decrement").hide();
        $("#session-increment").hide();
        $("#timer-label").css("animation", "blinker 1s linear");
      } else
      if (
      timerType === 1) {
        sessioncount *= 60;
        breakcount *= 60;
        breakTimer();
        paused = false;
      }
    } else
    {
      clearInterval(counter);
      paused = true;
      sessioncount /= 60;
      breakcount /= 60;

    }
  });

  $("#reset").click(function () {
    $("#break-length").html("5");
    $("#session-length").html("25");
    $("#time-left").html("25:00");
    $("#timer-label").html("Session");
    $("#break-decrement").show();
    $("#break-increment").show();
    $("#session-decrement").show();
    $("#session-increment").show();
    breakcount = parseInt($("#break-length").html());
    sessioncount = parseInt($("#session-length").html());
    $("#time-left").css("color", "black");
    $("#time-left").hide();
    $("#timer-label").css("color", "black");
    $("#timer-label").css("animation", "none");
    clearInterval(counter);
    buzzer.pause();
    buzzer.currentTime = 0;
    paused = true;
    timerType = 0;
  });
});