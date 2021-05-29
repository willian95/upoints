<template>

    <div class="row bg-yellow">
        <div class="col-12">
            <h3 class="text-bold">Perfil</h3>
        </div>
        <div class="col-md-8 offset-md-2">
            <div class="card">
                
                <div class="card-body">
                    <h5 class="card-title">Mis datos</h5>
                    <div class="row">
                        <div :class="$auth.user.role_id == 2 ? 'col-md-6' : 'col-md-12'">
                            <p class="text-center">Imagen de perfil</p>
                            <p class="text-center">
                                
                                <img :src="image" alt="" class="rounded-circle profile-img">
                            </p>
                        </div>
                        <div v-if="$auth.user.role_id == 2" class="col-md-6">
                             <p class="text-center">Mi QR</p>
                            <p class="text-center">
                                <vue-qr :text="$auth.user.user_identification" style="width: 100px;"></vue-qr>
                            </p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="">Nickname</label>
                        <input type="text" v-model="nickname" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="">Nombre</label>
                        <input type="text" v-model="name" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="">Dirección</label>
                        <input type="text" v-model="address" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="">Teléfono</label>
                        <input type="text" v-model="phone" class="form-control">
                    </div>

                </div>
            </div>

        </div>

    </div>

</template>

<script>
    export default {
        middleware:"auth",
        auth:"auth",
        data(){
            return{
                name: this.$auth.user.name,
                image: this.$auth.user.image,
                nickname: this.$auth.user.nickname
            }
        }
    }
</script>

<style>
    .wrapper{
        background-color: #ffeaa7;
    }

    .profile-img{
        width: 30%;
    }
</style>