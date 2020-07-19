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
    $("#result").fadeOut(50);
    $("#shortLinkBtn").prop("disabled", false);
    var search = $("#search")[0];
    var searchTxt = search.value;
    if (searchTxt) {
        var searchUrl = "https://rr8eezz4aa.github.io/GIFM/go.html?q=" + searchTxt;
        var searchUrl = encodeURI(searchUrl);
        $("#result").fadeIn(50);
        $("#resultUrl")[0].value = searchUrl;
        showMsg('لینک با موفقیت ساخته شد!', "success");
    }
}

function goToUrl() {
    var url = $("#resultUrl")[0].value;
    window.open(url);
}

function copyText() {
    var result = document.getElementById("resultUrl");
    result.select();
    result.setSelectionRange(0, 99999);
    document.execCommand("Copy");
    showMsg('لینک کپی شد!', "success");
}

function shortLink() {
    var long = $("#resultUrl")[0].value;
    long = long.split("%20").join("^");
    var url = "https://is.gd/create.php?format=json&url="+long;
    $.ajax({
        method: 'GET',
        url: url,
        dataType: 'jsonp',
        success: function(r) {
            $("#resultUrl")[0].value = r["shorturl"];
            $("#shortLinkBtn").prop("disabled", true);
            showMsg('لینک کوتاه ساخته شد!', 'success');
        }
    })
}

function showMsg(msg, type, timeout=2000) {
    new Noty({
        text: msg,
        type: type,
        timeout: timeout,
        id: "alert",
        layout: "bottomRight"
    }).show();
}