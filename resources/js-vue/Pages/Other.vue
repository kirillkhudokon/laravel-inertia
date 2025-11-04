<script setup lang="ts">
import { computed, ref } from 'vue';
import DefaultLayout from '../Layouts/DefaultLayout.vue';

const name = ref('');
const hasName = computed(() => name.value.length > 0);

</script>

<template>
	<DefaultLayout>
		<input v-model.lazy.trim="name">
		<div v-if="hasName">
			Hello, {{ name }}
		</div>
	</DefaultLayout>
</template>