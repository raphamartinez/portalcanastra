import { View } from "../views/powerbiView.js"
import { Service } from "../services/powerbiService.js"
import { ServiceHistory } from "../services/historyService.js"

const btnChao = document.getElementById('btnChao')
const btnImpressoras = document.getElementById('btnImpressoras')
const btnCartuchos = document.getElementById('btnCartuchos')
const btnCorteVinco = document.getElementById('btnCorteVinco')
const btnFinanceiro = document.getElementById('btnFinanceiro')
const btnVendas = document.getElementById('btnVendas')
const btnOperacional = document.getElementById('btnOperacional')
const btnRepresentantes = document.getElementById('btnRepresentantes')
const cardHistory = document.querySelector('[data-card]')

window.modalDeleteBi = modalDeleteBi
window.listBiUser = listBiUser
window.viewBi = viewBi
window.editBi = editBi
window.addPowerBi = addPowerBi
window.editPowerBi = editPowerBi
window.modalEditBi = modalEditBi
window.deletePowerBi = deletePowerBi
window.autocompletesearch = autocompletesearch

async function autocompletesearch(event) {
    event.preventDefault()

    try {

        const description = document.getElementById('searchcomplete').value
        let title = document.querySelector('[data-title]')
        const url = document.getElementById('searchcomplete').dataset.url
        const type = document.getElementById('searchcomplete').dataset.type
        let powerbi = document.querySelector('[data-powerbi]')

        if (url) {
            cardHistory.style.display = 'none';
            let loading = document.querySelector('[data-loading]')
            loading.innerHTML = `
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        `

            document.getElementById('searchcomplete').value = ''
            document.getElementById('searchcomplete').placeholder = "Pesquisar..."

            title.innerHTML = description
            loading.innerHTML = " "
            powerbi.innerHTML = `   
            <iframe  id="viewbi" width="1140" height="600" src="${url}" frameborder="0" allowFullScreen="true"></iframe>
            <div class="col-md-12 h3 font-weight-bold text-primary text-center p-3"> Outros Relatórios</div>`

            ServiceHistory.insertHistory(`Acesso ao relatório - ${description}`)

            const data = await Service.listBiUser(type)
            let dtview = [];

            data.forEach(powerbi => {
                const field = View.listPowerBi(powerbi)
                dtview.push(field)
            });

            if ($.fn.DataTable.isDataTable('#dataTable')) {
                $('#dataTable').dataTable().fnClearTable();
                $('#dataTable').dataTable().fnDestroy();
                $('#dataTable').empty();
            }

            let user = JSON.parse(sessionStorage.getItem('user'))

            let perfil = user.perfil

            if (perfil !== 1) {
                $(document).ready(function () {
                    $("#dataTable").DataTable({
                        data: dtview,
                        columns: [
                            { title: "Opções" },
                            { title: "Nome" },
                            { title: "Tipo" },
                            { title: "Data de Registro" }
                        ],
                        paging: true,
                        ordering: true,
                        info: true,
                        scrollY: false,
                        scrollCollapse: true,
                        scrollX: true,
                        autoHeight: true,
                        pagingType: "numbers",
                        searchPanes: true,
                        fixedHeader: false
                    }
                    )
                })
            } else {
                $(document).ready(function () {
                    $("#dataTable").DataTable({
                        data: dtview,
                        columns: [
                            { title: "Opções" },
                            { title: "Nome" },
                            { title: "Tipo" },
                            { title: "Data de Registro" }
                        ],
                        paging: true,
                        ordering: true,
                        info: true,
                        scrollY: false,
                        scrollCollapse: true,
                        scrollX: true,
                        autoHeight: true,
                        pagingType: "numbers",
                        searchPanes: true,
                        fixedHeader: false,
                        dom: "<'row'<'col-md-6'l><'col-md-6'f>>" +
                            "<'row'<'col-sm-12'tr>>" +
                            "<'row'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6'p>>" +
                            "<'row'<'col-sm-12'B>>",
                        buttons: [
                            'copy', 'csv', 'excel', 'pdf', 'print'
                        ]
                    }
                    )
                })
                loading.innerHTML = " "
            }

        } else {
            alert('Selecione um relatório válido!')
        }


    } catch (error) {
    }
}

