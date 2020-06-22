<template>
    <div>
        <div class="w-full max-w-xs text-center">
        <h3> Test Main page </h3><br>
        <h2> Second Header</h2>
         <p class="text-center text-gray-500 text-xs"></p>
         <button v-on:click="startBlue">Scan bluetooth</button>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'MainPage',
    components:{},
    methods:{
    startBlue () {
        this.$store.dispatch('addDevice', {"anyDevices":true})
    },
    ...mapMutations('BLE_DEVICE_ADDED', ['device'])
    }
     
}
</script>