import Vue from "vue"
import firebase from "firebase/app"

declare module 'vue/types/vue' {
    interface Vue {
        $firebase: typeof firebase; //파이어 베이스의 타입을 $firebase로 지정
    }
}