import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import { tablePropsHeader } from '../Defs';

@CustomElement('guide-actionbutton')
export class GuideActionButton extends BaseComponent<{}> {
    render() {
        const codeImportAction = `import {ActionButton} from "@nyaf/ui";`;
        const codeImportMultiAction = `import {MultiAction, MultiActionItem} from "@nyaf/ui";`;
        const codeUseActionButton = `
            <ui-actionbutton icon="star-full" />
            <ui-actionbutton icon="star-full" variant="secondary"/>
            <ui-actionbutton icon="rocket" className="alert" />
            <ui-actionbutton icon="rocket" className="info" variant="secondary" clsIcon="fg-yellow"/>
        `;
        const codeUseMultiAction = `
            <ui-multiaction icon="star-full" cls="alert" drop={'right'}>
                <ui-multiaction-item icon="home" />
                <ui-multiaction-item icon="rocket" onClick={...}/>
                <ui-multiaction-item icon="adb" onClick={...}/>
            </ui-multiaction>
        `;


        return(
            <demo-article>
                <demo-guideLogo/>
                <h1>Action button</h1>

                <p className={'text-leader2'}>
                    Need material action button? Use Metro 4 &lt;ActionButton/&gt; component.
                </p>

                <br/>

                <h3>Introduction</h3>
                <p>
                    Metro 4 include two type action button: <code>ActionButton</code> for single action, and <code>MultiAction</code>.
                </p>

                <br/>
                <h3>Importing ActionButton</h3>
                <demo-prismcode language='js' code={codeImportAction}/>

                <br/>
                <h4>Props</h4>
                <ui-table className='table-border cell-border' head={tablePropsHeader}>
                    <tbody>
                    <tr>
                        <td><code>as</code></td>
                        <td><code>button</code></td>
                        <td>Semantic element</td>
                    </tr>
                    <tr>
                        <td><code>variant</code></td>
                        <td><code>default</code></td>
                        <td>Button size, second value <code>secondary</code></td>
                    </tr>
                    <tr>
                        <td><code>icon</code></td>
                        <td></td>
                        <td>Button icon</td>
                    </tr>
                    <tr>
                        <td><code>iconPrefix</code></td>
                        <td></td>
                        <td>Button icon prefix</td>
                    </tr>
                    <tr>
                        <td><code>image</code></td>
                        <td></td>
                        <td>Button image</td>
                    </tr>
                    <tr>
                        <td><code>cls</code>, <code>className</code></td>
                        <td></td>
                        <td>Button additional classes</td>
                    </tr>
                    <tr>
                        <td><code>clsIcon</code></td>
                        <td></td>
                        <td>Button classes for icon</td>
                    </tr>
                    <tr>
                        <td><code>active</code></td>
                        <td>false</td>
                        <td>Button state</td>
                    </tr>
                    </tbody>
                </ui-table>

                <br/>
                <h4>Using</h4>
                <demo-example>
                    <ui-actionbutton icon='star-full' />
                    &nbsp;<ui-actionbutton icon='star-full' variant='secondary'/>
                    &nbsp;<ui-actionbutton icon='rocket' className='alert' />
                    &nbsp;<ui-actionbutton icon='rocket' className='info' variant='secondary' clsIcon='fg-yellow'/>
                </demo-example>
                <demo-prismcode language='js' code={codeUseActionButton}/>

                <br/>
                <h3>Importing MultiAction</h3>
                <demo-prismcode language='js' code={codeImportMultiAction}/>

                <br/>
                <h4>Props for MultiAction</h4>
                <p>Same as for <code>ActionButton</code> and:</p>
                <ui-table className='table-border cell-border' head={tablePropsHeader}>
                    <tbody>
                    <tr>
                        <td><code>drop</code></td>
                        <td><code>up</code></td>
                        <td>Items drop direction: up, down, left, right</td>
                    </tr>
                    <tr>
                        <td><code>itemClickClose</code></td>
                        <td><code>true</code></td>
                        <td>Close items after user click on the item</td>
                    </tr>
                    <tr>
                        <td><code>onClick</code></td>
                        <td></td>
                        <td>Callback for click event</td>
                    </tr>
                    </tbody>
                </ui-table>

                <br/>
                <h4>Props for MultiActionItem</h4>
                <ui-table className='table-border cell-border' head={tablePropsHeader}>
                    <tbody>
                    <tr>
                        <td><code>icon</code></td>
                        <td></td>
                        <td>Button icon</td>
                    </tr>
                    <tr>
                        <td><code>iconPrefix</code></td>
                        <td></td>
                        <td>Button icon prefix</td>
                    </tr>
                    <tr>
                        <td><code>image</code></td>
                        <td></td>
                        <td>Button image</td>
                    </tr>
                    <tr>
                        <td><code>cls</code>, <code>className</code></td>
                        <td></td>
                        <td>Button additional classes</td>
                    </tr>
                    <tr>
                        <td><code>onClick</code></td>
                        <td></td>
                        <td>Callback for click event </td>
                    </tr>
                    </tbody>
                </ui-table>

                <br/>
                <h4>Using</h4>
                <demo-example>
                    <ui-row>
                        <ui-cell cls='cell-md-3'>
                            <ui-multiaction icon='star-full' cls='alert' drop={'right'}>
                                <ui-multiaction-item icon='home' />
                                <ui-multiaction-item icon='rocket' onClick={() => alert('rocket')}/>
                                <ui-multiaction-item icon='adb' onClick={() => alert('adb')}/>
                            </ui-multiaction>
                        </ui-cell>
                        <ui-cell cls='cell-md-3 d-flex flex-justify-center'>
                            <ui-multiaction icon='star-full' cls='alert' drop={'up'}>
                                <ui-multiaction-item icon='home' onClick={() => alert('home')}/>
                                <ui-multiaction-item icon='rocket' onClick={() => alert('rocket')}/>
                                <ui-multiaction-item icon='adb' onClick={() => alert('adb')}/>
                            </ui-multiaction>
                        </ui-cell>
                        <ui-cell cls='cell-md-3 d-flex flex-justify-center'>
                            <ui-multiaction icon='star-full' cls='alert' drop={'bottom'}>
                                <ui-multiaction-item icon='home' onClick={() => alert('home')}/>
                                <ui-multiaction-item icon='rocket' onClick={() => alert('rocket')}/>
                                <ui-multiaction-item icon='adb' onClick={() => alert('adb')}/>
                            </ui-multiaction>
                        </ui-cell>
                        <ui-cell cls='cell-md-3 d-flex flex-justify-end'>
                            <ui-multiaction icon='star-full' cls='alert' drop={'left'}>
                                <ui-multiaction-item icon='home' onClick={() => alert('home')}/>
                                <ui-multiaction-item icon='rocket' onClick={() => alert('rocket')}/>
                                <ui-multiaction-item icon='adb' onClick={() => alert('adb')}/>
                            </ui-multiaction>
                        </ui-cell>
                    </ui-row>
                </demo-example>

                <demo-prismcode language='js' code={codeUseMultiAction}/>

                <br/>
            </demo-article>
        );
    }
}
