import { View } from "../views/powerbiView.js"
import { Service } from "../services/powerbiService.js"

const btn = document.getElementById('btnSimpleBi')
const cardHistory = document.querySelector('[data-card]')


btn.addEventListener('click', async (event) => {
    event.preventDefault()
    cardHistory.style.display = 'none';


    try {
        let title = document.querySelector('[data-title]')
        let table = document.querySelector('[data-table]')
        let powerbi = document.querySelector('[data-powerbi]')
        let head = document.querySelector('[data-table-head]')
        let body = document.querySelector('[data-table-body]')


        title.innerHTML = "Informes"
        table.style.display = '';
        head.innerHTML = " "
        body.innerHTML = " "
        powerbi.innerHTML = " "

        const data = await Service.listBiUser()

        head.appendChild(View.header())

        data.forEach(powerbi => {
            body.appendChild(View.listPowerBi(powerbi))
        });

    } catch (error) {

    }
})

window.listBiUser = listBiUser


async function listBiUser(event) {
    event.preventDefault()

    try {

        const btn = event.currentTarget
        const id = btn.getAttribute("data-id")
        const name = btn.getAttribute("data-name")
        let title = document.querySelector('[data-title]')
        let table = document.querySelector('[data-table]')
        let head = document.querySelector('[data-table-head]')
        let body = document.querySelector('[data-table-body]')
        let powerbi = document.querySelector('[data-powerbi]')
        let modal = document.querySelector('[data-modal]')

        title.innerHTML = `Lista de PowerBI - ${name}`
        head.innerHTML = " "
        body.innerHTML = " "
        powerbi.innerHTML = " "
        modal.innerHTML = " "

        const data = await Service.listUser(id)

        head.appendChild(View.header())

        data.forEach(powerbi => {
            body.appendChild(View.listPowerBiAdmin(powerbi))
        });

        modal.appendChild(View.showModalDelete())
        modal.appendChild(View.showModalEdit())
    } catch (error) {

    }

}

window.viewBi = viewBi

function viewBi(event) {
    event.preventDefault()

    const btn = event.currentTarget
    const url = btn.getAttribute("data-url")
    let title = document.querySelector('[data-title]')
    let table = document.querySelector('[data-table]')
    let head = document.querySelector('[data-table-head]')
    let body = document.querySelector('[data-table-body]')
    let powerbi = document.querySelector('[data-powerbi]')

    title.innerHTML = btn.getAttribute("data-title")
    table.style.display = 'none';
    head.innerHTML = " "
    body.innerHTML = " "
    powerbi.innerHTML = `   
    <iframe width="1140" height="600" src="${url}" frameborder="0" allowFullScreen="true"></iframe>`
}

window.editBi = editBi

async function editBi(event) {
    event.preventDefault()

    const btn = event.currentTarget
    const title = btn.getAttribute("data-title")
    const url = btn.getAttribute("data-url")
    const type = btn.getAttribute("data-type")
    let table = document.querySelector('[data-table]')
    let modal = document.querySelector('[data-modal]')
    let body = document.querySelector('[data-table-body]')
    let powerbi = document.querySelector('[data-powerbi]')

    modal.append(View.showModalEdit(title, url, type))

    const modalEdit = document.getElementById('editpowerbi')
    modalEdit.show()
}

window.addPowerBi = addPowerBi

async function addPowerBi(event) {
    try {
        event.preventDefault()

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

        $('#addpowerbi').modal('hide')
        alert('PowerBi agregado con éxito!')
    } catch (error) {
        $('#addpowerbi').modal('hide')
        alert('Algo salió mal, informa al sector de TI')
    }
}

window.modalEditPowerBi = modalEditPowerBi

async function modalEditPowerBi(event) {
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

window.editPowerBi = editPowerBi

async function editPowerBi(event) {
    event.preventDefault()
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
        $('#editpowerbi').modal('hide')
        alert('PowerBi agregado con éxito!')
    } catch (error) {
        $('#editpowerbi').modal('hide')
        alert('Algo salió mal, informa al sector de TI')
    }
}


window.modalDeletePowerBi = modalDeletePowerBi

async function modalDeletePowerBi(event) {
    try {
        const btn = event.currentTarget
        const id = btn.getAttribute("data-id_powerbi")
        $("#iddeletepowerbi").attr("data-id_powerbi", id);

    } catch (error) {
    }
}

window.deletePowerBi = deletePowerBi

async function deletePowerBi(event) {
    event.preventDefault()
    try {
        const btn = event.currentTarget
        const id = btn.getAttribute("data-id_powerbi")

        await Service.deleteBi(id)
        $('#deletepowerbi').modal('hide')
        alert('PowerBi excluido con éxito!')

    } catch (error) {
        $('#deletepowerbi').modal('hide')
        alert('Algo salió mal, informa al sector de TI')
    }
}