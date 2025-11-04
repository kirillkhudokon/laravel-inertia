<script setup>
import { Link } from '@inertiajs/vue3';


</script>

<template>
	<div>
		header
		<hr>
	</div>
	<div>
		<Link href="/">Home</Link> | 
		<Link href="/other">Other</Link>
		<hr>
	</div>
	<div>
		<slot></slot>
	</div>
	<div>
		<hr>
		footer
	</div>
</template>