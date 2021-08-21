import { View } from "../views/userView.js"
import { Connection } from '../services/connection.js'

const cardHistory = document.querySelector('[data-card]')



window.addModalPowerBi = addModalPowerBi

async function addModalPowerBi(event) {
    event.preventDefault()

    try {
        let modal = document.querySelector('[data-modal]')
        modal.innerHTML = ``

        modal.appendChild(View.showModalPbiInsert())

        const btn = event.currentTarget
        const id_login = btn.getAttribute("data-id_login")
        $("#idinsertnewbi").attr("data-id_login", id_login)

        $('#addpowerbi').modal('show')
    } catch (error) {
        $('#addpowerbi').modal('hide')
    }
}




window.editUser = editUser

async function editUser(event) {
    event.preventDefault()
    $('#edituser').modal('hide')

    let loading = document.querySelector('[data-loading]')
    loading.innerHTML = `
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    `
    try {

        const btn = event.currentTarget
        const id_user = btn.getAttribute("data-id_user")
        const id_login = btn.getAttribute("data-id_login")
        const name = btn.form.name.value
        const perfil = btn.form.perfil.value
        const mail = btn.form.mail.value

        const user = {
            id_user: id_user,
            id_login: id_login,
            name: name,
            perfil: perfil,
            mail: mail
        }

        await Connection.body(`user/${id_user}`, {user: user}, 'PUT')

        loading.innerHTML = " "
        listUsers()
    } catch (error) {
        loading.innerHTML = " "
        alert('Ops, algo de errado aconteceu :/ \nCaso o erro persista comunique o T.I!')
    }
}

window.modalEditUser = modalEditUser

async function modalEditUser(event) {
    event.preventDefault()
    try {
        let modal = document.querySelector('[data-modal]')
        modal.innerHTML = ``

        modal.appendChild(View.showModalEdit())

        const btn = event.currentTarget
        const id_user = btn.getAttribute("data-id_user")
        const id_login = btn.getAttribute("data-id_login")
        const name = btn.getAttribute("data-name")
        const perfil = btn.getAttribute("data-perfil")
        const mail = btn.getAttribute("data-mail")



        $("#iddbtnedituser").attr("data-id_user", id_user);
        $("#iddbtnedituser").attr("data-id_login", id_login);
        $("#nameedit").val(name);
        $("#perfiledit").val(perfil);
        $("#mailedit").val(mail);
        $('#edituser').modal('show')
    } catch (error) {
        $('#edituser').modal('hide')
    }
}

window.deleteUser = deleteUser

async function deleteUser(event) {
    event.preventDefault()
    $('#deleteuser').modal('hide')

    let loading = document.querySelector('[data-loading]')
    loading.innerHTML = `
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    `
    try {

        const form = event.currentTarget
        const id_user = form.getAttribute("data-id_user")

        await Connection.noBody(`user/${id_user}`, 'DELETE')

        loading.innerHTML = " "
        listUsersFunction()
        alert('Usuário excluído com sucesso!')

    } catch (error) {
        loading.innerHTML = " "
        alert('Ops, algo de errado aconteceu :/ \nCaso o erro persista comunique o T.I!')

    }

}


window.modalDeleteUser = modalDeleteUser

async function modalDeleteUser(event) {
    event.preventDefault()
    try {
        let modal = document.querySelector('[data-modal]')
        modal.innerHTML = ``

        modal.appendChild(View.showModalDelete())

        const btn = event.currentTarget
        const id = btn.getAttribute("data-id")
        $("#iddbtndeleteuser").attr("data-id_user", id);
        $('#deleteuser').modal('show')
    } catch (error) {
    }
}


window.createUser = createUser

async function createUser(event) {
    event.preventDefault()
    $('#insertuser').modal('hide')

    let loading = document.querySelector('[data-loading]')
    loading.innerHTML = `
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    `
    let modal = document.querySelector('[data-modal]')
    modal.innerHTML = ``

    try {

        const body = document.querySelector('[data-table-body]')
        const btn = event.currentTarget
        const name = btn['name'].value
        const perfil = btn['perfil'].value
        const mail = btn['mail'].value
        const password = btn['password'].value

        const user = {
            name: name,
            perfil: perfil,
            login: {
                mail: mail,
                password: password
            },
            dateReg: Date.now()
        }

        await Connection.body('user', {user: user}, 'POST')

        loading.innerHTML = " "
        alert('Usuário adicionado com sucesso!')

        await listUsers()
    } catch (error) {
        loading.innerHTML = " "
        alert(error)
    }
}

