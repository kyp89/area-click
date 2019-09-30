"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("./../src");
const src_2 = require("common-models/src");
const jquery_1 = __importDefault(require("jquery"));
jquery_1.default(document).ready(() => {
    const testContainer = document.getElementById("#testContainer");
    const parameters = new Array();
    const parameter = new src_2.StyleParameter("test", "testVal");
    const size = new src_2.Size(800, 600);
    const areaClick = new src_1.AreaClick("#testContainer", size, parameters);
    //areaClick.imgHref = "stm32.jpg";
    const infoBox = document.createElement("div");
    const style = document.createAttribute("style");
    style.value = `position:fixed;top:50px;right:50px;width:300px;height:300px;border:1px solid black;`;
    infoBox.setAttributeNode(style);
    const inputFile = document.createElement("input");
    const typeFile = document.createAttribute("type");
    typeFile.value = "file";
    inputFile.setAttributeNode(typeFile);
    infoBox.appendChild(inputFile);
    const infoBoxCords = document.createElement("div");
    infoBox.appendChild(infoBoxCords);
    const infoBoxImbCode = document.createElement("div");
    infoBox.appendChild(infoBoxImbCode);
    const imgBox = document.createElement("img");
    const body = document.getElementsByTagName("body");
    body[0].appendChild(infoBox);
    body[0].appendChild(imgBox);
    areaClick.clickCallback = (data) => {
        infoBoxCords.innerHTML = `Cords: x:${data[0]}, y:${data[1]}`;
    };
    const input = document.querySelector("input");
    if (input !== null) {
        input.addEventListener(`change`, (event) => {
            let decodedValue = "";
            const reader = new FileReader();
            if (event.target.files && event.target.files.length > 0) {
                const file = event.target.files[0];
                reader.readAsDataURL(file);
                reader.onload = () => {
                    if (typeof reader.result === `string`) {
                        const value = reader.result.split(',')[1];
                        decodedValue = atob(value);
                        infoBoxImbCode.innerHTML = `IMG Code: ${decodedValue}`;
                        console.log(decodedValue);
                        const image = new Image();
                        image.src = `data:image/jpg;base64,${value}`;
                        document.body.appendChild(image);
                        areaClick.imgHref = image.src;
                        // const srcAttr = document.createAttribute("src");
                        // srcAttr.value = value;
                        //imgBox.setAttributeNode(image.src);
                    }
                };
            }
        });
    }
    console.log(`Size:`);
    console.log(size);
    console.log(`Style Parameter:`);
    console.log(parameter);
});
