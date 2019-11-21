## Run
```
npm install
HOST=XXX.XXX.XXX.XXX PORT=XXXX npm run dev
```

Open localhost:3000 on your laptop or mobile phone

## Deploy
```
npx sapper export --basepath /food
cp -r __sapper__/export/food/* ~/p/oren.github.io/food/
```

## Features

* [ ] Improve UX of managing food
* [ ] Create Meal
* [ ] Mass deletion
* [ ] Import and export food

## Links
* https://developers.google.com/web/tools/chrome-devtools/remote-debugging
* https://codelabs.developers.google.com/codelabs/your-first-pwapp/#4
* Look into purgeCSS (it removes all unused classes from any current page) since all the TailwindCSS classes are added to the global.css which ads kb's and ultimately a slower app.