btnRepresentantes.addEventListener('click', async (event) => {
    event.preventDefault()
    cardHistory.style.display = 'none';
    let loading = document.querySelector('[data-loading]')
    loading.innerHTML = `
<div class="d-flex justify-content-center align-items-center spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
`

    try {
        const btn = event.currentTarget
        let title = document.querySelector('[data-title]')
        let type = 2
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')

        title.innerHTML = "Representantes"
        powerbi.innerHTML = " "
        modal.innerHTML = " "
        const data = await Service.listBiUser(type)

        let dtview = [];

        data.forEach(powerbi => {
            const field = View.listPowerBi(powerbi)
            dtview.push(field)
        });

        if ($.fn.DataTable.isDataTable('#dataTable')) {
            $('#dataTable').dataTable().fnClearTable();
            $('#dataTable').dataTable().fnDestroy();
            $('#dataTable').empty();
        }

        let user = JSON.parse(sessionStorage.getItem('user'))

        let perfil = user.perfil

        if (perfil !== 1) {
            $(document).ready(function () {
                $("#dataTable").DataTable({
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Tipo" },
                        { title: "Data de Registro" }
                    ],
                    paging: true,
                    ordering: true,
                    info: true,
                    scrollY: false,
                    scrollCollapse: true,
                    scrollX: true,
                    autoHeight: true,
                    pagingType: "numbers",
                    searchPanes: true,
                    fixedHeader: false
                }
                )
            })
        } else {
            $(document).ready(function () {
                $("#dataTable").DataTable({
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Tipo" },
                        { title: "Data de Registro" }
                    ],
                    paging: true,
                    ordering: true,
                    info: true,
                    scrollY: false,
                    scrollCollapse: true,
                    scrollX: true,
                    autoHeight: true,
                    pagingType: "numbers",
                    searchPanes: true,
                    fixedHeader: false,
                    dom: "<'row'<'col-md-6'l><'col-md-6'f>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6'p>>" +
                        "<'row'<'col-sm-12'B>>",
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ]
                }
                )
            })
        }

        loading.innerHTML = " "

    } catch (error) {

    }
})


btnOperacional.addEventListener('click', async (event) => {
    event.preventDefault()
    cardHistory.style.display = 'none';
    let loading = document.querySelector('[data-loading]')
    loading.innerHTML = `
<div class="d-flex justify-content-center align-items-center spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
`

    try {
        const btn = event.currentTarget
        let title = document.querySelector('[data-title]')
        let type = 2
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')

        title.innerHTML = "Operacional"
        powerbi.innerHTML = " "
        modal.innerHTML = " "
        const data = await Service.listBiUser(type)

        let dtview = [];

        data.forEach(powerbi => {
            const field = View.listPowerBi(powerbi)
            dtview.push(field)
        });

        if ($.fn.DataTable.isDataTable('#dataTable')) {
            $('#dataTable').dataTable().fnClearTable();
            $('#dataTable').dataTable().fnDestroy();
            $('#dataTable').empty();
        }

        let user = JSON.parse(sessionStorage.getItem('user'))

        let perfil = user.perfil

        if (perfil !== 1) {
            $(document).ready(function () {
                $("#dataTable").DataTable({
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Tipo" },
                        { title: "Data de Registro" }
                    ],
                    paging: true,
                    ordering: true,
                    info: true,
                    scrollY: false,
                    scrollCollapse: true,
                    scrollX: true,
                    autoHeight: true,
                    pagingType: "numbers",
                    searchPanes: true,
                    fixedHeader: false
                }
                )
            })
        } else {
            $(document).ready(function () {
                $("#dataTable").DataTable({
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Tipo" },
                        { title: "Data de Registro" }
                    ],
                    paging: true,
                    ordering: true,
                    info: true,
                    scrollY: false,
                    scrollCollapse: true,
                    scrollX: true,
                    autoHeight: true,
                    pagingType: "numbers",
                    searchPanes: true,
                    fixedHeader: false,
                    dom: "<'row'<'col-md-6'l><'col-md-6'f>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6'p>>" +
                        "<'row'<'col-sm-12'B>>",
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ]
                }
                )
            })
        }
        loading.innerHTML = " "

    } catch (error) {

    }
})


