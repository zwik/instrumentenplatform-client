# base image: node-alpine latest LTS
FROM node:14.16.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# this ensures that the executables created during the npm build process can be found 
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
# copying the JSON file rather than the whole working directory
# allows us to take advantage of Docker’s cache layers. 
COPY package.json /app/package.json
RUN npm install

# start app
CMD ["npm", "run", "serve"]