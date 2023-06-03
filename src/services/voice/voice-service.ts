export class TextToSpeech {

    private voices: SpeechSynthesisVoice[] = [];
    private voiceType: string = '';
    private selectedVoice: SpeechSynthesisVoice | undefined = undefined;

    constructor() {
        this.initializeValues();
    }

    private initializeValues(): void {
        this.voices = window.speechSynthesis.getVoices();
        this.voiceType = 'Microsoft Francisca Online (Natural) - Portuguese (Brazil)';
        this.selectedVoice = this.voices.find((voice) => voice.name === this.voiceType);

    }

    public textToSpeech(text: string) {
        const speech: SpeechSynthesisUtterance = this.returnVoice(text);
        window.speechSynthesis.speak(speech);
    }

    private returnVoice(text: string): SpeechSynthesisUtterance {
        const speech: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(text);

        this.speechConfiguration(speech);

        return speech;
    }

    private speechConfiguration(speech :SpeechSynthesisUtterance): void {
        if(this.selectedVoice != undefined)
            speech.voice = this.selectedVoice;

        speech.volume = 1;
        speech.rate = 1; 
    }
}