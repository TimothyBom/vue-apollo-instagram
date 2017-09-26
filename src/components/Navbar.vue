<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link class="navbar-brand" to="/">Instagram</router-link>
      
        <div class="collapse navbar-collapse">
          <ul v-if="isLoggedIn" class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" data-toggle="modal" data-target="#NewPost">New Post</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="logout">Logout</a>
            </li>
          </ul>
          <ul v-else class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="signup">Signup</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="login">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['isLoggedIn']),
  methods: {
    logout() {
      this.$store.dispatch('getUserLogout')
      this.$router.push('login')
    }
  }
}
</script>
