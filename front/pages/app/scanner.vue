<template>

    <div class="row bg-yellow">
        <div class="col-12">
            <h3 class="text-bold">Scanner QR</h3>
        </div>
        <div class="col-md-8 offset-md-2">
            <div class="card">
                
                <div class="card-body">
                    
                    <div class="form-group px-custom">
                        <label for="">Cantidad de puntos a otorgar</label>
                        <input class="form-control fs-custom" v-model="points" @keypress="isNumber($event)">
                    </div>
                    
                    <p>
                        Last result: <b>{{ decodedContent }}</b>
                    </p>

                    <p class="error">
                        {{ errorMessage }}
                    </p>
                    <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>

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

