const create = city =>{
    return fetch('/city/create',{
        method: 'post',
        body: JSON.stringify(city),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if(res.status === 201)
            return res.json()
                .then(data => data);
        else if(res.status === 401)
            return {
                success: false,
                city:{},
                errorMsg: "Session expired"
            };
        else if(res.status === 400)
            return {
                success: false,
                city:{},
                errorMsg: "City Name duplicated"
            };
        else
            return {
                success: false,
                user:{},
                errorMsg: "Something went wrong"
            };
    });
};

const fetchAll = () =>{
    return fetch('/city/fetchAll', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res =>{
        if(res.status === 200)
            return res.json()
                .then(data => data);
        else if(res.status === 401)
            return {
                success: false,
                cities:{},
                errorMsg: "Session expired"
            };
        else
            return {
                success: false,
                cities:{},
                errorMsg: "Something went wrong"
            };
    });
};

const update = city =>{
    return fetch('/city/update', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(city)
    }).then(res =>{
        if(res.status === 202)
            return res.json()
                .then(data => data);
        else if(res.status === 401)
            return {
                success: false,
                cities:{},
                errorMsg: "Unauthorized"
            };
        else
            return {
                success: false,
                cities:{},
                errorMsg: "Something went wrong"
            };
    });
};

const deleteCity = id =>{
    return fetch('/city/delete', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
    }).then(res =>{
        if(res.status === 202)
            return res.json()
                .then(data => data);
        else if(res.status === 401)
            return {
                success: false,
                cities:{},
                errorMsg: "Unauthorized"
            };
        else
            return {
                success: false,
                cities:{},
                errorMsg: "Something went wrong"
            };
    });
};

export default {
    create: create,
    fetchAll: fetchAll,
    update: update,
    deleteCity: deleteCity
}