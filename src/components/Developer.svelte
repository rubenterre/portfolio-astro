<script>
	  import developer from '../data/developer.json';

</script>

{#each developer as item}
	<div class="skills__card">
		<img class="skills__skillicon" src={item.icon} alt="Icono de {item.name}" height="54px"/>
		<p class="skills__name">
			{item.name}
		</p>
		<div class="skills__line"></div>
	</div>
{/each}

<style lang="scss">
@use "../styles/global.scss" as *;
 

</style>