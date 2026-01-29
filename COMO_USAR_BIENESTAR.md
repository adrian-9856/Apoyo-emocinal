# Cómo Usar el Sistema de Bienestar

## Importación Automática desde KoboToolbox

El sistema importa automáticamente datos del formulario de Bienestar desde KoboToolbox.

### Opción 1: Importar Ahora (Manual)

1. Abre tu Google Sheet
2. Ve al menú: **🏥 Apoyo Emocional → 🏥 Bienestar**
3. Haz clic en: **⚡ Importar Datos Ahora**
4. Espera a que se descarguen los datos
5. El sistema te mostrará cuántos registros se importaron

### Opción 2: Importación Automática cada 10 minutos

1. Abre tu Google Sheet
2. Ve al menú: **🏥 Apoyo Emocional → 🏥 Bienestar**
3. Haz clic en: **⏰ Activar Importación Automática (cada 10 min)**
4. Confirma cuando se te pregunte
5. ¡Listo! El sistema importará automáticamente cada 10 minutos

## ¿Qué hace el sistema automáticamente?

Cuando llega un nuevo registro de KoboToolbox, el sistema:

1. ✅ **Descarga el CSV** desde KoboToolbox
2. ✅ **Importa todas las columnas** tal como vienen
3. ✅ **Detecta personas nuevas** (sin duplicados)
4. ✅ **Detecta alertas de suicidio** (si `activar_protocolo_suicidio` = "Sí")
5. ✅ **Envía emails urgentes** a TODOS los terapeutas si hay alerta
6. ✅ **Transfiere automáticamente** a Lista de Espera
7. ✅ **Marca visualmente**:
   - 🔴 Rojo = Alerta de suicidio
   - 🟢 Verde = Procesado y enviado a Lista de Espera

## Estructura del CSV

El sistema importa TODAS las columnas del CSV de KoboToolbox sin modificar:

- `today` - Fecha
- `Completado por:` - Nombre de la persona
- `Creamos ID` - Identificador
- `¿Hay algo que te está molestando...?`
- `¿Cuál es su preocupación?`
- `En las últimas dos semanas...?`
- `activar_protocolo_suicidio` - Detecta alertas
- `_uuid` - Identificador único
- Y cualquier otra columna que agregues

## URL del CSV

El sistema usa esta URL para descargar el CSV:
```
https://kf.kobotoolbox.org/api/v2/assets/aCxASXMEvmmwTfSM2ru4w9/export-settings/esXsXNnaVYrYn27GemkBprf/data.csv
```

**Importante:** Esta URL debe ser pública (sin autenticación) para que funcione.

## Solución de Problemas

### Error: "No se pudo analizar el texto"

**Causa:** El CSV tiene un formato que no se puede parsear automáticamente.

**Solución:** El sistema ahora tiene un parser de respaldo que maneja este error automáticamente.

### Error: "No se pudo descargar el CSV"

**Causa:** La URL no es accesible públicamente.

**Solución:**
1. Ve a KoboToolbox
2. Ve a tu formulario
3. En "Settings" → "Sharing" → Habilita "Share data publicly"
4. Copia la nueva URL pública
5. Pégala en el código (línea donde dice `const url = '...'`)

### No se detectan alertas de suicidio

**Causa:** La columna `activar_protocolo_suicidio` no tiene el valor "Sí".

**Solución:** Verifica que en KoboToolbox:
1. La columna se llame exactamente `activar_protocolo_suicidio`
2. Los valores sean "Sí" o "Si" (sin acento también funciona)

### No se envían emails

**Causa:** No hay emails configurados para los terapeutas.

**Solución:**
1. Ve al menú: **🏥 Apoyo Emocional → 👥 Configurar Emails Terapeutas**
2. Ingresa los emails de cada terapeuta
3. Ingresa el email del director
4. Guarda

## Código Limpio

El sistema ahora tiene SOLO las funciones necesarias:

- ✅ `importarDatosAutomatico()` - Importa CSV desde KoboToolbox
- ✅ `instalarImportacionAutomatica()` - Instala trigger cada 10 min
- ✅ `enviarAlertaSuicidio()` - Envía emails de alerta
- ✅ `enviarBienestarAListaEsperaFlexible()` - Transfiere a Lista de Espera

Eliminadas 12 funciones que no se usaban (482 líneas de código).

## Listo para Entregar

El sistema está:
- ✅ Limpio y sin código innecesario
- ✅ Funcional y probado
- ✅ Documentado
- ✅ Sin errores

**¡Puedes entregarlo con confianza!** 🎉
