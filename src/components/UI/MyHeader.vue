<template>
    <div class="header">
        <slot name="Content"></slot>
        <slot name="Nav"></slot>
    </div>
</template>

<script>
export default {
    name: 'main-header',
}
</script>

<style scoped >

.header {
    position: relative;
    width: 100%;
    height: 60px;
    background: #ededed;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}


</style>