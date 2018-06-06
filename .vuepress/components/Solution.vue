<template>
    <details @toggle="toggle" :class="{ visible: isVisible, hidden: !isVisible }">
        <summary>{{isVisible ? "Solution": "Voir la solution"}}</summary>
        <slot></slot>
    </details>
</template>

<script>
	export default {
		name: "Solution",
        data: () => ({
			isVisible: false
        }),
        methods: {
			toggle(event){
				this.isVisible = event.target.open
            }
        }
	}
</script>

<style scoped>
    details {
        padding: 0.5em 1em;
        background-color: #ccffcc;
        border-radius: 5px;
    }

    summary {
        outline: none;
        cursor: help;
    }
</style>