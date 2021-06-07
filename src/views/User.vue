<template>
    <div class="row">
        <section class="col-12 col-lg-6">
            <h1 class="border-bottom pb-2 mb-3 fs-2">Datos de usuario</h1>
            <p><strong>Nombre de usuario: </strong>{{owner.userName}}</p>
            <p><strong>Email: </strong>{{owner.email}}</p>
            <user-update/>
        </section>
    </div>
</template>

<script>
import UserUpdate from '../components/UserUpdate';
import { mapActions, mapGetters } from 'vuex';
import { checkLogin } from '../util/util';

export default {
    components: { UserUpdate },
    name: 'User',
    computed: mapGetters(['site', 'owner']),
    methods: {
        ...mapActions(['getOwner'])
    },

    created() {
        checkLogin();
    }    
}
</script>