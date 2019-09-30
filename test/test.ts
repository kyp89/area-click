import {AreaClick} from "./../src";
import { Size, StyleParameter} from "common-models/src";
import $ from "jquery";


$(document).ready(() => {

    const testContainer = document.getElementById("#testContainer");

    const parameters = new Array<StyleParameter>();

    const parameter = new StyleParameter("test", "testVal");

    const size = new Size(800, 600);
    
    const areaClick = new AreaClick("#testContainer", size, parameters);

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

    areaClick.clickCallback = (data:Array<number>) => {
        infoBoxCords.innerHTML = `Cords: x:${data[0]}, y:${data[1]}`;
    };

    const input = document.querySelector("input");

    if(input !== null){
        input.addEventListener(`change`, (event: any) => {
            let decodedValue = "";
            const reader = new FileReader();

            if(event.target.files && event.target.files.length > 0){
                const file = event.target.files[0];
                reader.readAsDataURL(file);
                reader.onload = () => {
                    if(typeof reader.result === `string`){
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
                }

            }
        });
    }
    

    console.log(`Size:`);
    console.log(size);
    console.log(`Style Parameter:`);
    console.log(parameter);
});
