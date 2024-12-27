#!/bin/bash

# Create the dist directory if it doesn't exist
mkdir -p dist

# Copy the necessary files and directories to the dist directory
cp -r index.html css img js dist/

echo "Build completed successfully."