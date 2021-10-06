const Repositorie = require('../repositories/file')
const fs = require('fs')
const { InvalidArgumentError, InternalServerError, NotFound } = require('./error')

/**
 * 
 */
class File {

    async save(file, details, id_login) {
        try {
            const id_file = await Repositorie.insert(file, details, id_login)

            return id_file
        } catch (error) {
            throw new InvalidArgumentError('No se pudo guardar el archivo.')
        }

    }

    async view(id_file) {
        try {
            return Repositorie.view(id_file)
        } catch (error) {
            throw new NotFound('Archivo no encontrado')
        }
    }

    async delete(id_file) {
        try {

            const file = await Repositorie.view(id_file)

            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path)
                await Repositorie.delete(id_file)
            } else {
                throw new NotFound('No se encontró el archivo, por lo que se puede eliminar.')
            }

            return true
        } catch (error) {
            if (error && error.code == 'ENOENT') {
                throw new NotFound('No se encontró el archivo, por lo que se puede eliminar.')
            } else {
                throw new InvalidArgumentError('Se produjo un error al intentar eliminar el archivo.')
            }
        }
    }

    async list(file) {
        try {

            const data = await Repositorie.list(file)

            data.forEach(obj => {
                if (/\s/.test(obj.filename)) {
                    obj.filename = obj.filename.replace(/ /g, "%20")
                }

                obj.size = `${(obj.size / 1024 / 1024).toFixed(2)} Mb`
            })

            return data
        } catch (error) {
            throw new InternalServerError('No se pudieron enumerar los archivos.')
        }
    }
}

module.exports = new File