import { Component, Element, Prop, State, h, Listen } from '@stencil/core';

@Component({
    tag: 'tj-read-lines',
    styleUrl: './read-lines.css',
    shadow: true
})

export class ReadingTool {

@Element() el: HTMLElement;

@Prop() originalLanguage: string = 'en-CA';
@Prop() sourceID: string =  '';

@State() isPlaying = false;
@State() lines: string[] = [];
@State() speechLang: string = 'en-US';

componentWillLoad() {
    const sourceText = this.el.textContent;
    console.log("will load", sourceText);
    this.lines = this.prepareLines(sourceText);
  
}

componentDidLoad() {
    const shadowRoot = this.el.shadowRoot;
    console.log('Component did load');
    const translateItems = shadowRoot.querySelectorAll(".translate");
    translateItems.forEach(item => item.setAttribute('translate', 'yes'));
}


prepareLines(text) {
    let content: string = text.trim();
    content = content.replace(/([.?!])\s*(?=[A-Z])/g, '$1\n');
    return this.lines = content.split('\n');
};

@Listen('languageChanged', { target: 'body' })
onLanguageChanged(event: CustomEvent) {
    console.log("from read-lines", event);
    this.speechLang = event.detail;
    const shadowRoot = this.el.shadowRoot;
    const translateItems = shadowRoot.querySelectorAll(".translate");
    translateItems.forEach(item => item.setAttribute('speech-lang', `${this.speechLang}`))
}

render() {
    return this.lines.map(line => (
    <ul>
    <li><tj-speak>{line}</tj-speak></li>
    <li><tj-speak class="translate">{line}</tj-speak></li>
    </ul>
    ));
}


}


