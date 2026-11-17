# ECLIPSE en Replit

Este proyecto está configurado para ejecutar Vite en `0.0.0.0:5000`.

## Arranque
1. En Replit, abre la Shell.
2. Ejecuta `npm install` una sola vez.
3. Si aparece `Port 5000 is already in use`, detén la ejecución anterior desde el botón Stop. Si sigue ocupado, en Shell ejecuta `ps aux | grep vite` para localizar el proceso Vite anterior y termina únicamente ese proceso con `kill PID` (sustituye PID por el número real).
4. Ejecuta `npm run dev`.

No ejecutes dos servidores de desarrollo al mismo tiempo.
