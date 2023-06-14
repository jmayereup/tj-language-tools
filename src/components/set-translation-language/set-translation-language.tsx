import { Component, State, h, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'tj-set-translation-language',
    styleUrl: 'set-translation-language.css'
})
export class SetNativeLanguage {

@State() selectedLanguage = "en-CA";

@Event({ bubbles: true, composed: true}) languageChanged: EventEmitter<string>;

changeLanguage(event) {
    this.selectedLanguage = event.target.value;
    this.languageChanged.emit(this.selectedLanguage);
    console.log("Language Chosen", this.selectedLanguage)
}

    render() {
        return (
            <div>
                <select name="selectedLanguage" onChange={this.changeLanguage.bind(this)}>
                    <option value="ar-SA">Arabic</option>
                    <option value="zh-CN">Chinese</option>
                    <option value="nl-NL">Dutch</option>
                    <option value="en-CA" selected>English</option>
                    <option value="en-US">English 2</option>
                    <option value="fil-PH">Filipino</option>
                    <option value="fr-FR">French</option>
                    <option value="de-DE">German</option>
                    <option value="hi-IN">Hindi</option>
                    <option value="it-IT">Italian</option>
                    <option value="ja-JP">Japanese</option>
                    <option value="ko-KR">Korean</option>
                    <option value="pt-PT">Portuguese</option>
                    <option value="ru-RU">Russian</option>
                    <option value="es-ES">Spanish (Spain)</option>
                    <option value="es-MX">Spanish (Mexico)</option>
                    <option value="th-TH">Thai</option>
                    <option value="uk-UA">Ukrainian</option>
                </select><label>Speech Voice</label>
            </div >
        );
    }
}
