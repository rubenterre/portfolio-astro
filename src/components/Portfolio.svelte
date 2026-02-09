<script>
  import projectsDev from "../data/projectsDev.json";
</script>

<section class="portfolio" id="portfolio">
  <div class="container">
    <div class="row">
      <div class="col s12">
        <div class="main__pills">
          <div class="main__pill">
            <img
              class="main__img"
              src="icons/sections/portfolio_icon.svg"
              alt="Icono del apartado sobre mis trabajos y proyectos"
            />
            <p class="main__tit">Portfolio</p>
          </div>
        </div>
        <h2 class="main__h2">
          Mostrando algunos de mis <span class="main__span">trabajos</span> en desarrollo
          web y diseño gráfico.
        </h2>
        <div class="portfolio__cards">
          <div class="row">
            <div class="col s12">
              {#each projectsDev as item}
                <div class="portfolio__card">
                  <div class="portfolio__img">
                    <img
                      src={item.banner}
                      alt={item.name}
                      class="portfolio__work"
                      width="354px"
                    />
                  </div>

                  <div class="portfolio__details">
                    <h3 class="portfolio__h3">{item.name}</h3>
                    <div class="portfolio__pills">
                      {#each item.technologies as tech}
                        <img
                          class="portfolio__pill"
                          src={tech.icon}
                          alt={tech.name}
                          width="18px"
                        />
                      {/each}
                    </div>
                    <p class="portfolio__description">
                      {item.description}
                    </p>
                    <div class="portfolio__buttons">
                      <a class="portfolio__a" href={item.urlcode}>
                        <img
                          src="icons/brand-github.svg"
                          alt="Logo de GitHub"
                          class="portfolio__code"
                        />
                        <p class="portfolio__url">Código</p>
                      </a>
                      <a
                        class="portfolio__a portfolio__a--preview"
                        href={item.url}
                      >
                        <img
                          src="icons/link_symbol-1.png"
                          alt="Enlace a la web del proyecto"
                          class="portfolio__code"
                        />
                        <p class="portfolio__url">Ver</p>
                      </a>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <div class="portfolio__more">
          <a
            href="https://www.behance.net/rubenterre"
            class="portfolio__a portfolio__a--more"
          >
            VER MÁS TRABAJOS
          </a>
        </div>
      </div>
    </div>
    <hr class="main__hr" />
  </div>
</section>

<style lang="scss">
  @use "../styles/global.scss" as *;

  // Portfolio

  .portfolio__cards {

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .portfolio__card {


	  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  align-items: center;
  gap: 2rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: lighten($color-third, 5%); 
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  margin: 10px 0px;
  }


  .portfolio__h3 {
  font-family: $font-primary;
  font-size: 1.4rem;
  margin: 0 0 0.75rem;
}

.portfolio__description {
  font-family: $font-primary;
  color: $color-hr;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 1.25rem;
}

.portfolio__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 0;
}

  .portfolio__img {
  width: 100%;
  max-width: 520px;
}

.portfolio__work {
  border-radius: 12px;
  width: 100%;
  display: block;
}

  .portfolio__work:hover {
    box-shadow: 0px 4px 10px $color-secundary;
  }

  .portfolio__pills {
    margin: 15px 0px;
    display: flex;
    gap: 10px;
  }

  .portfolio__a {
    display: flex;
    border: 1px solid $color-hr;
    border-radius: 8px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    width: 100px;
    background-color: $color-third;
    text-decoration: none;
  }

  .portfolio__code {
    height: 1rem;
    margin-right: 10px;
  }

  .portfolio__url {
    font-family: $font-primary;
    font-size: 1rem;
    color: white;
    text-decoration: none;
  }

  .portfolio__a--preview {
    width: 100px;
  }

  .portfolio__more {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0px;
  }

  .portfolio__a--more {
    width: 250px;
    font-family: $font-primary;
    font-size: 1.2rem;
    color: white;
  }

  @media (min-width: 1024px) {
  .portfolio__h3 {
    font-size: 1.4rem;
  }

  .portfolio__description {
    font-size: 1.05rem;
    line-height: 1.6;
  }

  .portfolio__buttons {
    gap: 24px;
  }
}

  @media (max-width: 1024px) {
    .portfolio__details {
      margin-left: 10px;
    }
  }

@media (max-width: 768px) {
  .portfolio__card {
    grid-template-columns: 1fr;
  }

  .portfolio__details {
    margin-top: 1.5rem;
    margin-left: 0;
  }
}
</style>
