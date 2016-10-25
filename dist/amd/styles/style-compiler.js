var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", 'aurelia-templating', 'aurelia-dependency-injection', './style-factory'], function (require, exports, aurelia_templating_1, aurelia_dependency_injection_1, style_factory_1) {
    "use strict";
    var classMatcher = /styles.([A-Za-z1-9]+)/g;
    var StyleCompiler = (function () {
        function StyleCompiler(bindingLanguage, viewResources) {
            this.bindingLanguage = bindingLanguage;
            this.viewResources = viewResources;
        }
        StyleCompiler.prototype.compile = function (styleObjectType, css) {
            var styles = Object.create(null);
            var transformed = css.replace(classMatcher, function (str) {
                var name = arguments[1];
                styles[name] = true;
                return '.${$styles.' + name + ' & oneTime}';
            });
            var expression = this.bindingLanguage.inspectTextContent(this.viewResources, transformed);
            expression['targetProperty'] = 'innerHTML';
            return new style_factory_1.StyleFactory(styleObjectType, styles, expression);
        };
        StyleCompiler = __decorate([
            aurelia_dependency_injection_1.inject(aurelia_templating_1.BindingLanguage, aurelia_templating_1.ViewResources)
        ], StyleCompiler);
        return StyleCompiler;
    }());
    exports.StyleCompiler = StyleCompiler;
});