<script>

const { apiKey, channelId } = $props();

const maxResults = 3;

let videos = $state([]);

// El efecto depende de apiKey, channelId y maxResults
$effect(() => {
  // Accedemos a las variables para que sean dependencias reactivas
  void apiKey;
  void channelId;
  void maxResults;

  (async () => {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=${maxResults}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      videos = data.items;
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  })();
});
</script>

<section class="youtube">
    <div class="container">
        <div class="row">
            <div class="col s12">
                <div class="main__pills">
					<div class="main__pill">
						<img
							class="main__img"
							src="icons/sections/youtube_icon.svg"
							alt="Icono del apartado sobre mis vídeos en YouTube"
						/>
						<p class="main__tit">Canal en YouTube</p>
					</div>
				</div>
                <div class="youtube__logo">
                    <img src="icons/logos/YouTube_light_logo_(2017).svg" alt="Logo de YouTube" class="youtube__img" width="150px">
                </div>
				<h2 class="main__h2">
					Echa un ojo a mis últimos <span class="main__span">vídeos</span> en desarrollo web.
				</h2>
            </div>
            <div class="col s12">
                <div class="row">
                    {#if videos.length > 0}
                    {#each videos as video}
                    <div class="col s12 m4">
                        <a href="https://www.youtube.com/watch?v={video.id.videoId}" target="_blank" class="youtube__a">
                            <picture class="youtube__picture">
                                <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} width="100%" height="100%" type="image/jpeg" class="youtube__thumbnail">
                            </picture>
                        </a>
                    </div>
                    {/each}
                    {:else}
                    <p>Cargando videos...</p>
                    {/if}
                </div>
            </div>
        </div>
        <div class="col s12">
          <div class="youtube__btn">
                    <a
        href="https://www.youtube.com/@rubenterre?sub_confirmation=1"
        class="youtube__button"
      >
        <img
          class="youtube__imglink"
          src="/icons/link-icon.svg"
          alt="Icono de enlace al canal de YouTube"
          width="14px"
        />
        <p class="youtube__p">Ver el canal de YouTube</p>
      </a>
          </div>

        </div>
        <hr class="main__hr" />
    </div>
</section>

<style lang="scss">
@use "../styles/global.scss" as *;

// Youtube

.youtube{
  margin-bottom: 40px;
}
.youtube__logo{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.youtube__picture{
  max-width: 100%;
  width: 100%;
  display: block;
  border: 1px solid $color-hr;
  border-radius: 8px;
}

.youtube__thumbnail{
  overflow: hidden;
  transition: all .1s linear;
  pointer-events: none;
  aspect-ratio: 16 / 9;
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.youtube__picture:hover{
  border: 1px solid $color-secundary;
}

.youtube__btn{
  display: flex;
  justify-content: center;
  align-items: center;
}

.youtube__button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: $color-third;
    padding: 10px 40px;
    border: 1px solid $color-hr;
    border-radius: 8px;
    margin: 40px 0px;
    max-width: 600px;
  }

  .youtube__button:hover {
    border: 1px solid white;
  }

  .youtube__imgcv {
    width: 14px;
  }

  .youtube__p {
    padding-left: 10px;
    font-family: $font-primary;
    font-size: 1.2rem;
    text-align: center;
  }
</style>
