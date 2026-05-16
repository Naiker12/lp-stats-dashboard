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

## Configuracion

Variable requerida:

- `VITE_API_URL`: URL base del API Gateway del modulo `lp-url-stats`.

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

El workflow `.github/workflows/lp-stats-dashboard.yml` ejecuta:

```txt
pnpm install --frozen-lockfile
pnpm run build
aws s3 sync
aws cloudfront create-invalidation
```

Variables de GitHub necesarias:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET_DASHBOARD`
- `CF_DIST_DASHBOARD`
- `VITE_API_URL`
