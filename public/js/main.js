
//global variable for tracing true index across functions
let Index;

let singleHeading = document.getElementById("single-heading");

function openSettings(){
    getSettingsBar.style.visibility = "visible";
}


function displayAllNotes(){
    for (let index = 0; index < allNotes.length; index++) {
        getAllNotes.innerHTML+='<div id="notes-heading" onclick="openNote('+index+')"><h3>'+ allNotes[index].Heading.substring(0,6) +'</h3></div>';
    }
}

function openNote(index){
    document.getElementById("single-note").style.visibility = "visible";
    getSingleHeading.value = allNotes[index].Heading;
    getSingleText.value = allNotes[index].mainText;
    Index = index;
}

addNote.addEventListener("click",function(){
    if(inputName.value!=""){
        updateCurrentStatus(true);
        allNotes.push(new notesFormat(inputName.value , ""));
        getAllNotes.innerHTML+='<div id="notes-heading" onclick="openNote('+(allNotes.length-1)+')"><h3>'+ allNotes[(allNotes.length-1)].Heading +'</h3></div>';
        //updateNote(allNotes.length-1, inputName.value+":"+"write your text here");
        getAllNotes.innerHTML='';
        updateDB(allNotes);
        
        inputName.value="";
        updateTheme2();
        
    }
    else{
        alert("Give your note a heading");
    }
    
})


deleteNote.addEventListener('click',function(){
    allNotes.splice(Index,1);
    //deleteNoteFromStorage();
    updateDB(allNotes);
    document.getElementById("single-note").style.visibility = "hidden";
    getAllNotes.innerHTML='';
    //displayAllNotes();
    updateTheme2();
    console.log(Index);
})

function saveNote(){
    //updateNote(Index, getSingleHeading.value+":"+getSingleText.value);
    allNotes[Index].Heading = getSingleHeading.value;
    allNotes[Index].mainText = getSingleText.value;
    updateDB(allNotes);
    /*while (allNotes.length > 0) {
        allNotes.pop();
    }
    retrieveDataFromLocalStorage();*/
    getAllNotes.innerHTML='';
    //displayAllNotes();
    updateTheme2();
    alert("note saved sucessfully");
}

//initial start
//displayAllNotes();


//test



function display(){
    let list1 = document.getElementById("filter-notes1").value;
    console.log(list1);
}