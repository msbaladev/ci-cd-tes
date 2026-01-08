server:
	python3 -m  manage runserver


build:
	docker compose --profile app -f docker-compose.yml build

run:
	docker compose --profile app -f docker-compose.yml up