let getSettingsBar = document.getElementById("settings-bar");

Object.assign(
    document.createElement("input"),
    {id:"LogoText"},
    {placeholder:"Max 5 char"},
    {style:"color: black;width: 90px"},
    {type:"text"}
)

let Userstatus = "Sign in";
let extraHTML = '';

function changeView(viewID){
    let getView = document.getElementById("setting-submenus");
    switch(viewID){
        case 1:
            getView.innerHTML= '<ul><li><h3 class="settings-header">Enable Light mode</h3><button id="enable-light-theme" class="simp-button" onclick="updateTheme()"></button></li><li><h3 class="settings-header">xx under construction xx</h3><button class="simp-button"></button></li></ul>';
            break;
        case 4:
            getView.innerHTML= '<ul><li><h3 class="settings-header">'+Userstatus+'</h3><button id="enable-login" class="simp-button" onclick="showSignin()" >sign in</button></li></ul>';
            getView.innerHTML += extraHTML;
            break;
        default: getView.innerHTML= '<h3 class="settings-header">Coming soon</h3>'
    }
}

function closeSettings(){
    getSettingsBar.style.visibility= "hidden";

}

function hideSignin(){
    document.getElementById("user-credentials").style.visibility="hidden";

    document.getElementById("login").style.visibility="hidden";

    document.getElementById("sign-in").style.visibility="hidden";
}

function showSignin(){
    document.getElementById("user-credentials").style.visibility="visible";

    document.getElementById("sign-in").style.visibility="visible";


}



function customizeLogo(){


}