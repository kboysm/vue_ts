<template>
    <v-card>
        <v-card-title>model test</v-card-title>
        <v-card-text>
            <v-text-field v-model="name" label="name"></v-text-field>
            <v-textarea v-model="text" auto-grow />
        </v-card-text>
        <v-card-actions>
            <v-btn @click="read">read</v-btn>
            <v-btn @click="write">write</v-btn>
            <v-btn @click="update">update</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import userCollection , { User } from '@/models/users'

    @Component
    export default class  extends Vue {
        text = ''
        name = ''
        ref = userCollection

        async read () {
            const doc = await this.ref.doc( 'u1' ).get()
            // const cloneDoc = doc.data()
            // const user = {
            //     name : cloneDoc?.name,
            //     createdAt : cloneDoc?.createdAt.toDate(),
            //     updatedAt : cloneDoc?.updatedAt.toDate()
            // } // ? 는 있을지 없을지 모르기 때문에 붙임 , converter를 사용하는 시점에서 이렇게 할 필요가 없음
            this.text = JSON.stringify( doc.data() , null , 2 )
        }

        async write () {
            // const user = {
            //     name : this.name ,
            //     createdAt : new Date() ,
            //     updatedAt : new Date()
            // } class를 사용할 시 필요하지 않음
            const user = new User (this.name)
            await this.ref.doc( 'u1' ).set( user )
            await this.read()
        }

        async update () {
            const user = {
                name : this.name , updatedAt : new Date()
            }

            await this.ref.doc( 'u1' ).set( user , { merge: true} )
            await this.read()
        }
    }
</script>

<style scoped>

</style>