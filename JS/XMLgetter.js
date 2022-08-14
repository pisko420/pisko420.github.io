function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          docXML(this);
        }
    };
    xmlhttp.open("GET", "http://10.141.0.10/supervisor/data/kml/observers_divulje2.php", true);
    xmlhttp.send();
}

function docXML(xml) {
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("description");
    for(let i=0;i<x.length;i++){
    console.log(x[i].textContent)
    }
}
