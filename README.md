# permission-utils
A set of useful functions for managing group-based permissions.
## Features:

* DB-agnostic because it assumes you've already retrieved the relevant info to pass in
* Framework-agnostic because it just gives you back an object that specifies all permissions for the given user and you can decide what to do with that info
* Can handle whitelisted group permissions or blacklisted.
* Lightweight
* Has zero package dependencies
* Includes a static html page to help you build your whitelist/blacklist (see ./static_html/permsko.html in the repo)
* Runs off json files to specify which "tables" (really could be any resource/collection if you are using nosql) give/revoke which CRUD permissions to which groups.

These json files look like this:
```
{
    "table1": {
        "group1":{"c":true,"r":true,"u":false,"d":false},
        "group2":{"c":false,"r":true,"u":true,"d":false}
    },
    "table2":{}
}
```
For `table1` in the above json, if this were specified as a whitelist, it would grant:

 * create, read, and update to a user who belonged to both group1 and group2
 * create and read to a user who belonged to group1
 * read and update to a user who belonged to group2
 * no permissions to a user who belonged to neither

If this were specified as a blacklist, it would grant:

 * read only to a user who belonged to both group1 and group2
 * create and read to a user who belonged to group1
 * read and update to a user who belonged to group2
 * all permissions to a user who belonged to neither