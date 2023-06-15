import { Component, State, h, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'tj-set-translation-language',
    styleUrl: 'set-translation-language.css',
    shadow: true,
})
export class SetNativeLanguage {

    @State() selectedLanguage = "en-CA";

    @Event({ bubbles: true, composed: true }) voiceChanged: EventEmitter<string>;

    changeVoice(event) {
        this.selectedLanguage = event.target.value;
        this.voiceChanged.emit(this.selectedLanguage);
        console.log("Language Chosen", this.selectedLanguage);
        // translate('I spea Dutch!', { from: 'en', to: 'nl' }).then(res => {
        //     console.log(res.text);
        //     //=> Ik spreek Nederlands!
        //     console.log(res.from.text.autoCorrected);
        //     //=> true
        //     console.log(res.from.text.value);
        //     //=> I [speak] Dutch!
        //     console.log(res.from.text.didYouMean);
        //     //=> false
        // }).catch(err => {
        //     console.error(err);
        // });
    }

    render() {
        return (
            <div>
                <select name="selectedLanguage" onChange={this.changeVoice.bind(this)}>
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
