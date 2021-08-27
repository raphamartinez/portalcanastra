const showTable = (user) => {
    const content = [
        `    
        <a data-toggle="popover" title="Adicionar novo acesso a relatório" onclick="modalAddPowerbi(event)" data-toggle="modal" data-target="#addpowerbi" href="" data-id_login="${user.id_login}" data-name="${user.name}"><i class="fas fa-plus" style="color:#32CD32;"></i></a>
        <a data-toggle="popover" title="Listar relatórios do usuário" onclick="listBiUser(event)" href="" data-id="${user.id_login}" data-name="${user.name}"><i class="fas fa-file-powerpoint" style="color:#666600;"></i></a>
        <a data-toggle="popover" title="Editar usuário" data-toggle="modal" data-target="#edituser" onclick="modalEditUser(event)" href="" data-id_login="${user.id_login}" data-id_user="${user.id_user}" data-name="${user.name}" data-dateBirthday="${user.dateBirthdayDesc}" data-perfil="${user.perfil}" data-office="${user.id_office}" data-mail="${user.mail}" data-mail="${user.password}"><i class="fas fa-edit" style="color:#3498DB;"></i></a>
        <a data-toggle="popover" title="Desativar usuário" data-toggle="modal" data-target="#deleteuser" onclick="modalDeleteUser(event)" href="" data-id="${user.id_user}" data-name="${user.name}"><i class="fas fa-power-off" style="color:#CC0000;"></i></a>
        <a data-toggle="popover" title="Trocar senha do usuário" data-toggle="modal" data-target="#changepass" onclick="modalChangePass(event)" href="" data-id_user="${user.id_user}" data-name="${user.name}"><i class="fas fa-key" style="color:#DAA520;"></i></a>`,
        `${user.name}`,
        `${user.perfilDesc}`,
        `${user.dateReg}`
    ]

    return content
}

const showModalPbiInsert = () => {
    const div = document.createElement('div')

    const content = `
<div class="modal fade" id="addpowerbi" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Adicionar Relatório</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
            </button>
        </div>
        <form>
            <div class="modal-body">
                <div class="form-row">      
                <div class="form-group col-md-6">
                        <input type="text" placeholder="Título" class="form-control" name="title" id="title" required>
                        </div>  
                        <div class="form-group col-md-6">
                    <select class="selectpicker form-control" name="type" id="type" required>
                    <option value="" disabled selected>Tipo</option>
                    <option value="1" >Impressora</option>
                    <option value="2">Cartucheira</option>
                    <option value="3">Corte e Vinco</option>
                    <option value="4">Operacional</option>
                    <option value="5">Financeiro</option>
                    <option value="6">Vendas</option>
                </select>
                </div>  
                <div class="form-group col-md-6">
                <input type="url" placeholder="Url" class="form-control" name="url" id="url" required>
                </div> 
                <div class="form-group col-md-6">
                <input type="text" placeholder="Código de Acesso" class="form-control" name="cod" id="cod" required>
                </div> 
                </div> 
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                <button type="submit" name="btn" id="idinsertnewbi" class="btn btn-success" onclick="addPowerBi(event)"><i class="fas fa-check"> Confirmar</i></button>   
            </div>
        </form>
    </div>
</div>
</div>

`
    div.innerHTML = content

    return div
}


const showModalChangePass = (name, id_login) => {
    const div = document.createElement('div')

    const content = `
<div class="modal fade" id="changepass" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Alterar senha - ${name}</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
            </button>
        </div>
        <form>
            <div class="modal-body">
                <div class="form-row">
                <div class="form-group col-md-12 text-center">
                <h8 class="section-subheading text-muted" >Senha de acesso à plataforma.</h8>
                <ul class="list-group">
                    <li id="min6" class="list-group-item"><small>Mínimo 6 caracteres</small></li>
                    <li id="max15" class="list-group-item"><small>Máximo 15 caracteres</small></li>
                    <li id="mai1" class="list-group-item"><small>Pelo menos 1 letra maiúscula</small></li>
                    <li id="num1" class="list-group-item"><small>Pelo menos 1 número</small></li>
                    <li id="esp1" class="list-group-item"><small>Pelo menos 1 carácter especial</small></li>
                    <li id="conf1" class="list-group-item"><small>As senhas coincidem</small></li>
                </ul>
            </div>
                    <div class="form-group col-md-6">          
                        <input type="password" placeholder="Senha" onkeyup="Check()" class="form-control" name="password" id="password" required>
                    </div>
                    <div class="form-group col-md-6">          
                    <input type="password" placeholder="Verificação de Senha" onkeyup="Check()" class="form-control" name="passwordconf" id="passwordconf" required>
                </div>
                <div class="form-group col-md-12 text-center">
                <div id="meter" ></div>
            </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                <button disabled type="submit" data-name="${name}" data-id_login="${id_login}" name="btn" onclick="changePassword(event)" class="btn btn-success" ><i class="fas fa-key"> Confirmar</i></button>   
            </div>
        </form>
    </div>
</div>
</div>

`
    div.innerHTML = content

    return div
}


