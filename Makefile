.PHONY: list
list:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'

deploy:
	cd ~/p/food
	npx sapper export --basepath /food
	rm -r ~/p/oren.github.io/food/*
	cp -r __sapper__/export/food/* ~/p/oren.github.io/food/
	cd ~/p/oren.github.io && gitpush "deploy food app"

export:
	npx sapper export --basepath /food

run-local:
	npx serve __sapper__/export/

