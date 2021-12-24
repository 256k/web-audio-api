/*
For a kick we have an oscillator.
we set the frequency value
we attach it to a gain node
we start it
and we can stop it and pass it a argument of the time to play before it stops (like a delay to the stop command)
*/

const kickButton = document.createElement('button');
kickButton.innerText = 'kick';
document.body.appendChild(kickButton);

kickButton.addEventListener('click', () => {

  const kickOsc = audioContext.createOscillator();
  kickOsc.frequency.setValueAtTime(140, 0);
  
  // the sound is now constant. we need to create a pitch down exponential ramp
  kickOsc.frequency.exponentialRampToValueAtTime(1, audioContext.currentTime + 0.5);
  
  const kickGainControl = audioContext.createGain();
  kickGainControl.gain.setValueAtTime(1, 0);
  kickGainControl.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
  kickOsc.connect(kickGainControl);
  kickGainControl.connect(gainControl)
  kickOsc.start();
  
  // this will then stop 0.5s after we call the .stop() method.
  kickOsc.stop(audioContext.currentTime + 0.5);    
});


// TO BE CONTINUED AT: https://youtu.be/laCjGMhASp8?t=802