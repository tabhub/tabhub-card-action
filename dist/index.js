module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(622);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 87:
/***/ (function(module) {

module.exports = require("os");

/***/ }),

/***/ 215:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = __importStar(__webpack_require__(87));
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
function escapeData(s) {
    return toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 277:
/***/ (function(module) {

module.exports = require("path");

/***/ }),

/***/ 441:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";


var converters = __webpack_require__(790),
    indento = __webpack_require__(913);

/**
 * json2md
 * Converts a JSON input to markdown.
 *
 * **Supported elements**
 *
 * | Type         | Element            | Data                                                                                                                     | Example                                                                                                                                          |
 * |--------------|--------------------|--------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
 * | `h1`         | Heading 1          | The heading text as string.                                                                                              | `{ h1: "heading 1" }`                                                                                                                            |
 * | `h2`         | Heading 2          | The heading text as string.                                                                                              | `{ h2: "heading 2" }`                                                                                                                            |
 * | `h3`         | Heading 3          | The heading text as string.                                                                                              | `{ h3: "heading 3" }`                                                                                                                            |
 * | `h4`         | Heading 4          | The heading text as string.                                                                                              | `{ h4: "heading 4" }`                                                                                                                            |
 * | `h5`         | Heading 5          | The heading text as string.                                                                                              | `{ h5: "heading 5" }`                                                                                                                            |
 * | `h6`         | Heading 6          | The heading text as string.                                                                                              | `{ h6: "heading 6" }`                                                                                                                            |
 * | `p`          | Paragraphs         | The paragraph text as string or array (multiple paragraphs).                                                             | `{ p: "Hello World"}` or multiple paragraphs: `{ p: ["Hello", "World"] }`                                                                        |
 * | `blockquote` | Blockquote         | The blockquote as string or array (multiple blockquotes)                                                                 | `{ blockquote: "Hello World"}` or multiple blockquotes: `{ blockquote: ["Hello", "World"] }`                                                     |
 * | `img`        | Image              | An object or an array of objects containing the `title` and `source` fields.                                             | `{ img: { title: "My image title", source: "http://example.com/image.png" } }`                                                                   |
 * | `ul`         | Unordered list     | An array of strings representing the items.                                                                              | `{ ul: ["item 1", "item 2"] }`                                                                                                                   |
 * | `ol`         | Ordered list       | An array of strings representing the items.                                                                              | `{ ol: ["item 1", "item 2"] }`                                                                                                                   |
 * | `code`       | Code block element | An object containing the `language` (`String`) and `content` (`Array` or `String`)  fields.                              | `{ code: { "language": "html", "content": "<script src='dummy.js'></script>" } }`                                                                |
 * | `table`      | Table              | An object containing the `headers` (`Array` of `String`s) and `rows` (`Array` of `Array`s or `Object`s).                 | `{ table: { headers: ["a", "b"], rows: [{ a: "col1", b: "col2" }] } }` or `{ table: { headers: ["a", "b"], rows: [["col1", "col2"]] } }`         |
 * | `link`       | Link               | An object containing the `title` and the `source` fields.                                                                | `{ title: 'hello', source: 'https://ionicabizau.net' }
 *
 *
 * You can extend the `json2md.converters` object to support your custom types.
 *
 * ```js
 * json2md.converters.sayHello = function (input, json2md) {
 *    return "Hello " + input + "!"
 * }
 * ```
 *
 * Then you can use it:
 *
 * ```js
 * json2md({ sayHello: "World" })
 * // => "Hello World!"
 * ```
 *
 * @name json2md
 * @function
 * @param {Array|Object|String} data The input JSON data.
 * @param {String} prefix A snippet to add before each line.
 * @return {String} The generated markdown result.
 */
function json2md(data, prefix, _type) {
    prefix = prefix || "";
    if (typeof data === "string" || typeof data === "number") {
        return indento(data, 1, prefix);
    }

    var content = [];

    // Handle arrays
    if (Array.isArray(data)) {
        for (var i = 0; i < data.length; ++i) {
            content.push(indento(json2md(data[i], "", _type), 1, prefix));
        }
        return content.join("\n");
    } else {
        var type = Object.keys(data)[0],
            func = converters[_type || type];

        if (typeof func === "function") {
            return indento(func(_type ? data : data[type], json2md), 1, prefix) + "\n";
        }
        throw new Error("There is no such converter: " + type);
    }
}

/**
 * @param {Array|Object|String} data The input JSON data.
 * @param {String} prefix A snippet to add before each line.
 * @return {Promise.<String, Error>} The generated markdown result.
 */
json2md.async = function (data, prefix, _type) {
    return Promise.resolve().then(function () {
        prefix = prefix || "";
        if (typeof data === "string" || typeof data === "number") {
            return indento(data, 1, prefix);
        }

        var content = [];

        // Handle arrays
        if (Array.isArray(data)) {
            var promises = data.map(function (d, index) {
                return Promise.resolve().then(function () {
                    return json2md.async(d, "", _type);
                }).then(function (result) {
                    return indento(result, 1, prefix);
                }).then(function (result) {
                    content[index] = result;
                });
            });
            return Promise.all(promises).then(function () {
                return content.join("\n");
            });
        } else {
            var type = Object.keys(data)[0],
                func = converters[_type || type];

            if (typeof func === "function") {
                return Promise.resolve().then(function () {
                    return func(_type ? data : data[type], json2md);
                }).then(function (result) {
                    return indento(result, 1, prefix) + "\n";
                });
            }
            throw new Error("There is no such converter: " + type);
        }
    });
};

json2md.converters = converters;

module.exports = json2md;

/***/ }),

