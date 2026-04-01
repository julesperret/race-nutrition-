// System starts calling this about once per second after the sports app is selected
// i.e. before the exercise is actually started.
// input: contains resources specified in "in" section of the manifest.
// output: resources passed to the device (specified in "out" section of the manifest).


var currentTemplate = "home";
var recentlyChanged = false;


var interval = 10; //secondes
var changeTemplate = function(template) {
  if (currentTemplate == template) {
    return;
  }
  switch (template) {
    case "home":
      recentlyChanged = true
      currentTemplate = "home";
      unload('_cm');
      break;
    case "alert":
      currentTemplate = "alert";
      unload('_cm');
      break;
  }
}

var convertSecondstoTime = function convertSecondstoTime(counter) {

    var hours = Math.floor(counter / 3600);
    var minutes = Math.floor((counter % 3600) / 60);
    var seconds = counter % 60;
    var timeString = hours.toString().padStart(2, '0')
        + ':' + minutes.toString().padStart(2, '0')
        + ':' + seconds.toString().padStart(2, '0');

    return timeString;

    //faire
}

var convertSecondstoMinutes = function convertSecondstoMinutes(output,counter) {
    var hours = Math.floor(counter / 3600);
    var minutes = Math.floor((counter % 3600) / 60);
    var seconds = counter % 60;
    return minutes; 
}
var convertSecondstoSeconds = function convertSecondstoMinutes(output,counter) {
    var hours = Math.floor(counter / 3600);
    var minutes = Math.floor((counter % 3600) / 60);
    var seconds = counter % 60;
    return seconds; 
}

/* Other available callbacks:
function onExerciseStart() {}    // Is evaluated on exercise start
function onExercisePause() {}    // Is evaluated on exercise pause
function onExerciseContinue() {} // Is evaluated when continuing exercise after pause
function onLap() {}              // Is evaluated on every lap change
function onAutoLap() {}          // Is evaluated on every autolap change
function onInterval() {}         // Is evaluated on interval
function onPoolLength() {}       // Is evaluated after each pool length (swimming)
*/

function evaluate(input, output) {
  output.counter = output.counter + 1;
  output.time = convertSecondstoTime(output.counter);
  output.minutes = convertSecondstoMinutes(output, output.counter);
  output.seconds = convertSecondstoSeconds(output, output.counter);

  if (output.counter == interval) {
    output.counter = 0;
    output.nbalert = output.nbalert + 1;
    changeTemplate("alert");
  }
}


// main.js loaded and system starts calling evaluate()
function onLoad(input, output) {
  currentTemplate = "home";
  output.counter = 0;
  output.nbalert = 0;
}

function onEvent(_input, output, eventId) {
  switch (eventId) {
    case 1:
      changeTemplate("home");
      break;
  }
}
// Is evaluated when a user enters the SuuntoPlus sports app screen the first
// time and when the screen is reloaded. Essentially defines what is shown on
// the screen by returning the wanted HTML template.
function getUserInterface() {
  return {
    template: currentTemplate
  };
}

// Defines the info shown at the bottom of the exercise summary info shown after the exercise.
// These values are also provided to SuuntoApp.
// This is called when exercise ends and also when user backs from exercise start panel
// without starting the exercise.
function getSummaryOutputs(input, output) {
}
