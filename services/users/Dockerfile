FROM golang:1.14-alpine3.12 as builder

RUN mkdir /go/src/users
COPY . /go/src/users
WORKDIR /go/src/users

RUN apk add git
RUN echo "Install gin" &&  go get github.com/gin-gonic/gin 
RUN echo "Install gin cors" && go get github.com/gin-contrib/cors

RUN go build -o /go/bin/users .

FROM alpine:latest
RUN mkdir /users
WORKDIR /users
COPY --from=builder /go/bin/users .
RUN chmod 755 users
CMD ["./users"]