<template>
 <p>
 <foo></foo>
 <bar></bar>
 </p>
</template>
<script>
 import Foo from './components/Foo.vue';
 import Bar from './components/Bar.vue';
 export default {
    components:{
        Foo,
        Bar
    }
 }
</script>