#!/bin/bash

rm -rf frontend/.prettierrc
rm -rf frontend/.prettierignore
rm -rf backend/.prettierrc
rm -rf backend/.prettierignore

cp .prettierrc frontend/
cp .prettierignore frontend/
cp .prettierrc backend/
cp .prettierignore backend/
