# reducer

Official React bindings for [fluxette](https://github.com/edge/fluxette).

## Install

```sh
npm install --save fluxette-react
```

## Bindings

**Context**
A higher order React component that provides a Flux object on the context to all of its children.

```js
import { Context } from 'fluxette-react';
import App from './app';
import flux from './flux';

React.render(
	<Context flux={ flux }>
		{ () => <App /> }
	</Context>,
	document.getElementById('root')
);
```

**connect([selectors])**
Extends a Component to manage listeners to the Flux object on `this.context`, and performs a `setState` when the state changes. It also takes an optional selector or array of selectors, which make the state more specific. It will only calculate a new value if one of the selectors returns a new value. It makes `this.context.flux.dispatch` available as `this.dispatch` on the component.

```js
import { connect } from 'fluxette-react';
import { details } from './creators';

@connect(state => state.details)
class Component extends React.Component {
	submit() {
		this.dispatch(details.update({
			nickname: React.findDOMNode(this.refs.nickname).value,
			email: React.findDOMNode(this.refs.email).value
		}));
	}
	render() {
		let details = this.state;
		return (
			<div>
				<input ref='nickname' defaultValue={ details.nickname } />
				<input ref='email' defaultValue={ details.email } />
				<button onClick={ ::this.submit }>Submit</button>
			</div>
		);
	}
}
```

**select(getters, deriver)**
Creates a selector that caches the results of the `getters` array, which are applied to `deriver` as an argument list. It only returns a new value when the getters have returned new data, which is useful for data computations that would break equality checks otherwise.

```js
import { select } from 'fluxette-react';

let itemsWith = {
	discount: state => state.products.onSale,
	warranty: state => state.products.warranted,
	highRating: state => state.products.highRated
};

let productSelector = select(
	[itemsWith.discount, itemsWith.highRating],
	(discounted, highRating) => ({ products: _.union(discounted, highRating) })
);

@connect(productSelector)
class CheapQualityProducts extends React.Component {
	// ...
}

// can also be

connect(productSelector)(CheapQualityProducts)
```
