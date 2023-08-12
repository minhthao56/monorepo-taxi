# usermgmt
build-usermgmt:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -v -o ./build/usermgmt ./services/usermgmt/


docker-usermgmt:
	docker build -f deployment/usermgmt.Dockerfile -t taxi/usermgmt .


# ordermgmt
build-ordermgmt:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -v -o ./build/ordermgmt ./services/ordermgmt/


docker-ordermgmt:
	docker build -f deployment/ordermgmt.Dockerfile -t taxi/ordermgmt .

# authmgmt
build-authmgmt:
	cd services/authmgmt/ && cargo build --release && cp -r target ../../build/


run-authmgmt:
	cd services/authmgmt/ && cargo run

docker-authmgmt:
	docker build -f deployment/authmgmt.Dockerfile -t taxi/authmgmt .

# communicatemgmt
build-communicatemgmt:
	cd services/communicatemgmt/ && yarn && yarn build && cp -r dist ../../build/
	cp -r services/communicatemgmt/package.json build/
	cd build && yarn --production

docker-communicatemgmt:
	docker build -f deployment/communicatemgmt.Dockerfile -t taxi/communicatemgmt .

run-communicatemgmt:
	cd services/communicatemgmt/ && npm start

yarn-add:
	cd services/communicatemgmt/ && yarn add $(p)