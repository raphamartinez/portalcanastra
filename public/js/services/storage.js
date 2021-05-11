

sessionStorage.setItem(JSON.stringify(name), JSON.stringify(data))
const data = JSON.parse(sessionStorage.getItem(name)) || []


localStorage.setItem(JSON.stringify(name), JSON.stringify(data))
const data = JSON.parse(localStorage.getItem(name)) || []

localStorage.removeItem(JSON.stringify(name))


//aula de storage