/***/ 622:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(827);
const fs = __webpack_require__(747);
const path = __webpack_require__(277);
const json2md = __webpack_require__(441);

const needGeneReadme = core.getInput('need-gene-readme');

const repo = process.env.GITHUB_REPOSITORY;
const repoInfo = repo.split("/");
const repoName = repoInfo[1];

let gitRef = process.env.GITHUB_REF;

if (gitRef) {
  const refs = gitRef.split("/");
  gitRef = refs[refs.length - 1];
} else {
  gitRef = 'master';
}

const manifestList = [];

function walkDirs(dirPath) {
  if (!dirPath) return;
  const imageDir = path.join(dirPath, "images");
  console.log(`image dir: ${imageDir}`);
  if (fs.existsSync(imageDir)) {
    console.log(`image dir exist: ${imageDir}`)
    const imageList = readImageDir(imageDir);
    if (imageList) {
      const imageManifest = toImageManifest(imageList, dirPath);
      console.log(`manifest: ${imageManifest}`);
      dumpData(imageManifest, path.join(dirPath, "manifest.json"));
    }
    return;
  }

  fs.readdirSync(dirPath).forEach(file => {
    if (file.startsWith('.')) return;
    const subDirPath = path.join(dirPath, file);
    if (fs.statSync(subDirPath).isDirectory()) {
      walkDirs(subDirPath);
    }
  });
}

function toImageManifest(imageList, dirPath) {
  let items = [];
  imageList.forEach(imagePath => {
    items.push({
      "type": "image",
      "url": toRawUrl(imagePath)
    })
  });
  return {
    name: `${repo}/${dirPath}`,
    version: "1.0",
    repo: `https://github.com/${repo}/tree/${gitRef}/${dirPath}`,
    type: "resource",
    items: items
  };
}

function toRawUrl(filePath) {
  return `https://raw.githubusercontent.com/${repo}/${gitRef}/${filePath}`;
}

function readImageDir(imageDir) {
  const imageExts = ["png", "jpg", "jpeg", "bmp"];
  let imagePathList = [];

  fs.readdirSync(imageDir).forEach(file => {
    if (imageExts.indexOf(path.extname(file).slice(1).toLowerCase()) > -1) {
      let imagePath = path.join(imageDir, file);
      console.log(`image path: ${imagePath}`);
      imagePathList.push(imagePath);
    }
  });

  console.log(`>>>>>>>>>>>>>>>> image list: ${imagePathList}`)
  return imagePathList;
}

function readJsonFile(jsonFilePath) {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) return {};
    var jsonObj = JSON.parse(data);
    if (typeof jsonObj === "object") {
      return jsonObj
    }
  });
}

function dumpData(manifestData, dataFilePath) {
  const jsonData = JSON.stringify(manifestData);
  try {
    fs.writeFileSync(dataFilePath, jsonData);
    let albumName = repoName;
    if (dataFilePath.indexOf("/") > -1) {
      albumName = dataFilePath.split("/").reverse()[1]
    }
    console.log(`album name: ${albumName}`)
    manifestList.push(`[${albumName}](${toRawUrl(dataFilePath)})`);
  } catch (err) {
    console.log(`dump manifest file error: ${err}`);
  }
}

function geneReadme() {
  const text = json2md([
    { h1: `TabHub Cards: ${repoName}` }
    , { blockquote: "Generated by [TabHub Card Action](https://github.com/tabhub/tabhub-card-action)" }
    , { h3: "Resource List"}
    , { p: "You can copy one of link addresses below as a resource url to add in your [TabHub](https://tabhub.io) settings:" }
    , { ul: manifestList }
  ]);

  fs.writeFile('./README.md', text, (err) => {
    if (err) console.log(`write README file error: ${err}`);
  })
}

walkDirs('.');
console.log(`manifest list: ${manifestList}`);
if (needGeneReadme) geneReadme();


/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ }),

