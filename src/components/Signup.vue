<template>
    <div class="container mt-10">
        <h1 class="text-center mb-4">Signup Page</h1>
        <div class="row justify-content-center">
            <form @submit.prevent="onSubmit('signup')" data-vv-scope="signup">
                <div v-show="message" class="alert alert-danger">{{ message }}</div>
                <div class="form-group">
                    <label>Username</label>
                    <input v-validate="'required|alpha'" type="text" :class="{'form-control': true, 'is-invalid': errors.has('signup.username')}" name="username" v-model="username">
                    <div v-show="errors.has('signup.username')" class="invalid-feedback">{{ errors.first('signup.username') }}</div>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input v-validate="'required|min:6'" type="password" :class="{'form-control': true, 'is-invalid': errors.has('signup.password')}" name="password" v-model="password">
                    <div v-show="errors.has('signup.password')" class="invalid-feedback">{{ errors.first('signup.password') }}</div>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Signup</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag'

const signup = gql`
    mutation ($username: String!, $password: String!) {
        signup(username: $username, password: $password) {
            _id
        }
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
                        mutation: signup,
                        variables: {
                            username,
                            password
                        }
                    }).then(() => {
                        this.$router.push('/login')
                    }).catch((err) => {
                        this.message = err.message.substring(15)
                    })
                }
            })       
        }
    }
}
</script>