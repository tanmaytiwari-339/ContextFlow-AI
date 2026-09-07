# ContextFlow AI — API Documentation

## Authentication

### 1. Register Employee

**Endpoint**

`POST /api/auth/register`

**Request Body**

```json
{
  "employeeId": "EMP101",
  "name": "Tanmay",
  "password": "123456"
}
```

**Success Response**

```json
{
  "message": "Employee registered successfully"
}
```

---

### 2. Employee Login

**Endpoint**

`POST /api/auth/login`

**Request Body**

```json
{
  "employeeId": "EMP101",
  "password": "123456"
}
```

**Success Response**

```json
{
  "token": "JWT_TOKEN"
}
```

The frontend must store the JWT token after successful login.

For protected APIs, send the token in the request header:

```text
Authorization: Bearer JWT_TOKEN
```

## Backend Base URL

During local development:

`http://localhost:8080`

Therefore:

`POST http://localhost:8080/api/auth/login`

`POST http://localhost:8080/api/auth/register`