/***/ 790:
/***/ (function(module) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var converters = module.exports = {};

var generateHeader = function generateHeader(repeat) {
    return function (input, json2md) {
        return "#".repeat(repeat) + " " + json2md(input);
    };
};

var indent = function indent(content, spaces, ignoreFirst) {
    var lines = content;

    if (typeof content === "string") {
        lines = content.split("\n");
    }

    if (ignoreFirst) {
        if (lines.length <= 1) {
            return lines.join("\n");
        }
        return lines[0] + "\n" + indent(lines.slice(1), spaces, false);
    }

    return lines.map(function (c) {
        return " ".repeat(spaces) + c;
    }).join("\n");
};

var parseTextFormat = function parseTextFormat(text) {

    var formats = {
        strong: "**",
        italic: "*"
    };

    return text.replace(/<\/?strong\>/gi, formats.strong).replace(/<\/?bold\>/gi, formats.strong).replace(/<\/?em\>/gi, formats.italic).replace(/<\/?italic\>/gi, formats.italic);
};

// Headings
converters.h1 = generateHeader(1);
converters.h2 = generateHeader(2);
converters.h3 = generateHeader(3);
converters.h4 = generateHeader(4);
converters.h5 = generateHeader(5);
converters.h6 = generateHeader(6);

converters.blockquote = function (input, json2md) {
    return json2md(input, "> ");
};

converters.img = function (input, json2md) {
    if (Array.isArray(input)) {
        return json2md(input, "", "img");
    }
    if (typeof input === "string") {
        return converters.img({ source: input, title: "", alt: "" });
    }
    input.title = input.title || "";
    input.alt = input.alt || "";
    return "![" + input.alt + "](" + input.source + " \"" + input.title + "\")";
};

converters.ul = function (input, json2md) {
    var c = "";
    for (var i = 0; i < input.length; ++i) {
        var marker = "";

        var type = Object.keys(input[i])[0];
        if (type !== "ul" && type !== "ol") {
            marker += "\n - ";
        }

        c += marker + parseTextFormat(indent(json2md(input[i]), 4, true));
    }
    return c;
};

converters.ol = function (input, json2md) {
    var c = "";
    var jumpCount = 0;
    for (var i = 0; i < input.length; ++i) {
        var marker = "";
        var type = Object.keys(input[i])[0];
        if (type !== "ul" && type !== "ol") {
            marker = "\n " + (i + 1 - jumpCount) + ". ";
        } else {
            jumpCount++;
        }

        c += marker + parseTextFormat(indent(json2md(input[i]), 4, true));
    }
    return c;
};

converters.code = function (input, json2md) {
    var c = "```" + (input.language || "") + "\n";
    if (Array.isArray(input.content)) {
        c += input.content.join("\n");
    } else {
        c += input.content;
    }
    c += "\n```";
    return c;
};

converters.p = function (input, json2md) {
    return parseTextFormat(json2md(input, "\n"));
};

converters.table = function (input, json2md) {

    if ((typeof input === "undefined" ? "undefined" : _typeof(input)) !== "object" || !input.hasOwnProperty("headers") || !input.hasOwnProperty("rows")) {
        return "";
    }

    var header = " | " + input.headers.join(" | ") + " | ",
        spaces = " | " + input.headers.map(function () {
        return "---";
    }).join(" | ") + " | ",
        data = " | " + input.rows.map(function (r) {
        return Array.isArray(r) ? r.map(function (el) {
            return parseTextFormat(json2md(el));
        }).join(" | ") : input.headers.map(function (h) {
            return parseTextFormat(json2md(r[h]));
        }).join(" | ");
    }).join("\n") + " | ";

    return [header, spaces, data].join("\n");
};

converters.link = function (input, json2md) {
    if (Array.isArray(input)) {
        return json2md(input, "", "link");
    }
    if (typeof input === "string") {
        return converters.link({ source: input, title: "" });
    }
    return "[" + input.title + "](" + input.source + ")";
};

/***/ }),

/***/ 827:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __webpack_require__(215);
const os = __importStar(__webpack_require__(87));
const path = __importStar(__webpack_require__(277));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = command_1.toCommandValue(val);
    process.env[name] = convertedVal;
    command_1.issueCommand('set-env', { name }, convertedVal);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    command_1.issueCommand('add-path', {}, inputPath);
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 913:
/***/ (function(module) {

"use strict";


/**
 * indento
 * Indents the input string.
 *
 * @name indento
 * @function
 * @param {String} input The input string.
 * @param {Number} width The indent width.
 * @param {String} char The character to use for indentation (default: `" "`).
 * @return {String} The indented string.
 */
function indento(input, width, char) {
  char = typeof char !== "string" ? " " : char;
  return String(input).replace(/^/gm, char.repeat(width));
}

module.exports = indento;

/***/ })

/******/ });