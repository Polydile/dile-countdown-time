import { storiesOf, html, withKnobs, withClassPropertiesKnobs } from '@open-wc/demoing-storybook';

import { DileCountdownTime } from '../dile-countdown-time.js';
import '../dile-countdown-time.js';
import readme from '../README.md';

storiesOf('dile-countdown-time', module)
  .addDecorator(withKnobs)
  .add(
    'Default countdown in english without styles',
    () => html`
      <dile-countdown-time dateString="31-12-2020 10:00"></dile-countdown-time>
    `,
  )
  .add(
    'Countdown in spanish without styles',
    () => html`
      <dile-countdown-time dateString="31-12-2020 10:00" language="es"></dile-countdown-time>
    `,
  )
  .add(
    'Countdown in spanish with styles',
    () => html`
      <style>
        body {
          font-family: 'Lucida Sans', sans-serif;
        }

        .custom-countdown {
          --dile-countdown-time-circle-color: #1b5e20;
          --dile-countdown-time-number-color: #ffcc80;
          --dile-countdown-time-word-color: #b71c1c;
        }
      </style>
      <dile-countdown-time dateString="31-12-2020 10:00" class="custom-countdown" language="es"></dile-countdown-time>
    `,
  )
  .add('Documentation', () => withClassPropertiesKnobs(DileCountdownTime), { notes: { markdown: readme } });
