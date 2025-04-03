# m1-ng-notes

## Création du projet

Créez un nouveau projet angular via `ng new <project>` en remplaçant `<project>` par le nom de votre projet (par exemple `ng new test` créera un projet `test`).

> [!Warning]
> Votre projet doit être versionné ASAP. N'attendez pas.
> Angular crée automatiquement un dépôt local lorsque vous initialisez un projet.
> Tout ce qu'il vous reste à faire est d'ajouter le remote et de synchroniser.

Une fois votre projet créé, ouvrez-le dans votre IDE favori.

## Modification basique

Ouvrez les fichiers `app.component.html` et `app.component.ts`.
Effectuez les modifications nécessaires pour qu'au lieu d'afficher "Hello `<project>`, vous affichez "Bonjour `<votre nom>` !!".

> [!Note]
> Le composant "app" est le composant racine traditionnellement conservé.

## Création des entités

Nous allons commencer par créer nos entités.

### Création de l'entité via ng generate
Vous pouvez créer une interface via `ng generate interface <nom>` ou, en forme raccourcie, `ng g i <nom>`.
Créez donc une interface "note" via cette commande.

> [!Note]
> La commande `ng g i` crée une interface, et non un type. Le fichier généré est placé dans le composant racine, et s'appelle de manière sobre `<nom>.ts`.
> La bonne pratique veut que les fichiers de modèles soient nommés ".model.ts", ce qui se fait via l'argument `--type=model` dans le `ng g i`.

### Création de l'entité "à la main"
Créez un fichier `tag.ts` dans le composant racine. Ce fichier contiendra le modèle, sous forme de `type` cette fois, de votre tag.
Un rappel de comment créer un type en TS :

```ts
export type MyType {
  'prop1':string,
  'prop2':number
}
```

## Correction de la classe Note

Parce qu'on va avoir besoin d'une certaine intelligence dans une Note, une simple interface ou un type ne suffira plus. Nous allons transformer Note en classe.

Rappel d'une syntaxe d'une classe:
```ts
export class MyClass {
  p1:number = 0;
  method() {
    this.p1++;
  }
}
```

## Modification de la structure globale HTML/CSS

Modifiez votre `app.component.html` pour ajouter votre interface "générale", soit :
- le pied de page
- le menu principal avec titres et liens de navigation
- un corps vide (juste une balise `<main></main>` vide)

Personnalisez votre CSS de `app.component.css` pour appliquer le style que vous avez souhaité pour votre application.

## Activation du routage

