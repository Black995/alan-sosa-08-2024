export interface Pokemon {
  name: string
  url: string
  pokemon_image?: string
}

// Mostrar su nombre, imagen, tipos, stats (con gráfico), sonido (cries) que se pueda escuchar, altura, peso, descripción y cadena evolutiva
interface Stat {
  base_stat: number;
  effort: number;
  stat: StatDetail;
}

interface StatDetail {
  name: string;
  url: string;
}

interface Type {
  name: string
  url: string
}

interface TypeSlot {
  slot: number
  type: Type
}

export interface PokemonDetail {
  id: number
  name: string
  url: string
  pokemon_image?: string
  types: TypeSlot[]
  stats: Stat[]
  cry: string
  height: number
  weight: number
}