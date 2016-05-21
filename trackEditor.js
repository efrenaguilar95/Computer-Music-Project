//var finalFile;
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source;

//chooseFile is for file upload.
function chooseFile()
{
	console.log("Sup kid");
	source = audioCtx.createBufferSource();
	var request = new XMLHttpRequest();
	request.open("GET", file, true);
	request.responseType = "arraybuffer";
	request.onload = function() {
    var audioData = request.response;

    audioCtx.decodeAudioData(audioData, function(buffer) {
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
  var file = URL.createObjectURL(this.files[0]);
  //finalFile = file;
  audioPlayer.src = file;
  source = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', file, true);
  request.responseType = 'arraybuffer';
  source.start(0);

  //audioPlayer.play();
};

function playAudio()
{
	audioPlayer.play(0);
}


