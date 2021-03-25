<template>
    <form novalidate>
        <button v-if="!creating" type="button" class="btn btn-success" @click="onToggleForm($event)">Añadir nuevo sitio</button>
        <div v-if="creating" class="row mb-3">
            <label for="newSite" class="col-12 col-lg-6 col-form-label">Nombre del nuevo sitio (sin protocolo):</label>
            <div class="col-12 col-lg-6">
                <input v-model="newSite" type="text" class="form-control" id="newSite" placeholder="www.misitio.com">
            </div>
        </div>
        <div v-if="creating" class="d-grid gap-2">
            <button class="btn btn-success" type="button" :disabled="!newSite" @click="onSubmit">Crear nuevo sitio</button>
            <button class="btn btn-secondary" type="button" @click="onToggleForm($event)">Cancelar</button>
        </div>
    </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'NewSite',
    methods: {
        ...mapActions(['addSite']),
        async onSubmit(e) {
            e.preventDefault();
            await this.addSite(this.newSite);
            if (!this.error)
                this.onToggleForm();
        },
        onToggleForm(e) {
            e?.preventDefault();
            this.creating = !this.creating;
            this.newSite = '';
        }
    },
    data() {
        return {
            creating: false,
            newSite: ''
        }
    }
}
</script>

