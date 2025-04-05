### Docker ile tek başına çalıştırma
```bash
docker build -t tabulpos-ui .

docker run -p 80:80 tabulpos-ui
```

### Docker Compose ile çalıştırma
```bash
# Komtanım başlat durdur işlemi için bu komutalar yeterli olacaktır.
docker-compose up -d

# 
docker-compose down
