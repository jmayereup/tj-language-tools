import { Component, h, Event, EventEmitter } from '@stencil/core';
declare const googleTranslateElementInit: any;


@Component({
    tag: 'tj-translate',
    styleUrl: 'translate.css',
    shadow: false,
})
export class Translate {

    translation: string = "NA";

    componentDidLoad() {
        console.log('Translate Component did load');
       setTimeout(() => {
        googleTranslateElementInit()   
        //disactivate and reactivate buttons
       }, 3000);
        
    }

    @Event({ bubbles: true, composed: true }) checkLanguageEvent: EventEmitter<string>;

    checkLanguage(){
        this.checkLanguageEvent.emit('check');
    }
    
    render() {
        return (
                <div onClick={this.checkLanguage.bind(this)}>
                <div id="google_translate_element"></div>
                </div>
        );
    }
}
