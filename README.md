# lp-stats-dashboard

Dashboard SPA para consultar estadisticas de URLs acortadas.

Tecnologias principales:

- React 18
- Vite
- TypeScript
- shadcn/ui
- Recharts

## Ruta

La aplicacion usa esta ruta:

```txt
/stats/:codigo
```

Ejemplo local:

```txt
http://localhost:5173/stats/PWqDH6
```

## Configuracion

Crea el archivo `.env` desde el ejemplo:

```powershell
cp .env.example .env
```

Variable requerida:

- `VITE_API_URL`: URL base del API Gateway del modulo `lp-url-stats`.

## Desarrollo

Instalar dependencias:

```powershell
pnpm install
```

Levantar el servidor local:

```powershell
pnpm run dev
```

En Windows PowerShell, si se bloquea `pnpm.ps1`, usa:

```powershell
pnpm.cmd run dev
```

## Validacion

```powershell
pnpm run lint
pnpm run build
```

## Infraestructura

Terraform crea:

- Bucket S3 privado para el build.
- Distribucion CloudFront.
- Origin Access Control para que CloudFront lea S3 sin publicar el bucket.
- Respuestas 403/404 hacia `index.html` para soportar rutas SPA.

Comandos:

```powershell
cd terraform
terraform init
terraform validate
terraform plan
terraform apply
```

## Deploy continuo

El workflow `.github/workflows/deploy.yml` ejecuta:

```txt
pnpm install --frozen-lockfile
pnpm run build
aws s3 sync
aws cloudfront create-invalidation
```

Variables de GitHub necesarias:

- `VITE_API_URL`
- `AWS_REGION`
- `S3_BUCKET_NAME`
- `CLOUDFRONT_DISTRIBUTION_ID`

Secret necesario:

- `AWS_ROLE_TO_ASSUME`
