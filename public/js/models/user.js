
export default () => {

    const formInsert = document.querySelector('[data-form-insert-user]')
    const formUpdate = document.querySelector('[data-form-update-user]')
    const formDelete = document.querySelector('[data-form-delete-user]')
    const formView = document.querySelector('[data-form-view-user]')

    const insert = () => formInsert.addEventListener('submit', (event) => {
        const name = event.target.querySelector('[data-nome]').value
        const perfil = event.target.querySelector('[data-perfil]').value
        const dateBirthday = event.target.querySelector('[data-dateBirthday]').value
        const id_office = event.target.querySelector('[data-id_office]').value

        return { name, perfil, dateBirthday, id_office}
    })

    const update = () => formUpdate.addEventListener('submit', (event) => {
        const name = event.target.querySelector('[data-nome]').value
        const perfil = event.target.querySelector('[data-perfil]').value
        const dateBirthday = event.target.querySelector('[data-dateBirthday]').value
        const id_office = event.target.querySelector('[data-id_office]').value

        return { name, perfil, dateBirthday, id_office}
    })

    const deleted = () => formDelete.addEventListener('submit', (event) => {
        const id_user = event.target.querySelector('[data-id_user]').value

        return id_user
    })

    const view = () => formView.addEventListener('submit', (event) => {
        const id_user = event.target.querySelector('[data-id_user]').value

        return id_user
    })

}