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
                    <no-ssr>
                        <vue-qr-reader class="w-100" v-if="points != '' && points > 0" v-on:code-scanned="codeArrived" v-on:error-captured="errorCaptured" :responsive="true" line-color="#FFFFFF" stop-on-scanned="false"></vue-qr-reader>
                        <p v-else>Para continuar debes agregar puntos a asignar</p>
                    </no-ssr>

                </div>
            </div>

        </div>

    </div>

</template>

<script>
    import NoSSR from 'vue-no-ssr'
    import VueQrReader from 'vue-qr-reader/dist/lib/vue-qr-reader.umd.js';
    export default {
        middleware:"auth",
        auth:"auth",
        components: {
            'no-ssr': NoSSR,
            VueQrReader
        },
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
            codeArrived(event) {
                console.log("eventos", event.detail[0])
                this.decodedContent = event.detail[0]
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
            errorCaptured(error) {
                switch (error.name) {
                    case 'NotAllowedError':
                    this.errorMessage = 'Camera permission denied.'
                    break;
                    case 'NotFoundError':
                    this.errorMessage = 'There is no connected camera.'
                    break;
                    case 'NotSupportedError':
                    this.errorMessage = 'Seems like this page is served in non-secure context.'
                    break;
                    case 'NotReadableError':
                    this.errorMessage = 'Couldn\'t access your camera. Is it already in use?'
                    break;
                    case 'OverconstrainedError':
                    this.errorMessage = 'Constraints don\'t match any installed camera.'
                    break;
                    default:
                    this.errorMessage = 'UNKNOWN ERROR: ' + error.message
                }
                console.error(this.errorMessage);
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

