/**
 * Life Cycle states are exposed as function call and this enum represents the currently reached state.
 */
export enum LifeCycle {
  /**
   * Start, ctor is being called.
   */
  Init = 0,
  /**
   * Component connects to backend. This initiates the first render process and results in the immediately following states "PreRender" and "Load".
   */
  Connect = 1,
  /**
   * A change in the data object occured. This is a suitable place for adding subscribers. Ususally a sequence of "PreRender" and "Load" follows immediately.
   */
  SetData = 2,
  /**
   * The render process is done and the component has been loaded. If subsequent changes require rendering the content, the
   * component fires {@link PreRender} before and @Load after each such cycle. That means, especially for adding subscribers,
   * both events are not suitable, as they could fire multiple times.
   */
  Load = 3,
  /**
   * The render method has been called and content is ready to be written to `innerHTML`. Children may still render async after this event. See {@link Render} for an alternative event.
   * Between this event and {@link Load} the templates and slots for shadowing are being created.
   * Literally, "Load" means: "I am done, but I have no idea what my children are doing"
   */
  PreRender = 4,
  /**
   * A component has been rendered asynchronously and all it's children are rendered, too. That's the preferred way to handle hierarchies
   */
  Render = 5,
  /**
   * Component is going to be unloaded. This is a suitable place for removing subscribers.
   * Literally, "Render" means: "I am done, and I took care that all my children are done, too"
   */
  Disconnect = 6,
  /**
   * After calling the `dispose` method. Usually it follows immediately after the "Disconnect" state.
   */
  Disposed = 7,
  /**
   * The element was moved to a new document.
   */
  Adopted = 8
}
