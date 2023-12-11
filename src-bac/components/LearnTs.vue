<template>
    <div id="learnts">
        <h1>Learn Ts</h1>
        <div class="count" @click="count++">{{ count }}</div>
        <div>doubleCount:{{ doubleCount }}</div>
        <div>
            <button @click="changePlayer">changePlayer</button>
            <h2>{{ player.name }} : </h2>
            <h4>{{ player.age }}</h4>
            <h4>{{ player.number }}</h4>
        </div>
        <button>fetch</button>
    </div>
</template>
<script setup lang='ts'>
import { ref, reactive , computed} from 'vue'
// import axios from 'axios'

const count = ref<number>(0)

type Player<T, K> = {
    name: T,
    age: K,
    number: K
}
const player: Player<string, number> = reactive({
    name: 'ronaldo',
    age: 40,
    number: 7,
    from: 'portu'
})

function changePlayer(event: Event) {
    player.name = 'neymar'
    player.age = 30
    player.number = 10
    console.log(event.target);

}

// 测试vite转路由
// fetch('/api/user/hi', {
//     headers: {
//         apikey: import.meta.env.VITE_API_KEY
//     }
// }).then(res => res.json()).then(res => {
//     console.log(res);
// })
// 测试二 
// import {userHi} from '../api/user.ts'
// userHi().then(res=> {
//     console.log(res);
// })

const doubleCount = computed<number>(()=> {
    return count.value*2
})
</script>
<style scoped>
.count {
    font-size: 30px;
    cursor: pointer;
    text-align: center;
}
#learnts {
    background-color: #ddd;
}
</style>