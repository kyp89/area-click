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
        this._imageContainer = null;
        this._clickCallback = null;
        this._markedPoints = new Array();
        this._markedPointsContainer = null;
        this._markedPointClickCallback = null;
        this._svgElement = d3.select(this._htmlElement).append("svg")
            .attr("width", `${this._size.width}`)
            .attr("height", `${this._size.height}`)
            .style("border", "1px solid black");
        this._imageContainer = this._svgElement.append("g")
            .attr("name", "imageContainer");
        this._markedPointsContainer = this._svgElement.append("g")
            .attr("name", "markedPoints");
    }
    set clickCallback(clickCallback) {
        this._clickCallback = clickCallback;
    }
    set imgHref(imgHref) {
        this._imgHref = imgHref;
        this.createImgElement();
    }
    set markedPoints(markedPoints) {
        this._markedPoints = markedPoints;
        this.createMarkedPoints();
    }
    createImgElement() {
        this._imageElement = this._imageContainer
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
    createMarkedPoints() {
        if (this._markedPoints.length > 0) {
            this._markedPoints.forEach((markedPoint) => {
                const pointContainer = this._markedPointsContainer.append("g")
                    .attr("name", `${markedPoint.id}`);
                const lineStyle = `stroke:red;stroke-width:2;`;
                pointContainer.append("line")
                    .attr("x1", `${markedPoint.point.x - 10}`)
                    .attr("y1", `${markedPoint.point.y - 10}`)
                    .attr("x2", `${markedPoint.point.x + 10}`)
                    .attr("y2", `${markedPoint.point.y + 10}`)
                    .attr("stroke-width", 2)
                    .attr("stroke", "red");
                pointContainer.append("line")
                    .attr("x1", `${markedPoint.point.x + 10}`)
                    .attr("y1", `${markedPoint.point.y - 10}`)
                    .attr("x2", `${markedPoint.point.x - 10}`)
                    .attr("y2", `${markedPoint.point.y + 10}`)
                    .attr("stroke-width", 2)
                    .attr("stroke", "red");
            });
        }
    }
}
exports.AreaClick = AreaClick;
