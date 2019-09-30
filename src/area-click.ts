import { StyleParameter, Size } from 'common-models';
import * as d3 from "d3";

export class AreaClick{

    private _imgHref:string = "";
    private _imageElement:any;
    private _svgElement:any;
    private _clickCallback:Function|null = null;

    constructor(
        private _htmlElement:string,
        private _size:Size,
        private _parameters:StyleParameter[]
    ){

        this._svgElement =   d3.select(this._htmlElement).append("svg")
                            .attr("width", `${this._size.width}`)
                            .attr("height", `${this._size.height}`)
                            .style("border", "1px solid black");
    }

    public set clickCallback(clickCallback: Function){
        this._clickCallback = clickCallback;
    }

    public set imgHref(imgHref: string){
        this._imgHref = imgHref;
        this.createImgElement();
    }

    private createImgElement(): void{
        

        this._imageElement = this._svgElement
        .append("svg:image")
        .attr("xlink:href", `${this._imgHref}`)
        .attr("x", "0")
        .attr("y", "0")
        .attr("width", `${this._size.width}`)
        .attr("height", `${this._size.height}`);

        this._imageElement.on("click", () => {
            const coords = d3.mouse(<SVGSVGElement>this._svgElement.node());
            console.log(coords);
            if(this._clickCallback){
                this._clickCallback(coords);
            }
        });
    }

    private clear(): void{
        if(this._svgElement.selectAll("svg:image").empty() === false){
            this._svgElement.selectAll("svg:image").remove();
        };
    }
}