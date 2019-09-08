/**
 * Life Cycle states exposed as function call.
 */
export declare enum LifeCycle {
    /**
     * Start, ctor is being called.
     */
    Init = 0,
    /**
     * Component connects to backend
     */
    Connect = 1,
    /**
     * A change in the data object occured.
     */
    SetData = 2,
    /**
     * The render process is done and the component has been loaded
     */
    Load = 3,
    /**
     * The render method has been called and content is written to `innerHTML`.
     */
    PreRender = 4,
    /**
     * Component is going to be unloaded.
     */
    Disconnect = 5,
    /**
     * After calling the `dispose` method.
     */
    Disposed = 6
}
