import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'tj-lang-card',
    styleUrl: 'lang-card.css',
    shadow: false
})
export class LangCard {

    @Prop() dataSource: string;

    sourceText: string;

    componentWillLoad() {
        this.sourceText = document.getElementById(this.dataSource).innerText;
    }

    render() {
        return (
            <div>
                <div class="lang-settings">
                <tj-set-voice-language></tj-set-voice-language>
                <tj-translate-element></tj-translate-element>
                </div>
                <div>
                <tj-read-lines>{this.sourceText}</tj-read-lines>
                </div>
            </div>
        );
    }
}
