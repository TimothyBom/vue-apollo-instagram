<template>
    <div class="container mt-10">
        <h1 class="text-center mb-4">Login Page</h1>
        <div class="row justify-content-center">
            <form @submit.prevent="onSubmit('login')" data-vv-scope="login">
                <div v-show="message" class="alert alert-danger">{{ message }}</div>
                <div class="form-group">
                    <label>Username</label>
                    <input v-validate="'required|alpha'" type="text" :class="{'form-control': true, 'is-invalid': errors.has('login.username')}" name="username" v-model="username">
                    <div v-show="errors.has('login.username')" class="invalid-feedback">{{ errors.first('login.username') }}</div>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input v-validate="'required'" type="password" :class="{'form-control': true, 'is-invalid': errors.has('login.password')}" name="password" v-model="password">
                    <div v-show="errors.has('login.password')" class="invalid-feedback">{{ errors.first('login.password') }}</div>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag'

const login = gql`
    mutation ($username: String!, $password: String!) {
        login(username: $username, password: $password)
    }
`

export default {
    data: () => ({
        username: '',
        password: '',
        message: ''
    }),

    methods: {
        onSubmit(scope) {
            this.$validator.validateAll(scope).then((result) => {
                if (result) {
                    const username = this.username
                    const password = this.password

                    this.username = ''
                    this.password = ''

                    this.$apollo.mutate({
                        mutation: login,
                        variables: {
                            username,
                            password
                        }
                    }).then(res => {
                        this.$store.dispatch('getUserLogin', { token: res.data.login })
                        this.$router.push('/')
                    }).catch((err) => {
                        this.message = err.message.substring(15)
                    })
                }
            })
        }
    }
}
</script>