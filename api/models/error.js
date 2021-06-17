class InvalidArgumentError extends Error {
    constructor (message) {
      super(message)
      this.name = 'InvalidArgumentError'
    }
  }
  
  class InternalServerError extends Error {
    constructor (message) {
      super(message)
      this.name = 'InternalServerError'
    }
  }

  class NotFound extends Error {
    constructor (entity) {
      const message = `Not Found ${entity}`
      super(message)
      this.name = 'NotFound'
    }
  }

  class NotAuthorized extends Error {
    constructor () {
      const message = `this resource could not be accessed`
      super(message)
      this.name = 'NotAuthorized'
    }
  }
  
  
  module.exports = { InvalidArgumentError, InternalServerError, NotFound, NotAuthorized }
  