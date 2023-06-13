import { Component, Element, Prop, State, h } from '@stencil/core';


@Component({
    tag: 'tj-speak',
    styleUrl: 'speak.css'
})
export class Speak {

@Prop() setLang: string = 'en-CA';

@State() isPlaying: boolean = false;

@Element() el: HTMLElement;

utterance = new SpeechSynthesisUtterance;
@State() speakLine: string = "";

readText(text: string) {
    this.utterance.text = text;
    this.utterance.lang = this.setLang;
    this.utterance.rate = .8;
    this.utterance.onend = () => {
      this.isPlaying = false; };
    window.speechSynthesis.speak(this.utterance);
}

componentWillLoad() {
    console.log('Component is about to be rendered');
    if ('speechSynthesis' in window) {
        console.log("TTS supported.");
        this.speakLine = this.el.textContent;
        this.el.textContent = "";
        console.log(this.speakLine);
      } else return;
}



    render() {
        return (
            <div>
                <span onClick={this.readText.bind(this, this.speakLine)}>{this.speakLine}&#127911;</span>
            </div>
        );
    }
}
