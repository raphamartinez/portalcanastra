const { InvalidArgumentError } = require('./error')

module.exports = {
  fieldStringNotNull (value, name) {
    if (typeof value !== 'string' || value === 0) { throw new InvalidArgumentError(`É necessário preencher o campo ${name}!`) }
  },

  FieldLengthMin (value, name, min) {
    if (value.length < min) {
      throw new InvalidArgumentError(
        `O campo ${name} precisa ser maior que ${min} caracteres!`
      )
    }
  },

  FieldLengthMax (value, name, max) {
    if (value.length > maximo) {
      throw new InvalidArgumentError(
        `O campo ${name} precisa ser menor que ${max} caracteres!`
      )
    }
  }
}
