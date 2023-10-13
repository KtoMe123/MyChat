<template>
    <div class="info">
    <main-header>
        <template #Content>
                Сведения
        </template>
    </main-header>
        <div class="info__content" v-for="user in UsersInfo" :key="user.id">
          <div class="info__main" v-if="user.mail === UsersId">
            <div class="info__main-info" >
                <div class="info__img"><img src="src/assets/user(1).png" alt="user" class="cover"></div>
                <div class="info__number">{{user.phone}}</div>
                <div class="info__username">{{user.username}}</div>
            </div>
            <div class="info__additional">
                <div class="additional__title">Сведения</div>
                <div class="additional__text">Занят(-а)</div>
            </div>
          </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue"



const props = defineProps({
    OpenInfo: {
        type: Boolean,
        required: true
    },
    UsersId: {
        type: String,
    },
    UsersInfo: {
        type: Array,
        default: null,
    },
})

</script>

<style lang="scss" scoped>

.info {
  background: #d0c9c1;
  transition: all .6s ease;
  width: 400px;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  animation-duration: 0.5s;
  border-left: 1px solid rgba(0,0,0,0.2);
  &__main {
    height: 100%;
    align-items: center;
  }
  &__main-info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #e5ddd5;
    padding: 20px;
    margin-bottom: 10px;
  }
  &__icon-close {
    font-size: 24px;
    cursor: pointer;
  }
  &__title {
    margin-left: 20px;
  }
  &__img img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;
  }
  &__img {
    max-width: 180px;
    max-height: 180px;
  }
  &__number {
    margin-top: 20px;
    color: #959595;
    font-weight: 600;
  }
  &__username {
    margin-top: 8px;
    font-weight: 500;
    line-height: 1.2em;
    font-size: 19px;
  }
  &__additional {
    background: #e5ddd5;
    padding: 20px;
    margin-bottom: 10px;
  }
}
.additional__title {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #605f5f;
}
.additional__text {
    font-size: 19px;
    font-weight: 500;
}

@media screen and (max-width: 1440px) {
    .info {
        width: 330px
    }
}
@media screen and (max-width: 1222px) {
    .info {
        width: 250px
    }
}

</style>