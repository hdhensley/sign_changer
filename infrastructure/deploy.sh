#!/bin/bash
cd ..
./build.sh

cd infrastructure
cdk deploy --profile sign-changer-admin