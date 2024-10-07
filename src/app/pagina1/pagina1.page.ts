import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.page.html',
  styleUrls: ['./pagina1.page.scss'],
})
export class Pagina1Page {
  pokemons: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://pokeapi.co/api/v2/pokemon?limit=300').subscribe((res: any) => {
      this.pokemons = res.results;
      this.loadPokemonDetails(); // Carrega os detalhes dos Pokémons
    });
  }

  loadPokemonDetails() {
    const detailRequests = this.pokemons.map((pokemon: any) => 
      this.http.get(pokemon.url).toPromise() // Detalhes do Pokémon
    );

    Promise.all(detailRequests).then(details => {
      this.pokemons.forEach((pokemon, index) => {
        pokemon.details = details[index]; // Armazena os detalhes do Pokémon

        // Busca a descrição do Pokémon
        this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.details.id}`).subscribe((species: any) => {
          let brazilianEntry = species.flavor_text_entries.find((entry: any) => entry.language.name === 'pt-br');

          // Tenta buscar a entrada em português padrão
          if (!brazilianEntry) {
            brazilianEntry = species.flavor_text_entries.find((entry: any) => entry.language.name === 'pt');
          }

          // Busca a entrada em inglês como último recurso
          if (!brazilianEntry) {
            brazilianEntry = species.flavor_text_entries.find((entry: any) => entry.language.name === 'en');
          }

          if (!brazilianEntry) {
            console.warn(`Descrição não disponível para ${pokemon.name} (ID: ${pokemon.details.id})`);
          }

          pokemon.description = brazilianEntry ? brazilianEntry.flavor_text.replace(/[\n\r]/g, ' ') : 'Descrição não disponível';
        });
      });
    });
  }
}
