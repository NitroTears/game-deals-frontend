# Documentation

## .ENV 
This is the main environment file for the entire project, and there are ways to access these in both the JS and PHP code. This file isn't bundled with the repository, but I can provide this to you. This file contains the variables for a database connection, mailing service details (not used) and other things.

## API Routes
The API uses controllers, which are found in `app\Http\Controllers\`, and currently only DealsDataController.php is used in the project. The controller would hold functions that do regular backend stuff. Conenect to a database to get data and do whatever with it. For example:

An API route is defined in routes\api.php like this:

```php
Route::get('get-data', 'DealsDataController@getData');
```

where "get-data" is the actual route string, "DealsDataController" is the name of the file and class of a controller, and "@getData" is the name of the function that will be used for the route, prexifed with an @ character.

## Regular Web Routes
Regular routes for pages are defined in `routes\web.php` like this:
```php
Route::get('/', function () {
    return view('home');
});
```
where '/' is the url, and '/' is the homepage, and 'home' is the name of the blade file located in `resources\views\` in this case `home.blade.php`

## The JS Files
Currently `home.blade.php` loads `resources/js/app.js` in its `<scripts>` area, and app.js the core file that loads everything else.

```js
function Index() {
  return (
    <ChakraProvider >
      <DealsHome />
    </ChakraProvider>
  );
}
```
app.js loads a `<DealsHome>` component, which is located at `resources\js\components\dealshome.js` and DealsHome is the main home page of the site, and handles both js logic and the html rendering of the site itself through the return statement towards the end of a file. You will see a lot of components/tags with names like `<UnorderedList>` and `<ButtonGroup>`, these are from [Chakra UI](https://chakra-ui.com/getting-started) lackage which handles practically all of the heavy lifting with styling and presentation. The docs for Chakra components can be found [here](https://chakra-ui.com/docs/components).
