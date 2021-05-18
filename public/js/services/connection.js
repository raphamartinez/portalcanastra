const GetService = async (url) => {
    try {
        const result = await fetch(url)
        return result.json()
    } catch (error) {
        return error
    }
}

const PostService = (url, data, method) => {
    try {
        const result = await fetch(url, {
            method: method,
            body: data
        })
        return result.json()
    } catch (error) {
        return error
    }
}


export const Services = {
    GetService,
    PostService
}


