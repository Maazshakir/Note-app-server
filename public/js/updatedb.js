let updateDB = function(notes_data){
    try{
        updateRecord(notes_data);
    }catch(error){
        alert("notes cannot be saved,sign in first!")
    }
    
}

async function updateRecord(notes_data){
    const data = {id:userId,notes:notes_data};
    const options = {
        method : 'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data) 
    }
    let response = await fetch('/update-data',options);
    const serverdata = await response.json();
    console.log(serverdata.userData[0].Notes);

    updateView();
}