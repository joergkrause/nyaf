import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';


@CustomElement('app-home')
export class HomeComponent extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        <header class='masthead'>
          <div class='container d-flex h-100 align-items-center'>
            <div class='mx-auto text-center'>
              <h1 class='mx-auto my-0'>@nyaf</h1>
              <h2 class='text-white-50 mx-auto mt-2 mb-0'>A free, simple, sleek and fast frontend framework.</h2>
              <a class='btn btn-primary js-scroll-trigger' href='#down'>Get Started</a>
            </div>
          </div>
        </header>
        <section class='start-section' id='down'>
          <div class='container'>
            <div class='row'>
              <div class='col-lg-8 mx-auto'>
                <h2 class='text-white mb-4 text-center'>Technologically Enhanced Web Components</h2>
                <p class='text-white-50'>
                  This project follows a philosophy that got somehow lost in past years &ndash; instead of adding more and more functions to a frontend framework, it's
                  much better to extend the developer's toolchain and try to keep the result as simple as possible, using native functions wherever possible.
                  <br></br>
                  <i>
                    It's hard to get but it's a fact, that most developers first looking for a framework, reading comparisions, and check blogs and books instead  of
                    asking what all these framework are about. In fact, all are based on native APIs, such as HTML 5, and specific language features, such as those from
                    TypeScript transpiler. In the beginning it was at least possible to understand the intention. Instead of working with a complex low -level API it's
                    better to has a simplified and optimized high-level API. But after years the frameworks got fat. And now the learning curve is as steep as the native
                    APIs would require. But those have improved, too. In the end, there is no need for a fat frontend framework, ever. @nyaf brings just the little bit
                    that makes a frontend dev happy and skips all the fat stuff. You wan't need it, I promise.
                  </i>
                  <br></br>
                  The tooling of @nyaf has three main ingredients:
                  </p>
                <ol class='text-white-50'>
                  <li>Using TypeScript is mandatory (it's actually written in TypeScript)</li>
                  <li>Using JSX/TSX is the preferred way to create components' views</li>
                  <li>Using decorators for enforcing the "separation of concerns" principle</li>
                </ol>
                <p class='text-white-50'>The result is outstanding. Very easy to write components, very small code, very fast execution.</p>
                <blockquote>
                  The core library is actually <b>36 KB</b>, zipped roughly <b>11 KB</b>. All parts together are <b>58 KB</b>, <b>23 KB</b> zipped. That's it. Period.
                  </blockquote>
              </div>
            </div>
          </div>
        </section>
        <section class='projects-section bg-dark' id='projects'>
          <div class='container'>
            <div class='row align-items-center no-gutters mb-0'>
              <div class='col-lg-6'>
                <div class='bg-black h-100 project'>
                  <div class='d-flex h-100'>
                    <div class='project-text w-100 my-auto text-left'>
                      <h4 class='text-white'>Shoreline</h4>
                      <p class='text-white-50 mb-0'>
                        @nyaf is open source and ICS licensed. FOSS free licensing for enterprises on request.
                        This means you can use it for any project - even commercial projects! Download it, customize it, and publish your website!
                    </p>
                      <p class='text-white-50 mb-0'>There is full support for</p>
                      <ul class='text-white-50 mb-0'>
                        <li>WebPack</li>
                        <li>TypeScript</li>
                        <li>HTML 5 DOM API</li>
                      </ul>
                      <p class='text-white-50 mb-0'>
                        No vendor lock-in, no special tooling, no editor enhancements. Pure modern Web Technology made right, finally.
                    </p>
                      <p class='text-white-50 mb-0'>
                        There is no dependency to anything, too.
                    </p>
                    <hr class='d-none d-lg-block mb-0 ml-0' />
                    </div>
                  </div>
                </div>
              </div>
              <div class='col-lg-6'><img class='img-fluid mb-3 mb-lg-0' src='assets/img/demo-image-01.jpg' alt='' /></div>
            </div>
            <div class='row justify-content-center no-gutters mb-0'>
              <div class='col-lg-6'><img class='img-fluid' src='assets/img/demo-image-03.jpg' alt='' /></div>
              <div class='col-lg-6'>
                <div class='bg-black h-100 project'>
                  <div class='d-flex h-100'>
                    <div class='project-text w-100 my-auto text-left'>
                      <h4 class='text-white'>Enhanced Template Features</h4>
                      <p class='text-white-50 mb-0'>Template are powerful und can handle special instruction, it's a bit looking like Vue.</p>
                      <p class='text-white-50 mb-0'>
                        Templates are written in JSX, and this part looks much like React. However, state and attribute management is put together and hence much
                        easier to handle than in React.
        </p>
                      <p class='text-white-50 mb-0'>
                        Components <i>can</i> use a shadow DOM. This is an option, not enforced. It's just a decorator and it's a "per component" decision.
        </p>
                      <hr class='d-none d-lg-block mb-0 ml-0' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class='row justify-content-center no-gutters'>
              <div class='col-lg-6'><img class='img-fluid mt-4' src='assets/img/demo-image-02.jpg' alt='' /></div>
              <div class='col-lg-6 order-lg-first'>
                <div class='bg-black h-100 project'>
                  <div class='d-flex h-100'>
                    <div class='project-text w-100 my-auto text-left'>
                      <h4 class='text-white'>Best Bread</h4>
                      <p class='mb-0 text-white-50'>
                        <p class='text-white-50 mb-0'>
                          @nyaf takes the best from everything and strips all parts that a browser can handle natively. Especially there is <strong>no</strong>...:
        </p>
                        <ul class='text-white-50 mb-0'>
                          <li>
                            ...AJAX/HTTP module. Use <code>fetch</code> instead.
          </li>
                          <li>...Animation module. Use CSS 3 animation.</li>
                          <li>...Dependency Injection. Use TypeScript's capabilities to deal with services; there is a simple service manager included.</li>
                        </ul>
                      </p>
                      <hr class='d-none d-lg-block mb-0 mr-0' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class='signup-section' id='signup'>
          <div class='container'>
            <div class='row'>
              <div class='col-md-10 col-lg-8 mx-auto text-center'>
                <i class='far fa-paper-plane fa-2x mb-2 text-white'></i>
                <h2 class='text-white mb-5'>Subscribe to receive updates!</h2>
                <form class='form-inline d-flex'>
                  <input class='form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0' id='inputEmail' type='email' placeholder='Enter email address...' />
                  <button class='btn btn-primary mx-auto' type='submit'>Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section class='contact-section bg-black'>
          <div class='container'>
            <div class='row'>
              <div class='col-md-4 mb-3 mb-md-0'>
                <div class='card py-4 h-100'>
                  <div class='card-body text-center'>
                    <i class='fas fa-map-marked-alt text-primary mb-2'></i>
                    <h4 class='text-uppercase m-0'>Source Code</h4>
                    <hr class='my-4' />
                    <div class='small text-black-50'>github.com/joergkrause/nyaf</div>
                  </div>
                </div>
              </div>
              <div class='col-md-4 mb-3 mb-md-0'>
                <div class='card py-4 h-100'>
                  <div class='card-body text-center'>
                    <i class='fas fa-envelope text-primary mb-2'></i>
                    <h4 class='text-uppercase m-0'>Enterprise Inquiries</h4>
                    <hr class='my-4' />
                    <div class='small text-black-50'><a href='#!'>joerg@krause.net</a></div>
                  </div>
                </div>
              </div>
              <div class='col-md-4 mb-3 mb-md-0'>
                <div class='card py-4 h-100'>
                  <div class='card-body text-center'>
                    <i class='fas fa-mobile-alt text-primary mb-2'></i>
                    <h4 class='text-uppercase m-0'>Support</h4>
                    <hr class='my-4' />
                    <div class='small text-black-50'>We recommend Stack Overflow</div>
                  </div>
                </div>
              </div>
            </div>
            <div class='social d-flex justify-content-center'>
              <a class='mx-2' href='https://twitter.com/joergisageek/'><i class='fab fa-twitter'></i></a>
              <a class='mx-2' href='https://about.me/joerg.krause'><i class='fab fa-aboutme'></i></a>
              <a class='mx-2' href='https://github.com/joergkrause/nyaf'><i class='fab fa-github'></i></a>
            </div>
          </div>
        </section>
      </>
    );
  }
}
