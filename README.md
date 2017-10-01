## Gulp frontend builder  
Gulp, Babel, SASS

### Usage

#### Theme setup
Set you frontend path in 'frontendPath' (gulp.babel.js), src & dest.
Example:
```javascript
const frontendPath = 'youFrontendTheme';
const src = {
    scripts: '/scripts/source',
    styles: '/styles/source'
};
const dest = {
    scripts: '/scripts/compiled',
    styles: '/styles/compiled'
};
```

#### Tasks
```bash
## build styles & scripts
gulp build

## build & add watcherfor styles & scripts files
gulp watch

## build only scripts files
gulp scripts

## watcher only for scripts files
gulp scripts:w 

## Clear scripts destination folder
gulp scripts:c

## build only styles files
gulp styles

## watcher only for styles files
gulp styles:w
```

#### Performance
For better performance recommended to use Node version 6+, to update you Node version please use native tools or Node Version Manager [refer here](https://github.com/creationix/nvm/).