btnVendas.addEventListener('click', async (event) => {
    event.preventDefault()
    cardHistory.style.display = 'none';
    let loading = document.querySelector('[data-loading]')
    loading.innerHTML = `
<div class="d-flex justify-content-center align-items-center spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
`

    try {
        const btn = event.currentTarget
        let title = document.querySelector('[data-title]')
        let type = 2
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')

        title.innerHTML = "Vendas"
        powerbi.innerHTML = " "
        modal.innerHTML = " "
        const data = await Service.listBiUser(type)

        let dtview = [];

        data.forEach(powerbi => {
            const field = View.listPowerBi(powerbi)
            dtview.push(field)
        });

        if ($.fn.DataTable.isDataTable('#dataTable')) {
            $('#dataTable').dataTable().fnClearTable();
            $('#dataTable').dataTable().fnDestroy();
            $('#dataTable').empty();
        }

        let user = JSON.parse(sessionStorage.getItem('user'))

        let perfil = user.perfil

        if (perfil !== 1) {
            $(document).ready(function () {
                $("#dataTable").DataTable({
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Tipo" },
                        { title: "Data de Registro" }
                    ],
                    paging: true,
                    ordering: true,
                    info: true,
                    scrollY: false,
                    scrollCollapse: true,
                    scrollX: true,
                    autoHeight: true,
                    pagingType: "numbers",
                    searchPanes: true,
                    fixedHeader: false
                }
                )
            })
        } else {
            $(document).ready(function () {
                $("#dataTable").DataTable({
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Tipo" },
                        { title: "Data de Registro" }
                    ],
                    paging: true,
                    ordering: true,
                    info: true,
                    scrollY: false,
                    scrollCollapse: true,
                    scrollX: true,
                    autoHeight: true,
                    pagingType: "numbers",
                    searchPanes: true,
                    fixedHeader: false,
                    dom: "<'row'<'col-md-6'l><'col-md-6'f>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6'p>>" +
                        "<'row'<'col-sm-12'B>>",
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ]
                }
                )
            })
        }

        loading.innerHTML = " "

    } catch (error) {

    }
})


btnFinanceiro.addEventListener('click', async (event) => {
    event.preventDefault()
    cardHistory.style.display = 'none';
    let loading = document.querySelector('[data-loading]')
    loading.innerHTML = `
<div class="d-flex justify-content-center align-items-center spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
`

    try {
        const btn = event.currentTarget
        let title = document.querySelector('[data-title]')
        let type = 2
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')

        title.innerHTML = "Financeiro"
        powerbi.innerHTML = " "
        modal.innerHTML = " "
        const data = await Service.listBiUser(type)

        let dtview = [];

        data.forEach(powerbi => {
            const field = View.listPowerBi(powerbi)
            dtview.push(field)
        });

        if ($.fn.DataTable.isDataTable('#dataTable')) {
            $('#dataTable').dataTable().fnClearTable();
            $('#dataTable').dataTable().fnDestroy();
            $('#dataTable').empty();
        }

        let user = JSON.parse(sessionStorage.getItem('user'))

        let perfil = user.perfil

        if (perfil !== 1) {
            $(document).ready(function () {
                $("#dataTable").DataTable({
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Tipo" },
                        { title: "Data de Registro" }
                    ],
                    paging: true,
                    ordering: true,
                    info: true,
                    scrollY: false,
                    scrollCollapse: true,
                    scrollX: true,
                    autoHeight: true,
                    pagingType: "numbers",
                    searchPanes: true,
                    fixedHeader: false
                }
                )
            })
        } else {
            $(document).ready(function () {
                $("#dataTable").DataTable({
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Tipo" },
                        { title: "Data de Registro" }
                    ],
                    paging: true,
                    ordering: true,
                    info: true,
                    scrollY: false,
                    scrollCollapse: true,
                    scrollX: true,
                    autoHeight: true,
                    pagingType: "numbers",
                    searchPanes: true,
                    fixedHeader: false,
                    dom: "<'row'<'col-md-6'l><'col-md-6'f>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6'p>>" +
                        "<'row'<'col-sm-12'B>>",
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ]
                }
                )
            })
        }
        loading.innerHTML = " "

    } catch (error) {

    }
})


