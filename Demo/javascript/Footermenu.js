SetFooterSubMenu = function (ctl, MenuID, result) {
    var items = "";
    for (var i = 0; i < result.length; i++) {
        if (result[i].Rootmenuid == MenuID) {
            items += "<li data-menuid=\"" + result[i].MenuID + "\"><a href=\"" + (result[i].PageURL != "" && result[i].PageURL != null ? result[i].PageURL : "javascript:void(0);") + "\">" + result[i].MenuName + "</a></li>";
        }
    }
    if (items != "") {
        ctl.append(items);
        $(">li", ctl).each(function () {
            for (var i = 0; i < result.length; i++) {
                if (result[i].Rootmenuid == $(this).attr("data-menuid")) {
                    $(this).append("<ul data-menuid=\"" + $(this).attr("data-menuid") + "\"></ul>");
                    SetFooterSubMenu($(">ul", $(this)), $(this).attr("data-menuid"), result);
                    break;
                }
            }
        });
    }
};

$(document).ready(function () {

    var URLs = "json/footmenu.txt";
    $.ajax({
        url: URLs,
        type: "GET",
        dataType: "json",

        success: function (msg) {
            //console.log(msg);
            var string = "";


            if (msg.length > 0) {
                $("#smamenu").append("<ul data-menuid=\"0\"></ul>");
                SetFooterSubMenu($(">ul", $("#smamenu")), 0, msg);
            }
            SetFooterMenuPath();
            //console.log(string);
        },

        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        }
    });


    $(window).resize(function () {
        SetFooterMenuPath();
    });
});


var SetFooterMenuPath = function () {
    var footer = $("#footer").outerWidth(true);
    //console.log("footer=" + footer);
    var smamenulength = $("#smamenu").outerWidth(true);
    //console.log("smamenulength =" + smamenulength);
    var moveX = parseInt(parseInt(footer) / 2) - 230;
    //console.log("moveX =" + moveX);
    var footmenuul = $("#smamenu>ul");
    footmenuul[0].style.paddingLeft = moveX + "px";
}

