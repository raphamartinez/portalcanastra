
const showSimplePowerBI = (simpleBI) => {
    simpleBI.innerHTML = `   
    <iframe width="1831" height="400" src="https://app.powerbi.com/reportEmbed?reportId=8deb357b-76b9-4c78-a5ae-fd4b45e8c4a8&autoAuth=true&ctid=7c233ef6-b75d-4d21-8319-f199fda36ea0&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWJyYXppbC1zb3V0aC1iLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D" frameborder="0" allowFullScreen="true"></iframe>`
}


const showPowerBI = (url) => {
    simpleBI.innerHTML = `   
    <iframe class="full" width="1900" height="700"  src="${url}" frameborder="0" allowFullScreen="true"></iframe>`
}

const showModalEdit = () => {
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
                    <option value="2">Cartucheira</option>
                    <option value="3">Corte e Vinco</option>
                    <option value="4">Operacional</option>
                    <option value="5">Financeiro</option>
                    <option value="6">c</option>
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


const listPowerBi = (powerbi, id_login) => {

    const content =[
       `<a data-toggle="popover" title="Visualizar o Relatório" onclick="viewBi(event)" href="" data-id_login="${id_login}" data-title="${powerbi.title}" data-url="${powerbi.url}"><i class="fas fa-eye" style="color:#666600;"></i></a>`,
       `${powerbi.title}`,
       `${powerbi.typedesc}`,
       `${powerbi.dateReg}`,
      ]

    return content
}

const listPowerBiAdmin = (powerbi, id_login) => {

    const content =  [
        `
        <a data-toggle="popover" title="Visualizar o Relatório" onclick="viewBi(event)" href="" data-id_login="${id_login}" data-title="${powerbi.title}" data-url="${powerbi.url}"><i class="fas fa-eye" style="color:#666600;"></i></a>
        <a data-toggle="popover" title="Editar o Relatório" data-toggle="modal" data-target="#editpowerbi" onclick="modalEditBi(event)" href="" data-id_login="${id_login}" data-id_powerbi="${powerbi.id_powerbi}" data-title="${powerbi.title}" data-url="${powerbi.url}" data-type="${powerbi.type}"><i class="fas fa-edit" style="color:#32CD32;"></i></a>
        <a data-toggle="popover" title="Deletar o Relatório" data-toggle="modal" data-target="#deletepowerbi" onclick="modalDeleteBi(event)" href="" data-id_login="${id_login}" data-id_powerbi="${powerbi.id_powerbi}"><i class="fas fa-trash" style="color:#CC0000;"></i></a>
        `,
        `${powerbi.title}`,
        `${powerbi.typedesc}`,
        `${powerbi.dateReg}`,
       ]

    return content
}

const header = () => {
    const line = document.createElement('tr')

    const content =
        `
    <th scope = "col"> Opções</th>
        <th scope="col">Nome</th>
        <th scope="col">Tipo</th>
        <th scope="col">Data de Registro</th>
    </tr>`
    line.innerHTML = content

    return line
}

const iconBi = (obj) => {
    const div = document.createElement('div')

    const content = ` <div class="form-row p-4" id="${obj.id_powerbi}div">
                          <div class="form-group col-md-12">  
                            <a class="abrir" data-id_powerbi="${obj.id_powerbi}" data-datereg="${obj.dateReg}" data-type="${obj.type}" data-url="${obj.url}" data-title="${obj.title}" ><embed id="embed${obj.id_powerbi}" src="${obj.url}" class="thumbnail img-responsive card" frameborder="0" allowFullScreen="true"/></a>
                            <a class="p-1" onclick="viewBi(event)" data-title="${obj.title}" data-url="${obj.url}"><h5>${obj.title}</h5>Visualizar</a>
                        </div>
                        </div>`

    div.innerHTML = content

    return div
}

const directory = (title, div) => {
    const divbtn = document.createElement('div')

    const content = `    <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <div class="col-md-10 text-left">
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Opciones
            </button>
            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                <a id="btnaddfile" data-toggle="modal" data-search="1" data-target="#modalAddFile" onclick="modalAddFile(event)" class="dropdown-item"><i class="fa fa-plus"></i> Nuevo Archivo</a>
                <a id="btnaddoffice" data-toggle="modal" data-search="1" data-target="#modalAddOffice" onclick="modalAddOffice(event)" class="dropdown-item"><i class="fab fa-microsoft"></i> Nuevo Office</a>
            </div>
        </div>
        <button id="searchblock" data-search="1" type="button" onclick="modalsearch(event)" class="btn btn-success">
        Buscar Archivos
        </button>
        <button id="searchline" data-search="2" type="button" onclick="modalsearch(event)" class="btn btn-success">
        Buscar Archivos
        </button>
    </div>
    <div class="col-md-2 text-right">
    <button id="listblock" onclick="listblock(event)" class="btn btn-info"><i class="fas fa-table"></i></button>
    <button id="listline" onclick="listLine(event)" class="btn btn-secondary"><i class="fas fa-list"></i></button>
    </div>
</div>`

    divbtn.innerHTML = content
    title.appendChild(divbtn)

    div.innerHTML = ` 
    <div class="col-md-12">
    <div class="card shadow mb-3 responsive" >
        <div class="card-header"><strong>Repositorio</strong></div>
                        <div class="card-body">
                                <div id="filecontent" class="form-row col-md-12">
                            </div>
                        </div>
                    </div>
                </div>
                </div>`

}

const headerMenu= () => {
    const divbtn = document.createElement('div')

    const content = `    <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <div class="col-md-12 text-left">
        <button id="newuser" type="button" onclick="menu(event)" class="btn btn-success">
        Voltar ao Gerenciamento
        </button>
    </div>
</div>`

    divbtn.innerHTML = content
    title.appendChild(divbtn)

}

export const View = {
    iconBi,
    showSimplePowerBI,
    showPowerBI,
    listPowerBi,
    listPowerBiAdmin,
    showModalEdit,
    showModalDelete,
    header,
    directory,
    headerMenu
}