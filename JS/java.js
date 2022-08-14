
var m_pos_y;
var dropdowns = document.getElementsByClassName("dropdown-content");
var i;
var kamere = []
var kamereName = [];
var camAddWay = []
var stanje = false;
var usporedba;

var change;
var fristTime = true;
window.onmousemove = function (e) {
    m_pos_x = e.pageX;
    m_pos_y = e.pageY;
}


setInterval(function () {
    if ((dropdowns[0].classList.contains('show')) && (m_pos_y < 100)) {
    }

    else if (m_pos_y < 30) {
        if (dropdowns[0].classList.contains('show')) {
        }
        else {
            document.getElementById("myDropdown").classList.toggle("animationIn");
            document.getElementById("myDropdown").classList.remove('animationOut');
            document.getElementById("myDropdown").classList.toggle("show");
        }
    }

    else {

        if (dropdowns[0].classList.contains('show')) {

            document.getElementById("myDropdown").classList.remove('animationIn');
            document.getElementById("myDropdown").classList.toggle("animationOut");
            document.getElementById("myDropdown").classList.remove('show');
        }

    }
}, 100);

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('plusBtn').addEventListener('click', function () {
        document.getElementById("choose").classList.toggle("useAlert");
        document.getElementById("HTMLkamere").classList.toggle("sve");
    });
});

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('setCamera').addEventListener('click', function () {
        document.getElementById("choose").classList.remove("useAlert");
        document.getElementById("HTMLkamere").classList.remove("sve");
        setCamera();
    });
});

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('cancelCamera').addEventListener('click', function () {
        document.getElementById("choose").classList.remove("useAlert");
        document.getElementById("HTMLkamere").classList.remove("sve");
    });
});

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('binBtn').addEventListener('click', function () {
        for (let i = 0; i < kamere.length; i++) {
            document.getElementById("images" + i).classList.toggle("whiteImg");
        }
        truefalse();
    });
});



window.setInterval(function () {
    let isChecked = document.getElementById("quickAdd").checked;
    if (isChecked) {
        // console.log(isChecked)
        startingLoadXMLdoc();
    }
    else {
        // console.log(isChecked)
    }
}, 30000);





function setCamera() {


    kamere.push(document.querySelector('#kamere').value);
    kamereName.push(document.querySelector('#kamere').options[document.querySelector('#kamere').options.selectedIndex].text);
    camAddWay.push("HAND")
    ispis();


}









function truefalse() {
    if (stanje == true) {
        stanje = false;
    }
    else {
        stanje = true;
    }
}

function ispis() {
    document.getElementById("grid-container").innerHTML = ""
    for (let i = 0; i < kamere.length; i++) {
        document.getElementById("grid-container").innerHTML = document.getElementById("grid-container").innerHTML + `
        <div value="${i}" class="divSlike">
            <img onClick="deleteCam(${i})" class="grid-item"  id="images${i}" src="${kamere[i]}" "></img>
          

            <img class="imgSivo" onClick="changeImage(${i})"  id="sivoImage${i}" src="images/sivo.png">
            
            <div id="txt${i}" onClick="changeImage(${i})" class="text">
            <p id="pTag${i}">${kamereName[i]}</p>
            </div>
        </div>
        `;


    }

    camSetter();
}







function camSetter() {
    /*console.log(kamere.length)*/
    if (kamere.length < 2) {
        document.getElementById("grid-container").style.gridTemplateColumns = "auto"
    }
    else if (kamere.length < 5) {

        document.getElementById("grid-container").style.gridTemplateColumns = "auto auto"
    }
    else if (kamere.length < 10) {

        document.getElementById("grid-container").style.gridTemplateColumns = "auto auto auto"
    }
    else {

        document.getElementById("grid-container").style.gridTemplateColumns = "auto auto auto auto"
    }

}


function changeImage(a) {

    document.getElementById("sivoImage" + a).style.display = "none";
    document.getElementById("images" + a).style.display = "block";
    document.getElementById("txt" + a).style.display = "none";
    document.getElementById("pTag" + a).style.display = "none";


}


function deleteCam(a) {
    if (stanje == true) {

        //console.log(a)
        kamere.splice(a, 1)
        kamereName.splice(a, 1)
        camAddWay.splice(a, 1)
        ispis();
        truefalse();
        for (let i = 0; i < kamere.length; i++) {
            document.getElementById("images" + i).classList.remove("whiteImg");
        }
    }
    else {
        document.getElementById("sivoImage" + a).style.display = "block";
        document.getElementById("images" + a).style.display = "none";
        document.getElementById("txt" + a).style.display = "block";
        document.getElementById("pTag" + a).style.display = "block";



    }
}

//http://10.141.0.71/stribor-web/admin_cvora_1/dohvati_poziciju_novi.php?brojkamere=1&broj=0


function startingLoadXMLdoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (fristTime) {
                fristTime = false;
                docXML(this);
            }
            else {
                docXML2(this);
            }
        }
    };
    xmlhttp.open("GET", "http://10.141.0.10/supervisor/data/kml/observers_divulje2.php", true);
    xmlhttp.send();
}


