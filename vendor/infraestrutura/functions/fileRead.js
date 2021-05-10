const fs = require('fs')
const path = require('path')

module.exports = (pathFile, fileName, callbackImage) =>
{
    const validType = ['jpg', 'png', 'jpeg']
    const type = path.extname(pathFile)
    const typeIsValid = validType.indexOf(type.substring(1)) !== -1

    if(typeIsValid){
        const error = 'Tipo é inválido'
        console.log('Erro, tipo inválido')
        callbackImage(error)
    } else {
        const newPathFile = `..${fileName}${type}`

        fs.createReadStream(pathFile)
          .pipe(fs.createWriteStream(newPathFile))
          .on('finish', () => callbackImage(false, pathFile))
    }
}