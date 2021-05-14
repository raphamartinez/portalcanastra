
class Convert {
    convert(data) {
        if (this.publicFields.indexOf('*') === -1) {
            data = this.filter(data)
        }

        if (this.contentType === 'json') {
            return this.json(data)
        }
    }

    json(data) {
        return JSON.stringify(data)
    }

    filter(data) {
        if (Array.isArray(data)) {
            data = data.map((post) => this.filterObject(post))
        } else {
            data = this.filterObject(data)
        }
    }

    filterObject(object) {
        const objectFilter = {}

        this.publicFields.forEach((field) => {
            if (Reflect.has(object, field)) {
                objectFilter[field] = object[field]
            }
        })
        return objectFilter
    }
}


class ConvertPost extends Convert{

    constructor(contentType, extraFields = []) {
        super()
        this.contentType = contentType
        this.publicFields = ['title', 'content'].concat(extraFields)
    }


}

class ConvertUser extends Convert{

    constructor(contentType, extraFields = []) {
        super()
        this.contentType = contentType
        this.publicFields = ['name'].concat(extraFields)
    }
}

module.exports = { ConvertPost, ConvertUser }