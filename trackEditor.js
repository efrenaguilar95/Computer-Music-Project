//var finalFile;
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source;
var file;
var request;
var audioBuffer;
var audioBits;

//chooseFile is for file upload.
function chooseFile()
{
	request.onload = function() {
    var audioData = request.response;

    audioBuffer = audioCtx.decodeAudioData(audioData, function(buffer) {
        source.buffer = buffer;

        source.connect(audioCtx.destination);
        source.loop = true;
      },

      function(e){"Error with decoding audio data" + e.err});

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

function setupDownload()
{
  audioBits = source.buffer.getChannelData(0);
  //console.log(audioBits);
  //var url = (window.URL || window.webkitURL).createObjectURL(file);
  var link = document.getElementById("download");
  link.href = file;
  link.download = "coolAudio.wav";
}

