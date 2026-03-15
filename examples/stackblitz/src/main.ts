import '@getufy/flint-ui/button/flint-button';
import '@getufy/flint-ui/input/flint-input';
import '@getufy/flint-ui/switch/flint-switch';
import '@getufy/flint-ui/select/flint-select';
import { html, render } from 'lit';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

const app = html`
  <div class="demo-section">
    <flint-button variant="primary">Hello Flint UI</flint-button>

    <flint-input label="Name" placeholder="Enter your name"></flint-input>

    <flint-switch label="Dark mode"></flint-switch>

    <flint-select label="Fruit" .options=${options} placeholder="Pick a fruit"></flint-select>
  </div>
`;

render(app, document.getElementById('demo')!);
