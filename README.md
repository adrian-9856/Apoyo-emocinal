# Sistema de Apoyo Emocional

Sistema de gestión de casos de terapia en Google Sheets con Apps Script.

## Archivo Principal

**SistemaCompleto.gs** - Contiene todo el código del sistema

## Características

- **Lista de Espera → Nuevos Ingresos → Terapias**
- **Asignación de terapeutas**
- **Seguimiento de sesiones y asistencia**
- **Reportes automáticos**
- **Sistema de Formulario de Bienestar**
  - Importación manual de datos desde KoboToolbox
  - Detección automática de alertas de suicidio
  - Envío automático de emails a terapeutas
  - Transferencia automática a Lista de Espera

## Uso del Sistema de Bienestar

1. Descarga el CSV desde KoboToolbox
2. Copia las columnas de datos (sin "today" ni "_uuid")
3. Pega en la hoja "C_03_Formulario de Bienestar (2026)" desde la fila 2
4. Ejecuta: `Menú → Bienestar → Procesar Datos Nuevos`

El sistema automáticamente:
- Detecta alertas de suicidio
- Envía emails urgentes a terapeutas
- Transfiere personas a Lista de Espera

## Instalación

1. Copia el contenido de `SistemaCompleto.gs`
2. Pégalo en Google Apps Script (Extensiones → Apps Script)
3. Guarda y recarga el Google Sheet
4. Usa el menú "🏥 Apoyo Emocional"
