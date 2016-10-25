import { DOM } from 'aurelia-pal';
export class StyleController {
    constructor(factory, bindingContext, overrideContext, expression, destination) {
        this.factory = factory;
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.expression = expression;
        this.destination = destination;
        this.isDefault = false;
        this.styleElement = null;
        this.bindingInstance = null;
        this.count = 0;
    }
    bind(view) {
        let $styles = view.overrideContext['$styles'] || {};
        view.overrideContext['$' + this.factory.id] = this.bindingContext;
        view.overrideContext['$design'] = this.overrideContext.$design;
        view.overrideContext['$styles'] = Object.assign($styles, this.overrideContext.$styles);
        if (this.count === 0) {
            this.ensureStyleElementIsAddedToDocument();
            this.count = 1;
            this.bindingInstance.bind(this);
        }
        else {
            this.count++;
        }
    }
    unbind() {
        this.count--;
        if (this.count === 0) {
            this.removeStyleElement();
            this.bindingInstance.unbind();
        }
    }
    ensureStyleElementIsAddedToDocument() {
        if (this.styleElement === null) {
            this.styleElement = DOM.injectStyles('', this.destination);
            this.bindingInstance = this.expression.createBinding(this.styleElement);
        }
        else if (!this.styleElement.parentNode) {
            this.styleElementParent.appendChild(this.styleElement);
        }
    }
    removeStyleElement() {
        this.styleElementParent = this.styleElement.parentNode;
        DOM.removeNode(this.styleElement);
    }
}