# proyectos.angular

Este README explica cómo subir este proyecto a GitHub y qué pasos seguir para conectar tu repositorio local con GitHub.

## Versiones

- **v8** (Actual) - Fitness Manager con formulario reactivo. Gestión de rutinas, ejercicios y categorías. Integración con Supabase para persistencia en la nube.

## Estructura del proyecto

- `aplicaciontfitness.angular/` - aplicación Angular principal.

## Pasos para subir el proyecto a GitHub

1. Abre la carpeta `proyectos.angular` en VS Code o tu terminal.

2. Inicializa Git si todavía no está inicializado:
   ```bash
   git init
   ```

3. Añade los archivos al repositorio:
   ```bash
   git add .
   ```

4. Haz un primer commit:
   ```bash
   git commit -m "Init proyecto Angular fitness"
   ```

5. Crea un repositorio nuevo en GitHub.
   - En GitHub, haz clic en `New repository`.
   - Ponle un nombre como `proyectos.angular` o el que prefieras.
   - No añadas README, `.gitignore` ni licencia desde GitHub si ya tienes todo local.

6. Conecta el repositorio remoto:
   - Usando HTTPS:
     ```bash
     git remote add origin https://github.com/tu-usuario/nombre-del-repo.git
     ```
   - Usando SSH:
     ```bash
     git remote add origin git@github.com:tu-usuario/nombre-del-repo.git
     ```

7. Empuja tu rama principal a GitHub:
   ```bash
   git branch -M main
   git push -u origin main
   ```

## Cómo comprobar que estás conectado a GitHub

- Verifica el remoto configurado:
  ```bash
  git remote -v
  ```

- Si necesitas cambiar el remoto:
  ```bash
  git remote set-url origin https://github.com/tu-usuario/nombre-del-repo.git
  ```

## Cómo usar etiquetas (`tags`)

1. Crear una etiqueta local:
   ```bash
   git tag v0.6
   ```

2. Subir etiquetas a GitHub:
   ```bash
   git push origin --tags
   ```

3. O subir una etiqueta específica:
   ```bash
   git push origin v0.6
   ```

## Qué hacer luego

- Para cada cambio importante, crea un commit con mensaje claro.
- Usa `git status` para ver el estado de tu repositorio.
- Si ya estás trabajando en una rama o quieres usar ramas de features:
  ```bash
  git checkout -b mi-rama
  git add .
  git commit -m "Implementar v6 y actualizar navegación"
  git push -u origin mi-rama
  ```

## Nota sobre GitHub y VS Code

- En VS Code puedes usar el panel de Git para ver cambios, hacer `stage` y commits.
- Si quieres usar GitHub desde VS Code con tu cuenta, asegúrate de tener instalada la extensión "GitHub Pull Requests and Issues" y de entrar con tu usuario.
- Para conectar GitHub desde la terminal, necesitas tener tus credenciales configuradas.

## Información útil

- Si usas HTTPS, GitHub puede pedir tu usuario y contraseña o token personal.
- Si usas SSH, asegúrate de tener una clave SSH configurada en tu equipo y registrada en tu cuenta de GitHub.
- Este README es una guía; no realiza ninguna conexión automática.
