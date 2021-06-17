
const showSimplePowerBI = (simpleBI) => {
    simpleBI.innerHTML = `   
    <iframe width="1831" height="400" src="https://app.powerbi.com/reportEmbed?reportId=8deb357b-76b9-4c78-a5ae-fd4b45e8c4a8&autoAuth=true&ctid=7c233ef6-b75d-4d21-8319-f199fda36ea0&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWJyYXppbC1zb3V0aC1iLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D" frameborder="0" allowFullScreen="true"></iframe>`
}


const showPowerBI = (url) => {
    simpleBI.innerHTML = `   
    <iframe class="full" width="1900" height="700"  src="${url}" frameborder="0" allowFullScreen="true"></iframe>`
}

const showModalEdit = (title, type, url) => {
    const div = document.createElement('div')

    const content = `
<div class="modal fade" id="editpowerbi" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Editar</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
            </button>
        </div>
        <form>
            <div class="modal-body">
                <div class="form-row">
                <div class="form-group col-md-6">
                    <input type="text" placeholder="Título" class="form-control" name="title" id="titleedit" required>
                    </div> 
                    <div class="form-group col-md-6">
                    <select class="selectpicker form-control" name="type" id="typeedit" required>
                    <option value="" disabled selected>Tipo</option>
                    <option value="1" >Impressora</option>
                    <option value="2">Operacional</option>
                    <option value="3">Financeiro</option>
                    <option value="4">Segurança</option>
                </select>
                </div> 
                <div class="form-group col-md-12">          
                <input type="text" placeholder="Url" class="form-control" name="url" id="urledit" required>
            </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                <button type="submit" name="btn" id="ideditpowerbi" onclick="editPowerBi(event)" class="btn btn-warning"><i class="fas fa-edit"> Confirmar</i></button>   
            </div>
        </form>
    </div>
</div>
</div>

`
    div.innerHTML = content

    return div
}

const showModalDelete = () => {
    const div = document.createElement('div')

    const content = `
    <div class="modal fade" id="deletepowerbi" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Deseja excluir esse PowerBi?</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">x</span>
                </button>
            </div>
            <form>
                <div class="modal-body">
                    <div class="form-row">
                        <div class=" col-md-12">
                            <h8>Este PowerBi não poderá ser visualizado novamente.</h8>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                    <button type="submit" name="btn" onclick="deletePowerBi(event)" id="iddeletepowerbi" class="btn btn-danger"><i class="fas fa-times"> Excluir</i></button>   
                </div>
            </form>
        </div>
    </div>
</div>`

    div.innerHTML = content

    return div
}


const listPowerBi = (powerbi) => {
    const line = document.createElement('div')

    const content =
        `
        <iframe class="responsive img-fluid card mh-100" width="450" height="450"  src="${powerbi.url}" frameborder="0" allowFullScreen="true"></iframe>
        <a onclick="viewBi(event)" href="" data-title="${powerbi.title}" data-url="${powerbi.url}"><i class="fas fa-eye" style="color:#666600; font-size: 1rem;"></i></a>
        <a data-toggle="modal" data-target="#editpowerbi" onclick="modalEditBi(event)" href="" data-id_powerbi="${powerbi.id_powerbi}" data-title="${powerbi.title}" data-url="${powerbi.url}" data-type="${powerbi.type}"><i class="fas fa-edit" style="color:#32CD32; font-size: 1rem;"></i></a>
        <a data-toggle="modal" data-target="#deletepowerbi" onclick="modalDeleteBi(event)" href="" data-id_powerbi="${powerbi.id_powerbi}"><i class="fas fa-trash" style="color:#CC0000; font-size: 1rem;"></i></a>
    </div>
    `
    line.innerHTML = content

    return line
}

const listPowerBiAdmin = (powerbi) => {
    const line = document.createElement('tr')

    const content =
        `
        <td>
        <a onclick="viewBi(event)" href="" data-title="${powerbi.title}" data-url="${powerbi.url}"><i class="fas fa-eye" style="color:#666600;"></i></a>
        <a data-toggle="modal" data-target="#editpowerbi" onclick="modalEditBi(event)" href="" data-id_powerbi="${powerbi.id_powerbi}" data-title="${powerbi.title}" data-url="${powerbi.url}" data-type="${powerbi.type}"><i class="fas fa-edit" style="color:#32CD32;"></i></a>
        <a data-toggle="modal" data-target="#deletepowerbi" onclick="modalDeleteBi(event)" href="" data-id_powerbi="${powerbi.id_powerbi}"><i class="fas fa-trash" style="color:#CC0000;"></i></a>
        </td>
        <td>${powerbi.title}</td>
        <td>${powerbi.typedesc}</td>
        <td>${powerbi.dateReg}</td>
      </tr>`
    line.innerHTML = content

    return line
}

const header = () => {
    const line = document.createElement('tr')

    const content =
        `
    < th scope = "col" > Opções</th >
        <th scope="col">Nome</th>
        <th scope="col">Tipo</th>
        <th scope="col">Data de Registro</th>
    </tr`
    line.innerHTML = content

    return line
}


export const View = {
    showSimplePowerBI,
    showPowerBI,
    listPowerBi,
    listPowerBiAdmin,
    showModalEdit,
    showModalDelete,
    header
}