/**
 * The AddClassToCell decorator.
 *
 * If the corresponding property is true the class will be applied to the cell of the named property.
 *
 * @param prop        The property of the cell where the class has to be applied
 * @param className   The class.
 */
export function AddClassToCell(prop: string, className: string) {
	// the original decorator
	function addClassToCellInternal(target: Object, property: string | symbol): void {
		addClassToCellInternalSetup(target, property.toString(), prop, className);
	}

	// return the decorator
	return addClassToCellInternal;
}

export function addClassToCellInternalSetup(target: any, key: string, prop: string, className: string) {
	// create a helper property to transport a meta data value
	Object.defineProperty(target, `__addClassToCellName__${key}`, {
		value: name,
		enumerable: false,
		configurable: false
	});

	Object.defineProperty(target, `__addClassToCellProp__${key}`, {
		value: prop,
		enumerable: false,
		configurable: false
	});

	Object.defineProperty(target, `__addClassToCellClass__${key}`, {
		value: className,
		enumerable: false,
		configurable: false
	});
}
