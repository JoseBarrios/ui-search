"use strict";

import template from "./view.js";

class SearchViewController extends HTMLElement {
  static get observedAttributes() {
    return ["results", "index"];
  }

  constructor(model) {
    super();
    this.view = {};
    this.state = {};
    this.event = {};
    this.index = null;
    this.results = null;
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.state.connected = false;
  }

  connectedCallback() {
    // Wire views

    this.view.title = this.shadowRoot.querySelector("#title");

    this.view.modeSelect = this.shadowRoot.querySelector("#modeSelect");

    this.view.inputReplace = this.shadowRoot.querySelector("#inputReplace");

    this.view.replaceButtonDiv = this.shadowRoot.querySelector(
      "#replaceButtonDiv"
    );

    this.view.prevSearchButton = this.shadowRoot.querySelector(
      "#prevSearchButton"
    );

    this.view.nextSearchButton = this.shadowRoot.querySelector(
      "#nextSearchButton"
    );

    this.view.replaceAllButton = this.shadowRoot.querySelector(
      "#replaceAllButton"
    );

    this.view.replaceButton = this.shadowRoot.querySelector("#replaceButton");

    this.view.prevReplaceButton = this.shadowRoot.querySelector(
      "#prevReplaceButton"
    );

    this.view.nextReplaceButton = this.shadowRoot.querySelector(
      "#nextReplaceButton"
    );

    // Add event listeners
    this.view.modeSelect.addEventListener(
      "change",
      this._onModeSelectChange.bind(this)
    );

    this.view.prevSearchButton.addEventListener(
      "click",
      this._onPrev.bind(this)
    );

    this.view.prevReplaceButton.addEventListener(
      "click",
      this._onPrev.bind(this)
    );

    this.view.nextSearchButton.addEventListener(
      "click",
      this._onNext.bind(this)
    );

    this.view.nextReplaceButton.addEventListener(
      "click",
      this._onNext.bind(this)
    );

    this.view.replaceAllButton.addEventListener(
      "click",
      this._onReplaceAll.bind(this)
    );

    this.view.replaceButton.addEventListener(
      "click",
      this._onReplace.bind(this)
    );

    // Custom events
    this.event.previous = new CustomEvent("ui-search-previous");
    this.event.next = new CustomEvent("ui-search-next");
    this.event.replace = new CustomEvent("ui-search-replace");
    this.event.replaceAll = new CustomEvent("ui-search-replace-all");

    this.state.connected = true;
    window.requestAnimationFrame((e) => {
      this._updateView();
    });
  }

  _onReplace() {
    console.log("onReplace");
    this.dispatchEvent(this.event.replace);
    this._updateView();
  }

  _onReplaceAll() {
    console.log("onReplaceAll");
    this.dispatchEvent(this.event.replaceAll);
    this._updateView();
  }

  _onNext() {
    console.log("onNext");
    this.dispatchEvent(this.event.next);
    this._updateView();
  }

  _onPrev() {
    console.log("onPrev");
    this.dispatchEvent(this.event.previous);
    this._updateView();
  }

  _updateTitle() {
    const title = this.isFindMode() ? "Search" : "Search & Replace";
    if (this.index && this.results) {
      this.view.title.innerHTML = `${title} (${this.index}/${this.results})`;
    } else {
      this.view.title.innerHTML = title;
    }
  }

  isFindMode() {
    let mode = this.view.modeSelect.value;
    mode = mode.toLowerCase();
    return mode === "find";
  }

  _onModeSelectChange() {
    const mode = this.view.modeSelect.value;
    if (this.isFindMode()) {
      this._shouldHideReplaceUI();
    } else {
      this._shouldHideReplaceUI(false);
    }
    this._updateTitle();
  }

  _shouldHideReplaceUI(shouldHide = true) {
    this.view.inputReplace.hidden = shouldHide;
    this.view.replaceButtonDiv.hidden = shouldHide;
    // Hide prev and next search buttons, since replace
    // has its own buttons
    this.view.prevSearchButton.hidden = !shouldHide;
    this.view.nextSearchButton.hidden = !shouldHide;
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case "index":
        const index = parseInt(newVal);
        console.log(index > 0);
        this.index = index > 0 ? index : null;
        if (this.index) {
          this.index = this.index >= this.results ? this.results : index;
        }
        break;
      case "results":
        const results = parseInt(newVal);
        this.results = results > 0 ? results : null;
        break;
      default:
        console.warn(
          `Attribute ${attrName} is not handled, you should probably do that`
        );
    }
    this._updateView();
  }

  get shadowRoot() {
    return this._shadowRoot;
  }
  set shadowRoot(value) {
    this._shadowRoot = value;
  }

  _updateView() {
    //No point in rendering if there isn't a model source, or a view on screen
    if (!this.state.connected) {
      return;
    } else {
      this._updateTitle();
      this._shouldHideReplaceUI();
    }
  }

  disconnectedCallback() {
    this._removeEvents();
    this.state.connected = false;
  }

  _removeEvents() {
    this.$container.removeEventListener("click", this.event.click);
  }
}

window.customElements.define("ui-search", SearchViewController);