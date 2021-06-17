
const newLine = (history) => {
    const line = document.createElement('tr')

    const content =
        ` <th scope="row">${history.dateReg}</th>
        <td>${history.description}</td>
        <td>${history.name}</td>
      </tr>`

    line.innerHTML = content

    return line
}

const header = () => {
    const line = document.createElement('tr')

    const content =
        `
        <th scope="col">Data de Registro</th>
        <th scope="col">Descrição</th>
        <th scope="col">Usuário</th>
    </tr>`
    line.innerHTML = content

    return line
}

export const View = {
    newLine,
    header
}