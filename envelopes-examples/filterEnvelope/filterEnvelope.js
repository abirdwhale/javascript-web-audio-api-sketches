const audioCtx = new AudioContext();

const oscillator = audioCtx.createOscillator();
oscillator.frequency.value = 220;
oscillator.type = "sawtooth";
const oscillatorGain = audioCtx.createGain();
oscillatorGain.gain.value = 0.1;

const filter = audioCtx.createBiquadFilter();
filter.type = "lowpass";
filter.frequency.setValueCurveAtTime(
    new Float32Array([440, 220, 110, 55, 440]),
    audioCtx.currentTime,
    4);
filter.Q.value = 20;

oscillator.connect(oscillatorGain);
oscillatorGain.connect(filter);
filter.connect(audioCtx.destination);

oscillator.start();

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