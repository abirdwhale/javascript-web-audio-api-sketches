"use strict";

// for cross browser
const AudioContext = window.AudioContext || window.webkitaudioCtx;
const audioCtx = new AudioContext();

let futureTickTime = audioCtx.currentTime;
let counter = 1;
let tempo = 80;
let secondsPerBeat = 60 / tempo;
let counterTimeValue = (secondsPerBeat / 4); // 16th note
let osc = audioCtx.createOscillator();
let metronomeVolume = audioCtx.createGain();

function playTopSine(time) {
    osc = audioCtx.createOscillator();
    osc.connect(metronomeVolume);
    metronomeVolume.connect(audioCtx.destination);
    osc.type = "sine";
    osc.frequency.value = 4000;
    if (counter === 1) {
    osc.start(time);
    osc.stop(time + 0.1);
    } 
}

const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)

function scheduler() {
    // console.log("scheduler now!");

    while (futureTickTime < audioCtx.currentTime + scheduleAheadTime) {
        playTopSine(futureTickTime);
        console.log("This 16th note is: " + counter);
        console.log("16th is: " + counterTimeValue);
        console.log("futureTickTime: " + futureTickTime);
        console.log("Web Audio Time: " + audioCtx.currentTime);
        futureTickTime += counterTimeValue; //can be any time value. 0.5 happens to be a quarter note at 120bpm
        console.log("futureTickTime: " + futureTickTime);
        // if (counter === 1) {
        //     osc.frequency.value = 500;
        // } else {
        //     osc.frequency.value = 300;
        // }

        counter += 1;
        if (counter > 16) {
            counter = 1;
        }
    }
    window.setTimeout(scheduler, lookahead);
}

scheduler();

document.getElementById("play-button").addEventListener("click", function () {
  
    if (audioCtx.state !== "running") {
      console.log("it's not running well");
      audioCtx.resume();
    } else {
      console.log("it's running");
      audioCtx.suspend();
      console.log(audioCtx.state);
    }
  });