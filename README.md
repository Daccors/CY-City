# CY-City
![`La Ville de Cergy`](public/laVille.png)

## Installation des frameworks et API
### Angular CLI
Pour télécharger angular, il vous faudra d'abord **node.js** que vous pouvez télécharger sur [le site de nodejs]("https://nodejs.org/en").

Un fois node.js correctement installé, faire `npm install -g @angular/cli` pour télécharger angular CLI.

Il faudra aussi installer un module en faisant `ng add @angular/material`.

### Laravel
Pour utiliser laravel il faudra avoir **php** d'installé.
Vous pourrez le trouver [sur le site de php](https://www.php.net/).
Certaines sources indique aussi qu'il vous faudra **Composer** téléchargable [`ici`](https://getcomposer.org/download/)

### Superset
En ayant **node.js** et **python** faire `pip install apache-superset`

***
***

## Lancer le site
> Si vous avez accès à un terminal bash (git-bash fonctionne) vous pourrez faire :
> ```sh
>  bash start.sh
>  ```
> Ce qui lancera tous les services nécessaires

> Sans terminal bash, il faudra lancer un terminal pour chaques services:
> <br>**Lancer Laravel**
> ```sh
> cd ./backend
> php artisan serve
> cd ..
> ```
> **Lancer Angular**
> ```sh
> ng serve
> ```

***
***

## Arreter les services
Vous devrez faire `Ctrl + C` dans le terminal où vous avez lancé vos services.



