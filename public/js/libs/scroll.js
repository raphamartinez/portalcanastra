$(function () {
    $("#historial").niceScroll({
        cursorcolor: "#34495E"
    });
    $('#historial').scrollTop($('#historial').get(0).scrollHeight, -1);
});
