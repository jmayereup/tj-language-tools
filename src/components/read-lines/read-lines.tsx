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

    // @Listen('checkLanguageEvent', { target: 'body' })
    // onCheckLanguageEvent(event: CustomEvent) {
    //     console.log("event detail", event.detail);
    //     if (event.detail === 'check') {
    //         setTimeout(() => {
    //             this.currentLang = document.documentElement.lang;
    //             console.log("listened:", this.currentLang);
    //             const shadowRoot = this.el.shadowRoot;
    //             const translatedItems = shadowRoot.querySelectorAll(".translated");
    //             translatedItems.forEach(item => item.setAttribute('speech-lang', this.currentLang));
    //         }, 1000);
    //     }
    // }

    @Listen('voiceChanged', { target: 'body' })  //voice language changed
    onVoiceChanged(event: CustomEvent) {
        console.log("User Selected Voice", event.detail);
        this.chosenVoice = event.detail;
        const shadowRoot = this.el.shadowRoot;
        const nottranslatedItems = shadowRoot.querySelectorAll(".notTranslated");
        nottranslatedItems.forEach(item => item.setAttribute('speech-lang', this.chosenVoice))
    }


    componentWillLoad() {
        const sourceText = this.el.textContent;
        console.log("will load", sourceText);
        this.lines = this.prepareLines(sourceText);

    }

    componentDidLoad() {
        const shadowRoot = this.el.shadowRoot;
        console.log('Component did load');
        const translatedItems = shadowRoot.querySelectorAll(".translated");
        translatedItems.forEach(item => item.setAttribute('translated', 'yes'));
        const notTranslateItems = shadowRoot.querySelectorAll(".notTranslated");
        notTranslateItems.forEach(item => item.setAttribute('translate', 'no'));
        notTranslateItems.forEach(item => item.setAttribute('speech-lang', this.setLang))
        
    }

    componentDidUpdate() {
        console.log('Component did update');
        // let currentLang = document.body.lang;

    }


    prepareLines(text) {
        let content: string = text.trim();
        content = content.replace(/([.?!])\s*(?=[A-Z])/g, '$1\n');
        return this.lines = content.split('\n');
    };

    // setLangAttribute(event: MouseEvent) {
    //     // this.currentLang = document.documentElement.lang;
    //     console.log("Original Language", this.originalLang);
    //     event.stopImmediatePropagation();
    //     if(this.originalLang !== this.currentLang) {
    //         console.log("they didn't match");
    //         this.currentLang = document.documentElement.lang;
    //         const translatedItems = this.el.shadowRoot.querySelectorAll(".translated");
    //         translatedItems.forEach(item => item.setAttribute('speech-lang', this.currentLang));
    //         this.originalLang = this.currentLang;
    //     }
    //     // const liElement = (event.target as HTMLElement).closest('li');
    //     // const tjSpeak = liElement.querySelector('tj-speak');
    //     // tjSpeak.click();
    // }


    render() {
        return this.lines.map(line => (
            <ul>
                <li><tj-speak class="notTranslated">{line}</tj-speak></li>
                <li><tj-speak class="translated">{line}</tj-speak></li>
            </ul>
        ));
    }


}


