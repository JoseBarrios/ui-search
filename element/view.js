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
            --input-width:56%;
            --nav-buttons-width:15%;
            --replace-button-width:calc(var(--input-width)/2);
            --replace-all-button-width:calc(var(--input-width)/2);
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

        #inputSearch {
          width: var(--input-width);
        }

        #replaceContainer {
          margin-top:10px;
          width: 100%;
        }

        #inputReplace {
          margin-left: calc(var(--select-mode-width) + 12px);
          width: var(--input-width);
        }

        #replaceButtonDiv {
          margin-top:2%;
          width: 100%;
        }

        #replaceAllButton {
          width: var(--replace-all-button-width);
        }

        #replaceButton {
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
          margin-left:5px;
          width: calc(25% - 1px);
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
      <div class="nav-button-container">
        <button id="prevSearchButton" class="prev-button"> < </button>
        <button id="nextSearchButton" class="next-button"> > </button>
      </div>
	  </div>
    <div id="replaceContainer">
      <input type="search" id="inputReplace" placeholder="Replace">
      <div id="replaceButtonDiv">
        <div class="empty-space">&nbsp;</div>
        <button id="replaceAllButton" class="replace-all"> Replace all </button>
        <button id="replaceButton" class="replace"> Replace </button>
        <div class="nav-button-container">
          <button id="prevReplaceButton" class="prev-button"> < </button>
          <button id="nextReplaceButton" class="next-button"> > </button>
        </div>
      </div>
    </div>
	</div>
  `;

export default template;
