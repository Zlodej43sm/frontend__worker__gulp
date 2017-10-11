## Gulp frontend builder  
Gulp, Babel, SASS, PostCSS

### Usage
```bash
npm install
```

#### Theme setup
Set you frontend path in 'PROJECT_PATH' (gulp.babel.js), src & dest.
Example:
```javascript
const PROJECT_PATH = 'yourFrontendTheme',
    STYLES_SRC = '/css/stylus',
    STYLES_DEST = '/css/compiled',
    SCRIPTS_SRC = '/js/source',
    SCRIPTS_DEST = '/js/compiled';
```

#### Tasks
```bash
## Run in development mode
npm run dev

## Run in production mode
npm run build

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