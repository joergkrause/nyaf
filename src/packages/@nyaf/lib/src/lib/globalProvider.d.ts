import { Component } from '../types/common';
/**
 * For registration we handle just the types, not actual instances. And types are actually functions.
 */
export declare class BootstrapProp {
    /**
     * Add all components here as types.
     */
    components: Array<Component>;
    /**
     * Optional. Add the router definition here. Path's shall not contain hash signs, even if used in link tags.
     */
    routes?: {
        [path: string]: {
            component: Component;
            data?: any;
        };
    };
}
/**
 * Main support class that provides all global functions.
 */
export declare class GlobalProvider {
    static registeredElements: Array<string>;
    /**
     *
     * @param type Called to register a component. The component must have either the decorator @see CustomElement or
     * provide the tag name in a property calles *selector*. The component must inherit @see Component.
     */
    static register(type: Component): void;
    /**
     * The global configuration. This call is required.
     * @param props Provide module properties with registration and settings.
     */
    static bootstrap(props: BootstrapProp): void;
    private static registerRouter;
    /**
     * All events are handled by this helper function. This function shall not be called from user code.
     */
    private static eventHub;
}
