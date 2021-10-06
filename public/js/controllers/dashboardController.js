import { Connection } from '../services/connection.js'

window.onload = async function () {
  let loading = document.querySelector('[data-loading]')
  loading.innerHTML = `
<div class="spinner-border text-danger" role="status">
  <span class="sr-only">Loading...</span>
</div>
`
  const cars = await Connection.noBody('dashboard', 'GET')
  let user = JSON.parse(sessionStorage.getItem('user'))

  let dtview = []
  cars.forEach(car => {
    let line = [
      `<a><i class="fas fa-eye" style="color:#000000;"></i></a>`,
      `${car.plate}`,
      `${car.quotations}`,
      `${car.mountPending}`,
      `${car.mountQuoted}`,
      `${car.mountApproved}`,
      `${car.mountPurchased}`
    ]

    dtview.push(line)
  })

  listCars(dtview)

  let name = user.name.substring(0, (user.name + " ").indexOf(" "))
  let username = document.querySelector('[data-username]')
  username.innerHTML = name
  loading.innerHTML = " "
}



const listCars = (data) => {

  if ($.fn.DataTable.isDataTable('#dataTable')) {
    $('#dataTable').dataTable().fnClearTable();
    $('#dataTable').dataTable().fnDestroy();
    $('#dataTable').empty();
  }

  const table = $("#dataTable").DataTable({
    data: data,
    columns: [
      {
        title: "Opciones",
        className: "finance-control"
      },
      { title: "Chapa" },
      { title: "Presupuestos Pendientes" },
      { title: "Pendiente" },
      { title: "Cotizado" },
      { title: "Autorizado compra" },
      { title: "Comprado" },
    ],
    responsive: true,
    paging: true,
    ordering: true,
    info: true,
    scrollY: false,
    scrollCollapse: true,
    scrollX: true,
    autoHeight: true,
    lengthMenu: [[25, 50, 100, 150], [25, 50, 100, 150]],
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
  })


}
