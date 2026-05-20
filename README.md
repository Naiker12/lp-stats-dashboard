# lp-stats-dashboard

Dashboard SPA para consultar estadisticas de URLs acortadas.

Tecnologias principales:

- React 18
- Vite
- TypeScript
- shadcn/ui
- Recharts

## Ruta

La aplicacion usa estas rutas:

```txt
/stats
/stats/:codigo
```

`/stats` muestra el agregado de todas las URLs. `/stats/:codigo` filtra un enlace corto puntual.

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
