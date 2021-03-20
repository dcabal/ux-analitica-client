<template>
    <div class="row">
        <div class="col-12 col-md-6 m-auto mt-5">
            <login-form type="signup" />
        </div>
    </div>
</template>

<script>
import LoginForm from '../components/LoginForm';

export default {
    components: { LoginForm },
    name: 'Signup'
}
</script>
