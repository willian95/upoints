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
                        
                        <form v-on:submit.prevent="register()">
                            
                            <div class="d-flex mb-3">
                                <button type="button" @click="setRegisterType('user')" :class="type == 'user' ? 'btn btn-warning w-100 p-3' : 'btn btn-outline-warning w-100 p-3'"><fa icon="user" class="mr-1"></fa>Cliente</button>
                                <button type="button" @click="setRegisterType('store')" :class="type == 'store' ? 'btn btn-primary w-100 p-3' : 'btn btn-outline-primary w-100 p-3'"><fa icon="store" class="mr-1"></fa>Tienda</button>
                            </div>

                            <input class="form-control" type="text" v-model="nickname" placeholder="Nickname" autocomplete="off" required>
                            <ErrorShow :error="errors" :name="'nickname'"/>

                            <input class="form-control" type="text" v-model="name" placeholder="Nombre" autocomplete="off" required>
                            <ErrorShow :error="errors" :name="'name'"/>
                            
                            <input class="form-control" type="text" v-model="email"  placeholder="E-mail" autocomplete="off" required>
                            <ErrorShow :error="errors" :name="'email'"/>

                            <input class="form-control" type="password" v-model="password" placeholder="Password" required>
                            <ErrorShow :error="errors" :name="'password'"/>

                            <input class="form-control" type="password" v-model="passwordConfirmation" placeholder="Repetir contraseña" required>
                            <div class="form-button">
                                <button id="submit" type="submit" class="ibtn">Regístrate</button>
                            </div>
                        </form>
                        
                        

                        <div class="other-links">
                            <span>¿Ya posees cuenta?</span><NuxtLink :to="'/login'">Inicia sesión</NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import ErrorShow from '../components/ErrorShow';

    export default {

        name: "register",
        layout:"auth",
        data(){
            return {
                errors:[],
                nickname:"",
                type:"user",
                name:"",
                email:"",
                password:"",
                passwordConfirmation:""
                
            }
        },
        components:{ErrorShow},
        methods:{
            setRegisterType(type){
                this.type = type
            },
            async register(){

                this.errors = []

                let formData = new FormData
                formData.append("nickname", this.nickname)
                formData.append("role", this.type == "user" ? 2 : 3)
                formData.append("name", this.name)
                formData.append("email", this.email)
                formData.append("password", this.password)
                formData.append("password_confirmation", this.passwordConfirmation)

                try{
                    
                    let res = await this.$axios.post("/register", formData)
                    if(res.data.success == true){

                        this.$swal({
                            icon: 'success',
                            text: res.data.msg,
                        }).then(ans => {

                            this.$router.push("login")

                        })

                    }else{
                        this.$swal({
                            icon: 'success',
                            text: res.data.msg,
                        })
                    }

                }catch(err){
                    if(err.response.data.error){
                        
                        this.$swal({
                            icon: 'error',
                            text: err.response.data.error,
                        })
                    }
                    if(err.response.data.errors){

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