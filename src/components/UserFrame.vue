<template>

    <div class="user-frame">
        <main-header>
            <template #Content>
                <img @click="GetInfo" :src="UserImg" alt="img" class="header__img">
            </template>
            <template #Nav>
                <ul class="nav-icons">
                    <li class="nav-icon" v-for="icon in HeadIcons" :key="icon"><ion-icon :name="icon.name"></ion-icon></li>
                </ul>
            </template>
        </main-header>
    </div>
        
</template>

<script setup>
import { ref } from "vue"


const props = defineProps( {
    HeadIcons: {
        type: Array
    }
})

const UserImg = 'src/assets/profile.png'

</script>

<style lang="scss" scoped>

.header__img {
    height: 40px;
    width: 40px;
    cursor: pointer;
    border-radius: 50%;
}
.nav-icons {
    display: flex;
}
.nav-icon {
    display: flex;
    list-style: none;
    cursor: pointer;
    color: #51585c;
    font-size: 24px;
    margin-right: 22px;
    &:last-child {
        margin: 0;
    }
}

</style>