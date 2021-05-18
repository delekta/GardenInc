FROM node:latest 

WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY ["package.json",".npmignore", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent && mv node_modules ../
RUN npm install -g @angular/cli@latest
COPY . .
EXPOSE 8080
CMD ["ng","serve","--host", "0.0.0.0", "--port", "8080"]


