import { Component, Element, Prop, State, h } from '@stencil/core';

@Component({
    tag: 'tj-read-lines',
    styleUrl: './read-lines.css',
    shadow: true
})

export class ReadingTool {

@Element() el: HTMLElement;

@Prop() setLang: string = 'en-CA';
@Prop() sourceID: string =  '';

@State() isPlaying = false;
@State() lines: string[] = [];

componentWillLoad() {
    const sourceText = this.el.textContent;
    console.log("will load", sourceText);
    this.lines = this.prepareLines(sourceText);
  
}

componentDidLoad() {
    const shadowRoot = this.el.shadowRoot;
    console.log('Component did load');
    const translateItems = shadowRoot.querySelectorAll(".translate");
    console.log(translateItems);
    translateItems.forEach(item => item.setAttribute('translate', 'yes'));
}


prepareLines(text) {
    let content: string = text.trim();
    content = content.replace(/([.?!])\s*(?=[A-Z])/g, '$1\n');
    return this.lines = content.split('\n');
};

render() {
    return this.lines.map(line => (
    <ul>
    <li>{line}</li>
    <li class="translate"><tj-speak>{line}</tj-speak></li>
    </ul>
    ));
}


}


