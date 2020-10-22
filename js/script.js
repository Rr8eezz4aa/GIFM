window.onload = function() {
    var input = document.getElementById("search");    
    input.value = "";
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();    
            createUrl();
        }
    });
    input.addEventListener("focus", function() {
        getSuggests();
    })
    input.addEventListener("blur", function() {
        setTimeout(() => {
            $("#suggests").empty();
        }, 100);
    })
}

function createUrl(l=0) {
    $("#suggests").empty();
    $("#result").fadeOut(50);
    $("#shortLinkBtn").prop("disabled", false);
    var search = $("#search")[0];
    var searchTxt = search.value;
    if (searchTxt) {
        var searchUrl = "https://rr8eezz4aa.github.io/GIFM/go.html?q=" + searchTxt;
        if (l==1) {
            searchUrl += "&l=1";
        }
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
    var url = "https://v.gd/create.php?format=json&url="+escape(long);
    $.ajax({
        method: 'GET',
        url: url,
        dataType: 'jsonp',
        success: function(r) {
            $("#resultUrl")[0].value = r["shorturl"];
            $("#shortLinkBtn").prop("disabled", true);
            showMsg('لینک کوتاه ساخته شد!', 'success');
        },
        error: function(xhr, status, error) {
            showMsg("متاسفانه مشکلی پیش آمده است!", "error");
        }
    });
}

function getSuggests() {    
    var query = $("#search")[0].value;
    if (!query) {$("#suggests").empty();return}
    var url = "https://www.google.com/complete/search?client=psy-ab&xssi=&output=json&_=33606278&q="+query;
    $.ajax({
        method: 'GET',
        url: url,
        dataType: 'jsonp',
        success: function(r) {
            $("#suggests").empty()
            r[1].slice(0,5).forEach(function(s){
                var el = document.createElement("li");
                el.id = "suggest";
                el.onclick = function(e) {
                    var path = e.path || (e.composedPath && e.composedPath());
                    var el = path.length == 7 ? path[0] : path[1];
                    el = $(el).clone();
                    el.children("i").remove();
                    $("#search")[0].value = el[0].innerText;
                    createUrl();
                }
                el.innerHTML = '<i class="material-icons">search</i>'+s[0];
                $("#suggests").append(el);
                if (!$("#search")[0].value) {$("#suggests").empty();}
            })
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