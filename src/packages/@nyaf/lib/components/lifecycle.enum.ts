/**
 * Life Cycle states are exposed as function call and this enum represents the currently reached state.
 */
export enum LifeCycle {
  /**
   * Start, ctor is being called.
   */
  Init,
  /**
   * Component connects to backend. This initiates the first render process and results in the immediately following states "PreRender" and "Load".
   */
  Connect,
  /**
   * A change in the data object occured. This is a suitable place for adding subscribers. Ususally a sequence of "PreRender" and "Load" follows immediately.
   */
  SetData,
  /**
   * The render process is done and the component has been loaded. If subsequent changes require rendering the content, the
   * component fires {@link PreRender} before and @Load after each such cycle. That means, especially for adding subscribers,
   * both events are not suitable, as they could fire multiple times.
   */
  Load,
  /**
   * The render method has been called and content is ready to be written to `innerHTML`. It's not yet written, actually.
   * Between this event and {@link Load} the templates and slots for shadowing are being created.
   */
  PreRender,
  /**
   * Component is going to be unloaded. This is a suitable place for removing subscribers.
   */
  Disconnect,
  /**
   * After calling the `dispose` method. Usually it follows immediately after the "Disconnect" state.
   */
  Disposed,
  /**
   * The element was moved to a new document.
   */
  Adopted
}
