<template>
    <v-form @submit.prevent="submit">
        <v-card>
            <v-card-title> 이메일로그인 </v-card-title>
            <v-card-text>
                <v-text-field
                v-model="email"
                label="email"
                />
            </v-card-text>
            <v-card-actions>
                <v-btn type="submit">submit</v-btn>
                <v-btn @click="signOut">signOut</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { auth } from "@/plugins/firebase"

    @Component<AuthSign>({
        created () {
            this.signIn()
        }
    })
    export default class AuthSign extends Vue {
        email = ""

        submit () {
            const actionCodeSettings = {
                url: 'http://localhost:8080/finishSignUp',
                handleCodeInApp: true,
            }
            auth.sendSignInLinkToEmail(this.email, actionCodeSettings)
            .then( ()=> {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                localStorage.setItem('emailForSignIn', this.email);
            })
            .catch( (error) => {
                console.error(error.message)
            });
        }

        signIn () {
            if ( !auth.isSignInWithEmailLink(location.href)) return
            const email = localStorage.getItem( 'emailForSignIn' )
            if( !email ) return
            this.email = email

            auth.signInWithEmailLink(email , location.href)
            .then( () => {
                localStorage.removeItem( 'emailForSignIn' )
            })
            .catch( (error)=> {
                console.error( error.message)
            })
        }

        signOut () {
            auth.signOut()
        }
    }
</script>

<style scoped>

</style>