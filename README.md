- [Clients Registry](#clients-registry)
  - [How to manage a registry ](#how-to-manage-a-registry-)
    - [Create a registry](#create-a-registry)
    - [Save a registry](#save-a-registry)
    - [Edit a registry](#edit-a-registry)
    - [Remove a registry](#remove-a-registry)
  - [How to manage clients ](#how-to-manage-clients-)
    - [Add a client](#add-a-client)
    - [Edit a client](#edit-a-client)
      - [Remove articles](#remove-articles)
      - [Rename or merge](#rename-or-merge)
    - [Remove a client](#remove-a-client)
  - [How to manage categories ](#how-to-manage-categories-)
    - [Add a category](#add-a-category)
    - [Change default selected category](#change-default-selected-category)
    - [Remove a category](#remove-a-category)
  - [How to manage frequent clients ](#how-to-manage-frequent-clients-)
    - [Add a frequent client](#add-a-frequent-client)
    - [Remove a frequent client](#remove-a-frequent-client)


# Clients Registry

Project with webpack and typescript to handle a reigstry of clients during a period of time. 

To create a new account contact me through the following email: [jorge24abrahan@gmail.com](mailto:jorge24abrahan@gmail.com?subject=Create%20clients%20registry%20account&body=I'm%20running%20my%20own%20business%20and%20I'm%20deeply%20interested%20in%20creating%20a%20new%20account%20to%20manage%20my%20sales.%20What%20are%20the%20following%20steps%3F)

Once you have an account you can start familiarizing with the interface. Read the following articles to start right away:

- How to manage (create, save, remove) a registry? <a href="#howToManageARegistry"></a>
- How to manage clients, add/edit/remove articles?
- How to manage article categories (add, set as default, remove)?
- How to manage frequent clients (add, remove)?


## How to manage a registry <a id="howToManageARegistry"></a>

### Create a registry

Let's say you want to create a new registry, there are two different scenarios:
- When you have NO previous registries
  - Click on the "new registry" button right under the image
- When you have previous registries
  - Click on the "new registry" button on the top left corner under the RegClients logo

### Save a registry

Once you've created a new registry and finished [adding the clients](#howToManageClients) click on the "save and exit" button at the bottom of the table of clients.

### Edit a registry
Now, let's say you want to edit the registry because you forgot to add one client, simply click on the pencil icon on the top right corner of the registry that you want to edit. You'll see that this will open the same page as the one when you add a new registry, with the difference that this time you will have a button to exit edit mode, also keep in mind that if you exit edit mode without saving, all changes will be lost.

### Remove a registry

Finally, to remove the registry there are two options:
- Remove a specific registry
  - Look for the registry that you want to remove
  - Click on the trash icon on the top right corner of the registry
- Remove all registries
  - Click on the "remove all" button

> While adding clients to a new registry, all progress will be saved in local storage, so don't worry if you loose your internet connection. Just make sure your internet connection is stable when you save the registry.

## How to manage clients <a id="howToManageClients"></a>

> Once you finish managing your clients remember to [save the registry](#save-a-registry)

### Add a client

Start by creating a [new registry](#create-a-registry). Once you're done, you'll see 4 inputs to add a client:

- name
- price of the article
- amount of articles
- article category

By default the article category is "unknown", but you can add more categories [how?](#howToManageCategories). And you might be wondering, what if I want to add multiple articles to the same client? And it's actually really easy, when you first add a new client it will create it, but if you try to add the same client again with a diferent article, instead of creating a new one, it will lookup for that client and add the article.

> Every time you add a client the name will be kept on hand so that the next time you add an article to the same client you have autocomplete options. Keep in mind that every time you create a new registry, since it will be empty, you won't have autocomplete options at first. However, if you want to have autocomplete for some frequent clients on every registry you create, checkout this article: [How to manage frequent clients?](#howToManageFrequentClients)

### Edit a client

#### Remove articles

For each client, you can have multiple articles or just one, either way, to check the articles added just hover over the client or click it if you are on the mobile version, and click on the button that has an icon like a folder. That will open a popup with the articles registry of that client, so if you want to remove some articles just select them and click on "remove selected".

#### Rename or merge

Hover over the client that you want to edit or click it if you are on the mobile version, and click on the button that has a pencil icon. That will open a popup to edit the client name. Once you've changed the name, if the name is already being used it will ask you if you want to merge it, in case you want to, it will combine the articles of both clients and merge them, in case you don't want to it will just leave it the way it is.

### Remove a client

Removing a client is the easiest task of all. Just Hover over the client you want to remove or click it if you are on the mobile version and click on the button that has a trash icon. That will remove the client completely.

## How to manage categories <a id="howToManageCategories"></a>

First go to your homepage by clicking on the RegClients logo. Once you're there click on the settings icon on the top right corner of the website layout. That should open a settings popup, now that you're there check each case for further instructions: [add](#add-a-category), [set as default](#change-default-selected-category), [remove](#remove-a-category).

### Add a category

To add a new category, write the category name that you want to add on the input under the "add category" section, and after that click on the "add category" button. The added category should reflect under the "added categories" section. Also whenever you add a new client on a registry the category should show up too. However, the category that will be selected by default every time you try to add a new client is "unknown", if you want to change the default category check this article: [How to change default selected category?](#change-default-selected-category)

### Change default selected category

Once you've [added](#add-a-category) all the categories you want, there will always be one category that you will be using the most, and it'll be useful to have it on hand every time you add a new client, that can be easily done by clicking it on the added categories, you'll see that by doing it, the background of that category will change, indicating that has been set to the default value. Now every time you add a new article to a client that will be category selected by default.

### Remove a category

To remove the unwanted categories, just click the trash icon on the right of the category that you want to delete. Remember all categories are listed on the "added categories" section. If you don't know how to access the listed categories start by reading [how to manage categories](#howToManageCategories)

## How to manage frequent clients <a id="howToManageFrequentClients"></a>

Clients that are added on the "frequent clients" list will allow you to easily autocomplete their name while adding them to a new registry. However keep in mind that, every time you add a new client to a registry, an autocomplete option for the name of that client will be created, even if it is already added as frequent client, so you will have two autocomplete options for that client, one marked as (fc) which stands for frequent client and the other with just the name.

Managing frequent clients is a pretty similar task to managing categories. Start by going to the homepage by clicking on the RegClients logo. Once you're there click on the settings icon on the top right corner of the website layout. That should open a settings popup, now that you're there check each case for further instructions: [add](#add-a-frequent-client), [remove](#remove-a-frequent-client).

### Add a frequent client

To add a new client, look for the "add frequent client" section, and write the client name on the input under that section, once you're done click on the "add client" button and that should be it.

### Remove a frequent client

To remove a frequent client, look for the client that you want to remove in the "added clients" section, and click on the trash icon at the right of the client.