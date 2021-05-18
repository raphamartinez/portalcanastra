
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
        <th scope="col">Fecha de Registro</th>
        <th scope="col">Descripción</th>
        <th scope="col">Usuario</th>
    </tr>`
    line.innerHTML = content

    return line
}

export const View = {
    newLine,
    header
}