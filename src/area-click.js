"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3 = __importStar(require("d3"));
class AreaClick {
    constructor(_htmlElement, _size, _parameters) {
        this._htmlElement = _htmlElement;
        this._size = _size;
        this._parameters = _parameters;
        this._imgHref = "";
        this._clickCallback = null;
        this._svgElement = d3.select(this._htmlElement).append("svg")
            .attr("width", `${this._size.width}`)
            .attr("height", `${this._size.height}`)
            .style("border", "1px solid black");
    }
    set clickCallback(clickCallback) {
        this._clickCallback = clickCallback;
    }
    set imgHref(imgHref) {
        this._imgHref = imgHref;
        this.createImgElement();
    }
    createImgElement() {
        //this.clear();
        this._imageElement = this._svgElement
            .append("svg:image")
            .attr("xlink:href", `${this._imgHref}`)
            .attr("x", "0")
            .attr("y", "0")
            .attr("width", `${this._size.width}`)
            .attr("height", `${this._size.height}`);
        this._imageElement.on("click", () => {
            const coords = d3.mouse(this._svgElement.node());
            console.log(coords);
            if (this._clickCallback) {
                this._clickCallback(coords);
            }
        });
    }
    clear() {
        if (this._svgElement.selectAll("svg:image").empty() === false) {
            this._svgElement.selectAll("svg:image").remove();
        }
        ;
    }
}
exports.AreaClick = AreaClick;
