let getAllNotes = document.getElementById("all-notes");
let getSingleHeading = document.getElementById("single-heading");
let getSingleText = document.getElementById("single-text");
let addNote = document.getElementById("add-note");
let inputName = document.getElementById("input-name");
let getSaveNote = document.getElementById("save-note");
let deleteNote = document.getElementById("delete-note");
/*for css purposes only*/
//dark themes index
// 0 dark    1 light
/*end */

let themes = [
    new theme(grabbCssElement('--dark-background'),grabbCssElement('--dark-font-color1'),grabbCssElement('--dark-font-color2'),grabbCssElement('--dark-hover-color') )   , new theme(grabbCssElement('--light-background'),grabbCssElement('--light-font-color1'),grabbCssElement('--light-font-color2'),grabbCssElement('--light-hover-color') )
]


let themeIndex;

function updateTheme(){
    let getBody = document.getElementById("main-body");
    let getLeftColumnH1 = document.querySelector("#left-column h1");
    let getH3 = document.getElementsByTagName('h3');
    let getLightTheme = document.getElementById("enable-light-theme");

    if(themeIndex>0){
        themeIndex -= 1;
        try{
            getLightTheme.style.backgroundColor = "gray";;
        }catch{
            console.log("bootup")
        }
        
    }else{
        themeIndex += 1;
        try{
            getLightTheme.style.backgroundColor = "green";
        }catch{
            console.log("bootup");
        }
        
    }
    getBody.style.backgroundColor = themes[themeIndex].backgroundColor;
    getLeftColumnH1.style.color = themes[themeIndex].fontColor2;
    for (var i = 0; i < getH3.length; i++) {
        getH3[i].style.color = themes[themeIndex].fontColor2;
    }

    inputName.style.backgroundColor = themes[themeIndex].backgroundColor;
    getSingleHeading.style.color = themes[themeIndex].fontColor2;
    getSingleText.style.color = themes[themeIndex].fontColor2;


    if(themeIndex == 1){
        setCookie("themeID", 0, 365);
    }else{
        setCookie("themeID", 1, 365);   
    }

    
}

/*with predefined parameter */

function updateTheme2(){
    let getH3 = document.getElementsByTagName('h3');

    for (var i = 0; i < getH3.length; i++) {
        getH3[i].style.color = themes[themeIndex].fontColor2;
    }
    
}
/* */

function theme(backgroundColor,fontColor1,fontColor2,hoverColor){
    this.backgroundColor = backgroundColor;
    this.fontColor1 = fontColor1;
    this.fontColor2 = fontColor2;
    this.hoverColor = hoverColor;
}


function grabbCssElement(element){
    return getComputedStyle(document.documentElement).getPropertyValue(element);
}




/*Cookie data --initial run*/ 




