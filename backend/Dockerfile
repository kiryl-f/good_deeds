FROM node:18

# Install wait-for-it
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/bin/wait-for-it
RUN chmod +x /usr/bin/wait-for-it

WORKDIR /app

# Copy and install dependencies
COPY package.json ./

RUN npm install
RUN npm run build
# Copy the rest of the application code
COPY . .

# Start the application, waiting for the database to be ready
CMD ["wait-for-it", "db:5432", "--", "npm", "run", "start"]
