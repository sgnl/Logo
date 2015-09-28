(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Tone"), require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["Tone", "jQuery"], factory);
	else if(typeof exports === 'object')
		exports["Logo"] = factory(require("Tone"), require("jQuery"));
	else
		root["Logo"] = factory(root["Tone"], root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Tone, $, LogoStyle, Waveforms){\n\n\tvar colors = [\"#3833ED\",\"#1EDF3E\",\"#ED3333\",\"#7F33ED\",\"#22DBC0\",\"#ED33CF\",\"#FFFC0C\",\"#f5871f\"];\n\n\tvar bufferLen = 256;\n\n\tvar waveform = Waveforms(bufferLen).random;\n\n\t/**\n\t *  @class  Tone.Logo visualizes current Tone.js context\n\t *  @param  {Object}  options  The options\n\t */\n\tTone.Logo = function(options){\n\n\t\toptions = this.defaultArg(options, Tone.Logo.defaults);\n\n\t\t/**\n\t\t *  The container element\n\t\t *  @type  {Element}\n\t\t */\n\t\tthis.element = $(\"<div>\", {\n\t\t\t\"id\" : \"TonejsLogo\"\n\t\t}).appendTo(options.container);\n\n\n\t\t/**\n\t\t *  the Tone.js title\n\t\t *  @type  {Element}\n\t\t */\n\t\tthis.textContainer = $(\"<div>\", {\n\t\t\t\"id\" : \"TextContainer\",\n\t\t}).appendTo(this.element);\n\n\t\t/**\n\t\t *  the waveform canvas\n\t\t *  @type  {Element}\n\t\t */\n\t\tthis.canvas = $(\"<canvas>\", {\n\t\t\t\"id\" : \"Canvas\",\n\t\t}).appendTo(this.textContainer);\n\n\t\t/**\n\t\t *  the drawing context\n\t\t *  @type  {Canavs}\n\t\t */\n\t\tthis.context = this.canvas.get(0).getContext(\"2d\");\n\n\t\t/**\n\t\t *  the Tone.js title\n\t\t *  @type  {Element}\n\t\t */\n\t\tthis.title = $(\"<div>\", {\n\t\t\t\"id\" : \"Title\",\n\t\t\t\"text\" : \"Tone.js\"\n\t\t}).appendTo(this.textContainer);\n\n\t\t/**\n\t\t *  The waveform analysis of the incoming signal\n\t\t *  @type  {Tone.Analyser}\n\t\t */\n\t\tthis.analyser = new Tone.Analyser({\n\t\t\t\"size\" : bufferLen,\n\t\t\t\"type\" : \"waveform\",\n\t\t\t\"returnType\" : \"byte\"\n\t\t});\n\n\t\t/**\n\t\t *  A signal to make the analyser rest\n\t\t *  at 0 when nothing is connected\n\t\t *  @private\n\t\t */\n\t\tthis._signal = new Tone.Signal(0).connect(this.analyser);\n\n\t\t/**\n\t\t *  the value below which it is considered silent\n\t\t */\n\t\tthis._silentThresh = 0.01;\n\n\t\t/**\n\t\t *  The current RMS of the incoming signal\n\t\t */\n\t\tthis._rms = 0;\n\n\t\t//set the size\n\t\tthis.resize(options.width, options.height);\n\t\t//connect the master output to the analyser\n\t\tTone.Master.connect(this.analyser);\n\n\t\t//start the draw loop\n\t\tthis._draw();\n\t};\n\n\tTone.extend(Tone.Logo);\n\n\t/**\n\t *  The defaults\n\t *  @type  {Object}\n\t */\n\tTone.Logo.defaults = {\n\t\t\"container\" : \"body\",\n\t\t\"width\" : 300,\n\t\t\"height\" : 80,\n\t};\n\n\t/**\n\t *  Set the size of the logo\n\t *  @param  {Number}  width\n\t *  @param  {Number}  height\n\t *  @return  {Tone.Logo}  this\n\t */\n\tTone.Logo.prototype.resize = function(width, height) {\n\t\t//set the size of the logo\n\t\tthis.element.width(width);\n\t\tthis.element.height(height);\n\t\t// this.canvas.width(height);\n\t\t//double pixel density\n\t\tthis.context.canvas.width = this.canvas.height() * 2;\n\t\tthis.context.canvas.height = this.canvas.height() * 2;\n\t\t//set the font size\n\n\t\tthis.title.css({\n\t\t\t\"line-height\" : (height * 0.85).toString() + \"px\",\n\t\t\t\"font-size\" : height * 0.88,\n\t\t\t// \"text-shadow\" : \"-\"+textShadow+\"px \"+textShadow+\"px #3833ED\"\n\t\t});\n\t\tthis.canvas.css({\n\t\t\t\"border-radius\" : height/50,\n\t\t\t\"width\" : this.canvas.height(),\n\t\t\t\"height\" : this.canvas.height()\n\t\t});\n\t\treturn this;\n\t};\n\n\t/**\n\t *  The draw loop which paints the waveform\n\t */\n\tTone.Logo.prototype._draw = function() {\n\t\trequestAnimationFrame(this._draw.bind(this));\n\t\tvar analysis = this.analyser.analyse();\n\t\t//if it's silent, draw a canned waveform when the mouse is over\n\t\tif (this._isSilent(analysis)){\n\t\t\tthis._drawBuffer(waveform, true);\n\t\t} else { //if it's not silent, draw the waveform\n\t\t\tthis._drawBuffer(analysis, false);\n\t\t}\n\t};\n\n\t/**\n\t *  Draw the given buffer onto the canvas\n\t */\n\tTone.Logo.prototype._drawBuffer = function(buffer, silent){\n\t\tvar context = this.context;\n\t\tvar width = this.context.canvas.width;\n\t\tvar height = this.context.canvas.height;\n\t\tif (silent){\n\t\t\tmargin = this._scale(this._rms, 0, this._silentThresh, height * 0.2, height * 0.5);\n\t\t} else {\n\t\t\tmargin = height * 0.2;\n\t\t}\n\t\tvar sideMargin = this.lineWidth;\n\t\tcontext.clearRect(0, 0, width, height);\n\t\tcontext.beginPath();\n\n\t\tvar firstValue;\n\n\t\tfor (var i = 0, len = buffer.length; i < len; i++){\n\t\t\tvar x = this._scale(i, 0, len - 1, 0, width);\n\t\t\tvar y = this._scale(buffer[i], 0, 255, height - margin, margin);\n\t\t\tif (i === 0){\n\t\t\t\tfirstValue = y;\n\t\t\t\tcontext.moveTo(x, y);\n\t\t\t} else {\n\t\t\t\tcontext.lineTo(x, y);\n\t\t\t}\n\t\t}\n\t\tcontext.lineTo(width, height);\n\t\tcontext.lineTo(0, height);\n\t\tcontext.lineTo(0, firstValue);\n\t\tcontext.lineCap = \"round\";\n\t\t// context.stroke();\n\t\tcontext.fillStyle = \"#22DBC0\";\n\t\tcontext.fill();\n\n\t};\n\n\t/**\n\t *  True if the analyser analysis array is silent (all 0s)\n\t *  @private\n\t */\n\tTone.Logo.prototype._isSilent = function(analysis){\n\t\t//if the average is close to 128\n\t\tvar total = 0;\n\t\tfor (var i = 0; i < analysis.length; i++){\n\t\t\ttotal += Math.pow((analysis[i] - 128) / 128, 2);\n\t\t}\n\t\tvar rms = Math.sqrt(total / analysis.length);\n\t\tthis._rms = Math.max(rms, this._rms * 0.9);\n\t\treturn this._rms < this._silentThresh;\n\t};\n\n\t/**\n\t *  Scale a value from between the inputMin/Max to the outputMin/Max\n\t *  @private\n\t */\n\tTone.Logo.prototype._scale = function(value, inputMin, inputMax, outputMin, outputMax){\n\t\tvar norm = (value - inputMin) / (inputMax - inputMin);\n\t\treturn norm * (outputMax - outputMin) + outputMin;\n\t};\n\n\t/**\n\t *  Clean up\n\t *  @returns {Tone.Logo} this\n\t */\n\tTone.Logo.prototype.dispose = function(){\n\t\tthis.element.remove();\n\t\tthis.element = null;\n\t\tthis.canvas.remove();\n\t\tthis.canvas = null;\n\t\tthis.title.remove();\n\t\tthis.title = null;\n\t\tthis.context = null;\n\t\tthis.analyser.dispose();\n\t\tthis.analyser = null;\n\t\tthis._signal.dispose();\n\t\tthis._signal = null;\n\t};\n\n\treturn Tone.Logo;\n}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n/*****************\n ** WEBPACK FOOTER\n ** ./app/Logo.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./app/Logo.js?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_1__;\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"Tone\"\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22Tone%22?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_2__;\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"jQuery\"\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22jQuery%22?");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(4);\nif(typeof content === 'string') content = [[module.id, content, '']];\n// add the styles to the DOM\nvar update = __webpack_require__(6)(content, {});\nif(content.locals) module.exports = content.locals;\n// Hot Module Replacement\nif(false) {\n\t// When the styles change, update the <style> tags\n\tif(!content.locals) {\n\t\tmodule.hot.accept(\"!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./../node_modules/sass-loader/index.js!./Logo.scss\", function() {\n\t\t\tvar newContent = require(\"!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./../node_modules/sass-loader/index.js!./Logo.scss\");\n\t\t\tif(typeof newContent === 'string') newContent = [[module.id, newContent, '']];\n\t\t\tupdate(newContent);\n\t\t});\n\t}\n\t// When the module is disposed, remove the <style> tags\n\tmodule.hot.dispose(function() { update(); });\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./app/Logo.scss\n ** module id = 3\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./app/Logo.scss?");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	eval("exports = module.exports = __webpack_require__(5)();\n// imports\nexports.push([module.id, \"@import url(https://fonts.googleapis.com/css?family=Roboto+Mono);\", \"\"]);\n\n// module\nexports.push([module.id, \"#TonejsLogo {\\n  position: absolute;\\n  background-color: black;\\n  cursor: pointer; }\\n  #TonejsLogo #Canvas, #TonejsLogo #Title, #TonejsLogo #Border {\\n    position: absolute; }\\n  #TonejsLogo #TextContainer {\\n    position: absolute;\\n    width: auto;\\n    -webkit-transform: translate(-50%, 0px);\\n        -ms-transform: translate(-50%, 0px);\\n            transform: translate(-50%, 0px);\\n    left: 50%;\\n    height: 100%; }\\n    #TonejsLogo #TextContainer #Title {\\n      position: relative;\\n      display: inline-block;\\n      font-family: \\\"Roboto Mono\\\" monospace;\\n      color: white;\\n      text-align: center;\\n      height: 100%;\\n      top: 0px;\\n      width: 100%; }\\n    #TonejsLogo #TextContainer #Canvas {\\n      position: absolute;\\n      height: 100%;\\n      top: 0px;\\n      border-radius: 2px;\\n      z-index: 0;\\n      right: 0px;\\n      width: 10px;\\n      background-color: #ED33CF; }\\n\", \"\"]);\n\n// exports\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/css-loader!./~/autoprefixer-loader!./~/sass-loader!./app/Logo.scss\n ** module id = 4\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./app/Logo.scss?./~/css-loader!./~/autoprefixer-loader!./~/sass-loader");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\n// css base code, injected by the css-loader\r\nmodule.exports = function() {\r\n\tvar list = [];\r\n\r\n\t// return the list of modules as css string\r\n\tlist.toString = function toString() {\r\n\t\tvar result = [];\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar item = this[i];\r\n\t\t\tif(item[2]) {\r\n\t\t\t\tresult.push(\"@media \" + item[2] + \"{\" + item[1] + \"}\");\r\n\t\t\t} else {\r\n\t\t\t\tresult.push(item[1]);\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn result.join(\"\");\r\n\t};\r\n\r\n\t// import a list of modules into the list\r\n\tlist.i = function(modules, mediaQuery) {\r\n\t\tif(typeof modules === \"string\")\r\n\t\t\tmodules = [[null, modules, \"\"]];\r\n\t\tvar alreadyImportedModules = {};\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar id = this[i][0];\r\n\t\t\tif(typeof id === \"number\")\r\n\t\t\t\talreadyImportedModules[id] = true;\r\n\t\t}\r\n\t\tfor(i = 0; i < modules.length; i++) {\r\n\t\t\tvar item = modules[i];\r\n\t\t\t// skip already imported module\r\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\r\n\t\t\t//  when a module is imported multiple times with different media queries.\r\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\r\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\r\n\t\t\t\tif(mediaQuery && !item[2]) {\r\n\t\t\t\t\titem[2] = mediaQuery;\r\n\t\t\t\t} else if(mediaQuery) {\r\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\r\n\t\t\t\t}\r\n\t\t\t\tlist.push(item);\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n\treturn list;\r\n};\r\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/css-loader/lib/css-base.js\n ** module id = 5\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./~/css-loader/lib/css-base.js?");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\nvar stylesInDom = {},\r\n\tmemoize = function(fn) {\r\n\t\tvar memo;\r\n\t\treturn function () {\r\n\t\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\r\n\t\t\treturn memo;\r\n\t\t};\r\n\t},\r\n\tisOldIE = memoize(function() {\r\n\t\treturn /msie [6-9]\\b/.test(window.navigator.userAgent.toLowerCase());\r\n\t}),\r\n\tgetHeadElement = memoize(function () {\r\n\t\treturn document.head || document.getElementsByTagName(\"head\")[0];\r\n\t}),\r\n\tsingletonElement = null,\r\n\tsingletonCounter = 0;\r\n\r\nmodule.exports = function(list, options) {\r\n\tif(false) {\r\n\t\tif(typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\r\n\t}\r\n\r\n\toptions = options || {};\r\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\r\n\t// tags it will allow on a page\r\n\tif (typeof options.singleton === \"undefined\") options.singleton = isOldIE();\r\n\r\n\tvar styles = listToStyles(list);\r\n\taddStylesToDom(styles, options);\r\n\r\n\treturn function update(newList) {\r\n\t\tvar mayRemove = [];\r\n\t\tfor(var i = 0; i < styles.length; i++) {\r\n\t\t\tvar item = styles[i];\r\n\t\t\tvar domStyle = stylesInDom[item.id];\r\n\t\t\tdomStyle.refs--;\r\n\t\t\tmayRemove.push(domStyle);\r\n\t\t}\r\n\t\tif(newList) {\r\n\t\t\tvar newStyles = listToStyles(newList);\r\n\t\t\taddStylesToDom(newStyles, options);\r\n\t\t}\r\n\t\tfor(var i = 0; i < mayRemove.length; i++) {\r\n\t\t\tvar domStyle = mayRemove[i];\r\n\t\t\tif(domStyle.refs === 0) {\r\n\t\t\t\tfor(var j = 0; j < domStyle.parts.length; j++)\r\n\t\t\t\t\tdomStyle.parts[j]();\r\n\t\t\t\tdelete stylesInDom[domStyle.id];\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n}\r\n\r\nfunction addStylesToDom(styles, options) {\r\n\tfor(var i = 0; i < styles.length; i++) {\r\n\t\tvar item = styles[i];\r\n\t\tvar domStyle = stylesInDom[item.id];\r\n\t\tif(domStyle) {\r\n\t\t\tdomStyle.refs++;\r\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\r\n\t\t\t}\r\n\t\t\tfor(; j < item.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t} else {\r\n\t\t\tvar parts = [];\r\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\r\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction listToStyles(list) {\r\n\tvar styles = [];\r\n\tvar newStyles = {};\r\n\tfor(var i = 0; i < list.length; i++) {\r\n\t\tvar item = list[i];\r\n\t\tvar id = item[0];\r\n\t\tvar css = item[1];\r\n\t\tvar media = item[2];\r\n\t\tvar sourceMap = item[3];\r\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\r\n\t\tif(!newStyles[id])\r\n\t\t\tstyles.push(newStyles[id] = {id: id, parts: [part]});\r\n\t\telse\r\n\t\t\tnewStyles[id].parts.push(part);\r\n\t}\r\n\treturn styles;\r\n}\r\n\r\nfunction createStyleElement() {\r\n\tvar styleElement = document.createElement(\"style\");\r\n\tvar head = getHeadElement();\r\n\tstyleElement.type = \"text/css\";\r\n\thead.appendChild(styleElement);\r\n\treturn styleElement;\r\n}\r\n\r\nfunction createLinkElement() {\r\n\tvar linkElement = document.createElement(\"link\");\r\n\tvar head = getHeadElement();\r\n\tlinkElement.rel = \"stylesheet\";\r\n\thead.appendChild(linkElement);\r\n\treturn linkElement;\r\n}\r\n\r\nfunction addStyle(obj, options) {\r\n\tvar styleElement, update, remove;\r\n\r\n\tif (options.singleton) {\r\n\t\tvar styleIndex = singletonCounter++;\r\n\t\tstyleElement = singletonElement || (singletonElement = createStyleElement());\r\n\t\tupdate = applyToSingletonTag.bind(null, styleElement, styleIndex, false);\r\n\t\tremove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);\r\n\t} else if(obj.sourceMap &&\r\n\t\ttypeof URL === \"function\" &&\r\n\t\ttypeof URL.createObjectURL === \"function\" &&\r\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\r\n\t\ttypeof Blob === \"function\" &&\r\n\t\ttypeof btoa === \"function\") {\r\n\t\tstyleElement = createLinkElement();\r\n\t\tupdate = updateLink.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tstyleElement.parentNode.removeChild(styleElement);\r\n\t\t\tif(styleElement.href)\r\n\t\t\t\tURL.revokeObjectURL(styleElement.href);\r\n\t\t};\r\n\t} else {\r\n\t\tstyleElement = createStyleElement();\r\n\t\tupdate = applyToTag.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tstyleElement.parentNode.removeChild(styleElement);\r\n\t\t};\r\n\t}\r\n\r\n\tupdate(obj);\r\n\r\n\treturn function updateStyle(newObj) {\r\n\t\tif(newObj) {\r\n\t\t\tif(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)\r\n\t\t\t\treturn;\r\n\t\t\tupdate(obj = newObj);\r\n\t\t} else {\r\n\t\t\tremove();\r\n\t\t}\r\n\t};\r\n}\r\n\r\nvar replaceText = (function () {\r\n\tvar textStore = [];\r\n\r\n\treturn function (index, replacement) {\r\n\t\ttextStore[index] = replacement;\r\n\t\treturn textStore.filter(Boolean).join('\\n');\r\n\t};\r\n})();\r\n\r\nfunction applyToSingletonTag(styleElement, index, remove, obj) {\r\n\tvar css = remove ? \"\" : obj.css;\r\n\r\n\tif (styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = replaceText(index, css);\r\n\t} else {\r\n\t\tvar cssNode = document.createTextNode(css);\r\n\t\tvar childNodes = styleElement.childNodes;\r\n\t\tif (childNodes[index]) styleElement.removeChild(childNodes[index]);\r\n\t\tif (childNodes.length) {\r\n\t\t\tstyleElement.insertBefore(cssNode, childNodes[index]);\r\n\t\t} else {\r\n\t\t\tstyleElement.appendChild(cssNode);\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction applyToTag(styleElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar media = obj.media;\r\n\tvar sourceMap = obj.sourceMap;\r\n\r\n\tif(media) {\r\n\t\tstyleElement.setAttribute(\"media\", media)\r\n\t}\r\n\r\n\tif(styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = css;\r\n\t} else {\r\n\t\twhile(styleElement.firstChild) {\r\n\t\t\tstyleElement.removeChild(styleElement.firstChild);\r\n\t\t}\r\n\t\tstyleElement.appendChild(document.createTextNode(css));\r\n\t}\r\n}\r\n\r\nfunction updateLink(linkElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar media = obj.media;\r\n\tvar sourceMap = obj.sourceMap;\r\n\r\n\tif(sourceMap) {\r\n\t\t// http://stackoverflow.com/a/26603875\r\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\r\n\t}\r\n\r\n\tvar blob = new Blob([css], { type: \"text/css\" });\r\n\r\n\tvar oldSrc = linkElement.href;\r\n\r\n\tlinkElement.href = URL.createObjectURL(blob);\r\n\r\n\tif(oldSrc)\r\n\t\tURL.revokeObjectURL(oldSrc);\r\n}\r\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/style-loader/addStyles.js\n ** module id = 6\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./~/style-loader/addStyles.js?");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {\n\n\treturn function(bufferLength){\n\n\t\tvar sine = new Array(bufferLength);\n\t\tvar square = new Array(bufferLength);\n\t\tvar sawtooth = new Array(bufferLength);\n\t\tvar triangle = new Array(bufferLength);\n\n\t\tvar choices = [sine, sawtooth, triangle, square];\n\n\n\t\tvar i;\n\t\tfor (i = 0; i < bufferLength; i++){\n\t\t\tsine[i] = (Math.sin(Math.PI * 2 * i / 255) + 1) * 128;\n\t\t}\n\n\t\tfor (i = 0; i < bufferLength; i++){\n\t\t\tsawtooth[i] = ((i + bufferLength/2) % bufferLength) / bufferLength * 255;\n\t\t}\n\n\t\tfor (i = 0; i < bufferLength; i++){\n\t\t\tif (i < bufferLength/4){\n\t\t\t\ttriangle[i] = i/(bufferLength/4) * 127 + 128;\n\t\t\t} else if (i < bufferLength * 0.75){\n\t\t\t\ttriangle[i] = (1 - (i - bufferLength/4)/(bufferLength/2)) * 255;\n\t\t\t} else {\n\t\t\t\ttriangle[i] = (i - bufferLength * 0.75)/(bufferLength/4) * 127;\n\t\t\t}\n\t\t}\n\n\t\tfor (i = 0; i < bufferLength; i++){\n\t\t\tvar margin = bufferLength/16;\n\t\t\tif (i < margin){\n\t\t\t\tsquare[i] = 0;\n\t\t\t} else if (i < bufferLength/2){\n\t\t\t\tsquare[i] = 255;\n\t\t\t} else if (i < (bufferLength - margin)){\n\t\t\t\tsquare[i] = 0;\n\t\t\t} else {\n\t\t\t\tsquare[i] = 255;\n\t\t\t}\n\t\t}\n\n\t\tvar random = choices[Math.floor(Math.random()*choices.length)];\n\n\t\treturn {\n\t\t\tsawtooth : sawtooth,\n\t\t\tsine : sine,\n\t\t\ttriangle : triangle,\n\t\t\tsquare : square,\n\t\t\trandom : random\n\t\t};\n\t};\n}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n/*****************\n ** WEBPACK FOOTER\n ** ./app/Waveforms.js\n ** module id = 7\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./app/Waveforms.js?");

/***/ }
/******/ ])
});
;