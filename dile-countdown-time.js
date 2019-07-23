import { LitElement, html, css } from 'lit-element';
import moment from 'moment';
import { DileCountdownTimeMixin } from './dile-countdown-time-mixin';

export class DileCountdownTime extends DileCountdownTimeMixin(LitElement) {

    static get styles() {
        return css`
            :host {
                display: block;
            }
        `;
    }

    static get properties() {
        return {
            dateString: {
                type: String
            },
            days: {
                type: String
            },
            hours: {
                type: String
            },
            minutes: {
                type: String
            },
            seconds: {
                type: String
            }
        };
    }

    constructor() {
        super();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        clearInterval(this.countdownInterval);
    }

    render() {
        return html`
            <div>
                <span>${this.days}</span>
                <span>${this.hours}</span>
                <span>${this.minutes}</span>
                <span>${this.seconds}</span>
            </div>
        `;
    }

    updated(changedProperties) {
        if (changedProperties.has('dateString')) {
            clearInterval(this.countdownInterval);
            if (moment(this.dateString, 'DD-MM-YYYY HH:mm').isValid()) {
                let dateMomentObject = moment(this.dateString, 'DD-MM-YYYY HH:mm');
                if (dateMomentObject < moment()) {
                    this.resetCountdown();
                    console.log('dateString value can not be earlier than the system date');
                }
                else {
                    this._countdown(dateMomentObject);
                }
            }
            else {
                this.resetCountdown();
                console.log('invalid dateString format (valid format is "DD-MM-YYYY HH:mm")');
            }
        }
    }

    _countdown(dateMomentObject) {
        this.countdownInterval = setInterval(() => {
            let duration = moment.duration(dateMomentObject.diff(moment()));
            if (duration.asMilliseconds() <= 0) {
                clearInterval(this.countdownInterval);
                console.log('countdown finished');
            }
            else {
                let days = parseInt(duration.asDays());
                let hours = parseInt(duration.asHours());
                hours = hours - days * 24;
                let minutes = parseInt(duration.asMinutes());
                minutes = minutes - (days * 24 * 60 + hours * 60);
                let seconds = parseInt(duration.asSeconds());
                seconds = seconds - (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60);
                this.days = this.lpad(days, -3);
                this.hours = this.lpad(hours, -2);
                this.minutes = this.lpad(minutes, -2);
                this.seconds = this.lpad(seconds, -2);
            }
        }, 1000);
    }
}

customElements.define('dile-countdown-time', DileCountdownTime);