btnCorteVinco.addEventListener('click', async (event) => {
    event.preventDefault()
    cardHistory.style.display = 'none';
    let loading = document.querySelector('[data-loading]')
    loading.innerHTML = `
<div class="d-flex justify-content-center align-items-center spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
`

    try {
        const btn = event.currentTarget
        let title = document.querySelector('[data-title]')
        let type = 2
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')

        title.innerHTML = "Lista de Corte e Vinco"
        powerbi.innerHTML = " "
        modal.innerHTML = " "
        const data = await Service.listBiUser(type)

        let dtview = [];

        data.forEach(powerbi => {
            const field = View.listPowerBi(powerbi)
            dtview.push(field)
        });

        if ($.fn.DataTable.isDataTable('#dataTable')) {
            $('#dataTable').dataTable().fnClearTable();
            $('#dataTable').dataTable().fnDestroy();
            $('#dataTable').empty();
        }

        let user = JSON.parse(sessionStorage.getItem('user'))

        let perfil = user.perfil

        if (perfil !== 1) {
            $(document).ready(function () {
                $("#dataTable").DataTable({
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Tipo" },
                        { title: "Data de Registro" }
                    ],
                    paging: true,
                    ordering: true,
                    info: true,
                    scrollY: false,
                    scrollCollapse: true,
                    scrollX: true,
                    autoHeight: true,
                    pagingType: "numbers",
                    searchPanes: true,
                    fixedHeader: false
                }
                )
            })
        } else {
            $(document).ready(function () {
                $("#dataTable").DataTable({
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Tipo" },
                        { title: "Data de Registro" }
                    ],
                    paging: true,
                    ordering: true,
                    info: true,
                    scrollY: false,
                    scrollCollapse: true,
                    scrollX: true,
                    autoHeight: true,
                    pagingType: "numbers",
                    searchPanes: true,
                    fixedHeader: false,
                    dom: "<'row'<'col-md-6'l><'col-md-6'f>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6'p>>" +
                        "<'row'<'col-sm-12'B>>",
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ]
                }
                )
            })
        }
        loading.innerHTML = " "

    } catch (error) {

    }
})

btnCartuchos.addEventListener('click', async (event) => {
    event.preventDefault()
    cardHistory.style.display = 'none';
    let loading = document.querySelector('[data-loading]')
    loading.innerHTML = `
<div class="d-flex justify-content-center align-items-center spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
`

    try {
        const btn = event.currentTarget
        let title = document.querySelector('[data-title]')
        let type = 2
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')

        title.innerHTML = "Lista de Cartucheiras"
        powerbi.innerHTML = " "
        modal.innerHTML = " "
        const data = await Service.listBiUser(type)

        let dtview = [];

        data.forEach(powerbi => {
            const field = View.listPowerBi(powerbi)
            dtview.push(field)
        });

        if ($.fn.DataTable.isDataTable('#dataTable')) {
            $('#dataTable').dataTable().fnClearTable();
            $('#dataTable').dataTable().fnDestroy();
            $('#dataTable').empty();
        }

        let user = JSON.parse(sessionStorage.getItem('user'))

        let perfil = user.perfil

        if (perfil !== 1) {
            $(document).ready(function () {
                $("#dataTable").DataTable({
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Tipo" },
                        { title: "Data de Registro" }
                    ],
                    paging: true,
                    ordering: true,
                    info: true,
                    scrollY: false,
                    scrollCollapse: true,
                    scrollX: true,
                    autoHeight: true,
                    pagingType: "numbers",
                    searchPanes: true,
                    fixedHeader: false
                }
                )
            })
        } else {
            $(document).ready(function () {
                $("#dataTable").DataTable({
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Tipo" },
                        { title: "Data de Registro" }
                    ],
                    paging: true,
                    ordering: true,
                    info: true,
                    scrollY: false,
                    scrollCollapse: true,
                    scrollX: true,
                    autoHeight: true,
                    pagingType: "numbers",
                    searchPanes: true,
                    fixedHeader: false,
                    dom: "<'row'<'col-md-6'l><'col-md-6'f>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6'p>>" +
                        "<'row'<'col-sm-12'B>>",
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ]
                }
                )
            })
        }
        loading.innerHTML = " "

    } catch (error) {

    }
})

