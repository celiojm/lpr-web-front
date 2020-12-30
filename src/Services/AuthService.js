const login = user =>{
    return fetch('/user/login',{
        method: 'post',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if(res.status === 200)
            return res.json()
                .then(data => data);
        else if(res.status === 401)
            return {
            success: false,
                user:{},
                errorMsg: "Invalid credential"
        };
        else
            return {
            success: false,
                user:{},
                errorMsg: "Something went wrong"
            };
    });
};

const register = user =>{
    return fetch('/user/register', {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'appliation/json'
        }
    }).then(res => res.json())
        .then(data => data);
};

const logout = () =>{
    return fetch('/user/logout')
        .then(res => res.json())
        .then(data => data);
};

const isAuthenticated = () =>{
    return fetch('/user/authenticated')
        .then(res =>{
            if(res.status !== 401)
                return res.json()
                    .then(data => data);
            else return {isAuthenticated: false, user:{}}
        });
};

export default {
    login: login,
    register: register,
    logout: logout,
    isAuthenticated: isAuthenticated
}