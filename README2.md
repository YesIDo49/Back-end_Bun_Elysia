# Architecture Back-end
Ce projet est un template pour démarrer un projet back-end avec Bun et Elysia. Avec ce projet, vous pourrez faire un CRUD basique sur une base de données MongoDB. 
De plus, plusieurs dépendances sont déjà installées et configurées pour vous améliorer ce projet, dont une authentification.

Important : L'authentification étant paramétrée pour une utilisation en local, il est nécessaire de la reconfigurer pour une utilisation en production.

Actuellement les logins sont :
#### username : admin
#### password : admin


- [Installation](#installation)
    - [Bun](#bun)
    - [Bun sur windows](#bun-sur-windows)
    - [Lancer le projet](#lancer-le-projet)
- [Dépendances](#dépendances)
  - [Swagger](#swagger)
  - [Helmet](#helmet) 
  - [Basic Auth](#basic-auth)



## Installation

### Bun

Pour télécharger Bun, il vous suffit de lancer la commande suivante :
```bash
npm i -g bun
```
Cependant cette dernière ne fonctionnera pas sous Windows.

### Bun sur windows

- Pour pouvoir utiliser Bun sous Windows, il vous faudra autoriser les sous-systèmes de Linux dans vos paramètres puis installer Ubuntu comme invite de commande.
- Voici une vidéo qui vous explique comment faire : https://www.youtube.com/watch?v=aNL3gXW0ZuM

Ps : Utiliser Bun sur windows est un véritable challenge, j'ai perdu du temps à essayer de le faire fonctionner. Je vous conseille donc d'utiliser un autre OS si vous le pouvez.

### Lancer le projet

- Vous pouvez maintenant lancer le projet avec la commande :
```bash
bun dev
```
ou
```bash
bun run dev
```

## Dépendances

### Swagger

```bash
bun add @elysiajs/swagger
```
- Swagger vous permet d'ajouter de la documentation sur ses API REST et de générer une console d'API interactive.
- Vous pourrez donner des descriptions sur vos routes, vos paramètres, vos réponses, etc.

### Helmet

```bash
bun add elysia-helmet
```
- Helmet aide à renforcer la sécurité du projet en configurant automatiquement des headers HTTP sécurisés dans les réponses générées par l'application.

### Basic auth

```bash
bun add @eelkevdbos/elysia-basic-auth
```
- Basic auth est un middleware qui permet de sécuriser les routes de votre choix avec une authentification basique. 
- Comme dit plus tôt, les logins actuelles sont :
#### username : admin
#### password : admin

