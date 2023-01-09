"// These settings control the way that the text-to-speech function of the chatbot's voice will operate.
var jay_speech_rate = 1.2; // The rate of the voice, with higher values resulting in faster speech.
var jay_speech_pitch = 1; // This will adjust the pitch of the chatbot's voice.

// Specify a language code, such as 'fr-FR' or 'en-US', to use a specific language for the speech recognition function (when you speak into the microphone).
// If left blank, the system's default language will be used.
var jay_language_speech_rec = ""; //"fr-FR";

// Set the word that will cause the script to stop when spoken.
var jay_stop_word = "stop";

// Set the word that will cause the script to temporarily pause when spoken.
var jay_pause_word = "pause";

// Specify a "locale-voice name" for the chatbot's voice (the possible values are difficult to determine, so it is recommended to use the settings menu instead).
var jay_wanted_voice_name = "";

// -------------------
// CODE (DO NOT ALTER)
// -------------------
var jay_message_count = 0;
var jay_current_message = null;
var jay_current_message_sentences = [];
var jay_speech_rec = null;
var jay_is_reading = false;
var jay_is_listening = false;
var jay_finished = false;
var jay_paused = false;
var jay_wanted_voice = null;
var jay_timeout_keep_synthesis_working = null;
var jay_timeout_keep_speech_rec_working = null;
var jay_speech_rec_supported = false;
var jay_speaking_disabled = false;
var jay_speech_rec_disabled = false;

//This function will use the browser's speech synthesis API to speak the provided text out loud
function jay_sayOutLoud(text) {
  if (!text || jay_speaking_disabled) {
    if (jay_speech_rec_supported && jay_speech_rec && !jay_is_listening && !jay_paused && !jay_speech_rec_disabled) jay_speech_rec.start();
    clearTimeout(jay_timeout_keep_speechrec_working);
    jay_timeout_keep_speechrec_working = setTimeout(jay_KeepSpeechRecWorking, 100);
    return;
  }
}

// Replace YOUR_API_KEY with your actual API key
const apiKey = 'a07323382f5f3c0d3fa9775bbfe41bb848c18d33';

// Replace en-US with the desired language code
const languageCode = 'en-US';

// Replace my-audio with the desired file name
const fileName = 'my-audio';

// Let's speak out loud
console.log("Saying out loud: "+text);

const audioElement = new Audio();

const request = new XMLHttpRequest();
request.open('POST', `https://texttospeech.googleapis.com/v1/text:synthesize?key=${a07323382f5f3c0d3fa9775bbfe41bb848c18d33}`, true);
request.setRequestHeader('Content-Type', 'application/json');
request.onload = function () {
  // Check for request success
  if (request.status >= 200 && request.status < 400) {
    // Extract the audio content from the response
    const response = JSON.parse(request.responseText);
    const audioContent = response.audioContent;

    // Set the audio content as the source of the audio element
    audioElement.src = `data:audio/mp3;base64,${audioContent}`;

    // Set up audio element events
    audioElement.onplaying = () => {
      // Make border green
      $("#TTGPTSettings").css("border-bottom", "8px solid green");

      // If speech recognition is active, disable it
      if (CN_IS_LISTENING) CN_SPEECHREC.stop();

      if (CN_FINISHED) return;
      CN_IS_READING = true;
      clearTimeout(CN_TIMEOUT_KEEP_SYNTHESIS_WORKING);
      CN_TIMEOUT_KEEP_SYNTHESIS_WORKING = setTimeout(CN_KeepSpeechSynthesisActive, 5000);
    };
    audioElement.onended = () => {
      // Make border grey again
      $("#TTGPTSettings").css("border", "2px solid #888");

      if (CN_FINISHED) return;

      // Finished speaking
      clearTimeout(CN_TIMEOUT_KEEP_SYNTHESIS_WORKING);
      console.log("Finished speaking out loud");

      // restart listening
      CN_IS_READING = false;
      setTimeout(function() {
        if (!audioElement.paused) {
          if (CN_SPEECH_REC_SUPPORTED && CN_SPEECHREC && !CN_IS_LISTENING && !CN_PAUSED && !CN_SPEECHREC_DISABLED) CN_SPEECHREC.start();
          clearTimeout(CN_TIMEOUT_KEEP_SPEECHREC_WORKING);
          CN_TIMEOUT_KEEP_SPEECHREC_WORKING = setTimeout(CN_KeepSpeechRecWorking, 100)
};

// Set the request body to the synthesize request
request.send(JSON.stringify({
  input: {
    text: text
  },
  voice: {
    languageCode: languageCode
  },
  audioConfig: {
    audioEncoding: 'MP3'
  }
}));

// If a voice was specified, set the voice of the audio element
if (CN_WANTED_VOICE) {
  audioElement.voice = CN_WANTED_VOICE;
}

// Set the rate and pitch of the audio element
audioElement.rate = CN_TEXT_TO_SPEECH_RATE;
audioElement.pitch = CN_TEXT_TO_SPEECH_PITCH;

// Play the audio
audioElement.play();

        // Split the text into sentences so the speech synthesis can start speaking as soon as possible
function CN_SplitIntoSentences(text) {
	var sentences = [];
	var currentSentence = "";
	
	for(var i=0; i<text.length; i++) {
		//
		var currentChar = text[i];
		
		// Add character to current sentence
		currentSentence += currentChar;
		
		// is the current character a delimiter? if so, add current part to array and clear
		if (currentChar == ',' || currentChar == ':' || currentChar == '.' || currentChar == '!' || currentChar == '?' || currentChar == ';') {
			if (currentSentence.trim() != "") sentences.push(currentSentence.trim());
			currentSentence = "";
		}
	}
	
	return sentences;
}
        
        
