
function addNewWEField(){
    // console.log("Added new button");
    let newNode = document.createElement('textarea');
    newNode.classList.add('form-control');
    newNode.classList.add('weField');
    newNode.classList.add('mt-2')
    newNode.setAttribute('rows',3);
    newNode.setAttribute('placeholder','Enter Here');

    let weOb = document.getElementById("we");
    let weAddButtonOb = document.getElementById("weAddButton");

    weOb.insertBefore(newNode,weAddButtonOb);
}

function addNewAQField(){
    let newNode = document.createElement('textarea');
    newNode.classList.add('form-control');
    newNode.classList.add('aqField');
    newNode.classList.add('mt-2')
    newNode.setAttribute('rows',3);
    newNode.setAttribute('placeholder','Enter Here');

    let weOb = document.getElementById("aq");
    let aqAddButtonOb = document.getElementById("aqAddButton");

    weOb.insertBefore(newNode,aqAddButtonOb);
}

function generateCV(){
   
    document.getElementById("nameT").innerHTML = document.getElementById("nameField").value
    document.getElementById("nameT2").innerHTML = document.getElementById("nameField").value;
    document.getElementById("contactT").innerHTML = document.getElementById("contactField").value;
    document.getElementById("addressT").innerHTML = document.getElementById("addressField").value;
    document.getElementById("gitT").innerHTML = document.getElementById("githubField").value;
    document.getElementById("linkedT").innerHTML = document.getElementById("linkedField").value;
    document.getElementById("facebookT").innerHTML = document.getElementById("facebookField").value;
    document.getElementById("objectiveT").innerHTML = document.getElementById("objectiveField").value;

    let wes = document.getElementsByClassName("weField");
    let str = '';
    for(let e of wes){
        str = str + `<li> ${e.value}</li>`;
    }
    document.getElementById("weT").innerHTML= str;

    let aqs = document.getElementsByClassName("aqField");
    let str2 = '';
    for(let e of aqs){
        str2 = str2 + `<li>${e.value}</li>`;
    }
    document.getElementById("aqT").innerHTML = str2;

    document.getElementById("cv-form").style.display='none';
    document.getElementById("cv-template").style.display='block';
}

function printCV(){
    window.print();
}