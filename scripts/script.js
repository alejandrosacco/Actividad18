const url = "https://65456d9efe036a2fa9544d0d.mockapi.io/users/";
let lista = document.getElementById("results");
let newName = document.getElementById("inputPostNombre");
let newLastname = document.getElementById("inputPostApellido");
let putName = document.getElementById("inputPutNombre");
let putLastname = document.getElementById("inputPutApellido");
let putID = document.getElementById("inputPutId");
let deleteInput = document.getElementById("inputDelete");

newName.addEventListener("input", ()=>{
    if(newName.value != "" && newLastname.value != ""){
        document.getElementById("btnPost").disabled = false;
    }
    else{
        document.getElementById("btnPost").disabled = true;
    }
});

newLastname.addEventListener("input", ()=>{
    if(newName.value != "" && newLastname.value != ""){
        document.getElementById("btnPost").disabled = false;
    }
    else{
        document.getElementById("btnPost").disabled = true;
    }
});

putID.addEventListener("input", ()=>{
    if(putID.value != ""){
        document.getElementById("btnPut").disabled = false;
    }
    else{
        document.getElementById("btnPut").disabled = true;
    }
});

deleteInput.addEventListener("input", ()=>{
    if(deleteInput.value != ""){
        document.getElementById("btnDelete").disabled = false;
    }
    else{
        document.getElementById("btnDelete").disabled = true;
    }
});

document.getElementById("inputPutNombre").addEventListener("input", ()=>{
    if(document.getElementById("inputPutNombre").value != "" && document.getElementById("inputPutApellido").value != ""){
        document.getElementById("btnSendChanges").disabled = false;
    }
    else{
        document.getElementById("btnSendChanges").disabled = true;
    }
});

document.getElementById("inputPutApellido").addEventListener("input", ()=>{
    if(document.getElementById("inputPutNombre").value != "" && document.getElementById("inputPutApellido").value != ""){
        document.getElementById("btnSendChanges").disabled = false;
    }
    else{
        document.getElementById("btnSendChanges").disabled = true;
    }
});

function getData(id){
    let newurl = url;
    if(id != null){
        newurl += id;
    }
    lista.innerHTML = ``;
    fetch(newurl)
    .then (response =>{
        if (!response.ok){
            throw new Error ("La solicitud no fue existosa")
        } 
        return response.json ();
    })
    .then(data => {
        if(id == null){
            for(let i = 0; i < data.length; i++){
                let info = `<li class="list-group-item"> ID: ${data[i].id} NAME: ${data[i].name} LASTNAME: ${data[i].lastname} </li>`;
                lista.innerHTML += info;
            };
        }
        else{
            let info = `<li class="list-group-item"> ID: ${data.id} NAME: ${data.name} LASTNAME: ${data.lastname} </li>`;
            lista.innerHTML += info;
        }
    })
    .catch(error =>{
        alert ("Algo salió mal..." + error.message)
    })
};

function postData(){
    fetch(url, {
        headers:{"Content-Type": "application/json; charset=utf-8"},
        method: "POST",
        body: JSON.stringify({
            name: newName.value,
            lastname: newLastname.value,
        })
    })
    .then (response =>{
        if (!response.ok){
            throw new Error ("La solicitud no fue existosa")
        } 
        return response.json ();
    })
    .then(data => {
        newName.value = "";
        newLastname.value = "";
        console.log(data);
        getData();
    })
    .catch(error =>{
        alert ("Algo salió mal..." + error.message)
    })
};

function putData(id){
    let newurl = url + id;
    fetch(newurl, {
        headers:{"Content-Type": "application/json; charset=utf-8"},
        method: "PUT",
        body: JSON.stringify({
            name: document.getElementById("inputPutNombre").value,
            lastname: document.getElementById("inputPutApellido").value,
        })
    })
    .then (response =>{
        if (!response.ok){
            throw new Error ("La solicitud no fue existosa")
        } 
        return response.json ();
    })
    .then(data => {
        console.log(data)
        getData()
    })
    .catch(error =>{
        alert ("Algo salió mal..." + error.message)
    })
};

function deleteData(id){
    let newurl = url + id;
    fetch(newurl, {
        method: "DELETE"
    })
    .then (response =>{
        if (!response.ok){
            throw new Error ("La solicitud no fue existosa")
        } 
        return response.json ();
    })
    .then(() => {
        alert("Se ha eliminado el elemento")
        getData()
    })
    .catch(error =>{
        alert ("Algo salió mal..." + error.message)
    })
};


document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("btnGet1").addEventListener("click", ()=>{
        if(document.getElementById("inputGet1Id").value == ""){
            getData();
        }
        else{
            getData(document.getElementById("inputGet1Id").value);
        }
    });

    document.getElementById("btnPost").addEventListener("click", ()=>{
        postData();
    });

    document.getElementById("btnDelete").addEventListener("click", ()=>{
        deleteData(deleteInput.value);
    });

    document.getElementById("btnPut").addEventListener("click", ()=>{
        fetch(url + putID.value)
        .then(response => response.json())
        .then(data => {
            document.getElementById("inputPutNombre").value = data.name;
            document.getElementById("inputPutApellido").value = data.lastname;
        })
    })

    document.getElementById("btnSendChanges").addEventListener("click", ()=>{
        putData(document.getElementById("inputPutId").value);
    })
})