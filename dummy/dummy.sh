curl -X 'POST' \
  'http://[::1]:3000/api/auth/register' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "foo",
  "nickname": "First User",
  "password": "securePassword1234@",
  "email": "foo@example.com"
}'

curl -X 'POST' \
  'http://[::1]:3000/api/auth/register' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "rlawnsdud",
  "nickname": "Kim Jun Young",
  "password": "password123",
  "email": "normal8781@gmail.com"
}'

curl -X 'POST' \
  'http://[::1]:3000/api/auth/register' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "admin",
  "nickname": "Admin",
  "password": "adminPassword1234@",
  "email": "admin@example.com"
}'

curl -X 'POST' \
  'http://[::1]:3000/api/auth/register' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "john",
  "nickname": "John Doe",
  "password": "superSafePw1234@",
  "email": "john@example.com"
}'

curl -X 'POST' \
  'http://[::1]:3000/api/auth/register' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "jane",
  "nickname": "Jane Doe",
  "password": "anotherSecurePassword1234@",
  "email": "jane@example.com"
}'

curl -X 'POST' \
  'http://[::1]:3000/api/auth/register' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "guest",
  "nickname": "Guest User",
  "password": "qwerty1234@",
  "email": "guest@example.com"
}'