btnImpressoras.addEventListener('click', async (event) => {
    event.preventDefault()
    cardHistory.style.display = 'none';
    let loading = document.querySelector('[data-loading]')
    loading.innerHTML = `
<div class="d-flex justify-content-center align-items-center spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
`

    try {
        const btn = event.currentTarget
        let title = document.querySelector('[data-title]')
        let type = 2
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')

        title.innerHTML = "Lista de Impressoras"
        powerbi.innerHTML = " "
        modal.innerHTML = " "
        const data = await Service.listBiUser(type)

        let dtview = [];

        data.forEach(powerbi => {
            const field = View.listPowerBi(powerbi)
            dtview.push(field)
        });

        if ($.fn.DataTable.isDataTable('#dataTable')) {
            $('#dataTable').dataTable().fnClearTable();
            $('#dataTable').dataTable().fnDestroy();
            $('#dataTable').empty();
        }

        let user = JSON.parse(sessionStorage.getItem('user'))

        let perfil = user.perfil

        if (perfil !== 1) {
            $(document).ready(function () {
                $("#dataTable").DataTable({
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Tipo" },
                        { title: "Data de Registro" }
                    ],
                    paging: true,
                    ordering: true,
                    info: true,
                    scrollY: false,
                    scrollCollapse: true,
                    scrollX: true,
                    autoHeight: true,
                    pagingType: "numbers",
                    searchPanes: true,
                    fixedHeader: false
                }
                )
            })
        } else {
            $(document).ready(function () {
                $("#dataTable").DataTable({
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Tipo" },
                        { title: "Data de Registro" }
                    ],
                    paging: true,
                    ordering: true,
                    info: true,
                    scrollY: false,
                    scrollCollapse: true,
                    scrollX: true,
                    autoHeight: true,
                    pagingType: "numbers",
                    searchPanes: true,
                    fixedHeader: false,
                    dom: "<'row'<'col-md-6'l><'col-md-6'f>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6'p>>" +
                        "<'row'<'col-sm-12'B>>",
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ]
                }
                )
            })
        }
        loading.innerHTML = " "

    } catch (error) {

    }
})

btnChao.addEventListener('click', async (event) => {
    event.preventDefault()
    cardHistory.style.display = 'none';
    let loading = document.querySelector('[data-loading]')
    loading.innerHTML = `
<div class="d-flex justify-content-center align-items-center spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
`

    try {
        const btn = event.currentTarget
        let title = document.querySelector('[data-title]')
        let type = 1
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')

        powerbi.innerHTML = " "
        modal.innerHTML = " "

        View.directory(title, powerbi)
        
        const filecontent = document.getElementById('filecontent')
        filecontent.innerHTML = ``

        title.innerHTML = "Visão de Chão de Fábrica"
   
        const data = await Service.listBiUser(type)

        data.forEach(obj => {
            filecontent.appendChild(View.iconBi(obj))
        });

        if ($.fn.DataTable.isDataTable('#dataTable')) {
            $('#dataTable').dataTable().fnClearTable();
            $('#dataTable').dataTable().fnDestroy();
            $('#dataTable').empty();
        }
        setInterval(function(){ 
            $('.logoBar').hide() 
        }, 30000);

        loading.innerHTML = " "
    } catch (error) {
        console.log(error);
    }
})

