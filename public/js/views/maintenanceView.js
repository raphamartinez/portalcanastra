
const addItem = () => {
    const div = document.createElement('div')
    div.classList.add('card shadow mb-4')
    div.innerHTML =
        `
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-danger">Reemplazar nueva pieza</h6>
        </div>
        <div class="card-body">
            <div class="form-group">
                <input placeholder="Inserte el KM atual del vehiculo *" type="number"
                    class="form-control" required>
            </div>
            <div class="form-group">
                <input placeholder="Pieza a ser reemplazada *" type="text" class="form-control"
                    required>
            </div>
            <div class="form-group">
                <input placeholder="Observación" type="text" class="form-control" required>
            </div>
            <div class="form-group">
                <div class="input-group">
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="inputGroupFile01">
                        <label class="custom-file-label" for="inputGroupFile01">Foto de la
                            Pieza</label>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <select  type="text" class="form-control">
                    <option value="" selected disabled>Origen de la nueva pieza *</option>
                    <option value="1">Presupuesto</option>
                    <option value="2">Stock</option>
                </select>
            </div>
            <div class="form-group text-right">
                <button class="btn btn-success">Agregar</button>
            </div>
        </div>
    `

    return div
}

export const View = {
    addItem
}