function createUrl() {
    var search = document.getElementById("search");
    var searchTxt = search.value;
    if (searchTxt) {
        var searchUrl = "https://rr8eezz4aa.github.io/GIFM/go.html?q=" + searchTxt;
        var searchUrl = encodeURI(searchUrl);
        document.getElementById("result").style.display = "flex";
        document.getElementById("resultUrl").value = searchUrl
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
    window.open(url)
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