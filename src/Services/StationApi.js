const create = station =>{
    return fetch('/station/create',{
        method: 'post',
        body: JSON.stringify(station),
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
                errorMsg: "Station Id duplicated"
            };
        else
            return {
                success: false,
                user:{},
                errorMsg: "Something went wrong"
            };
    });
};

export default {
    create:create
}