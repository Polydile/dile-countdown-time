export const DileCountdownTimeMixin = (Superclass) => {
    return class extends Superclass {
        lpad(input, length) {
            return ('0' + input).slice(length);
        }

        resetCountdown() {
            this.days = this.hours = this.minutes = this.seconds = '00';
        }
    }
}