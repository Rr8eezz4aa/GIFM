window.onload = function() {
    var queryDict = {};
    location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})
    searchTxt = queryDict["q"]
    searchTxt = decodeURI(searchTxt);
    if (searchTxt == "" || searchTxt == undefined || searchTxt == "undefined") {
        window.location.href = "https://rr8eezz4aa.github.io/GIFM/index.html";
    }
    var mcursor = document.getElementById("mcursor");
    var search = document.getElementById("search");
    var sbtn = document.getElementById("searchBtn");
    var tY = (search.offsetHeight/2 + search.offsetTop - 12) + "px";
    var tX = (search.offsetWidth/2 + search.offsetLeft) + "px";
    var trans = "translateY("+tY+")"+" translateX("+tX+")"
    mcursor.style.transform = trans;
    setTimeout(function() {
        var i = 0;
        var type = setInterval(() => {
            if (i > searchTxt.length) {
                clearInterval(type);
                var tY = (sbtn.offsetHeight/2 + sbtn.offsetTop - 10) + "px";
                var tX = (sbtn.offsetWidth/2 + sbtn.offsetLeft) + "px";
                var trans = "translateY("+tY+")"+" translateX("+tX+")"
                mcursor.style.transform = trans;
                setTimeout(() => {
                    sbtn.style.border = "1px solid #000";
                    window.location.href = "https://google.com/search?q="+searchTxt;
                }, 3000);
            }
            search.value += searchTxt.charAt(i)
            i++
        }, 100);
    }, 3000)
   
}