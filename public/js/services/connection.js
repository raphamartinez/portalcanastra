//==============GET SEND====================
const GetService = (url) => {
    return fetch(url)
    .then(response => {
       return response.json();
    }).then(response => {
        return response
    })
}

//==============POST SEND====================

const PostService = (url, dados = []) => {

    let formData = new FormData();
    
    for(var key in dados){
        formData.append(key, dados[key]);
    }
    var res;
    fetch(url, {
    method: "POST",
    body: formData
    })
    .then(response => {
        return response.json(); 
    }).then(response => {
        return response
    });
}

//==========EXPORT FUNCTIONS=================

export const Services = {
    GetService,
    PostService
}


