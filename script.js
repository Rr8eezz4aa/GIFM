function createUrl() {
    var search = document.getElementById("search");
    var searchTxt = search.value;
    var searchUrl = "file:///e:/tmp/gifm/go.html?q=" + searchTxt;
    document.getElementById("result").style.display = "flex";
    document.getElementById("resultUrl").value = searchUrl
}

function goToUrl() {
    var url = document.getElementById("resultUrl").value;
    window.open(url)
}