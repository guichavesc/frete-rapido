#!/bin/bash

echo "Installing dependencies..."
npm install

echo "Running migrations..."
npx prisma migrate dev --name init

echo "Running Aplication."
npm run dev
