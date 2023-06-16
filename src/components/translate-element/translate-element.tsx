import { Component, h } from '@stencil/core';
declare const googleTranslateElementInit: any;


@Component({
    tag: 'tj-translate-element',
    shadow: false
})
export class TranslateElement {

    translation: string = "NA";

    componentDidLoad() {
       setTimeout(() => {
        googleTranslateElementInit()   
        //disactivate and reactivate buttons
       }, 2000);
        
    }
   
    render() {
        return (
                <div id="google_translate_element"></div>
        );
    }
}
