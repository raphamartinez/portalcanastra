
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