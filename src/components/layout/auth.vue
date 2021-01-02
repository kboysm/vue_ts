<template>
    <v-app>
        <v-main>
            <v-container class="justify-center align-center fill-height">
                <!-- <auth-sign></auth-sign> -->
                <fire-test></fire-test>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import  AuthSign from "@/components/auth/sign.vue"
    import fireTest from "@/components/test/model.vue"

    @Component({
        components:{
            AuthSign,fireTest
        }
    })
    export default class LayoutAuth extends Vue {
        async test () {
            const ref = this.$firebase.firestore().collection('test').doc('lsm')
            await ref.set({ lim : 'sm'})
            const doc = await ref.get()
            console.log(doc.data())
        }
    }
</script>

<style scoped>

</style>