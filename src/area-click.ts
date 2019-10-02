import { StyleParameter, Size } from "common-models";
import { MarkedPoint } from "./models/marked-point";
import * as d3 from "d3";

export class AreaClick{

    private _imgHref:string = "";
    private _imageElement:any;
    private _imageContainer: any = null;

    private _svgElement:any;
    private _clickCallback:Function|null = null;

    private _markedPoints: Array<MarkedPoint> = new Array<MarkedPoint>();
    private _markedPointsContainer: any = null;
    private _markedPointClickCallback : Function|null = null;

    constructor(
        private _htmlElement:string,
        private _size:Size,
        private _parameters:StyleParameter[]
    ){

        this._svgElement =   d3.select(this._htmlElement).append("svg")
                            .attr("width", `${this._size.width}`)
                            .attr("height", `${this._size.height}`)
                            .style("border", "1px solid black");

        this._imageContainer = this._svgElement.append("g")
                                        .attr("name", "imageContainer");

        this._markedPointsContainer = this._svgElement.append("g")
                                        .attr("name", "markedPoints");
    }

    public set clickCallback(clickCallback: Function){
        this._clickCallback = clickCallback;
    }

    public set imgHref(imgHref: string){
        this._imgHref = imgHref;
        this.createImgElement();
    }

    public set markedPoints(markedPoints:Array<MarkedPoint>){
        this._markedPoints = markedPoints;

        this.createMarkedPoints();
    }

    private createImgElement(): void{
        

        this._imageElement = this._imageContainer
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

    private createMarkedPoints(): void{
        


        if(this._markedPoints.length > 0){
            this._markedPoints.forEach((markedPoint: MarkedPoint) =>{
              const pointContainer = this._markedPointsContainer.append("g")
                                        .attr("name",`${markedPoint.id}`);

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