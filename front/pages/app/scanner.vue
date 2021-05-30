<template>

    <div class="row bg-yellow">
        <div class="col-12">
            <h3 class="text-bold">Scanner QR</h3>
        </div>
        <div class="col-md-8 offset-md-2">
            <div class="card">
                
                <div class="card-body">
                    
                    <div class="form-group">
                        <label for="">Cantidad de puntos a otorgar</label>
                        <input class="form-control fs-custom" v-model="points" @keypress="isNumber($event)">
                    </div>

                    <p class="error">
                        {{ errorMessage }}
                    </p>
                    <p>Decoded: {{ decodedContent }}</p>
                    <!--<button @click="onDecode('345434545-williancliente')">test</button>-->
                    <client-only>
                        <qrcode-stream v-if="points != '' && points > 0" @decode="onDecode" @init="onInit"></qrcode-stream>
                        <p v-else>Para continuar debes agregar puntos a asignar</p>
                    </client-only>

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
                decodedContent: '',
                errorMessage: '',
                points:1,
                isNumber(evt) {
                    evt = (evt) ? evt : window.event;
                    var charCode = (evt.which) ? evt.which : evt.keyCode;
                    if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
                        evt.preventDefault();;
                    } else {
                        return true;
                    }
                }
            }
        },
        methods:{
            onDecode(content) {
                this.decodedContent = content
                let splittedContent = content.split("-")
                let userIdentification = splittedContent[0]
                let nickname = splittedContent[1]

                this.$swal({
                    title:"¿Estás seguro?",
                    text: "Enviarás "+this.points+" puntos a @"+nickname,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, estoy seguro!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.updateUserPoints(userIdentification)
                    }
                })
            },
            async updateUserPoints(userIdentification){

                let formData = new FormData
                formData.append("userIdentification", userIdentification)
                formData.append("points", this.points)

                let res = await this.$axios.post("points/assignment", formData)
                if(res.data.success == true){

                    this.$swal({
                        text:res.data.msg,
                        icon:"success"
                    }).then(ans => {

                        this.$router.push("/app/dashboard")

                    })

                }else{

                     this.$swal({
                        text:res.data.msg,
                        icon:"error"
                    })

                }

            },
            onInit(promise) {
                promise.then(() => {
                    console.log('Successfully initilized! Ready for scanning now!')
                })
                    .catch(error => {
                    if (error.name === 'NotAllowedError') {
                    this.errorMessage = 'Hey! I need access to your camera'
                    } else if (error.name === 'NotFoundError') {
                    this.errorMessage = 'Do you even have a camera on your device?'
                    } else if (error.name === 'NotSupportedError') {
                    this.errorMessage = 'Seems like this page is served in non-secure context (HTTPS, localhost or file://)'
                    } else if (error.name === 'NotReadableError') {
                    this.errorMessage = 'Couldn\'t access your camera. Is it already in use?'
                    } else if (error.name === 'OverconstrainedError') {
                    this.errorMessage = 'Constraints don\'t match any installed camera. Did you asked for the front camera although there is none?'
                    } else {
                    this.errorMessage = 'UNKNOWN ERROR: ' + error.message
                    }
                })
            }
        }
    }
</script>

<style>
    .fs-custom{
        font-size: 25px;
    }

    .px-custom{
        padding-right: 10rem;
        padding-left: 10rem;
    }

    
</style>

