import { storiesOf, html, withKnobs, withClassPropertiesKnobs } from '@open-wc/demoing-storybook';

import { DileCountdownTime } from '../dile-countdown-time.js';
import '../dile-countdown-time.js';
import readme from '../README.md';

storiesOf('dile-countdown-time', module)
  .addDecorator(withKnobs)
  .add(
    'Countdown in english with square shape',
    () => html`
      <dile-countdown-time dateString="31-12-2020 10:00"></dile-countdown-time>
    `,
  )
  .add(
    'Countdown in spanish with square shape',
    () => html`
      <dile-countdown-time dateString="31-12-2020 10:00" language="es"></dile-countdown-time>
    `,
  )
  .add(
    'Countdown in spanish with circular shape',
    () => html`
      <dile-countdown-time dateString="31-12-2020 10:00" language="es" shape="circle"></dile-countdown-time>
    `,
  )
  .add(
    'Countdown in spanish with circular shape and custom styles',
    () => html`
      <style>
        body {
          font-family: 'Lucida Sans', sans-serif;
        }

        .custom-countdown {
          --dile-countdown-time-shape-color: #1b5e20;
          --dile-countdown-time-number-color: #ffcc80;
          --dile-countdown-time-word-color: #b71c1c;
        }
      </style>
      <dile-countdown-time dateString="31-12-2020 10:00" language="es" shape="circle" class="custom-countdown"></dile-countdown-time>
    `,
  )
  .add('Documentation', () => withClassPropertiesKnobs(DileCountdownTime), { notes: { markdown: readme } });
