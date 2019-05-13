import { Component } from "../types/common";
/**
 * For registration we handle just the types, not actual instances. And types are actually functions.
 */
export declare class BootstrapProp {
    components: Array<Component>;
    routes: {
        [path: string]: {
            component: Component;
            data?: any;
        };
    };
}
/**
 * Main support class that provides all global functions.
 */
export declare class globalProvider {
    /**
     *
     * @param type Called to register a component. The component must have either the decorator @see CustomElement or
     * provide the tag name in a property calles *selector*. The component must inherit @see Component.
     */
    static register(type: Component): void;
    static bootstrap(props: BootstrapProp): void;
    /**
     * All events are handled by this helper function. This function shall not be called from user code.
     */
    private static eventHub;
}
