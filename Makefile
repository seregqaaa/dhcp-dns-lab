build: yarn.build

serve:
	docker-compose up

down:
	docker-compose down

deps: yarn.install

yarn.serve:
	yarn serve

yarn.build:
	yarn build

yarn.lint:
	yarn lint

yarn.install:
	yarn install