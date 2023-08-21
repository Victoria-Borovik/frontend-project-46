publish: 
	npm publish --dry-run
	sudo npm link		

lint: 
	npx eslint .	

test:
	npx jest --watch	