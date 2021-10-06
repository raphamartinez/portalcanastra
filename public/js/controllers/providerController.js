import { Connection } from '../services/connection.js'
import { View } from '../views/providerView.js'

window.onload = async function () {
  let loading = document.querySelector('[data-loading]')
  loading.innerHTML = `
<div class="spinner-border text-danger" role="status">
  <span class="sr-only">Loading...</span>
</div>
`
  const providers = await Connection.noBody('provider', 'GET')
  let data = []

  providers.forEach(obj => {
    const line = [
      `<a data-id="${obj.id}"><i class="fas fa-edit" style="color:#32CD32;"></i></a>
      <a data-id="${obj.id}"><i class="fas fa-trash" style="color:#CC0000;"></i></a>`,
      `${obj.name}`,
      `${obj.salesman}`,
      `${obj.mail}`,
      `${obj.phone}`,
      `${obj.address}`,
      `${obj.ruc}`
    ]

    data.push(line)
  })

  let user = JSON.parse(sessionStorage.getItem('user'))

  listProviders(data)

  let name = user.name.substring(0, (user.name + " ").indexOf(" "))
  let username = document.querySelector('[data-username]')
  username.innerHTML = name
  loading.innerHTML = " "
}



const listProviders = (data) => {

  if ($.fn.DataTable.isDataTable('#dataTable')) {
    $('#dataTable').dataTable().fnClearTable();
    $('#dataTable').dataTable().fnDestroy();
    $('#dataTable').empty();
  }
  console.log(data);
  const table = $("#dataTable").DataTable({
    data: data,
    columns: [
      {
        title: "Opciones",
        className: "finance-control"
      },
      { title: "Nombre" },
      { title: "Vendedor" },
      { title: "Mail" },
      { title: "Teléfono" },
      { title: "Dirección" },
      { title: "RUC" },
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


const modalInsert = document.querySelector('[data-modal-insert]')

modalInsert.addEventListener('click', async (event) => {
  event.preventDefault()

  document.querySelector('[data-modal]').innerHTML = ""
  document.querySelector('[data-modal]').appendChild(View.modalForm())
  $('#register').modal('show')

  const submit = document.querySelector('[data-input-provider]')
  submit.addEventListener('submit', async (event) => {
    event.preventDefault()

    $('#register').modal('hide')

    const date = new Date()

    const provider = {
      name: event.currentTarget.name.value,
      ruc: event.currentTarget.ruc.value,
      phone: event.currentTarget.phone.value,
      salesman: event.currentTarget.salesman.value,
      mail: event.currentTarget.mail.value,
      address: event.currentTarget.address.value,
      date: `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    const obj = await Connection.body(`provider`, { provider }, 'POST')

    const table = $('#dataTable').DataTable();

    let a = `<a data-id="0"><i class="fas fa-edit" style="color:#32CD32;"></i></a>
    <a data-id="0"><i class="fas fa-trash" style="color:#CC0000;"></i></a>`

    const rowNode = table.row.add([a, provider.name, provider.salesman, provider.mail, provider.phone, provider.address, provider.ruc])
      .draw()
      .node();

    $(rowNode)
      .css('color', 'black')
      .animate({ color: '#4e73df' });

    alert(obj.msg)
  })
})

const selectProviders = (providers) => {

  providers.map(provider => {
    const option = document.createElement('option')
    option.value = provider.id
    option.innerHTML = `${provider.name}</option>`
    document.querySelector('[data-providers]').appendChild(option)
  })

}

export const ControllerProvider = {
  selectProviders
}