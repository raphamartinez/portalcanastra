import { Connection } from '../services/connection.js'

const btn = document.querySelector('[data-history]')
const cardHistory = document.querySelector('[data-card]')


btn.addEventListener('click', async (event) => {
    event.preventDefault()
    cardHistory.style.display = 'none';
    let loading = document.querySelector('[data-loading]')
    loading.innerHTML = `
<div class="spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
`
    try {
        let title = document.querySelector('[data-title]')
        let powerbi = document.querySelector('[data-powerbi]')

        title.innerHTML = "Histórico"
        powerbi.innerHTML = " "
        loading.innerHTML = " "
        const data = await Connection.noBody('historys','GET')
        var dtview = data.map(doc => Object.values(doc));

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
                        { title: "Id" },
                        { title: "Descripción" },
                        { title: "Data de Registro" },
                        { title: "Usuario" }
                    ],
                    order: [[0, "desc"]],
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
                        { title: "Id" },
                        { title: "Descripción" },
                        { title: "Data de Registro" },
                        { title: "Usuario" }
                    ],
                    order: [[0, "desc"]],
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
            });
        }
    } catch (error) {

    }
})
