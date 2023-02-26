let clickLogin = document.getElementById("login-button");
let clickSignIn = document.getElementById("signIn-button");
let userId;


function notesFormat(Heading,mainText){
    this.Heading = Heading;
    this.mainText = mainText;
}


function clearFields(view){
    switch(view){
        case "login":
            document.getElementById("login-email").value = "";
            document.getElementById("login-password").value = "";
            break;
        case "signIn":
            document.getElementById("signin-username").value="";
            document.getElementById("signin-email").value="";
            document.getElementById("signin-password").value="";
            break;
        default: break;
    }

}

//buttons eventlisteners

clickSignIn.addEventListener('click',()=> {
    signin();
    clearFields("signIn");
})



clickLogin.addEventListener('click',function(){
    login();
    clearFields("login");
})

//main functions

async function login(){
    let loginemail = document.getElementById("login-email").value;
    let loginpassword = document.getElementById("login-password").value;


    //verify formats
    let verifiedEmail = emailVerify(loginemail);
    let verifiedPassword = passwordVerify(loginpassword);
    //------------
    if(verifiedEmail == true && verifiedPassword==true){
        const data = {email:loginemail,password:loginpassword}
        const options = {
            method : 'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data) 
        }
        let response = await fetch('/find',options);
        const serverdata = await response.json();
        //await console.log(serverdata.userData[serverdata.userData.length - 1]);

        //if not adduser
        if(serverdata.userData == ""){
            alert("no account found,Please sign in first!");
        }else{
            let response1 = await fetch('/verify',options);
            const serverdata1 = await response1.json();
            console.log(serverdata1.status);
            if(serverdata1.status=="verified"){
                userId=0;
                Userstatus = "Sign in with other user";

                extraHTML = '<h3 class="settings-header userName">Welcome '+serverdata.userData[serverdata.userData.length - 1].Name+'</h3>';
                changeView(4);

                current_Status = "logged in as :" +serverdata.userData[serverdata.userData.length - 1].Name;

                updateCurrentStatus();

                document.getElementById("single-note").style.visibility = "hidden";
                
                updateUserData(serverdata.userData[serverdata.userData.length - 1]);
            }else{
                alert("Wrong password,please try again!")
            }
        }

    }
}

async function signin(){
    let userName = document.getElementById("signin-username").value;
    let signinEmail = document.getElementById("signin-email").value;
    let signinPassword = document.getElementById("signin-password").value;

    //verify formats
    let verifiedEmail = emailVerify(signinEmail);
    let verifiedPassword = passwordVerify(signinPassword);
    let verifiedname =nameVerify(userName);


    if(verifiedEmail == true && verifiedPassword==true && verifiedname==true){
        const data = {user:userName,email:signinEmail,password:signinPassword};
        const options = {
            method : 'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data) 
        }
        //check db if user exist
        const response = await fetch('/find',options);
        const serverdata = await response.json();
        await console.log(serverdata.userData);


        //if not adduser
        if(serverdata.userData == ""){
            const response2 =  await fetch('/add-user',options);
            const serverdata2 = await response2.json();
            alert("account added Successfully, please login and enjoy taking notes!")
        }else{
            alert("User exist try login");
        }

    } 
}



function updateUserData(data){
    const notes = data;
    userId = data._id;
    
    updateView();

}

async function updateView(){
    const data = {id:userId};
    const options = {
        method : 'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data) 
    }
    let response = await fetch('/get-data',options);
    const serverdata = await response.json();

    console.log(serverdata.userData[0]._id);
    console.log(serverdata.userData[0].Notes[0].Heading);
    console.log(serverdata.userData[0].Notes.length);

    const allUserNotes = serverdata.userData[0].Notes;

    allNotes.length = 0;

    if(serverdata.userData[0].Notes[0].Heading != undefined){
        for (let index = 0; index < serverdata.userData[0].Notes.length; index++) {

            allNotes.push(new notesFormat(allUserNotes[index].Heading, allUserNotes[index].mainText));
        }
        getAllNotes.innerHTML = "";
        displayAllNotes();

    }else{
        getAllNotes.innerHTML = "";
    }

    console.log(allNotes);
    hideSignin();
}


//for updatedb.js

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

