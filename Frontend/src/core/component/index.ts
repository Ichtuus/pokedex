import { IWebComponent } from "@/type/index";

interface IWebComponentDecorated extends IWebComponent {
  srcHtml: string;
  srcStyle: string;
}

interface OriginalComponentClassType {
  observedAttributes: Array<string>;
  new (...args: any[]): IWebComponentDecorated;
}

export const wrap = (
  importFn: () => Promise<any>,
  className: string,
  observedAttributes: Array<string>
) => {
  class CustomComponent extends HTMLElement {
    private _originalComp!: IWebComponentDecorated;
    private _connected = false;
    private _originalConstruct!: OriginalComponentClassType;
    private _changedAttributes = false;
    private _changedName = "";
    private _changedOldValue = "";
    private _changedNewValue = "";
    // private _props: any = {};

    static originalObservedAttributes: any;

    static get observedAttributes(): Array<string> {
      return observedAttributes;
    }

    constructor() {
      super();

      const shadow = this.attachShadow({ mode: "open" });

      importFn().then((m) => {
        this._originalConstruct = m[className];
        this._originalComp = new this._originalConstruct(shadow, shadow.host);
        this._originalConstruct.prototype?.properties?.forEach(
          (prop: string) => {
            Object.defineProperty(this, prop, {
              get: () => {
                return (this._originalComp as any)[prop];
              },
              set: (val) => {
                (this._originalComp as any)[prop] = val;
              },
            });
          }
        );

        shadow.innerHTML = this._originalComp?.srcHtml;
        const firstChild = shadow.firstChild;

        const styleTag = document.createElement("style");
        styleTag.innerHTML = this._originalComp?.srcStyle;

        shadow.insertBefore(styleTag, firstChild);

        if (this._connected) {
          this._originalComp.connectedCallback();
          if (this._changedAttributes) {
            this._originalComp?.attributeChangedCallback(
              this._changedName,
              this._changedOldValue,
              this._changedNewValue
            );
          }
        }

        this.dispatchEvent(new Event("ready"));
      });
    }

    connectedCallback() {
      this._connected = true;
    }

    disconnectedCallback() {
      this._originalComp?.disconnectedCallback();
    }

    adoptedCallback() {
      this._originalComp?.adoptedCallback();
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
      if (!this._changedAttributes) {
        this._changedAttributes = true;
        this._changedName = name;
        this._changedOldValue = oldValue;
        this._changedNewValue = newValue;
      } else {
        this._originalComp?.attributeChangedCallback(name, oldValue, newValue);
      }
    }
  }

  return CustomComponent;
};
