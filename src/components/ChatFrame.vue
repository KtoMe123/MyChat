<template>

    <div class="chat-default" v-if="UsersId === 'def'">Welcome</div>
    <div 
        v-else 
        :class="['chat-frame', {'chat-frame_hide': user.mail != UsersId }]" 
        v-for="user in UsersInfo" 
        :key="user.id"
    >
    <!-- {{user}} -->
        <div  class="chat-frame__main" >
            <div class="chat-frame__wrapper">
                <main-header>
                        <template #Content>
                            <div class="chat-info" @click="OpenInfo">
                                <img @click="Check = !Check" src="src/assets/user(1).png" alt="img" class="header__img">
                                <div @click="rrr" class="chat-info__name">{{user.username}}</div>
                            </div>
                            
                        </template>
                        <template #Nav>
                            <ul class="nav-icons">
                                <li class="nav-icon" v-for="icon in HeadIcons" :key="icon"><ion-icon :name="icon.name"></ion-icon></li>
                            </ul>
                        </template>
                    </main-header>
                <div class="chat">
                    <div id="messageBody" class="chat__content" @click="VisibleSmile = false">
                        
                        <div class="chat__messages">
                            <div 
                                class="chat__message_bd-mess"
                                v-for="message in MessInfo"
                                :key="message.true_id"  
                        >
                            <div 
                                :class="['chat__message',{'chat__message_my': message.u_from === currentUser} , {'chat__message_frend': message.u_from === UsersId}]"
                                v-if="(message.u_to === UsersId && message.u_from === currentUser) || (message.u_to === currentUser && message.u_from === UsersId) "
                            >
                                <p class="chat__text">{{message.message}}<br><span class="chat__time">{{message.id}}</span></p>
                            </div>
                        </div>
                            <div 
                            class="chat__message_my-mess"
                            v-for="message in Message"
                            :key="message.id"  
                        >
                            <div 
                                :class="['chat__message', {'chat__message_my': message.u_from === currentUser}, {'chat__message_frend': message.u_from === UsersId}]"
                                v-if="(message.u_to === UsersId && message.u_from === currentUser) || (message.u_to === currentUser && message.u_from === UsersId) "
                            >
                                <p class="chat__text">{{message.message}}<br><span class="chat__time">{{message.id}}</span></p>
                            </div>
                        </div>
                        
                        </div>
                    </div>
                    <div v-if="VisibleSmile === true" class="smile">
                        <div class="smile__main">
                            <div 
                                v-for="(smile, index) in Smiles"
                                :key="index"
                            >
                            <div class="smile__item" @click="AddSmile(smile, Mess)">{{smile}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="input-form">
                        <ion-icon class="input__icon" name="happy-outline" @click="OpenSmile"></ion-icon>
                        <MyInput name="messahe-input" v-model="Mess" v-on:keyup.enter="AddMessage" placeholder="Type a message"></MyInput>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { io } from 'socket.io-client'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import MyInput from './UI/MyInput.vue'



const Check = ref(false)
const Mess = ref('')
const Message = ref([])
const MessView = ref([])
const VisibleSmile = ref(false)
const MesSend = ref('')
const Smiles = ['😀', '😁', '😂', '😃', '😄', '😅', '😆', '😇', '😈',
                '😉', '😊', '😋', '😌', '😍', '😎', '😏', '😐', '😑',
                '😒', '😓', '😔', '😕', '😖', '😗', '😘', '😙', '😚',
                '😛', '😜', '😝', '😞', '😟', '😠', '😡', '😢', '😣',
                '😤', '😥', '😦', '😧', '😨', '😩', '😪', '😫', '😬',
                '😭', '😮', '😯', '😰', '😱', '😲', '😳', '😴', '😵',
                '😶', '😷', '😸', '😹', '😺', '😻', '😼', '😽', '😾', '😿',
                '🙀', '💩', '☠', '👌', '👍', '👎', '🙈', '🙉', '🙊']
const currentUser = props.UserName
const MessInfo = ref([])
let Image = ref()
const messList = 'http://localhost:8080/api/mess'

const socket = io('http://localhost:3000')

socket.on('receive-message', message => {
    Message.value = (message)
})


function OpenSmile() {
    if(VisibleSmile.value === true) {
        VisibleSmile.value = false
        return
    }
    VisibleSmile.value = true
}
document.body.scrollTop = document.body.scrollHeight;
const AddSmile = (smile) => {
    Mess.value += smile
}

const props = defineProps( {
    UsersId: {
        type: String
    },
    UsersInfo: {
        type: Array
    },
    HeadIcons: {
        type: Array
    },
    UserName: {
        type: String,
        required: true
    },
    CheckViews: {
        type: Array,
    },
})

function getMes() {
  fetch(messList)
    .then((response) => response.json())
    .then((data) => MessInfo.value = data.filter((v,i,a)=>a.sort((c, b) => c.true_id - b.true_id)))
}

getMes()

function AddMessage() {

    const ViewMessage = ref({
        u_from: currentUser, 
        u_to: props.UsersId
    })

    const Hours = ref(new Date().getHours())
    const Min = ref(new Date().getMinutes())

    if(Hours.value.toString().length === 1) {
        Hours.value = "0" + Hours.value
    } 
    if(Min.value.toString().length === 1) {
        Min.value = "0" + Min.value
    } 

  const MessInfo = ref({
    id: `${Hours.value}` + ':' + `${Min.value}`,
    message: Mess.value,
    u_from: currentUser,
    u_to: props.UsersId,
  })
  VisibleSmile.value = false

    let ScrollBar = ref('')

    setTimeout(() => {
        
        ScrollBar = document.querySelectorAll("#messageBody");
            for(let i = 0; ScrollBar.length > i; i++) {
                ScrollBar[i].scrollTop = ScrollBar[i].scrollHeight;
            }
    }, 1)
    

    if (Mess.value) {
        axios
            .post('http://localhost:8080/api/mess',
            {
                id: `${Hours.value}` + ':' + `${Min.value}`,
                message: Mess.value,
                u_from: currentUser,
                u_to: props.UsersId,
                seen: false,
            }
            )
            .then(response => {
                console.log('Значение успешно добавленно');
            })
            .catch(err => {
                console.error('Ошибка при добавленнии значения:', err);
            });

        socket.emit('view-message', ViewMessage.value)
        Message.value.push(MessInfo.value)
        
        socket.emit('send-message', Message.value)
        Mess.value = ''
    }
    
}

const emits = defineEmits(['OpenInfo'])
function OpenInfo() {
    emits('OpenInfo', Check)

}

</script>

<style lang="scss" scoped>
::-webkit-scrollbar-thumb:horizontal {
  margin-right: 5px;
}

::-webkit-scrollbar {
    width: 0;
}


* { 
    scrollbar-width: none;
}

.smile {    
    border-bottom: 1px solid rgba(0,0,0,0.2);
    position: absolute;
    z-index: 2;
    bottom: 60px;
    &__main {
        width: 341px;
        height: 130px;
        border-top-right-radius: 15px;
        overflow: auto;
        background: #f0f0f0;
        display: flex;
        flex-wrap: wrap;
    }
    &__item {
    font-size: 35px;
    margin: 10px;
    cursor: pointer;
    }
}

.chat {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    flex: 1 1 auto;
    transition: .6s;
    &-default {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        font-size: 24px;
        width: 100%;
        border-left: 1px solid rgba(0,0,0,0.2);
    }
    &__content {
        padding: 50px;
        overflow-y: auto;
        flex: 1 1 auto;
        background: url('@/assets/pattern2.png');
        max-height: 764px;
    }
    &-info {
        display: flex;
        align-items: center;
        &__name {
            margin-left: 10px;
        }
    }
    &__messages {
        transform: scaleY(-1);
        display: flex;
        flex-direction: column-reverse;
    }
    &__message {
        position: relative;
        display: flex;
        margin: 5px 0;
    }
    &__message_my {
        justify-content: flex-end;
    }
    &__message_my .chat__text {
        background-color: #dcf8c6;
        text-align: right;
        transform: scaleY(-1);
    }
    &__message_frend .chat__text {
        transform: scaleY(-1);
    }
    &__text {
        text-align: left;
        padding: 12px;
        background-color: #fff;
        border-radius: 10px;
        font-size: 14px;
        max-width: 300px;
        overflow-wrap: break-word;
    }
    &__message_frend .chat__text::before {
        content: '';
        position: absolute;
        top: 0;
        left: -12px;
        width: 20px;
        height: 20px;
        background: linear-gradient( -135deg,#fff 0%, #fff 50%, transparent 50%, transparent);
    }
    &__message_my .chat__text::before {
        content: '';
        position: absolute;
        top: 0;
        right: -12px;
        width: 20px;
        height: 20px;
        background: linear-gradient( 135deg,#dcf8c6 0%, #dcf8c6 50%, transparent 50%, transparent);
    }
    &__time {
        display: block;
        margin-top: 5px;
        font-size: 12px;
        opacity: 0.5;
    }
    &-frame {
        height: 100%;
        width: 100%;
        border-left: 1px solid rgba(0,0,0,0.2);
        display: block;
        &_hide {
            display: none;
        }
        &__main {
            height: 100%;
            border-left: 1px solid rgba(0,0,0,0.2);
        }
        &__wrapper {
            min-height: 100%;
            display: flex;
            flex-direction: column;
        }
    }

}

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


.input {
    position: relative;
    width: 90%;
    margin: 0 20px;
    padding: 10px 20px;
    border: none;
    outline: none;
    border-radius: 30px;
    font-size: 16px;
    &-form {
        position: relative;
        width: 100%;
        height: 60px;
        background: #f0f0f0;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__icon {
        cursor: pointer;
        font-size: 40px;
        color: #51585c;
    }
}

</style>