//Creation of all necessary variables for program.
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

//gainNode is used for controlling the gain of the audio file.
var gainNode = audioCtx.createGain();
gainNode.connect(audioCtx.destination);

var convolver = audioCtx.createConvolver();

//Variables used to upload audio file to page.
var source;
var file;
var request;

//Variables used for reverb effect.
var reverbFile;
var reverbRequest;

var audioBuffer;

//var audioBits;

//Variables used for Vibrato effect.
var LFO = audioCtx.createOscillator();
LFO.frequency.value = 0;
LFO.connect(gainNode.gain);


//This function uploads the file to decode it and allows for 
//the audio file to be manipulated.
function chooseFile()
{
	console.log("file upload")
	request.onload = function() {
    var audioData = request.response;

    audioBuffer = audioCtx.decodeAudioData(audioData, function(buffer) {
        source.buffer = buffer;

        source.connect(gainNode);
        source.loop = true;
      },

      function(e){"Error with decoding audio data" + e.err});
  }
  request.send();


}


//This segments allows for an audio file to be loaded into and html page,
//and stores it into a buffer.
document.getElementById('fileInput').onchange = function () {
  console.log('Selected file: ' + this.value);
  file = URL.createObjectURL(this.files[0]);
  audioPlayer.src = file;
  source = audioCtx.createBufferSource();
  request = new XMLHttpRequest();
  request.open('GET', file, true);
  request.responseType = 'arraybuffer';
};

//Function for Play button.
function playAudio()
{
	source.start();
	LFO.start();
}

//Function for Stop button.
function stopAudio()
{
  source.stop();
  LFO.stop();
}

//Fucntion for controling the vibrato
function setVibrato(newValue){
	LFO.frequency.value = newValue;
}

//Function for controling the gain value.
function setGain(newValue)
{
  gainNode.gain.value = newValue/100;
}


//Allows for the upload of the necessary file used in reverb effect.
document.getElementById("reverbSelector").onchange = function(){
  console.log('Selected file: ' + this.value);
  reverbFile = URL.createObjectURL(this.files[0]);
  reverbRequest = new XMLHttpRequest();
  reverbRequest.open('GET', reverbFile, true);
  reverbRequest.responseType = 'arraybuffer';
}

//Changes the reverb audio file so it can be used in the program.
function setReverb()
{
  reverbRequest.onload = function(){
    var audioData = reverbRequest.response;

    audioCtx.decodeAudioData(audioData, function(buffer){
      convolver.buffer = buffer;
      source.connect(convolver);
      convolver.connect(gainNode);
    },
    function(e){"Error with decoding audio data" + e.err});
  }
  reverbRequest.send();
}

//function setupDownload()
//{
  //audioBits = source.buffer.getChannelData(0);
//<<<<<<< Updated upstream
  //console.log(audioBits.buffer);
  //var blob = new Blob();
//=======
  //var blob = new blob(audioBits);
//>>>>>>> Stashed changes
  //console.log(audioBits);
  //var url = (window.URL || window.webkitURL).createObjectURL(blob);
  //var link = document.getElementById("download");
  //link.href = url;
  //link.download = "coolAudio.wav";
//}

