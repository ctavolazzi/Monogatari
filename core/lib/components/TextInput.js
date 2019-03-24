import { Component } from '../Component';
import { Monogatari } from '../monogatari';

class TextInput extends Component {

	static html (html = null, ...params) {
		if (html !== null && typeof params === 'undefined') {
			this._html = html;
		} else {
			// Check if additional parameters have been sent to a rendering function
			if (typeof params !== 'undefined' && typeof this._html === 'function') {
				if (html === null) {
					return this._html.call (this, ...params);
				} else {
					return this._html.call (html, ...params);
				}
			}

			// Check if no parameters were set but the HTML is still a function to be called
			if (typeof params === 'undefined' && html === null && typeof this._html === 'function') {
				return this._html.call (this);
			}

			// If this is reached, the HTML was just a string
			return this._html;
		}
	}

	static render (message) {
		return this.html (null, message);
	}
}

TextInput._configuration = {};
TextInput._state = {};
TextInput._id = 'text_input';

TextInput._html = message => `
	<div data-component="text_input" data-ui="input" class="modal modal--active">
		<form  class="modal__content">
			<p data-ui="input-message" >${message}</p>
			<input type="text">
			<small data-ui="warning" class="block"></small>
			<div>
				<button type='submit'>Ok</button>
			</div>
		<form>
	</div>
`;

Monogatari.registerComponent (TextInput);