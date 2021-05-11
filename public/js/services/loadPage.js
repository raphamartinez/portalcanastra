loadDocument("header.html", "#mainheader");
loadDocument("footer.html", "#mainfooter");

function loadDocument(file, target)
{
    var el = document.querySelector(target);

    //Se o elemento não existir então não requisita
    if (!el) return;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", file, true);
    xhr.onreadystatechange = function(){
         if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300){
              el.innerHTML = xhr.responseText;
         }
    };

    xhr.send(null);
}