<script>
   import educacion from '../data/educacion.json';
</script>


<sectior class="resume">
	<div class="row">
		<div class="col s12">
			<div class="resume__cards">
				{#each educacion as item}
					<div class="resume__card">
						<div class="row">
                            <div class="col s12">
							
								<div class="resume__detail">
									<div class="resume__pill">
										<h4 class="resume__h4">
											{item.date}
										</h4>
									</div>
                                    <div class="resume__logo">
                                        <img class="resume__img" src={item.icon} alt={item.name} width="60px" />
                                    </div>
                                    <h3 class="resume__name">
										{item.institution}
									</h3>
									<p class="resume__h3">
										{item.name}
									</p>
									<p class="resume__description">
										{item.description}
									</p>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</sectior>

<style lang="scss">
  @use "../styles/global.scss" as *;
   



.resume{
  margin: 20px 0px;
}

.resume__cards{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 50px;
}

.resume__card{
  display: flex;
  justify-content: space-between;
  border-left: 3px solid $color-hr;
  padding-left: 20px;
}

.resume__card:hover{
  border-left: 3px solid $color-secundary;
  
}

.resume__logo{
  margin: 20px 0px;
}

.resume__pill{
  border: 0.5px solid $color-hr;
  border-radius: 8px;
  width: 110px;
  background-color: $color-third;
  margin-left: 3px;
}

.resume__h4{
  font-family: $font-primary;
  font-size: 1rem;
  text-align: center;
  margin: 10px;
}

.resume__h3{
  font-family: $font-secundary;
  font-size: 1.3rem;
  margin: 10px 0px;
  color: white;
}

.resume__name{
  font-family: $font-primary;
  font-size: 1.2rem;
  color: $color-hr;
  padding-bottom: 10px;
}

.resume__description{
  font-family: $font-primary;
  font-size: 1rem;
  color: white;
}
</style>