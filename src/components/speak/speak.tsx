import { Component, Element, Prop, Watch, h } from '@stencil/core';


@Component({
    tag: 'tj-speak',
    styleUrl: 'speak.css',
    shadow: true,
})
export class Speak {

    @Prop({ mutable: true, reflect: true }) speechLang = "en-CA";
    setLang: string | null;

    @Watch('speechLang')
    watchSpeechLangHandler() {
        this.setLang = this.speechLang;
    }



    isPlaying: boolean = false;

    @Element() el: HTMLElement;

    utterance = new SpeechSynthesisUtterance;
    speakLine: string = "";

    readText(text: string) {
        if (!this.setLang) { this.setLang = document.documentElement.lang };
        this.utterance.text = text;
        this.utterance.lang = this.setLang;
        this.utterance.rate = .8;
        this.utterance.onend = () => {
            this.isPlaying = false;
        };
        window.speechSynthesis.speak(this.utterance);
    }

    // @Watch('translationLanguage')
    // onTranslationLanguageChanged(newValue: string, oldValue: string) {
    //     if (newValue !== oldValue) {
    //         this.utterance
    //     }
    // }

    componentWillLoad() {
        if ('speechSynthesis' in window) {
            console.log("TTS Suported");
        }
        this.speakLine = this.el.textContent;
    }

    // componentDidUpdate() {
    //     if ('speechSynthesis' in window) {
    //         this.speakLine = this.el.textContent;
    //         this.el.textContent = "";
    //       } else return;
    // }



    render() {
        return (
            <div onClick={() => this.readText(this.el.shadowRoot.querySelector('span').textContent)}>
                <span>{this.speakLine}</span>&#127911;
            </div>
        );
    }
}
