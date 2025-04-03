# m1-ng-notes

## Création du projet

Créez un nouveau projet angular via `ng new <project>` en remplaçant `<project>` par le nom de votre projet (par exemple `ng new test` créera un projet `test`).

> [!Warning]
> Votre projet doit être versionné ASAP. N'attendez pas.
> Angular crée automatiquement un dépôt local lorsque vous initialisez un projet.
> Tout ce qu'il vous reste à faire est d'ajouter le remote et de synchroniser.

Une fois votre projet créé, ouvrez-le dans votre IDE favori.
Démarrez le projet via un `npm start` **__dans le dossier de votre application angular__**.
Angular va lancer le transpilage et va lancer un serveur nodejs.
Vous pouvez alors consulter votre application via [http://localhost:4200/].

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

## Création du composant "Tags"

Nous allons créer un composant pour afficher la liste des tags.
Pour cela, utilisez la commande `ng g c Tags`, qui vous génère les quatre fichiers de base pour un composant, tous rangés dans un dossier du même nom, dans le composant racine.

## Activation du routage

### Ajout de la route
La liste des routes est indiquée dans le fichier `app.routes.ts`. Une route est constituée de plusieurs éléments, mais la façon la plus simple de définir une route est d'indiquer un chemin et le composant correspondant.
Un exemple serait le suivant : `{path:'', component: NotesComponent}` pour ajouter l'information de l'usage du composant NotesComponent lorsque la route est "" (donc vide, donc par défaut).
Ajoutez la route `/tags` liée au composant `TagsComponent`.

### Injection du composant routé
Nous allons maintenant indiquer le "slot" dans lequel l'application va charger et afficher le résultat de la route en cours.
Pour cela, dans votre fichier `app.component.html`, ajoutez la balise `router-outlet` de la manière suivante, dans votre main : `<router-outlet></router-outlet>`.

> [!Note]
> Une erreur apparaît, indiquant que "routeur-outlet est inconnu. C'est normal, et traité dans le paragraphe suivant.

### Dépendance
Dans `app.component.ts` nous avons maintenant besoin d'indiquer au template qu'il utilise le module de routage, afin de l'informer de l'existence de la balise `router-outlet`.
Pour cela, ajoutez `RouterOutlet` à la liste des `imports` dans le décorateur `@Component`.

> [!Tip]
> N'oubliez pas de réaliser les imports nécessaires en haut de votre fichier TS !

### Ajout des liens
La manière "propre" d'ajouter des liens reste d'utiliser une balise `<a>`, mais au lieu d'indiquer un attribut `href`, on utilise un attribut `routerLink` pour indiquer la route concernée.
Cet attribut est défini dans l'import `RouterLink`. Ajoutez-le donc de la même manière que vous avez importé `RouterOutlet`, afin d'ajouter un lien, dans votre menu principal, vers la page par défaut.

## Service de stockage

Les classes utilitaires que l'on utilise dans les différents composants et qui ont un rôle particulier sont des services, qu'on injecte au besoin.
Pour créer un service, la commande AngularCLI serait `ng generate service <nom>` ou `ng g s <nom>`, qui génère la classe de service ainsi que le fichier de tests unitaires.
Un service n'est qu'une classe comme une autre affublée d'un décorateur `@Injectable`.

