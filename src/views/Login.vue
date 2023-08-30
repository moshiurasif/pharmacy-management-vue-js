<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <form action="" @submit.prevent="handleSubmit">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                class="input input-bordered"
                v-model="formData.email"
                ref="email"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                class="input input-bordered"
                v-model="formData.password"
                ref="password"
              />
              <label class="label">
                <a href="#" class="label-text-alt link link-hover"
                  >Forgot password?</a
                >
              </label>
            </div>
            <div class="form-control mt-6">
              <p class="btn btn-primary" v-if="loggedIn">Logging In.....</p>
              <button v-else class="btn btn-primary" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    formData: {
      email: "",
      password: "",
    },
    loggedIn: false
  }),
  methods: {
    handleSubmit() {
      console.log(this.formData);
      if (!this.formData.email) {
        // alert("Email Field is Required")
        this.$toast.error(`Email Field is Required`);
        this.$refs.email.focus()
        return;
      }
      if (!this.formData.password) {
        this.$toast.error(`password field is required`);
        this.$refs.password.focus()
        return;
      }
      if (this.formData.password.length < 8) {
        this.$toast.error(`password at least 8 characters long`);
        this.$refs.password.focus()
        return;
      }
      this.loggedIn = true;
      axios.post('http://127.0.0.1:8000/api/login', this.formData)
  .then(res=>{
    console.log(res.data.data.token);
    this.$toast.success(res.data.message)
    localStorage.setItem("accessToken",res.data.data.token)
    this.$router.push('/dashboard')
  })
  .catch(err=>{
    let errorMessage = "Something went wrong";
    if (err.response) {
      errorMessage = err.response.data.message
    }
    this.$toast.error(errorMessage)
  })
  .finally(()=>{
    this.loggedIn = false;
    this.formData = {}
  });
      
    },
  },
};
</script>

<style scoped></style>
