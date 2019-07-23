import { LitElement, html, css } from 'lit-element';
import moment from 'moment';
import { DileCountdownTimeMixin } from './dile-countdown-time-mixin';

const WORDS_EN = ['DAYS', 'HOURS', 'MINUTES', 'SECONDS'];
const WORDS_ES = ['DÍAS', 'HORAS', 'MINUTOS', 'SEGUNDOS'];

export class DileCountdownTime extends DileCountdownTimeMixin(LitElement) {

    static get styles() {
        return css`
            :host {
                display: block;
                width: 250px;
            }

            .circle {
                background: var(--dile-countdown-time-circle-color, #212121);
                border-radius: 50%;
                height: 50px;
                width: 50px;
            }

            .circle-content {
                color: var(--dile-countdown-time-number-color, #f5f5f5);
                float: left;
                line-height: 1;
                margin-top: -0.5em;
                padding-top: 50%;
                text-align: center;
                width: 100%;
            }

            .countdown {
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            .countdown-column {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-right: 10px;
            }

            .countdown-word {
                font-size: 10px;
                color: var(--dile-countdown-time-word-color, #212121);
                margin-bottom: 10px;
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
            },
            language: {
                type: String
            },
            words: {
                type: Array
            }
        };
    }

    constructor() {
        super();
        this.language = 'en';
        this.words = WORDS_EN;
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        clearInterval(this.countdownInterval);
    }

    render() {
        return html`
            <div class="countdown">
                <div class="countdown-column">
                    <div class="countdown-word">${this.words[0]}</div>
                    <div class="circle">
                        <div class="circle-content">${this.days}</div>
                    </div>
                </div>
                <div class="countdown-column">
                    <div class="countdown-word">${this.words[1]}</div>
                    <div class="circle">
                        <div class="circle-content">${this.hours}</div>
                    </div>
                </div>
                <div class="countdown-column">
                    <div class="countdown-word">${this.words[2]}</div>
                    <div class="circle">
                        <div class="circle-content">${this.minutes}</div>
                    </div>
                </div>
                <div class="countdown-column">
                    <div class="countdown-word">${this.words[3]}</div>
                    <div class="circle">
                        <div class="circle-content">${this.seconds}</div>
                    </div>
                </div>
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
                    this._countdownInterval(dateMomentObject);
                }
            }
            else {
                this.resetCountdown();
                console.log('invalid dateString format (valid format is "DD-MM-YYYY HH:mm")');
            }
        }
        if (changedProperties.has('language')) {
            if (this.language == 'es') {
                this.words = WORDS_ES;
            }
            else {
                this.words = WORDS_EN;
            }
        }
    }

    _countdown(dateMomentObject) {
        let duration = moment.duration(dateMomentObject.diff(moment()));
        if (duration.asMilliseconds() <= 0) {
            this.resetCountdown();
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
    }

    _countdownInterval(dateMomentObject) {
        this.countdownInterval = setInterval(() => {
            this._countdown(dateMomentObject);
        }, 1000);
    }
}

customElements.define('dile-countdown-time', DileCountdownTime);