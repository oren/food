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
* [ ] Set Calory and macro goals
* [ ] Create Meal
* [ ] Mass deletion
* [ ] Import and export food
