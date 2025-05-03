
curl -X POST http://localhost:3000/register \
     -H "Content-Type: application/json" \
     -d '{"name": "João", "email": "joao@example.com", "password": "Senha123"}'