import { StyleParameter, Size } from "common-models";
import { MarkedPoint } from "./models/marked-point";
export declare class AreaClick {
    private _htmlElement;
    private _size;
    private _parameters;
    private _imgHref;
    private _imageElement;
    private _imageContainer;
    private _svgElement;
    private _clickCallback;
    private _markedPoints;
    private _markedPointsContainer;
    private _markedPointClickCallback;
    constructor(_htmlElement: string, _size: Size, _parameters: StyleParameter[]);
    clickCallback: Function;
    imgHref: string;
    markedPoints: Array<MarkedPoint>;
    private createImgElement;
    private clear;
    private createMarkedPoints;
}
