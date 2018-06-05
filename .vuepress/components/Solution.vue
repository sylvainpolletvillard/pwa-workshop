<template>
    <details>
        <summary>Voir la solution</summary>
        <slot></slot>
    </details>
</template>

<script>
	export default {
		name: "Solution"
	}
</script>

<style scoped>
    details {
        padding: 0.5em 1em;
        background-color: #ccffcc;
        border-radius: 5px;
    }

    summary {
        cursor: help;
        outline: none;
    }
</style>