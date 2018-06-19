<template>
    <details @toggle="toggle" :class="{ visible: isVisible, hidden: !isVisible }">
        <summary>{{ isVisible ? labelVisible : labelHidden }}</summary>
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
        },
        computed: {
			locale(){
				switch(window.location.pathname.split('/')[1]){
                    case 'fr': return 'fr'
                    default: return 'en'
                }
            },
            labelVisible(){
				switch (this.locale){
                    case 'fr': return 'Solution'
                    default: return 'Solution'
                }
            },
            labelHidden(){
				switch (this.locale){
					case 'fr': return 'Voir la solution'
					default: return 'See the solution'
                }
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