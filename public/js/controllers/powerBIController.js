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

        modal.appendChild(View.showModalInsert())     
        modal.appendChild(View.showModalDelete())
        modal.appendChild(View.showModalEdit())
    } catch (error) {

    }

}

window.viewBi = viewBi

function viewBi(event){
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

async function editBi(event){
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

async function addPowerBi(event){
    event.preventDefault()

    const btn = event.currentTarget
    const title = btn.form.title.value
    const url = btn.form.url.value
    const type = btn.form.type.value

    const powerbi = {
        title: title,
        url: url,
        type: type
    }

    const result = await Service.insertBi(powerbi)

    if(result.ok){
        alert('PowerBi agregado con éxito!')
    }else{
        alert('Algo salió mal, informa al sector de TI')
    }
}