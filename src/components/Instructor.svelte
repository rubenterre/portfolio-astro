
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
 


.skills__card{
  width: 120px;
  height: 128px;
  border-radius: 8px;
  border: 1px solid $color-hr;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-color: $color-third;
}

.skills__card:hover{
  border: 1px solid white;
  background-color: $color-secundary;

  & .skills__name{
    color: $color-background;
  }
}

.skills__skillicon{
  height: 54px;
  margin-top: 20px;
}

.skills__name{
  font-family: $font-secundary;
  color: white;
  font-size: 1rem;
  padding: 10px;
}

.skills__line{
  border-bottom: 3px solid white;
  width: 41px;
}
</style>