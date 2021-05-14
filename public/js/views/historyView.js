
const showTable = () => {
    let div = document.createElement('div');

    div.className = "col-xl-6 col-md-6 mb-4"

    div.innerHTML = ` 
    <div class="card border-left-info shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Actualizacion Ansa BD
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">Última actualización de datos hace 1 hora</div>
                    <div class="h8 mb-0 font-weight-bold text-gray-600">clic en el símbolo para actualizar de nuevo</div>
                </div>
                <div class="col-auto">
                    <a><i class="fas fa-sync fa-2x text-gray-300"></i></a>
                </div>
            </div>
        </div>
    </div>`;

    cardHistory.appendChild(div)

}


export const viewHistory = {
    showTable
}