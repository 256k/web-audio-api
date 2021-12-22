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
  kickOsc.connect(gainControl);
  kickOsc.start();
  
  // this will then stop 0.5s after we call the .stop() method.
  kickOsc.stop(audioContext.currentTime + 0.5);  

});
