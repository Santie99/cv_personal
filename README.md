# Santie Portfolio · Sprint 05

Portafolio profesional construido con Next.js, TypeScript, Tailwind CSS y Supabase.

## Sprint actual

Sprint 05 deja el proyecto preparado para deploy en Vercel y operación básica en producción.

Incluye:

- Guía completa de deploy local → GitHub → Vercel.
- Checklist de variables de entorno.
- Guía de configuración de Supabase Auth para producción.
- Ruta `/api/health` para revisar configuración sin exponer secretos.
- Página privada `/admin/guia` con flujo para mantener proyectos.
- Documentación de cómo crear, publicar, destacar y reordenar proyectos desde `/admin`.
- `vercel.json` con headers básicos de seguridad.

## Instalación local

```bash
npm install
npm run dev
```

Abrir:

```txt
http://localhost:3000
```

Admin:

```txt
http://localhost:3000/admin/login
```

Health check:

```txt
http://localhost:3000/api/health
```

## Variables de entorno locales

Crea `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_ANON_KEY_O_PUBLISHABLE_KEY
ADMIN_EMAIL=tu-correo-admin@email.com
SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY_O_SECRET_KEY
```

`SUPABASE_SERVICE_ROLE_KEY` no debe tener prefijo `NEXT_PUBLIC` y no debe subirse a GitHub.

## Supabase

Si vienes de Sprint 02/03/04, no necesitas ejecutar de nuevo `schema.sql` ni `seed.sql` salvo que hayas creado una base desde cero.

Si estás creando todo desde cero:

1. Ejecuta `supabase/schema.sql`.
2. Ejecuta `supabase/seed.sql`.
3. Ejecuta `supabase/sprint-03-admin.sql` si no lo habías aplicado.
4. Crea el usuario admin en Supabase Auth.
5. Confirma que `ADMIN_EMAIL` coincide con ese usuario.

## Deploy

La guía completa está en:

```txt
docs/DEPLOY_VERCEL_SUPABASE_SPRINT_05.md
```

Guía para operar proyectos desde `/admin`:

```txt
docs/GUIA_ADMIN_ACTUALIZAR_PROYECTOS_SPRINT_05.md
```

Checklist final:

```txt
docs/CHECKLIST_PRODUCCION_SPRINT_05.md
```

## Scripts

```bash
npm run dev
npm run typecheck
npm run build
npm run start
```

## No subir al repo

```txt
node_modules
.next
.env.local
.env
.vercel
```
