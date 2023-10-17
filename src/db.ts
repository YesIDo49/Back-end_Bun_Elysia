import { Database } from 'bun:sqlite';

export interface Anime {
    id?: number;
    name: string;
    mangaka: string;
}

export class AnimeDatabase {
    private db: Database;

    constructor() {
        this.db = new Database('animes.db');
        // Initialize the database
        this.init()
            .then(() => console.log('Database initialized'))
            .catch(console.error);
    }

    // Get all animes
    async getAnimes() {
        return this.db.query('SELECT * FROM animes').all();
    }

    // Add a anime
    async addAnime(anime: Anime) {
        // q: Get id type safely
        return this.db.query(`INSERT INTO animes (name, mangaka) VALUES (?, ?) RETURNING id`).get(anime.name, anime.mangaka) as Anime;
    }

    // Update a anime
    async updateAnime(id: number, anime: Anime) {
        return this.db.run(`UPDATE animes SET name = '${anime.name}', mangaka = '${anime.mangaka}' WHERE id = ${id}`)
    }

    // Delete a anime
    async deleteAnime(id: number) {
        return this.db.run(`DELETE FROM animes WHERE id = ${id}`)
    }

    // Initialize the database
    async init() {
        return this.db.run('CREATE TABLE IF NOT EXISTS animes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, mangaka TEXT)');
    }
}