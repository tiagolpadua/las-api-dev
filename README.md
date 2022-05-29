# LAS - Licenciamento de Ambulantes de Salvador

O carnaval de Salvador é um evento usualmente anual e que para acontecer conta com o apoio de diversos comerciantes. Para estabelecer o controle e a segurança é necessário fazer um credenciamento.

O processo de licenciamento dos ambulantes pode ser simplificado através do aplicativo LAS (Licenciamento de Ambulantes de Salvador).

Através desse projeto será possível realizar todo o processo desde a solicitação até o credenciamento, que ocorrerá através de QR Code. Trazendo mais conforto e segurança para os aplicantes que muitas vezes precisam enfrentar filas imensas.

## Instalação

sudo apt install mariadb-server
sudo service mysql start
sudo mysql_secure_installation

## Execução

```bash
sudo service mysql start
sudo service mysql status
sudo service mysql stop
```

## Criar o usuário LAS

```sql
CREATE USER 'las'@'localhost' IDENTIFIED BY 'admin';
create database las;
GRANT ALL PRIVILEGES ON * . * TO 'las'@'localhost';
```
