export interface ComponentData {
    [key: string]: any;
}
/**
 * Base class for components. Use in derived classes with a path to a template file, and additional setup steps callback.
 * Override 'render' method (mandatory) for event wiring and data/dom manipulation or creation (dynamic part).
 */
export declare abstract class BaseComponent extends HTMLElement {
    private nonShadowHtml;
    /**
     *
     * @param template The path to the file containing the HTML
     * @param withShadow `false` to suppress using shadow dom, required for jquery-ui
     */
    constructor();
    protected receiveMessage(event: any): void;
    static readonly withShadow: boolean;
    static readonly selector: string;
    abstract render(): string;
    protected dispose(): void;
    protected abstract getData(): ComponentData;
    protected initialized: boolean;
    protected setup(): void;
    setData(key: string, newValue: any): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    connectedCallback(): void;
    protected readAttribute(name: string, defaultValue?: any): any;
    disconnectedCallback(): void;
}
