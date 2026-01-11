var timer_interval;
var seconds_remaining;

function messageHide() {
  document.getElementById("timer-message").style.display = "none";
}

function resetTimer() {
  //show input
  document.getElementById("timer-input").style.display = "block";
  //hide pause button by default
  document.getElementById("timer-pause-area").style.display = "none";
  //hide resume button
  document.getElementById("timer-resume-area").style.display = "none";
  //hide refresh button
  document.getElementById("timer-reset-button").style.display = "none";
  //reset value to blank
  document.getElementById("timer-minutes-input").value = "";
  setTimeout(messageHide, 5000);
}

function resumeCountdown() {
  tick();
  timer_interval = setInterval(tick, 1000);
  //hide resume button when resuming
  document.getElementById("timer-resume-area").style.display = "none";
  //show resume button;
  document.getElementById("timer-pause-area").style.display = "block";
  return;
}

function pauseCountdown() {
  clearInterval(timer_interval);
  document.getElementById("timer-pause-area").style.display = "none";
  document.getElementById("timer-resume-area").style.display = "block";
  return;
}

function tick() {
  var timer_display = document.getElementById("time");

  var min = Math.floor(seconds_remaining / 60);
  var sec = seconds_remaining - min * 60;

  if (min < 10) {
    min = "0" + min;
  }

  if (sec < 10) {
    sec = "0" + sec;
  }

  var message = min + ":" + sec;
  timer_display.innerHTML = message;

  if (seconds_remaining === 0) {
    document.getElementById("timer-message").innerHTML =
      "<strong>Times up!</strong>";
    document
      .getElementById("timer-message")
      .setAttribute("class", "alert alert-success text-center");
    clearInterval(timer_interval);
    resetTimer();
  }
  seconds_remaining--;
}

function startCountdown() {
  var minutes = document.getElementById("timer-minutes-input").value;

  //check if it is a number
  if (isNaN(minutes) || minutes == "") {
    document.getElementById("timer-message").innerHTML =
      "Yikes! It's not a number. <strong>TRY AGAIN</strong>";
    document
      .getElementById("timer-message")
      .setAttribute("class", "alert alert-danger text-center");

    //hides error after 5 secs
    setTimeout(messageHide, 5000);
    resetTimer();
    return;
  }
  //get the seconds
  seconds_remaining = minutes * 60;
  //reoccuring function
  tick();
  timer_interval = setInterval(tick, 1000);
  //hide input form once running
  document.getElementById("timer-input").style.display = "none";
  //show pause when running
  document.getElementById("timer-pause-area").style.display = "block";
  //show refresh when running
  document.getElementById("timer-reset-button").style.display = "block";
}
//refresh page with button
document.getElementById("timer-reset-button").onclick = function () {
  clearInterval(timer_interval);
  document.getElementById("time").innerHTML = "00:00";
  document.getElementById("timer-minutes-input").value = "";
  document.getElementById("timer-input").style.display = "block";
  document.getElementById("timer-reset-button").style.display = "none";
  document.getElementById("timer-resume-area").style.display = "none";
  document.getElementById("timer-pause-area").style.display = "none";
};
window.onload = function () {
  //break button
  var startButton = document.getElementById("timer-start-button");
  startButton.onclick = function () {
    startCountdown();
  };
  //pause button
  var pauseButton = document.getElementById("timer-pause-button");
  pauseButton.onclick = function () {
    pauseCountdown();
  };

  //resume button
  var resumeButton = document.getElementById("timer-resume-button");
  resumeButton.onclick = function () {
    resumeCountdown();
  };
  document.getElementById("timer-input").appendChild(startButton);
  document.getElementById("timer-pause-area").appendChild(pauseButton);
  document.getElementById("timer-resume-area").appendChild(resumeButton);

  //hide pause button by default
  document.getElementById("timer-pause-area").style.display = "none";
  //hide pause button by default
  document.getElementById("timer-resume-area").style.display = "none";
  //hide refresh by default
  document.getElementById("timer-reset-button").style.display = "none";
};
