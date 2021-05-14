let simpleBi = document.querySelector('[data-powerbi]')

const showSimplePowerBI = () => {
    simpleBi.innerHTML = `   
        <iframe width="1000" height="500.25"
        src="https://app.powerbi.com/reportEmbed?reportId=fbff6304-84d4-4a5f-b615-628b06d2d411&autoAuth=true&ctid=7c233ef6-b75d-4d21-8319-f199fda36ea0&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWJyYXppbC1zb3V0aC1iLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D"
        frameborder="0" allowFullScreen="true"></iframe>`
}

export const ViewPowerBI = {
    showSimplePowerBI
}