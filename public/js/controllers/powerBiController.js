import { View } from "../views/powerbiView.js"
import { Connection } from '../services/connection.js'

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

            Connection.body('history', { description: `Acesso ao relatório - ${description}` }, 'POST')

            const data = await Connection.noBody(`powerbis/${type}`, 'GET')
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
        let type = 5
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')

        title.innerHTML = "Representantes"
        powerbi.innerHTML = " "
        modal.innerHTML = " "
        const data = await Connection.noBody(`powerbis/${type}`, 'GET')

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
        let type = 4
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')

        title.innerHTML = "Operacional"
        powerbi.innerHTML = " "
        modal.innerHTML = " "
        const data = await Connection.noBody(`powerbis/${type}`, 'GET')

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
        let type = 6
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')

        title.innerHTML = "Vendas"
        powerbi.innerHTML = " "
        modal.innerHTML = " "
        const data = await Connection.noBody(`powerbis/${type}`, 'GET')

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
        let type = 5
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')

        title.innerHTML = "Financeiro"
        powerbi.innerHTML = " "
        modal.innerHTML = " "
        const data = await Connection.noBody(`powerbis/${type}`, 'GET')

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
        let type = 3
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')

        title.innerHTML = "Lista de Corte e Vinco"
        powerbi.innerHTML = " "
        modal.innerHTML = " "
        const data = await Connection.noBody(`powerbis/${type}`, 'GET')

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
        const data = await Connection.noBody(`powerbis/${type}`, 'GET')

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
        let type = 1
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')

        title.innerHTML = "Lista de Impressoras"
        powerbi.innerHTML = " "
        modal.innerHTML = " "

        const data = await Connection.noBody(`powerbis/${type}`, 'GET')

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

        const data = await Connection.noBody(`powerbis`, 'GET')

        data.forEach(obj => {
            filecontent.appendChild(View.iconBi(obj))
        });

        if ($.fn.DataTable.isDataTable('#dataTable')) {
            $('#dataTable').dataTable().fnClearTable();
            $('#dataTable').dataTable().fnDestroy();
            $('#dataTable').empty();
        }
        setInterval(function () {
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
        const id_login = btn.getAttribute("data-id")
        const name = btn.getAttribute("data-name")
        let title = document.querySelector('[data-title]')
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')

        title.innerHTML = `Lista de Relatórios - ${name}`
        title.appendChild(View.backAdmin())
        powerbi.innerHTML = " "
        modal.innerHTML = " "
        const data = await Connection.noBody(`powerbisuser/${id_login}`, 'GET')

        let dtview = [];

        data.forEach(powerbi => {
            const field = View.listPowerBiAdmin(powerbi, id_login)
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

window.listChao = listChao
async function listChao(event){
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

        const data = await Connection.noBody(`powerbis`, 'GET')

        data.forEach(obj => {
            filecontent.appendChild(View.iconBi(obj))
        });

        if ($.fn.DataTable.isDataTable('#dataTable')) {
            $('#dataTable').dataTable().fnClearTable();
            $('#dataTable').dataTable().fnDestroy();
            $('#dataTable').empty();
        }
        setInterval(function () {
            $('.logoBar').hide()
        }, 30000);

        loading.innerHTML = " "
    } catch (error) {
        console.log(error);
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
    const div = document.createElement('div')

    title.innerHTML = ``
    const content = `<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <div class="col-md-12 text-left">
    <button onclick="listChao(event)" type="button" class="btn btn-secondary">
    <i class="fas fa-chevron-left"> Voltar</i>
    </button>
    </div>
    </div>`

    div.innerHTML = content
    title.appendChild(div)
    
    loading.innerHTML = " "
    powerbi.innerHTML = `   
    <iframe width="1140" height="600" src="${url}" frameborder="0" allowFullScreen="true"></iframe>`

    Connection.body(`history`, { description: `Acesso realizado á impressora - ${description}` }, 'POST')

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
        const cod = btn.form.cod.value


        const powerbi = {
            title: title,
            url: url,
            type: type,
            cod: cod,
            id_login: id_login
        }

        await Connection.body(`powerbi`, { powerbi: powerbi }, 'POST')

        loading.innerHTML = " "
        alert('PowerBI adicionado com sucesso!')
    } catch (error) {
        loading.innerHTML = " "
        alert('Ops, algo de errado aconteceu :/ \nCaso o erro persista comunique o T.I!')
    }
}

async function modalEditBi(event) {
    event.preventDefault()
    try {
        let modal = document.querySelector('[data-modal]')
        modal.append(View.showModalEdit())

        const btn = event.currentTarget
        const id_powerbi = btn.getAttribute("data-id_powerbi")
        const url = btn.getAttribute("data-url")
        const title = btn.getAttribute("data-title")
        const type = btn.getAttribute("data-type")
        const id_login = btn.getAttribute("data-id_login")


        $("#ideditpowerbi").attr("data-id_login", id_login);
        $("#ideditpowerbi").attr("data-id_powerbi", id_powerbi);
        $("#urledit").val(url);
        $("#titleedit").val(title);
        $("#typeedit").val(type);
        $('#editpowerbi').modal('show')
    } catch (error) {
        $('#editpowerbi').modal('hide')
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
        const id_powerbi = btn.getAttribute("data-id_powerbi")
        const id_login = btn.getAttribute("data-id_login")

        const title = btn.form.title.value
        const url = btn.form.url.value
        const type = btn.form.type.value

        const powerbi = {
            id_powerbi: id_powerbi,
            title: title,
            url: url,
            type: type
        }

        await Connection.body(`powerbi/${id_powerbi}`, { powerbi: powerbi }, 'PUT')

        loading.innerHTML = " "
        listBiFunction(id_login)
        alert('PowerBi atualizado com sucesso!')
    } catch (error) {
        loading.innerHTML = " "
        alert('Ops, algo de errado aconteceu :/ \nCaso o erro persista comunique o T.I!')
    }
}

async function modalDeleteBi(event) {
    event.preventDefault()

    try {
        let modal = document.querySelector('[data-modal]')
        modal.append(View.showModalDelete())

        const btn = event.currentTarget
        const id_powerbi = btn.getAttribute("data-id_powerbi")
        const id_login = btn.getAttribute("data-id_login")
        $("#iddeletepowerbi").attr("data-id_powerbi", id_powerbi);
        $("#iddeletepowerbi").attr("data-id_login", id_login);
        $('#deletepowerbi').modal('show')
    } catch (error) {
        $('#deletepowerbi').modal('hide')
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
        const id_powerbi = btn.getAttribute("data-id_powerbi")
        const id_login = btn.getAttribute("data-id_login")

        await Connection.noBody(`powerbi/${id_powerbi}`, 'DELETE')

        loading.innerHTML = " "
        listBiFunction(id_login)
        alert('PowerBi excluido com sucesso!')
    } catch (error) {
        loading.innerHTML = " "
        alert('Ops, algo de errado aconteceu :/ \nCaso o erro persista comunique o T.I!')
    }
}

async function listBiFunction(id_login) {
    try {
        const data = await Connection.noBody(`powerbisuser/${id_login}`, 'GET')
        let dtview = [];

        data.forEach(powerbi => {
            const field = View.listPowerBiAdmin(powerbi, id_login)
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

    } catch (error) {

    }

}