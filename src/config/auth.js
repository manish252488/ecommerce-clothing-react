import axios from "axios"

export const auth = {
    createUser(data) {
        return new Promise((resolve, reject) => {
            axios.post('/user/create', data)
                .then(res => {
                    this.setSession(res.token);
                    resolve(res.data);
                })
                .catch(err => {
                    this.setSession(null)
                    reject(err);
                })
        })
    },
    signInWithEmail(data) {
        return new Promise((resolve, reject) => {
            /* axios.post('/user/login', data)
                .then(res => {
                    this.setSession(res.token)
                    resolve(res.data)
                })
                .catch(err => {
                    this.setSession(null);
                    reject(err);
                }) */
            if (data.userName === "john" && data.password === "12345")
                resolve({ user: data, role: 'user' })
            else if (data.userName === "micky" && data.password === "98765")
                resolve({ user: data, role: 'user2' })
            else
                reject({ message: 'unauthorized' })
        })
    },
    signInWithToken() {
        return new Promise((resolve, reject) => {
            axios.get('/user/create')
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        })
    },
    setSession(token) {
        localStorage.setItem('jwt_token', token)
    },
    logout() {
        this.setSession(null)
    },
    getSession() {
        return localStorage.getItem('jwt_token')
    }
}