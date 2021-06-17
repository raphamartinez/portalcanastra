const token = '97029b30-0baa-49ed-ba13-421613d15b1d'
const url = 'https://app.powerbi.com/groups/2dc04ce0-eb50-4247-9f1c-de00ad6e71a5/reports/658b03ef-eabc-497a-8171-5ff6a105ad47/ReportSectionfc75d2bf49271a7ec160'
const reportId = '658b03ef-eabc-497a-8171-5ff6a105ad47/ReportSectionfc75d2bf49271a7ec160'

// Read embed application token from textbox
var txtAccessToken = $('#txtAccessToken').val();

// Read embed URL from textbox
var txtEmbedUrl = $('#txtDashboardEmbed').val();

// Read dashboard Id from textbox
var txtEmbedDashboardId = $('#txtEmbedDashboardId').val();

// Read embed type from radio
var tokenType = $('input:radio[name=tokenType]:checked').val();

// Get models. models contains enums that can be used.
var models = window['powerbi-client'].models;

// Embed configuration used to describe the what and how to embed.
// This object is used when calling powerbi.embed.
// This also includes settings and options such as filters.
// You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
var config = {
    type: 'dashboard',
    tokenType: tokenType == '0' ? models.TokenType.Aad : models.TokenType.Embed,
    accessToken: txtAccessToken,
    embedUrl: txtEmbedUrl,
    id: txtEmbedDashboardId,
    pageView: 'fitToWidth'
};

// Get a reference to the embedded dashboard HTML element
var dashboardContainer = $('#dashboardContainer')[0];

// Embed the dashboard and display it within the div container.
var dashboard = powerbi.embed(dashboardContainer, config);

// Dashboard.off removes a given event handler if it exists.
dashboard.off("loaded");

// Dashboard.on will add an event handler which prints to Log window.
dashboard.on("loaded", function () {
    Log.logText("Loaded");
});

dashboard.on("error", function (event) {
    Log.log(event.detail);

    dashboard.off("error");
});

dashboard.off("tileClicked");
dashboard.on("tileClicked", function (event) {
    Log.log(event.detail);
});
