var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MyTarget' });
});

router.get('/languages/en-US/app.lang.json', function(req, res, next) {
  res.send(JSON.stringify(
    {
        "appName": "MyTarget",
        "changeLaguage" : "Change laguage",
        "pl" : "Polish",
        "en" : "Angielski",
        "yes": "Yes",
        "no": "No",
        "save" : "Save",
        "cancel" : "Cancel",
        "search" : "Search",
        "editFormat" : "Edit {0}",
        "editLabel" : "Edit",
        "users" : "Users",
        "users.edit" : "Edit user",
        "cookbook" : "Cook book",
        "cookbook.edit" : "Edit recipy"
    }
  ));
});

router.get('/languages/pl-PL/app.lang.json', function(req, res, next) {
  res.send(JSON.stringify(
    {
        "appName": "MojCel",
        "changeLaguage" : "Zmień język",
        "pl" : "Polski",
        "en" : "English",
        "yes": "Tak",
        "no": "Nie",
        "save" : "Zapisz",
        "cancel" : "Anuluj",
        "search" : "Szukaj",
        "editFormat" : "Edytuj {0}",
        "editLabel" : "Edytuj",
        "users" : "Użytkownicy",
        "users.edit" : "Edytuj użytkownikow",
        "cookbook" : "Przepisy",
        "cookbook.edit" : "Edytuj przepis"
    }
  ));
});

router.get('/languages/en-US/users.lang.json', function(req, res, next) {
  res.send(JSON.stringify(
    {
      "systemUsers" : "List of users",
      "name" : "First name",
      "login" : "Login",
      "editHeader" : "Editing {name} ({login})"
    }
  ));
});

router.get('/languages/pl-PL/users.lang.json', function(req, res, next) {
  res.send(JSON.stringify(
    {
      "systemUsers" : "Lista użytkownikow",
      "name" : "Imie",
      "login" : "Login",
      "editHeader" : "Edytujesz {name} ({login})"
    }
  ));
});

module.exports = router;
