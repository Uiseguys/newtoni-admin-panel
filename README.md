# newtoni-admin-panel
Angular based admin panel accessing/managing the newtoni-api

is hooked up to netlify deploy on every push to the 'develop' branch
target is here:
newtoni-admin-panel.netlify.com

## How to start

**Note** that this seed project requires node v4.x.x or higher, npm 2.14.7 and Angular 5.x

In order to start the seed use:

    $ git clone https://github.com/Uiseguys/newtoni-admin-panel/
    $ cd newtoni-admin-panel
    # install angular-cli
    $ npm install -g @angular/cli
    # install the project's dependencies
    $ npm install
    $ ng serve --open

## Configuration

### api and netlify webhooks

There are 2 files(environment.prod.ts, environment.ts) if you look inside src/environments.
environment.ts is for develop and environment.prod.ts is for product version.
You can run app in product version `ng serve --prod`,

    export const environment = {
      production: true,
      siteUrl: '',
      apiUrl: 'https://newtoni-api.herokuapp.com'
    };

* apiUrl
  The site url of **[newtoni-api](https://github.com/Uiseguys/newtoni-api)**.

## Build

Please run `ng build --prod`
