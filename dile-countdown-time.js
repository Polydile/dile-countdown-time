import { LitElement, html, css } from 'lit-element';

export class DileCountdownTime  extends LitElement {

    static get styles() {
        return css`
            :host {
                display: block;
            }
        `;
    }

    static get properties() {
        return {};
    }

    constructor() {
        super();
    }

    render() {
        return html`
        
        `;
    }
}

customElements.define('dile-countdown-time', DileCountdownTime);