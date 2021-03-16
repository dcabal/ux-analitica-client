<template>
  <main class="row justify-content-md-center">
        <div class="col-12 col-lg-3">
            <login-form type="login" />

        </div>
    </main>
</template>

<script>
import LoginForm from '../components/LoginForm';

export default {
  components: { LoginForm },
  name: 'Home'
}
</script>
