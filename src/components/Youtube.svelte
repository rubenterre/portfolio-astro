<script>

const apiKey = import.meta.env.VITE_API_KEY;
const channelId = import.meta.env.VITE_CHANNEL_ID
const maxResults = 3; // Número de videos que quieres mostrar

let videos = [];
 // Función para obtener los últimos videos del canal
 async function getLatestVideos() {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=${maxResults}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      videos = data.items;
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }

  // Llamada inicial para obtener los videos
  getLatestVideos();


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
        <hr class="main__hr" />
    </div>
</section>