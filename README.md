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
export type MyType = {
  'prop1':string,
  'prop2':number
}
```

Dans ce type `Tag`, ajoutez uniquement une propriété `name` et une propriété `color`, toutes deux de type `string`. Par mesure pratique pour la suite, indiquez également une propriété `id` de type `number`.

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
Créez un service `Storage` dont l'objectif sera la lecture / écriture des tags et notes dans le `localStorage` JS.

> [!Note]
> Vous n'avez pour le moment besoin que de remplir la partie "tags" du stockage.
> Assurez-vous notemment de gérer la création de tags, la récupération des tags, la suppression d'un tag et la sauvegarde des tags.

L'injection du service se réalise dans tout composant ou service dans le *scope* indiqué dans le décorateur `@Injectable`.
Par défaut, celui-ci est `root`, indiqué qu'il peut être injecté n'importe où.
Pour injecter un service dans un composant, il suffit de l'indiquer en tant que propriété privée dans le constructeur du composant.

```ts
@Component({
  selector: 'app-example',
  template: ``,
  styles: ``
})
export class ExampleComponent {
  constructor(private test:TestService) {}
  doSomething() {
    this.test.pleaseDoIt();
  }
}
```

Après injection, le service est disponible via appel de la propriété privée dans le composant.

Injectez le service `StorageService` dans votre composant `TagsComponent`.

## Retour aux Tags

### Listing des tags

Dans votre composant `TagsComponent`, en typescript, ajoutez deux propriétés :
- `loaded`, un booléen à false par défaut
- `tags`, un tableau de `Tag`s, par défaut vide

Ajoutez une méthode `loadTags()` qui chargera, si pas déjà chargés (on utilisera la propriété `loaded` pour cela), la liste des tags, via le service `StorageService`, pour peupler le tableau `tags`.
Enfin, dans la partie HTML, ajoutez une liste complétée par une boucle `@for`, afin d'afficher la liste des tags.

```html
<ul>
  @for(tag of tags; track $index) {
    <li>{{ tag.name }}</li>
  } @empty {
    <li>Aucun tag !</li>
  }
</ul>
```

> [!Tip]
> `@empty` est utilisé pour indiquer le cas où la liste utilisé dans le `@for` précédent est vide.

### Ajout d'un tag et événement

Dans votre fichier typescript, ajoutez une méthode `dialogAddTag()` qui réalisera un simple `window.prompt` afin de demander à l'utilisateur le nom du tag.
Si la saisie n'est pas vide, on créera un tag et on l'ajoutera dans la liste `tags` tout en l'enregistrant via `StorageService`.
Ensuite, dans votre fichier html, ajoutez un lien simple (sans `href`) avec un attribut `(click)` (avec les parenthèses) réalisant l'appel à `dialogAddTag()`.
Vous indiquerez, entre les balises a, un texte comme par exemple "Ajouter une nouvelle étiquette".

> [!Note]
> Les parenthèses, en HTML dans Angular, permettent d'indiquer des gestionnaires d'événements.
> Les événements "classiques" valides DOM sont généralement gérés.

Testez votre code en cliquant sur le lien. Que constatez-vous ?

Ajoutez un attribut href "standard" `href="#"` et testez à nouveau.

> [!Caution]
> Le retour de la fonction gérant l'événement indique si l'événement doit être propagé ou non.
> En renvoyant `false` dans votre méthode, vous "stoppez" la propagation et donc évitez le comportement par défaut, qui est de "rediriger" vers l'ancre #.

### Découpage en profondeur

Notre composant `TagsComponent` fonctionne bien, mais il reste plusieurs soucis.
- il faudrait ajouter un moyen d'éditer une étiquette
- de supprimer une étiquette également
- si on veut réutiliser l'affichage d'une étiquette hors du composant, il faut copier/coller du code qui "vivra" indépendemment

Créez donc un composant `TagComponent` qui sera chargé de l'affichage d'un unique `Tag`.

Une fois le composant créé, ajoutez un signal d'entrée input() pour chaque propriété d'un tag, à savoir `id`, `name` et `color`.
Pour rappel, un signal d'entrée peut être défini comme suit :

```ts
myInput = input<string>("Default value");
```

Nous allons maintenant remplacer le code HTML de votre composant `TagComponent` par l'affichage d'un tag unique, tel que vous l'aviez défini dans la boucle de `TagsComponent`.
Puis, en lieu et place de votre ancien code d'un unique tag dans le HTML de `TagsComponent`, utilisez le composant Tag, par exemple comme suit:

```html
<ul>
  @for(tag of tags; track $index) {
    <li><app-tag [id]="tag.id" [name]="tag.name" [color]="tag.color"></app-tag></li>
  } @empty {
    <li>Aucun tag !</li>
  }
</ul>
```

Vérifiez que votre code fonctionne toujours.

### Suppression

Nous allons désormais ajouter la suppression. Il n'est pas dans la logique des choses qu'une étiquette puisse s'auto-détruire - cette responsabilité revient au listing des étiquettes.
Dans la boucle HTML de `TagsComponent`, ajoutez un bouton HTML avec un événement, au clic, pour supprimer le tag à coté, via une méthode `deleteTag(t:Tag)` que vous ajouterez dans votre typescript associé.
Basez-vous sur le travail déjà réalisé dans `dialogAddTag()` pour cela.

### Création et modification

De même, nous allons créer un formulaire afin de créer et modifier aisément des étiquettes. Ce formulaire ne s'affichera que lorsqu'on souhaitera ajouter une nouvelle étiquette