const showModalInsert = () => {
    const div = document.createElement('div')

    const content = `
<div class="modal fade" id="insertuser" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Adicionar usuário</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
            </button>
        </div>
        <form onsubmit="createUser(event)">
            <div class="modal-body">
                <div class="form-row">
                    <div class="form-group col-md-6">          
                        <input type="text" placeholder="Nome" class="form-control" name="name" id="name" required>
                    </div>
                    <div class="form-group col-md-6">    
                    <select class="selectpicker form-control" name="perfil" id="perfil" required>
                    <option value="" disabled selected>Perfil</option>
                    <option value="1" >Master</option>
                    <option value="2" >Admin</option>
                    <option value="3" >Usuário</option>
                    <option value= "4" >Operacional</option>
                </select>
                </div>
                <div class="form-group col-md-6">          
                <input type="text" placeholder="E-mail" class="form-control" name="mail" id="mail" required>
            </div>
            <div class="form-group col-md-6">          
            <input type="text" placeholder="Senha" class="form-control" name="password" id="password" required>
        </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                <button type="submit" name="btn" class="btn btn-success"><i class="fas fa-check"> Registrar</i></button>   
            </div>
        </form>
    </div>
</div>
</div>

`
    div.innerHTML = content

    return div
}

const showModalEdit= () => {
    const div = document.createElement('div')

    const content = `
<div class="modal fade" id="edituser" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Editar usuário</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
            </button>
        </div>
        <form>
            <div class="modal-body">
                <div class="form-row">
                    <div class="form-group col-md-6">          
                        <input type="text" placeholder="Nome" class="form-control" name="name" id="nameedit" required>
                    </div>
                    <div class="form-group col-md-6">          
                    <input type="email" placeholder="E-mail" class="form-control" name="mail" id="mailedit" required>
                </div>
                <div class="form-group col-md-12">   
                    <select class="form-control" name="perfil" id="perfiledit" required>
                    <option value="" disabled selected>Perfil</option>
                    <option value="1" >Master</option>
                    <option value="2" >Admin</option>
                    <option value="3" >Usuário</option>
                    <option value= "4" >Operacional</option>
                </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                <button type="submit" name="btn" onclick="editUser(event)" id="iddbtnedituser" class="btn btn-warning" ><i class="fas fa-edit"> Confirmar</i></button>   
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
    <div class="modal fade" id="deleteuser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Deseja desativar esse usuário?</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">x</span>
                </button>
            </div>
            <form>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="col-md-12">
                            <h8>O usuário poderá ser ativado novamente.</h8>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                    <button type="submit" onclick="deleteUser(event)" name="btn" class=" btn btn-danger" id="iddbtndeleteuser"><i class="fas fa-power-off"> Desativar</i></button>   
                </div>
            </form>
        </div>
    </div>
</div>`

    div.innerHTML = content

    return div
}

const listOffice = (office) => {
    const line = document.createElement('option')

    line.value = office.id_office

    const content = ` ${office.name}</option>`

    line.innerHTML = content

    return line
}

const header = () => {
    const line = document.createElement('tr')

    const content =
        `
        <th scope="col">Opções</th>
        <th scope="col">Nome</th>
        <th scope="col">Perfil</th>
        <th scope="col">Data de Registro</th>
    </tr`
    line.innerHTML = content

    return line
}

const createUser = () => {
    const line = document.createElement('div')

    const content =
        `
        <form id="formInsertUser" onsubmit="createUser(event)">
        <div class="card-body">
        <div class="form-row">
        <div class="form-group col-md-6">
            <input placeholder="Nome" class="form-control" id="name" name="name" type="text" required>
        </div>
        <div class="form-group col-md-6">
            <select name="perfil" id="perfil" class="form-control" required>
                <option value="" disabled selected>Perfil</option>
                <option value="1" >Master</option>
                <option value="2" >Admin</option>
                <option value="3" >Usuário</option>
                <option value= "4" >Operacional</option>
            </select>                        
        </div>
    <div class="form-group col-md-6">
    <input placeholder="Email" class="form-control" id="mail" name="mail" type="email" required>
</div>
<div class="form-group col-md-6">          
<input type="password" placeholder="Senha" class="form-control" name="password" id="password" required>
</div>
    </div>
    </div>
    <div class="col-lg-12 text-center">
    <button class="btn btn-success mb-3" type="submit">Criar</button>
</div>
</form>
    `
    line.innerHTML = content

    return line
}

const headerNewUser = (title) => {
    const divbtn = document.createElement('div')

    const content = `    <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <div class="col-md-12 text-left">
        <button id="newuser" type="button" onclick="modalnewuser(event)" class="btn btn-success">
        Novo Usuário
        </button>
        <button id="newuser" type="button" onclick="addModalPowerBi(event)" class="btn btn-info">
        Novo Relatório
        </button>
    </div>
</div>`

    divbtn.innerHTML = content
    title.appendChild(divbtn)

}

const modalAddPowerbitoUser = (id_login) => {
    const div = document.createElement('div')

    const content = `     
    <div class="modal fade" id="modalpowerbi" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Adicionar acesso ao relatório </h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">x</span>
                </button>
            </div>
            <form>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group col-md-12"> 
                        <select class="selectpicker form-control" name="powerbiselect" id="powerbiselect" multiple required>
                </select>
                    </div> 
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                    <button data-id_login="${id_login}" type="submit" onclick="addPowerBiView(event)" name="btn" class=" btn btn-success"><i class="fas fa-plus"> Adicionar</i></button>   
                </div>
            </form>
        </div>
    </div>
</div>`

    div.innerHTML = content

    return div

}

const optionPowerbi = (powerbi) => {
    const line = document.createElement('option')

    line.value = powerbi.id_powerbi

    const content = ` ${powerbi.title}</option>`

    line.innerHTML = content

    return line
}

export const View = {
    showTable,
    showModalPbiInsert,
    showModalInsert,
    showModalDelete,
    showModalEdit,
    header,
    createUser,
    listOffice,
    headerNewUser,
    showModalChangePass,
    optionPowerbi,
    modalAddPowerbitoUser
}