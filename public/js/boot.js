if(getCookie("themeID") == ''){
    setCookie("themeID", 0, 365);
    themeIndex = 0;
    updateTheme();
  }
  else{
    themeIndex = Number(getCookie("themeID"));
}


setTimeout(() => {updateTheme();; }, 50);