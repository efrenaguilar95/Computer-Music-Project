//var finalFile;
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var gainNode = audioCtx.createGain();
gainNode.connect(audioCtx.destination);
var source;
var file;
var request;
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
  gainNode.gain.value = 10;
  //source.stop();
}

function toggleGain()
{

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

