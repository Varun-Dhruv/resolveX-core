.PHONY: install build push

                                                                                                                                                  
       
install:
	@echo "Installing dependencies"
	@yarn install

build:
	@echo "Building the app"
	@yarn build

compose-up:
	@echo "Starting the app"
	@docker-compose up ${flags}

compose-down:
	@echo "Stopping the app"
	@docker-compose down

compose-restart:
	@echo "Restarting the app"
	@docker-compose restart