function docXML(xml) {
    var xmlDoc = xml.responseXML;
    var optionValue = xmlDoc.getElementsByTagName("description");
    var optionContent = xmlDoc.getElementsByTagName("name");
    var camsStateArray = xmlDoc.getElementsByTagName("value");
    /*console.log(xmlDoc)*/
    //console.log("optionValue: " + optionValue.length)
    //console.log("optionContent: " + optionContent.length)
    for (let i = 0; i < optionValue.length; i++) {
        let x = optionValue[i].textContent.slice(-1)
        // console.log("zadnji znak linka je: " + x)
        let a = Math.floor(i / 2)
        if (x == 1) {
            /*console.log(`
    ${i}
    
    <option value="${optionValue[i].textContent}">${optionContent[a].textContent}</option>
    
    
            console.log("jedan")*/
            document.getElementById("kamere").innerHTML = document.getElementById("kamere").innerHTML +
                `
        <option value="${optionValue[i].textContent}">${optionContent[a].textContent}</option>
        `
        }
        else {
            /*
            console.log(`
        ${i}
        <option value="${optionValue[i].textContent}">${optionContent[a].textContent + " 2"}</option>
        `)
            console.log("dva")*/
            document.getElementById("kamere").innerHTML = document.getElementById("kamere").innerHTML +
                `
            <option value="${optionValue[i].textContent}">${optionContent[a].textContent + " 2"}</option>
            `
        }
    }




    for (let i = 0; i < camsStateArray.length; i++) {


        if ((camsStateArray[i].textContent == 1) || (camsStateArray[i].textContent == 2)) {
            let x = optionValue[i].textContent.slice(-1)
            let a = Math.floor(i / 2)
            if (x == 1) {
                /*console.log(`
                 ${i}
                 <option value="${optionValue[i].textContent}">${optionContent[a].textContent}</option>
                 `)*/
                //console.log("jedan")
                kamereName.push(optionContent[a].textContent)
                kamere.push(optionValue[i].textContent)
                camAddWay.push("AUTO")
            }
            else {
                /*console.log(`
                ${i}
                <option value="${optionValue[i].textContent}">${optionContent[a].textContent + " 2"}</option>
                `)*/
                //console.log("dva")
                kamereName.push(optionContent[a].textContent + " 2")
                kamere.push(optionValue[i].textContent)
                camAddWay.push("AUTO")
            }
        }


        //console.log(kamereCrvene)
        //console.log(kamereNameCrvene)

    }

    // console.log("kamereName -> " + kamereName)
    ispis();
}


function docXML2(xml) {
    //console.log("camAddWay: "+camAddWay)
    var xmlDoc = xml.responseXML;
    var optionValue = xmlDoc.getElementsByTagName("description");
    var optionContent = xmlDoc.getElementsByTagName("name");
    var camsStateArray = xmlDoc.getElementsByTagName("value");
    /*console.log(xmlDoc)*/
    //console.log("optionValue: " + optionValue.length)
    //console.log("optionContent: " + optionContent.length)


    for (let i = 0; i < camsStateArray.length; i++) {

        for (let j = 0; j < kamereName.length; j++) {

            if (camsStateArray[i].textContent == 0) {
                if (optionValue[i].textContent == kamere[j]) {
                    change = j;
                    usporedba = 1;           //zelena je kamera ali je u kamerama pa je triba izbacit
                    break;
                }
                else {
                    usporedba = 2;                // zelena je kamera a nije u kamerama pa nam nije od koristi
                }
            }
            else {

                if (optionValue[i].textContent == kamere[j]) {
                    usporedba = 2;          //vec postoji isti u kamerama
                }
                else {
                    for (let d = 0; d < kamereName.length; d++) {
                        if (optionValue[i].textContent == kamere[d]) {
                            if (camAddWay[j]=="AUTO"){
                                usporedba = 2;     //vec postoji isti u kamerama
                            break;
                            }
                        }
                        else {
                            usporedba = 0;   //ako usporedba ostane 0 na kraju for-a triba ga ubacit jer ga nema unutra
                        }
                    }
                }
            }


        }



        if (usporedba == 0) {
            if ((camsStateArray[i].textContent == 1) || (camsStateArray[i].textContent == 2)) {


                //console.log(optionValue[i].textContent)
                let x = optionValue[i].textContent.slice(-1)
                let a = Math.floor(i / 2)
                if (x == 1) {

                    kamereName.push(optionContent[a].textContent)
                    kamere.push(optionValue[i].textContent)
                    camAddWay.push("AUTO")
                }
                else {

                    kamereName.push(optionContent[a].textContent + " 2")
                    kamere.push(optionValue[i].textContent)
                    camAddWay.push("AUTO")
                }
            }
        }
        else if (usporedba == 1) {
            //console.log("LINK: " + kamere[change])
            kamere.splice(change, 1)
            //console.log("IME: " + kamereName[change])
            kamereName.splice(change, 1)
            //console.log("IME: " + camAddWay[change])
            camAddWay.splice(change, 1)
        }

        else {
            //console.log("---")
        }



    }

    // console.log("kamereName -> " + kamereName)
    ispis();
}





startingLoadXMLdoc();