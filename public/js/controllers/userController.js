import { View } from "../views/userView.js"
import { Service } from "../services/userService.js"

const btn = document.querySelector('[data-btn-users]')
const create = document.querySelector('[data-btn-create]')
const cardHistory = document.querySelector('[data-card]')

create.addEventListener('click', async (event) => {
    event.preventDefault()
    cardHistory.style.display = 'none';

    try {
        let title = document.querySelector('[data-title]')
        let table = document.querySelector('[data-table]')
        let powerbi = document.querySelector('[data-powerbi]')
        let head = document.querySelector('[data-table-head]')
        let body = document.querySelector('[data-table-body]')
        let modal = document.querySelector('[data-modal]')


        title.innerHTML = "Crear nuevo usuario"
        table.style.display = ''
        head.innerHTML = " "
        body.innerHTML = " "
        powerbi.innerHTML = " "
        modal.innerHTML = " "

        const offices = await Service.listOffice()

        head.appendChild(View.createUser())

        const divoffice = document.getElementById('office')

        offices.forEach(office => {
            divoffice.appendChild(View.listOffice(office))
        });


    } catch (error) {

    }
})


btn.addEventListener('click', async (event) => {
    event.preventDefault()
    cardHistory.style.display = 'none';

    try {
        let title = document.querySelector('[data-title]')
        let table = document.querySelector('[data-table]')
        let powerbi = document.querySelector('[data-powerbi]')
        let head = document.querySelector('[data-table-head]')
        let body = document.querySelector('[data-table-body]')
        let modal = document.querySelector('[data-modal]')


        title.innerHTML = "Lista de Usuarios"
        table.style.display = ''
        head.innerHTML = " "
        body.innerHTML = " "
        powerbi.innerHTML = " "
        modal.innerHTML = ""

        const data = await Service.listUsers()
        const offices = await Service.listOffice()


        head.appendChild(View.header())

        data.forEach(user => {
            body.appendChild(View.showTable(user))
        });


        modal.appendChild(View.showModalInsert())
        modal.appendChild(View.showModalDelete())
        modal.appendChild(View.showModalEdit())
        modal.appendChild(View.showModalPbiInsert())

        const divofficeedit = document.getElementById('officeedit')
        const divofficeinsert = document.getElementById('officeinsert')

        offices.forEach(office => {
            divofficeedit.appendChild(View.listOffice(office))
        });

        offices.forEach(office => {
            divofficeinsert.appendChild(View.listOffice(office))
        });

    } catch (error) {

    }
})

window.editUser = editUser


async function editUser(event) {

    try {
        const btn = event.currentTarget
        const id = btn.getAttribute("data-id")
        const name = btn.getAttribute("data-name")
        const dateBirthday = btn.getAttribute("data-dateBirthday")
        const perfil = btn.getAttribute("data-perfil")
        const office = btn.getAttribute("data-office")
        const mail = btn.getAttribute("data-mail")



        $("#iddbtninsertuser").attr("data-id_user", id);
        $("#nameedit").val(name);
        $("#perfiledit").val(perfil);
        $("#officeedit").val(office);
        $("#mailedit").val(mail);

    } catch (error) {

    }

}

window.deleteUser = deleteUser

async function deleteUser(event) {

    try {
        const btn = event.currentTarget
        const id = btn.getAttribute("data-id")
        $("#iddbtndeleteuser").attr("data-id_user", id);

    } catch (error) {

    }

}


window.createUser = createUser

async function createUser(event) {

    try {
        const btn = event.currentTarget
        const name = btn['name'].value
        const dateBirthday = btn['dateBirthday'].value
        const perfil = btn['perfil'].value
        const id_office = btn['office'].value
        const mail = btn['mail'].value
        const password = btn['password'].value

        const user = {
            name: name,
            dateBirthday: dateBirthday,
            perfil: perfil,
            office: {
                id_office: id_office
            },
            login: {
                mail: mail,
                password: password
            }
        }

        await Service.insertUser(user)
        alert('Usuario agregado con éxito!')
    } catch (error) {
        alert('Usuario agregado con éxito!')
    }
}


