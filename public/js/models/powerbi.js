
<<<<<<< HEAD
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
=======
powerbi.bootstrap(
    reportContainerDivElement,
    {
        type: 'dashboard',
        embedUrl: "https://app.powerbi.com/reportEmbed?reportId=658b03ef-eabc-497a-8171-5ff6a105ad47&autoAuth=true&ctid=7c233ef6-b75d-4d21-8319-f199fda36ea0&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWJyYXppbC1zb3V0aC1iLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D"
    }
);

// Set up the configuration object that determines what to embed and how to embed it.
let embedConfiguration = {
    accessToken: string,
    embedUrl: string,
    id: "powerbi",
    permissions: 'Read',
    tokenType: 'models.TokenType.Aad',
    type: 'report'
};
 
// Get a reference to the HTML element that contains the embedded report.
let embedContainer = $('#embedContainer')[0];
 
// Embed the report.
let report = powerbi.embed(embedContainer, embedConfiguration);
>>>>>>> de55bacec8263a31fbb1ca3beb14ae1bbe34b238