async function listBiUser(event) {
    event.preventDefault()
    let loading = document.querySelector('[data-loading]')
    loading.innerHTML = `
<div class="d-flex justify-content-center align-items-center spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
`
    try {

        const btn = event.currentTarget
        const id = btn.getAttribute("data-id")
        const name = btn.getAttribute("data-name")
        let title = document.querySelector('[data-title]')
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')

        title.innerHTML = `Lista de Relatórios - ${name}`
        powerbi.innerHTML = " "
        modal.innerHTML = " "
        const data = await Service.listUser(id)

        let dtview = [];

        data.forEach(powerbi => {
            const field = View.listPowerBi(powerbi)
            dtview.push(field)
        });

        if ($.fn.DataTable.isDataTable('#dataTable')) {
            $('#dataTable').dataTable().fnClearTable();
            $('#dataTable').dataTable().fnDestroy();
            $('#dataTable').empty();
        }

        let user = JSON.parse(sessionStorage.getItem('user'))

        let perfil = user.perfil

        if (perfil !== 1) {
            $(document).ready(function () {
                $("#dataTable").DataTable({
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Tipo" },
                        { title: "Data de Registro" }
                    ],
                    paging: true,
                    ordering: true,
                    info: true,
                    scrollY: false,
                    scrollCollapse: true,
                    scrollX: true,
                    autoHeight: true,
                    pagingType: "numbers",
                    searchPanes: true,
                    fixedHeader: false
                }
                )
            })
        } else {
            $(document).ready(function () {
                $("#dataTable").DataTable({
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Tipo" },
                        { title: "Data de Registro" }
                    ],
                    paging: true,
                    ordering: true,
                    info: true,
                    scrollY: false,
                    scrollCollapse: true,
                    scrollX: true,
                    autoHeight: true,
                    pagingType: "numbers",
                    searchPanes: true,
                    fixedHeader: false,
                    dom: "<'row'<'col-md-6'l><'col-md-6'f>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6'p>>" +
                        "<'row'<'col-sm-12'B>>",
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ]
                }
                )
            })
        }

        modal.appendChild(View.showModalDelete())
        modal.appendChild(View.showModalEdit())
        loading.innerHTML = " "

    } catch (error) {

    }

}

function viewBi(event) {
    event.preventDefault()
    let loading = document.querySelector('[data-loading]')
    loading.innerHTML = `
<div class="spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
`
    const btn = event.currentTarget
    const url = btn.getAttribute("data-url")
    let title = document.querySelector('[data-title]')
    let powerbi = document.querySelector('[data-powerbi]')
    let description = btn.getAttribute("data-title")

    title.innerHTML = " "
    loading.innerHTML = " "
    powerbi.innerHTML = `   
    <iframe width="1140" height="600" src="${url}" frameborder="0" allowFullScreen="true"></iframe>`

    ServiceHistory.insertHistory(`Acesso realizado á impressora - ${description}`)
}

async function editBi(event) {
    event.preventDefault()

    const btn = event.currentTarget
    const title = btn.getAttribute("data-title")
    const url = btn.getAttribute("data-url")
    const type = btn.getAttribute("data-type")
    let modal = document.querySelector('[data-modal]')

    modal.append(View.showModalEdit(title, url, type))

    const modalEdit = document.getElementById('editpowerbi')
    modalEdit.show()
}

async function addPowerBi(event) {
    try {
        event.preventDefault()
        $('#addpowerbi').modal('hide')

        let loading = document.querySelector('[data-loading]')
        loading.innerHTML = `
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        `

        const btn = event.currentTarget
        const id_login = btn.getAttribute("data-id_login")
        const title = btn.form.title.value
        const url = btn.form.url.value
        const type = btn.form.type.value

        const powerbi = {
            title: title,
            url: url,
            type: type,
            id_login: id_login
        }

        await Service.insertBi(powerbi)

        loading.innerHTML = " "
        alert('PowerBI adicionado com sucesso!')
    } catch (error) {
        loading.innerHTML = " "
        alert('Ops, algo de errado aconteceu :/ \nCaso o erro persista comunique o T.I!')
    }
}