window.listUsers = listUsers
async function listUsers() {
    let loading = document.querySelector('[data-loading]')
    loading.innerHTML = `
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    `
    try {
        let title = document.querySelector('[data-title]')
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')


        title.innerHTML = "Gerenciamento"
        powerbi.innerHTML = " "
        modal.innerHTML = ""

        View.headerNewUser(title)

        const data = await Connection.noBody('users','GET')

        let dtview = [];

        data.forEach(user => {
            const field = View.showTable(user)
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
                        { title: "Perfil" },
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
                    destroy: true,
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Perfil" },
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


        modal.appendChild(View.showModalInsert())
        modal.appendChild(View.showModalDelete())
        modal.appendChild(View.showModalEdit())
        modal.appendChild(View.showModalPbiInsert())

        loading.innerHTML = " "
    } catch (error) {
        loading.innerHTML = " "
        alert(error)
    }
}


const config = document.querySelector('[data-config]')


config.addEventListener('click', async (event) => {
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
        let modal = document.querySelector('[data-modal]')


        title.innerHTML = "Gerenciamento"
        powerbi.innerHTML = " "
        modal.innerHTML = ""

        const data = await Connection.noBody('users','GET')

        let dtview = [];

        View.headerNewUser(title)

        data.forEach(user => {
            const field = View.showTable(user)
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
                        { title: "Perfil" },
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
                    destroy: true,
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Perfil" },
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



        modal.appendChild(View.showModalInsert())
        modal.appendChild(View.showModalDelete())
        modal.appendChild(View.showModalEdit())
        modal.appendChild(View.showModalPbiInsert())

        loading.innerHTML = " "
    } catch (error) {
        loading.innerHTML = " "
        alert('Ops, algo de errado aconteceu :/ \nCaso o erro persista comunique o T.I!')
    }
})


async function listUsersFunction() {

    try {
        let title = document.querySelector('[data-title]')
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')


        title.innerHTML = "Gerenciamento"
        powerbi.innerHTML = " "
        modal.innerHTML = ""

        View.headerNewUser(title)

        const data = await Connection.noBody('users','GET')

        let dtview = [];

        data.forEach(user => {
            const field = View.showTable(user)
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
                        { title: "Perfil" },
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
                    destroy: true,
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Perfil" },
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


        modal.appendChild(View.showModalInsert())
        modal.appendChild(View.showModalDelete())
        modal.appendChild(View.showModalEdit())
        modal.appendChild(View.showModalPbiInsert())

    } catch (error) {
        alert(error)
    }
}


window.modalnewuser = modalnewuser

function modalnewuser(event) {
    event.preventDefault()

    let modal = document.querySelector('[data-modal]')
    modal.innerHTML = ``

    modal.appendChild(View.showModalInsert())

    $('#insertuser').modal('show')
}

window.menu = menu
async function menu(event) {
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
        let modal = document.querySelector('[data-modal]')


        title.innerHTML = "Gerenciamento"
        powerbi.innerHTML = " "
        modal.innerHTML = ""

        const data = await Connection.noBody('users','GET')
        
        let dtview = [];

        View.headerNewUser(title)

        data.forEach(user => {
            const field = View.showTable(user)
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
                        { title: "Perfil" },
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
                    destroy: true,
                    data: dtview,
                    columns: [
                        { title: "Opções" },
                        { title: "Nome" },
                        { title: "Perfil" },
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



        modal.appendChild(View.showModalInsert())
        modal.appendChild(View.showModalDelete())
        modal.appendChild(View.showModalEdit())
        modal.appendChild(View.showModalPbiInsert())

        loading.innerHTML = " "
    } catch (error) {
        loading.innerHTML = " "
        alert('Ops, algo de errado aconteceu :/ \nCaso o erro persista comunique o T.I!')
    }
}