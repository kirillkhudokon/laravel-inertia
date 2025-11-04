<script setup>
import { inject } from 'vue';
import DefaultLayout from '../Layouts/DefaultLayout.vue';

defineProps({
	a: { type: Number, required: true },
	users: { type: Array, required: true }
})

const http = inject('http');

console.log(http.id)
</script>

<template>
	<DefaultLayout>
		<div>
			{{ a }}
		</div>
		<ul>
			<li v-for="u in users">
				{{ u.email }}
			</li>	
		</ul>
	</DefaultLayout>
</template>