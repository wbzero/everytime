<template>
    <div>
        我的页面
    </div>
</template>

<script>
import {getUser} from '../../netwoke/api/api'
    export default {
        async mounted(){
            let res = await getUser();
            console.log(res);
        }
    }
</script>

<style scoped lang='scss'>

</style>