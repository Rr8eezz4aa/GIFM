window.onload = function() {
    var input = document.getElementById("search");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();    
        document.getElementById("searchBtn").click();
        }
    });
}

function createUrl() {
    document.getElementById("result").style.display = "none";
    document.getElementById("shortLinkBtn").disabled = false;
    var search = document.getElementById("search");
    var searchTxt = search.value;
    if (searchTxt) {
        var searchUrl = "https://rr8eezz4aa.github.io/GIFM/go.html?q=" + searchTxt;
        var searchUrl = encodeURI(searchUrl);
        document.getElementById("result").style.display = "flex";
        document.getElementById("resultUrl").value = searchUrl;
        new Noty({
            text: 'لینک با موفقیت ساخته شد!',
            type: "success",
            timeout: 2000,
            id: "alert",
            layout: "bottomRight"
        }).show();
    } else {
        new Noty({
            text: 'جستجو نمی تواند خالی باشد!',
            type: "error",
            timeout: 1000,
            id: "alert",
            layout: "bottomRight"
        }).show();
    }
}

function goToUrl() {
    var url = document.getElementById("resultUrl").value;
    window.open(url);
}

function copyText() {
    var result = document.getElementById("resultUrl");
    result.select();
    result.setSelectionRange(0, 99999);
    document.execCommand("Copy");
    new Noty({
        text: 'لینک کپی شد!',
        type: "success",
        timeout: 2000,
        id: "alert",
        layout: "bottomRight"
    }).show();
}

function shortLink() {
    var long = document.getElementById("resultUrl").value;
    long = long.split("%20").join("^");
    var url = "https://thingproxy.freeboard.io/fetch/https://is.gd/create.php?format=simple&url="+long;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("resultUrl").value = xhr.response;
            document.getElementById("shortLinkBtn").disabled = true;
            new Noty({
                text: 'لینک کوتاه ساخته شد!',
                type: "success",
                timeout: 1000,
                id: "alert",
                layout: "bottomRight"
            }).show();
        }
    }
    xhr.open("GET", url);
    xhr.send();
}