const template = document.createElement("template");

template.innerHTML = `
    <style>
        :host([hidden]) {
            display: none
        }

        :host {
            --ui-search-font-family: 'Roboto', sans-serif;
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
            supported by Chrome and Opera */

            --select-mode-width:25%;
            --input-width:72%;
            --nav-buttons-width:calc(var(--input-width)/4 - 10px);
            --find-button-width:calc(var(--input-width)/4);
            --replace-button-width:calc(var(--input-width)/4);
            --replace-all-button-width:calc(var(--input-width)/4);
        }

        #elementContainer {
          height:100%;
          width:100%;
        }

        #title {
          font-family: var(--ui-search-font-family);
          text-align: center;
          width:100%;
        }

        #searchContainer {
          width: 100%;
        }

        #modeSelect {
          width: var(--select-mode-width);
          margin-left:1%;
        }

        #replaceContainer {
          margin-top:10px;
          width: 100%;
        }

        #inputReplace {
          margin-top: 10px;
          width: calc(var(--input-width) - 10px);
        }

        #inputSearch {
          width: calc(var(--input-width) - 10px);
        }

        #replaceButtonDiv {
          width: 100%;
        }

        #findButton {
          width: var(--find-button-width);
        }

        #replaceAllButton {
          visibility: hidden;
          width: var(--replace-all-button-width);
        }

        #replaceButton {
          visibility: hidden;
          width: var(--replace-button-width);
        }

        .nav-button-container {
          margin-top:10px;
          width: var(--nav-buttons-width);
          display: inline-block;
        }

        .prev-button {
          width:45%;
          padding:0;
          margin:0;
        }
        .next-button {
          width:45%;
          padding:0;
          margin:0;
        }

        .empty-space {
          width: var(--select-mode-width);
          margin-left:1%;
          display: inline-block;
        }

	</style>


	<div id="elementContainer">
    <p id="title">Search</h1>
    <div id="searchContainer">
      <select id="modeSelect">
        <option>Find</option>
        <option>Find & Replace</option>
      </select>
      <input type="search" id="inputSearch" placeholder="Find">
      <div id="replaceRow">
        <div class="empty-space">&nbsp;</div>
        <input type="search" id="inputReplace" placeholder="Replace">
      </div>
      <div id="buttonDiv">
        <div class="empty-space">&nbsp;</div>
        <button id="replaceAllButton" class="replace-all"> Replace all </button>
        <button id="replaceButton" class="replace"> Replace </button>
        <button id="findButton" class="find"> Find </button>
        <span class="nav-button-container">
          <button id="prevButton" class="prev-button"> < </button>
          <button id="nextButton" class="next-button"> > </button>
        </div>
      </div>
    </div>
	</div>
  `;

export default template;
