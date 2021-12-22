/*
audioContext is like a canvas for js, you have to start by declaring a new one.
*/
const audioContext = new AudioContext();


/* 
createBuffer(numberOfChannels: number, length: number, sampleRate: number): AudioBuffer
========================================================================================
- numberOfChannels: how many channels of audio we want to create

- length: how long with the audio be, more technically: how many samples of audio will there be 
  (we normally multiply the sampleRate by  the length in seconds since the sampleRate is the number of samples for each second of audio. in this example we chose 1 second)

  - sampleRate: the sampleRate we are using, found in audioContext.sampleRate
*/ 
const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 1, audioContext.sampleRate);


/*
To read the content of the audio buffer that we created, we can use a method on our new instance "buffer" called: buffer.getChannelData(channel number)
*/

const channelData = buffer.getChannelData(0)
console.log(buffer)
/*
this returns a float32 array with 48000 elements that represent each sample of the signal.
> [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ... ]

the range of the values are between -1 and 1. 
*/

/*
if we modify each element of this array with ar andom number, this would create white noise:
*/

for (let i = 0; i < channelData.length; i++) {
  channelData[i] = Math.random() *2 -1
}

/*
in order to play taht white noise signal, we need to create a bufferSource which is the thing that is responsible of playing that buffer 
*/

const whiteNoiseSource = audioContext.createBufferSource();

// then we set the buffer value of that buffersource to our buffer

whiteNoiseSource.buffer = buffer;

/*
now that we have it, we need to send it to the speakers, but before that we need to control the volume. we create a gain control node with audioContext.createGain()
*/

const gainControl = audioContext.createGain();

// we then set the value of the gain of that gain control node "gainControl"
// gainControl.gain.setValueAtTime(value: number, startTime: number)
gainControl.gain.setValueAtTime(0.05, 0);

// now that we have a gain value set, we have to connect the audio to that gain control we created.

whiteNoiseSource.connect(gainControl);

// now we can connect the gainControl to the speaker

/**** THIS REALLY REMINDS ME OF EURORACK: AUDIOSOURCE -> AMP(VCA) -> OUTPUT ****/

gainControl.connect(audioContext.destination)

// before we can hear the audio we have to manually turn on (or start) the audio playing
// we'll do this with a button

const button = document.createElement('button');
button.addEventListener('click', () => {
  whiteNoiseSource.start();
})
document.body.appendChild(button);