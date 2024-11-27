<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container mt-5">
      <h3>Login</h3>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label>Email</label>
          <input v-model="email" type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label>Password</label>
          <input v-model="password" type="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '../firebase';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          await signInWithEmailAndPassword(auth, this.email, this.password);
          this.$router.push('/dashboard');
        } catch (error) {
          alert(error.message);
        }
      },
    },
  };
  </script>
  