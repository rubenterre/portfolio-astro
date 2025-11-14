
<script>
  import instructor from '../data/instructor.json';
</script>

{#each instructor as item}
	<div class="skills__card">
		<img class="skills__skillicon" src={item.icon} alt="Icono de {item.name}" />
		<p class="skills__name">
			{item.name}
		</p>
		<div class="skills__line"></div>
	</div>
{/each}


<style lang="scss">
@use "../styles/global.scss" as *;
 



</style>