# counter-with-redis
Sample counter web application for Docker lessons with Redis DB

### Prerequisites
- Linux 64 bit
- Docker 1.10+

### Running
    git clone https://github.com/pbes/counter-with-redis.git
    cd counter-with-redis
    docker-compose up -d

It's not needed to build the image separately, it's set in docker-compose.yml to build the web image and bind container port 3000 to host port 3000.

### Usage
- HTTP GET /: increment by 1 and get current counter value
