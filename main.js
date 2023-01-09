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

