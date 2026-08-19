# Cómo publicar tu web — paso a paso

## 1. Subir el código a GitHub

1. Ve a github.com y entra a tu cuenta.
2. Clic en el botón verde **"New"** para crear un repositorio.
3. Ponle nombre, por ejemplo `resenas-app`. Puede ser público o privado.
4. NO marques ninguna opción de "README" ni ".gitignore" (ya los tenemos).
5. Dale a **"Create repository"**.
6. En la pantalla siguiente, verás instrucciones para subir código desde tu computadora.
   Si nunca has usado Git, la forma más fácil es:
   - Descarga **GitHub Desktop** (desktop.github.com), instálalo, inicia sesión.
   - En GitHub Desktop: "Add Local Repository" → seleccionas esta carpeta (`resenas-app`).
   - Dale a "Publish repository" y listo, tu código queda subido.

## 2. Conectar con Vercel

1. Ve a vercel.com y entra a tu cuenta (con la misma cuenta de GitHub, un clic).
2. Clic en **"Add New" → "Project"**.
3. Busca y selecciona el repositorio `resenas-app` que acabas de subir.
4. Vercel detecta automáticamente que es Next.js. NO cambies ninguna configuración todavía.

## 3. Configurar tu clave de API (paso más importante)

**Antes de hacer clic en "Deploy":**

1. En la misma pantalla de importación, busca la sección **"Environment Variables"**.
2. En el campo "Name" escribe: `ANTHROPIC_API_KEY`
3. En el campo "Value" pega tu clave real (la que empieza con `sk-ant-...`).
4. Clic en "Add".
5. Ahora sí, dale a **"Deploy"**.

Esto toma 1-2 minutos. Al terminar, Vercel te da un link tipo `resenas-app.vercel.app` — esa ya es tu web funcionando, accesible desde cualquier celular o computadora.

## 4. Conectar tu dominio propio (cuando lo compres)

1. Dentro de tu proyecto en Vercel, ve a **"Settings" → "Domains"**.
2. Escribe el dominio que compraste (ej. `resenia.com`) y dale "Add".
3. Vercel te muestra 1-2 registros DNS (unos códigos) que debes copiar.
4. Ve a donde compraste el dominio (Namecheap, GoDaddy) → sección "DNS" o "Advanced DNS".
5. Pega ahí los registros que te dio Vercel.
6. Espera unas horas (a veces minutos) a que se active. Ya tendrás `www.tudominio.com` funcionando.

## Notas importantes

- Nunca subas el archivo `.env.local` a GitHub (ya está protegido en `.gitignore`).
- Si necesitas cambiar la clave de API después, ve a Vercel → tu proyecto → "Settings" → "Environment Variables".
- Cada vez que subas cambios de código a GitHub, Vercel actualiza tu web automáticamente sola.
