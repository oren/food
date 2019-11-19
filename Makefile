deploy:
	cd ~/p/food
	npx sapper export --basepath /food
	rm -r ~/p/oren.github.io/food/*
	cp -r __sapper__/export/food/* ~/p/oren.github.io/food/
	cd ~/p/oren.github.io && gitpush "deploy food app"
