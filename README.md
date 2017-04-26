# CLSP Frontend

This is the Angular 4 frontend for the CLSP rewrite project.

### Running Dev Version of site

Run the development build. Make sure you edit the ```proxy.config.json``` file to point to the address of your backend
```
npm start
```

```npm start``` just runs ```ng serve --proxy-config proxy.config.json``` - the proxy is required so that the frontend and backend can communicate properly. Otherwise, you will run into a CORS issue. 

The authentication issue is caused by [LexikJWTAuthenticationBundle](https://github.com/lexik/LexikJWTAuthenticationBundle), which does not properly support the ```OPTIONS``` HTTP request.

After running the dev server, navigate to ```http://localhost:4200/``` to access the fronend

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.


## Further help

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
