const fetchVehicles = (params) =>{
    return fetch('/vehicle/fetchAll', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(res =>res.json())
        .then(data => data);
};

const fetchOne = id =>{
    return fetch(`/vehicle/fetch/${id}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res =>res.json())
        .then(data => data);
};

export default {
    fetchVehicles: fetchVehicles,
    fetchOne: fetchOne
};