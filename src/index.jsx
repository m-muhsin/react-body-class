// External dependencies
import React, { Children, Component } from 'react';
import withSideEffect from 'react-side-effect';
import classNames from 'classnames';
import flatten from 'lodash/flatten';

class BodyClass extends Component {
	render() {
		if ( this.props.children ) {
			return Children.only( this.props.children );
		}
		return null;
	}
}

BodyClass.propTypes = {
	// classes is either an object { name: bool }, or list of names
	// classNames is smart enough to handle array + object combos
	classes: React.PropTypes.oneOfType( [
		React.PropTypes.object,
		React.PropTypes.arrayOf( React.PropTypes.string )
	] )
};

function reducePropsToState( propsList ) {
	// Pull out the classes from the props objects
	const classListArr = propsList.map( ( props ) => {
		return props.classes
	} );
	// Mash the classes together
	const classList = flatten( classListArr );
	if ( classList ) {
		return classList;
	}
}

function handleStateChangeOnClient( bodyClass ) {
	document.body.className = classNames( bodyClass );
}

export default withSideEffect(
	reducePropsToState,
	handleStateChangeOnClient
)( BodyClass );
