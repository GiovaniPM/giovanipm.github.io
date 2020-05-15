@echo off

set ant=%cd%

echo (1/7) Gerando pacote
echo (1/7) Gerando pacote > %ant%\log.txt
tar --exclude="./.git" --exclude="./gpm.ktz" --exclude="./home.000" --exclude="./log.txt" -czvf home.000 . >> %ant%\log.txt

echo (2/7) Aplicando pacote
echo (2/7) Aplicando pacote >> %ant%\log.txt
xcopy home.000 ..\help\docker\home\. /y >> %ant%\log.txt
del home.000

echo (3/7) Parando container
echo (3/7) Parando container >> %ant%\log.txt
docker stop home >> %ant%\log.txt

echo (4/7) Removendo container
echo (4/7) Removendo container >> %ant%\log.txt
docker image rm home >> %ant%\log.txt

echo (5/7) Removendo imagem
echo (5/7) Removendo imagem >> %ant%\log.txt
docker rm home >> %ant%\log.txt
cd ..\help\docker\home

echo (6/7) Criando imagem
echo (6/7) Criando imagem >> %ant%\log.txt
docker build --tag=home . >> %ant%\log.txt

echo (7/7) Criando container
echo (7/7) Criando container >> %ant%\log.txt
docker run -d --name="home" -p 8081:80 home >> %ant%\log.txt
del home.000

cd %ant%
