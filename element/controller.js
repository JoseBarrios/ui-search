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

    this.view.inputSearch = this.shadowRoot.querySelector("#inputSearch");

    this.view.findButton = this.shadowRoot.querySelector("#findButton");

    this.view.replaceRow = this.shadowRoot.querySelector("#replaceRow");

    this.view.inputReplace = this.shadowRoot.querySelector("#inputReplace");

    this.view.buttonDiv = this.shadowRoot.querySelector("#buttonDiv");

    this.view.prevButton = this.shadowRoot.querySelector("#prevButton");

    this.view.nextButton = this.shadowRoot.querySelector("#nextButton");

    this.view.replaceAllButton = this.shadowRoot.querySelector(
      "#replaceAllButton"
    );

    this.view.replaceButton = this.shadowRoot.querySelector("#replaceButton");

    // Add event listeners
    this.view.modeSelect.addEventListener(
      "change",
      this._onModeSelectChange.bind(this)
    );

    this.view.findButton.addEventListener("click", this._onQuery.bind(this));

    this.view.prevButton.addEventListener("click", this._onPrev.bind(this));

    this.view.nextButton.addEventListener("click", this._onNext.bind(this));

    this.view.replaceAllButton.addEventListener(
      "click",
      this._onReplaceAll.bind(this)
    );

    this.view.replaceButton.addEventListener(
      "click",
      this._onReplace.bind(this)
    );

    this.state.connected = true;

    window.requestAnimationFrame((e) => {
      this.updateView();
    });
  }

  _noEmptyString(value) {
    return value === "" ? null : value;
  }

  _getEventDetail() {
    return {
      detail: {
        search: this._noEmptyString(this.view.inputSearch.value),
        replace: this._noEmptyString(this.view.inputReplace.value),
      },
    };
  }

  _onQuery() {
    this.event.query = new CustomEvent(
      "ui-search-query",
      this._getEventDetail()
    );
    this.dispatchEvent(this.event.query);
    this.updateView();
  }

  _onReplace() {
    this.event.replace = new CustomEvent(
      "ui-search-replace",
      this._getEventDetail()
    );
    this.dispatchEvent(this.event.replace);
    this.updateView();
  }

  _onReplaceAll() {
    this.event.replaceAll = new CustomEvent(
      "ui-search-replace-all",
      this._getEventDetail()
    );
    this.dispatchEvent(this.event.replaceAll);
    this.updateView();
  }

  _onNext() {
    this.event.next = new CustomEvent("ui-search-next", this._getEventDetail());
    this.dispatchEvent(this.event.next);
    this.updateView();
  }

  _onPrev() {
    this.event.previous = new CustomEvent(
      "ui-search-previous",
      this._getEventDetail()
    );
    this.dispatchEvent(this.event.previous);
    this.updateView();
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
      this.view.inputReplace.value = "";
    } else {
      this._shouldHideReplaceUI(false);
    }
    this._updateTitle();
  }

  _shouldHideReplaceUI(shouldHide = true) {
    this.view.replaceRow.hidden = shouldHide;
    this.view.inputReplace.hidden = shouldHide;
    this.view.findButton.hidden = !shouldHide;

    this.view.replaceButton.style.visibility = shouldHide
      ? "hidden"
      : "visible";

    // Replace ALL
    this.view.replaceAllButton.style.visibility = shouldHide
      ? "hidden"
      : "visible";
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case "index":
        const index = parseInt(newVal);
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
    this.updateView();
  }

  get shadowRoot() {
    return this._shadowRoot;
  }
  set shadowRoot(value) {
    this._shadowRoot = value;
  }

  updateView() {
    //No point in rendering if there isn't a model source, or a view on screen
    if (!this.state.connected) {
      return;
    } else {
      this._updateTitle();
      const hideReplace = this.isFindMode();
      this._shouldHideReplaceUI(hideReplace);
    }
  }

  disconnectedCallback() {
    this._removeEvents();
    this.state.connected = false;
  }

  _removeEvents() {
    // Remove events here
  }
}

window.customElements.define("ui-search", SearchViewController);
