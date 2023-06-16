import { Component, Element, Prop, State, h, Listen } from '@stencil/core';

@Component({
    tag: 'tj-read-lines',
    styleUrl: './read-lines.css',
    shadow: true
})

export class ReadingTool {

    @Element() el: HTMLElement;

    @Prop({mutable: true, reflect: true}) setLang: string = 'en-CA';
    @Prop() sourceID: string = '';

    @State() isPlaying = false;
    @State() lines: string[] = [];
    
    chosenVoice: string = 'en-US';
    @State() originalLang: string = this.setLang;
    currentLang: string = "";

    @Listen('voiceChanged', { target: 'body' })  //voice language changed
    onVoiceChanged(event: CustomEvent) {
        this.chosenVoice = event.detail;
        const shadowRoot = this.el.shadowRoot;
        const nottranslatedItems = shadowRoot.querySelectorAll(".notTranslated");
        nottranslatedItems.forEach(item => {
            item.setAttribute('speech-lang', this.chosenVoice)
        })
    }


    componentWillLoad() {
        const sourceText = this.el.textContent;
        this.lines = this.prepareLines(sourceText);

    }

    componentDidLoad() {
        const shadowRoot = this.el.shadowRoot;
        const translatedItems = shadowRoot.querySelectorAll(".translated");
        translatedItems.forEach(item => item.setAttribute('translated', 'yes'));
        const notTranslateItems = shadowRoot.querySelectorAll(".notTranslated");
        notTranslateItems.forEach(item => {
            item.setAttribute('translate', 'no');
            item.setAttribute('speech-lang', this.setLang);
    });

    }

    prepareLines(text) {
        let content: string = text.trim();
        content = content.replace(/([.?!])\s*(?=[A-Z])/g, '$1\n');
        return this.lines = content.split('\n');
    };

    render() {
        return this.lines.map(line => (
            <ul>
                <li><tj-speak class="notTranslated">{line}</tj-speak></li>
                <li class='translate'><tj-speak class="translated">{line}</tj-speak></li>
            </ul>
        ));
    }


}


