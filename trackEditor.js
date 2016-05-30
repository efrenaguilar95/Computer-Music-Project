//var finalFile;
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var gainNode = audioCtx.createGain();
gainNode.connect(audioCtx.destination);
var convolver = audioCtx.createConvolver();
var source;
var file;
var reverbFile;
var request;
var reverbRequest;
var audioBuffer;
var audioBits;

//chooseFile is for file upload.
function chooseFile()
{
	request.onload = function() {
    console.log("hi3");
    var audioData = request.response;

    audioBuffer = audioCtx.decodeAudioData(audioData, function(buffer) {
        source.buffer = buffer;

        source.connect(gainNode);
        source.loop = true;
      },

      function(e){"Error with decoding audio data" + e.err});
    //console.log(source);
    //console.log(audioBuffer, "jkdsjwdka");
  }
  request.send();


}


//Called when file is selected in file browser.
document.getElementById('fileInput').onchange = function () {
  console.log('Selected file: ' + this.value);
  file = URL.createObjectURL(this.files[0]);
  //finalFile = file;
  audioPlayer.src = file;
  source = audioCtx.createBufferSource();
  request = new XMLHttpRequest();
  request.open('GET', file, true);
  request.responseType = 'arraybuffer';
};

function playAudio()
{
	source.start();
}

function stopAudio()
{
  //audioCtx.suspend();
  source.stop();
}

function setGain(newValue)
{
  gainNode.gain.value = newValue/100;
}

document.getElementById("reverbSelector").onchange = function(){
  console.log('Selected file: ' + this.value);
  reverbFile = URL.createObjectURL(this.files[0]);
  reverbRequest = new XMLHttpRequest();
  reverbRequest.open('GET', reverbFile, true);
  console.log("WTF")
  reverbRequest.responseType = 'arraybuffer';
}

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

function setupDownload()
{
  audioBits = source.buffer.getChannelData(0);
  console.log(audioBits.buffer);
  var blob = new Blob();
  //console.log(audioBits);
  //var url = (window.URL || window.webkitURL).createObjectURL(blob);
  //var link = document.getElementById("download");
  //link.href = url;
  //link.download = "coolAudio.wav";
}

