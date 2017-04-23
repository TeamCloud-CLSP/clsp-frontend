# Development Documentation

Run the development build. Make sure you edit the ```proxy.config.json``` file to point to the address of your backend
```
npm start
```

Build packageable version of the site - uses dev ```enviroments/enviroment.ts``` config file
```
ng build
```

Build packageable version of the site - uses production ```enviroments/enviroment.prod.ts``` config file
```
ng build --env=prod
```
