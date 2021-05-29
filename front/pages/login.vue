<template>

    <div class="form-body">
        <div class="website-logo">
            <NuxtLink :to="'/'">
                <div class="logo">
                    <img class="logo-size" src="images/logo-light.svg" alt="">
                </div>
            </NuxtLink>
        </div>
        <div class="row">
            <div class="img-holder">
                <div class="bg"></div>
                <div class="info-holder">
                    <img src="images/graphic1.svg" alt="">
                </div>
            </div>
            <div class="form-holder">
                <div class="form-content">
                    <div class="form-items">
                        <h3>Get more things done with Loggin platform.</h3>
                        <p>Access to the most powerfull tool in the entire design and web industry.</p>
                        
                        <form @submit.prevent="login">

                            
                            <input class="form-control" type="text" v-model="email"  placeholder="E-mail" autocomplete="off" required>
                            <ErrorShow :error="errors" :name="'email'"/>

                            <input class="form-control" type="password" v-model="password" placeholder="Password" required>
                            <ErrorShow :error="errors" :name="'password'"/>

                            <div class="form-button">
                                <button id="submit" type="submit" class="ibtn">Login</button>
                            </div>
                        </form>
                        
                        <div class="other-links">
                            <span>¿No posees cuenta?</span><NuxtLink :to="'/register'">Regístrate</NuxtLink>
                        </div>

                        <!--<div class="other-links">
                            <span>O inicia sesión con</span><a href="#">Facebook</a><a href="#">Google</a><a href="#">Linkedin</a>
                        </div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import ErrorShow from '../components/ErrorShow';

    export default {

        middleware: 'auth',
        auth: 'guest',
        name: "Login",
        layout:"auth",
        data(){
            return {
                errors:[],
                email:"",
                password:"",         
            }
        },
        components:{ErrorShow},
        methods:{
            async login(){

                this.errors = []

                try{

                    let res = await this.$auth.loginWith('local', {
                                                        data:{
                                                            email:this.email,
                                                            password:this.password
                                                        }
                                                    })

                    if(res.data.success == false){
                        this.$swal({
                            icon: 'error',
                            text: res.data.msg,
                        })
                    }else{
                        this.$router.push("/app/dashboard")
                    }
                    
                }catch(err){
                   
                    if(err.response.data.error){
                        
                        this.$swal({
                            icon: 'error',
                            text: err.response.data.error,
                        })
                    }
                    if(err.response.data.errors){

                        this.$swal({
                            icon: 'error',
                            text: "Hay campos que debes revisar",
                            toast: true,
                            position: 'top-end',
                        })

                        this.errors = err.response.data.errors
                    }

                }

            }

        },
        head: {
            titleTemplate: '%s - Nuxt.js',
            meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },

            // hid is used as unique identifier. Do not use `vmid` for it as it will not work
            { hid: 'description', name: 'description', content: 'Meta description' }
            ]
        }
        
    }
</script>

<style scoped>

    @import "~/assets/css/iofrm-style.css";
    @import "~/assets/css/iofrm-theme4.css";
    
</style>