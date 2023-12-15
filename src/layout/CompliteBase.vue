<script setup lang="ts">
    import headers from './headers.vue'
    import footers from './footers.vue'
</script>

<template>
    <!-- header -->
    <headers />
    <!-- content -->
    <RouterView />
    <!-- footer -->
    <footers />
</template>
