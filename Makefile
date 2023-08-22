install:
	npm ci

publish: 
	npm publish --dry-run
	sudo npm link		

lint: 
	npx eslint .	

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8
