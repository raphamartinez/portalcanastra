window.onload = async function () {
    let loading = document.querySelector('[data-loading]')
    loading.innerHTML = `
<div class="spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
`

    let powerbi = document.querySelector('[data-powerbi]')
    let relatorio = JSON.parse(sessionStorage.getItem('relatorio'))

    let title = document.querySelector('[data-title]')
    const div = document.createElement('div')

    div.innerHTML = `   
    <iframe width="1140" height="600" src="${relatorio.url}" frameborder="0" allowFullScreen="true"></iframe>`


    powerbi.appendChild(div)

    let name = relatorio.title.substring(0, (relatorio.title + " ").indexOf(" "))
    let username = document.querySelector('[data-username]')
    username.innerHTML = name
    loading.innerHTML = " "
    title.innerHTML = "Portal Canastra"
}