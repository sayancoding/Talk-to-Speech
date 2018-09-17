//init SpeechSynth API
const synth = window.speechSynthesis;

//DOM elements
const textform = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector('#rate');
const ratevalue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector('body');

//empty array for voices
let voices=[];
const getVoices = ()=>{
    voices=synth.getVoices();
    voices.forEach(voice=>{
        const option = document.createElement('option');
        option.textContent = voice.name + '[' + voice.lang + "]";
        
        //set attribute
        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        //append each options
        voiceSelect.appendChild(option);

    });
};
getVoices();

//synth onvoiceschange event working
synth.onvoiceschanged=getVoices;

//speaking

const speak=()=>{
    if(synth.speaking)
    {
        console.error("Already speaking !!");
        return;
    }
    if(textInput.value !=='')
    {

        body.style.background='#141414 url(../img/wave.gif)';
        body.style.backgroundRepeat='repeat-x';
        body.style.backgroundSize='100% 100%';
           
        //get speak text
        const speakText= new SpeechSynthesisUtterance(textInput.value);

        //speaking end
        speakText.onend=e=>{
            body.style.background='#141414';
            console.log("Speaking is done !");
        }
        speakText.onerror=e=>{
            console.error("There is an error !!");
        }
        //selected the voice 
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
        //loop through voices
        voices.forEach(voice=>{
            if(voice.name===selectedVoice)
            {
                speakText.voice=voice;
            }
        });
        //set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        //speak
        synth.speak(speakText);
    }
};
//event listeners

//text form submit
textform.addEventListener('submit',e=>{
e.preventDefault();
speak();
textInput.blur();
});

//rate value change
rate.addEventListener('change',e=>ratevalue.textContent=rate.value);

//pitch value change
pitch.addEventListener('change',e=>pitchValue.textContent=pitch.value);

//voice select change
voiceSelect.addEventListener('change',e=>speak());
