
var SetSubMenu = function (ctl, MenuID, result) {
    var items = "";
    for (var i = 0; i < result.length; i++) {
        if (result[i].Rootmenuid == MenuID) {
            if (result[i].MenuName !== "Facebook") {
                items += "<li data-menuid=\"" + result[i].MenuID + "\"><a href=\"" + (result[i].PageURL != "" && result[i].PageURL != null ? result[i].PageURL : "javascript:void(0);") + "\">" + result[i].MenuName + "</a></li>";
            }
            else {
                items += "<li data-menuid=\"" + result[i].MenuID + "\"><a id=\"facebook\"  href=\"" + (result[i].PageURL != "" && result[i].PageURL != null ? result[i].PageURL : "javascript:void(0);") + "\">" + result[i].MenuName + "</a></li>";
            }
        }
    }
    if (items != "") {
        ctl.append(items);
        $(">li", ctl).each(function () {
            for (var i = 0; i < result.length; i++) {
                if (result[i].Rootmenuid == $(this).attr("data-menuid")) {
                    $(this).append("<div class=\"nav-li\"><ul data-menuid=\"" + $(this).attr("data-menuid") + "\"></ul></div>");
                    SetSubMenu($(">div>ul", $(this)), $(this).attr("data-menuid"), result);
                    break;
                }
            }
        });
    }
};

$(document).ready(function () {

    var URLs = "json/menu.txt";
    $.ajax({
        url: URLs,
        type: "GET",
        dataType: "json",

        success: function (msg) {
            //console.log(msg);
            var string = "";


            if (msg.length > 0) {
                $("#menu").append("<ul id=\"menu-ul\" data-menuid=\"0\"></ul>");
                SetSubMenu($(">ul", $("#menu")), 0, msg);
            }
            CheateMenu();
            setMenuHeight();
        },

        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        }
    });


    $(window).resize(function () {
        CheateMenu();
        setMenuHeight();
    });

});



var CheateMenu = function () {
    var menufull = $("#menu").outerWidth(true);
    //console.log("menufull=" + menufull);

    var header = $("#header").outerWidth(true);
    //console.log("header=" + header);

    var moveX = header - menufull;
    //console.log("需移動moveX=" + moveX);


    var movelist = $("#menu-ul li ").outerWidth(true);
    //console.log("需移動listX=" + movelist);

    var menuul = $("#menu-ul>li>div>ul");
    //console.log(menuul.length);

    //for (var i = 0 ; i < menuul.length; i++) {
    //    menuul[i].style.width=header+"px";
    //    console.log(menuul[i]);
    //}

    var menuulli = $("#menu-ul>li");
    //console.log(menuulli);
    for (var i = 0 ; i < menuulli.length; i++) {

        for (var j = 0; j < menuulli[i].children.length; j++) {
            if (menuulli[i].children[j].tagName == "DIV") {
                menuulli[i].children[j].style.width = header + "px";
                console.log(menuulli[i].children[j].style.width = header + "px");
                menuulli[i].children[j].style.left = -(moveX + (movelist * i)) + "px";
                menuulli[i].children[j].children[0].style.paddingLeft = moveX + (movelist) + "px";
            }
        };
    }

    
}


var setMenuHeight = function () {

    var menuheight= $("#menu").outerHeight(true);
    //console.log("menu高度 =" + menuheight);

    var Logoheight = $("#Logo").outerHeight(true);
    //console.log("Logo高度 =" + Logoheight);

    var WebVersionheight = $("#WebVersion").outerHeight(true);
    //console.log("WebVersion高度 =" + WebVersionheight);

    var headerMenuheight = $("#headerMenu").outerHeight(true);
    //console.log("headerMenu高度 =" + headerMenuheight);


    

    document.getElementById("headerMenu").style.height = Logoheight-3 + "px";
    //document.getElementById("floatnone").style.height = Logoheight - 3 + "px";

    var menuContentHeght = $("#menu").height();
    document.getElementById("menu").style.paddingTop = menuContentHeght - menuheight+"px";
}