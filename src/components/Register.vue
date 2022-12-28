<script setup>
  import { ref } from 'vue'
  import { api } from '../api';

  const username = ref('')
  const password = ref('')
  const password2 = ref('')
  const isPasswordVisible = ref(false)
  const validation = ref(null)
  const registerForm = ref(null)
  const isFetching = ref(false)
  const errorMessage = ref(null) 
  const isRegisterSuccess = ref(false)

  const username_validator = [
    (v) => v.match(/^[a-z][a-z0-9]{3,}$/gi) || 'Must be more then 3 symbols and contain only latin letters and numbers'
  ]

  const password_validator = [
    (v) => v.match(/[0-9a-z]{8,}/gi) || 'Must contain minimum 8 symbols and at least one latin letter'
  ]

  const password2_validator = [
    (v) => v === password.value || 'Passwords doesn\'t match'
  ]

  async function register() {
    errorMessage.value = null

    if (!registerForm.value.validate()) return
    
    try {
      isFetching.value = true
      const response = await api.registerUser(username.value, password.value, password2.value)

      if (!response.ok) {
        const data = await response.json()
        errorMessage.value = data.detail
      } else {
        isRegisterSuccess.value = true
      }
    } catch (err) {
      globalError.setMessage(err)
    } finally {
      isFetching.value = false
    }
  }

</script>

<template>
  <div class="form-wrapper">
    <va-card>
      <va-card-title>Registration</va-card-title>
      <va-card-content>
        <va-alert
          dense
          color="success"
          class="mb-4"
          v-model="isRegisterSuccess">
          <template #icon>
            <va-icon name="info" />
          </template> 
          Registration successful. Now you can Log In.
        </va-alert>
        <va-form ref="registerForm" @validation="validation = $event" class="login-form">
          <va-input
            class="mb-4 form-control"
            label="Username"
            :rules="username_validator"
            v-model="username"/>
          <va-input
            class="mb-4 form-control"
            label="Password"
            :rules="password_validator"
            :type="isPasswordVisible ? 'text': 'password'"
            v-model="password">
            <template #appendInner>
              <va-icon
              :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
              size="small"
              color="--va-primary"
              @click="isPasswordVisible = !isPasswordVisible" />
            </template>
          </va-input>
          <va-input
            class="mb-4 form-control"
            label="Repeat password"
            :rules="password2_validator"
            :type="isPasswordVisible ? 'text': 'password'"
            v-model="password2">
              <template #appendInner>
                <va-icon
                  :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
                  size="small"
                  color="--va-primary"
                  @click="isPasswordVisible = !isPasswordVisible" />
              </template>
            </va-input>
            <p style="color: #d7234e;">{{ errorMessage }}</p>
            <div class="submit-wrapper">
              <va-button :loading="isFetching" @click="register">Register</va-button>  
            </div>
        </va-form>
      </va-card-content>
    </va-card>
  </div>
</template>

<style scoped>
.form-wrapper {
  max-width: 400px;
}

.form-control {
  width: 100%;
}

.submit-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>