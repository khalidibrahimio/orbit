var timer_interval;
var seconds_remaining;

var min_input = document.getElementById("time_minutes");
var sec_input = document.getElementById("time_seconds");

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
  document.getElementById("timer-stop-button").style.display = "none";
};

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
  document.getElementById("timer-stop-button").style.display = "none";
  //reset value to blank
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
  document.getElementById("timer-resume-area").style.display = "flex";
  return;
}

function startCountdown() {
  var minutes = parseInt(min_input.value);

  //check if it is a number
  if (isNaN(minutes) || minutes == "") {
    document.getElementById("timer-message").innerHTML =
      "Yikes! It's not a number. <strong>TRY AGAIN</strong";
    document
      .getElementById("timer-message")
      .setAttribute("class", "alert alert-danger text-center");

    //hides error after 5 secs
    setTimeout(messageHide, 5000);
    resetTimer();
    return;
  } else if (minutes <= 0) {
    document.getElementById("timer-message").innerHTML =
      "Yikes! It's not a number. <strong>TRY AGAIN</strong>";
    document
      .getElementById("timer-message")
      .setAttribute("class", "alert alert-danger text-center");

    //hides error after 5 secs
    setTimeout(messageHide, 5000);
    resetTimer();
    return;
  } else if (minutes > 59) {
    document.getElementById("timer-message").innerHTML =
      "This defeats the purpose ☹️ 45 minutes or less is recommended. TRY AGAIN";
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

  min_input.setAttribute("disabled", "true");
  //reoccuring function
  tick();
  timer_interval = setInterval(tick, 1000);
  //hide input form once running
  document.getElementById("timer-input").style.display = "none";
  //show pause when running
  document.getElementById("timer-pause-area").style.display = "block";
  //show refresh when running
  document.getElementById("timer-stop-button").style.display = "block";
}

function tick() {
  var min = parseInt(min_input.value);
  var sec = parseInt(sec_input.value);

  var min = Math.floor(seconds_remaining / 60);
  var sec = seconds_remaining - min * 60;

  if (min < 10) {
    min = "0" + min;
  }

  if (sec < 10) {
    sec = "0" + sec;
  }
  min_input.value = min;
  sec_input.value = sec;

  if (seconds_remaining === 0) {
    document.getElementById("timer-message").innerHTML =
      "<strong>Times up!</strong>";
    document
      .getElementById("timer-message")
      .setAttribute("class", "alert alert-success text-center");
    min_input.removeAttribute("disabled");

    clearInterval(timer_interval);
    resetTimer();
  }
  seconds_remaining--;
}

//refresh page with button
document.getElementById("timer-stop-button").onclick = function () {
  clearInterval(timer_interval);
  resetTimer();
  min_input.value = "00";
  sec_input.value = "00";
  min_input.removeAttribute("disabled");
  document.getElementById("timer-stop-button").style.display = "none";
  document.getElementById("timer-resume-area").style.display = "none";
  document.getElementById("timer-pause-area").style.display = "none";
};
