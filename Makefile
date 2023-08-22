install:
	npm ci

publish: 
	npm publish --dry-run
	sudo npm link		

lint: 
	npx eslint .	

test:
	npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8