async function modalEditBi(event) {
    try {
        const btn = event.currentTarget
        const id = btn.getAttribute("data-id_powerbi")
        const url = btn.getAttribute("data-url")
        const title = btn.getAttribute("data-title")
        const type = btn.getAttribute("data-type")

        $("#ideditpowerbi").attr("data-id_powerbi", id);
        $("#urledit").val(url);
        $("#titleedit").val(title);
        $("#typeedit").val(type);
    } catch (error) {

    }
}

async function editPowerBi(event) {
    event.preventDefault()
    $('#editpowerbi').modal('hide')
    let loading = document.querySelector('[data-loading]')
    loading.innerHTML = `
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    `
    try {

        const btn = event.currentTarget
        const id = btn.getAttribute("data-id_powerbi")
        const title = btn.form.title.value
        const url = btn.form.url.value
        const type = btn.form.type.value

        const powerbi = {
            id_powerbi: id,
            title: title,
            url: url,
            type: type
        }

        await Service.updateBi(powerbi, id)
        loading.innerHTML = " "
        listFunction()
        alert('PowerBi atualizado com sucesso!')
    } catch (error) {
        loading.innerHTML = " "
        alert('Ops, algo de errado aconteceu :/ \nCaso o erro persista comunique o T.I!')
    }
}

async function modalDeleteBi(event) {
    event.preventDefault()

    try {
        const btn = event.currentTarget
        const id = btn.getAttribute("data-id_powerbi")
        $("#iddeletepowerbi").attr("data-id_powerbi", id);

    } catch (error) {
    }
}

async function deletePowerBi(event) {
    event.preventDefault()
    $('#deletepowerbi').modal('hide')
    let loading = document.querySelector('[data-loading]')
    loading.innerHTML = `
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    `
    try {
        const btn = event.currentTarget
        const id = btn.getAttribute("data-id_powerbi")

        await Service.deleteBi(id)

        loading.innerHTML = " "
        listFunction()
        alert('PowerBi excluido com sucesso!')
    } catch (error) {
        loading.innerHTML = " "
        alert('Ops, algo de errado aconteceu :/ \nCaso o erro persista comunique o T.I!')
    }
}



async function listFunction() {

    try {

        const btn = event.currentTarget
        const id = btn.getAttribute("data-id")
        const name = btn.getAttribute("data-name")
        let title = document.querySelector('[data-title]')
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')

        title.innerHTML = `Lista de Relatórios - ${name}`
        powerbi.innerHTML = " "
        modal.innerHTML = " "
        const data = await Service.listUser(id)

        let dtview = [];

        data.forEach(powerbi => {
            const field = View.listPowerBi(powerbi)
            dtview.push(field)
        });

        if ($.fn.DataTable.isDataTable('#dataTable')) {
            $('#dataTable').dataTable().fnClearTable();
            $('#dataTable').dataTable().fnDestroy();
            $('#dataTable').empty();
        }

        let user = JSON.parse(sessionStorage.getItem('user'))

        let perfil = user.perfil

        if (perfil !== 1) {
            $(document).ready(function () {
                $("#dataTable").DataTable({
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Tipo" },
                        { title: "Data de Registro" }
                    ],
                    paging: true,
                    ordering: true,
                    info: true,
                    scrollY: false,
                    scrollCollapse: true,
                    scrollX: true,
                    autoHeight: true,
                    pagingType: "numbers",
                    searchPanes: true,
                    fixedHeader: false
                }
                )
            })
        } else {
            $(document).ready(function () {
                $("#dataTable").DataTable({
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Tipo" },
                        { title: "Data de Registro" }
                    ],
                    paging: true,
                    ordering: true,
                    info: true,
                    scrollY: false,
                    scrollCollapse: true,
                    scrollX: true,
                    autoHeight: true,
                    pagingType: "numbers",
                    searchPanes: true,
                    fixedHeader: false,
                    dom: "<'row'<'col-md-6'l><'col-md-6'f>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6'p>>" +
                        "<'row'<'col-sm-12'B>>",
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ]
                }
                )
            })
        }


        modal.appendChild(View.showModalDelete())
        modal.appendChild(View.showModalEdit())
    } catch (error) {

    }

}