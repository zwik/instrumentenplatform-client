# Build and run in DEV-mode
Container has hot-reload. So every change in code will hav an immediate response in the browswer.
Open with: localhost:8081

## build
```
docker build -t instrumentenplatform:dev
```

## run
````
docker run -v ${PWD}:/app -v /app/node_modules -p 8081:8080 --rm instrumentenplatform:dev
```
{PWD} may not work on Windows. See this Stack Overflow question for more info.
https://stackoverflow.com/questions/41485217/mount-current-directory-as-a-volume-in-docker-on-windows-10

## docker-compose
The same result can be obtained by running with docker-compose.
```
docker-compose up -d --build
```
stop with
```
docker-compose stop
```

# PRODUCTION

## Build
Build and tag. vervang <tag> door een nieuw versienummer. PS: vergeet de punt op het einde van het commando niet !
```
docker build -f dockerfile-prod -t instrumentenplatform:<tag> .
```

# Push naar docker hub
zoek image-id en tag voor repository
```
docker image ls
docker tag <image-id> hugozalm/instrumentenplatform:<tag>
```
(Log in als nog nooit gedaan) 
```
docker push hugozalm/instrumentenplatform:<tag>
```

# Test
Onderstaande commando's starten de container in een (lokale) docker omgeving.
Bij gebrek aan een docker-omgeving kan je de container ook testen op docker-playground.
Ga naar https://www.docker.com/play-with-docker en kies Lab Environment.
```
docker run -dp 80:80 hugozalm/instrumentenplatform:<tag>
```

