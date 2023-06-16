import { Component, Element, Prop, Watch, h } from '@stencil/core';


@Component({
    tag: 'tj-speak',
    styleUrl: 'speak.css',
    shadow: true,
})
export class Speak {

    @Prop({ mutable: true, reflect: true }) speechLang: string | null;
    setLang: string | null;

    @Watch('speechLang')
    watchSpeechLangHandler() {
        if (this.speechLang) {
            this.setLang = this.speechLang;
            console.log('Language Set in Listener', this.setLang);
        }
    }

    @Element() el: HTMLElement;

    utterance = new SpeechSynthesisUtterance;
    speakLine: string = "";

    readText(text: string) {
        window.speechSynthesis.cancel();

        let tempSetLang = false;
        if (!this.setLang) {
            this.setLang = document.documentElement.lang;
            tempSetLang = true;
        };

        this.utterance.text = text;
        this.utterance.lang = this.setLang;
        this.utterance.rate = .8;
        
        window.speechSynthesis.speak(this.utterance);
        if (tempSetLang) { this.setLang = null };
    }

    componentWillLoad() {
        if ('speechSynthesis' in window) {
            console.log("TTS Suported");
        }
        this.speakLine = this.el.textContent;
        if (this.speechLang) {
            this.setLang = this.speechLang;
        }
    }


    render() {
        return (
            <div onClick={() => this.readText(this.el.shadowRoot.querySelector('span').textContent)}>
                <span>{this.speakLine}</span>&#127911;
            </div>
        );
    }
}
