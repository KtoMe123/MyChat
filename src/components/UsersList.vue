<template>
    <div  class="users-empty" v-if="MainUser < 1">empty</div>
    <div v-else @click="sendId" v-on="Check = true" class="users">
            <div  v-on="Mails.push(user.mail)" class="users__item" v-for="user in MainUser" :key="user.id" @click="UserId = user.mail">
                <div @click="rr" v-if="user.mail != TrueName" class="users__contact" >
                    <div  class="users__img"><img src="src/assets/user(1).png" alt="user" class="user-img"></div>
                    <div class="users__info">
                        <div class="users__head">
                            <h4 class="users__name">{{ user.username }}</h4> 
                            <p class="users__time">23:35</p>
                        </div>
                        <div class="users__message">
                            <p class="chat-message">How to make Whatsapp clone using Vue!</p>
                            <span class="chat-message__note-read" v-if="mail.includes(user.mail)"></span>
                            <span class="chat-message__r-time" v-else>
                                <span v-for="check in TrueMails" :key="check.u_to" >
                                    <span v-if="check.u_to === TrueName && check.u_from === user.mail && check.u_from != UserId" class="chat-message__note-read"></span>
                                </span>
                            </span>
                                
                        </div>
                    </div>
                    </div>
            </div>
    </div>

</template>


<script setup>
import {nextTick, onMounted, ref} from 'vue'
import axios from 'axios'
import { io } from 'socket.io-client'

const props = defineProps( {
    TrueName: {
        type: String,
        required: true,
    },
    MainUser: {
        type: Array,
        required: true,
    },
    MainUserInfo: {
        type: Array,
        required: true,
    },
    MyMess: {
        type: Array,
        required: true,
    },
    
})
const mail = ref([])
const UserId = ref('')
const Mails = ref([])
const TrueMails = ref([])
const MyMess = props.MyMess
const Check = ref(false)
let ScrollBar = ref([])
const rra = ref([])
const socket = io('http://localhost:3000')

    socket.on('get-update', upd => { 
        TrueMails.value = []
        TrueMails.value = upd
        
})

socket.on('seen-message', val => {
        
    TrueMails.value.push(val)
    TrueMails.value = TrueMails.value.filter((v,i,a)=>a.findIndex(t=>(t.u_from === v.u_from && t.u_to===v.u_to))===i)
    axios
        .put('http://localhost:8080/api/mess',
        {
            seen: true,
            u_to: props.TrueName,
            u_from: UserId.value,
        }
        )
        .then(response => {
            console.log('Значение успешно добавленно');
        })
        .catch(err => {
            console.error('Ошибка при добавленнии значения:', err);
        });

    setTimeout(() => { 
        TrueMails.value.forEach((element, i) => {
            if(element.u_from === UserId.value && element.u_to === props.TrueName) {
                TrueMails.value.splice(i, 1)
            }
        });
        socket.emit('update-view', TrueMails.value)
        
    }, 50)
    

})

onMounted(() => {
    console.log(props.MyMess)
    props.MyMess.forEach((element) => {
        if(element.seen === false) {
            mail.value.push(element.u_from)
        }
    })
    mail.value = mail.value.filter(function(item, pos) {
    return mail.value.indexOf(item) == pos;
})
})

const rr = () => {
    
    setTimeout(() => {
        TrueMails.value.forEach((element, i) => {
            if(element.u_from === UserId.value && element.u_to === props.TrueName) {
                TrueMails.value.splice(i, 1)
            }
        });
    console.log(TrueMails.value)

    mail.value.forEach((element, i) => {
        if(element === UserId.value) {
            mail.value.splice(i, 1)
        }
    });
    socket.emit('update-view', TrueMails.value)

    axios
            .put('http://localhost:8080/api/mess',
            {
                seen: true,
                u_to: props.TrueName,
                u_from: UserId.value,
            }
            )
            .then(response => {
                console.log('Значение успешно добавленно');
            })
            .catch(err => {
                console.error('Ошибка при добавленнии значения:', err);
            });
        ScrollBar = document.querySelectorAll("#messageBody");
        for(let i = 0; ScrollBar.length > i; i++) {
            ScrollBar[i].scrollTop = ScrollBar[i].scrollHeight;
        }
    }, 1);

}

const emits = defineEmits(['sendId'])
const sendId = () => {
    emits('sendId', UserId)

}

</script>



<style lang="scss" scoped>

.users {
    &-empty {
        text-align: center;
        margin-top: 20px;
        font-size: 24px;
        opacity: 0.6;
        font-weight: 700;
    }
    &__contact  {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 15px;
        border-bottom: 1px solid rgba(0,0,0,0.06);
        cursor: pointer;
        &:hover {
            background: #f5f5f5;
        }
    }
    &__img {
        position: relative;
        min-width: 45px;
        height: 45px;
        overflow: hidden;
        border-radius: 50%;
        cursor: pointer;
        margin-right: 10px;
    }
    &__img .user-img {
        position: relative;
        width: 45px;
        height: 45px;
    }
    &__info {
        position: relative;
        width: 100%;
    }
    &__head  {
        display: flex;
        justify-content: space-between;
        margin-bottom: 11px;
    }
    &__name {
        font-size: 17px;
        font-weight: 600;
        color: #111;
    }
    &__time {
        font-size: 12px;
        color: #aaa;
    }
    &__message {
        display: flex;
        justify-content: space-between;
        align-items: center;

    }
    &__item_active {
        background-color: #ebebeb;
    }
}

.chat-message {
    position: relative;
    color: #aaa;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    font-size: 14px;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 17px;
    text-overflow: ellipsis;
    @media screen and (max-width: 1222px) {
        min-height: 15px;
    }
    &__note-read {
        background: rgb(6, 189, 143);
        padding: 6px;
        border-radius: 45px;
        display: flex;

    }
}



</style>
