@echo off
setlocal
cd /d "%~dp0"

title MS Solucoes - Inicializacao do site

echo ==========================================
echo        MS SOLUCOES - SITE INSTITUCIONAL
echo ==========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo ERRO: Node.js nao foi encontrado.
  echo Instale a versao LTS em https://nodejs.org/ e execute este arquivo novamente.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\.bin\vite.cmd" (
  echo Instalando as dependencias do projeto...
  call npm install
  if errorlevel 1 (
    echo.
    echo ERRO: Nao foi possivel instalar as dependencias.
    echo Verifique sua conexao com a internet e tente novamente.
    pause
    exit /b 1
  )
)

echo.
echo Iniciando o site no navegador...
echo Para encerrar, volte a esta janela e pressione CTRL+C.
echo.
call npm run dev -- --open
pause
