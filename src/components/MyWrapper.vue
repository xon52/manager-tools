<template>
	<div class="wrapper">
		<header>
			<slot name="header"></slot>
		</header>

		<nav>
			<slot name="nav"></slot>
		</nav>

		<main>
			<slot></slot>
		</main>

		<footer>
			<slot name="footer"></slot>
		</footer>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.wrapper {
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow: hidden;
}
.wrapper header {
}

.wrapper nav {
}

.wrapper main {
	flex: 1;
	overflow-y: auto;
	padding: 1rem;
	background-color: #f4f4f4;
	border-radius: 1rem;
	box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
}

.wrapper footer {
}
</style>
