<template>
    <div class="loader">
        <img src="@/assets/loader.gif" alt="Cargando datos">
    </div>
</template>

<script>
export default {
    name: 'UxaLoader'
}
</script>

<style lang="scss" scoped>
.loader {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(216, 250, 237, .9);
    z-index: 100;
    display: flex;
    justify-content: center;

    img {
        height: max-content;
        align-self: center;
    }
}
</style>