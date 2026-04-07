# 📊 CAMBIOS: INASISTENCIAS EN REPORTES MENSUALES

## ✅ ¿Qué se agregó?

Se ha actualizado el sistema de reportes mensuales para incluir el **conteo de inasistencias por terapeuta**. Ahora los reportes mensuales guardan:

- ✅ Inasistencias de Gerber
- ✅ Inasistencias de Melissa
- ✅ Inasistencias de Diana
- ✅ Inasistencias de Karina
- ✅ Total de Inasistencias

---

## 📋 ¿Qué se modificó?

### 1. Hoja "Reporte" (tiempo real)

**Estado anterior:** Ya tenía las inasistencias en la columna D (filas 17-21) ✅

**No se modificó** porque ya estaba funcionando correctamente con las fórmulas:
```
=IFERROR(SUMPRODUCT(('Terapias Individual'!B2:B500="Gerber")*('Terapias Individual'!I2:I500="En proceso")*('Terapias Individual'!L2:L500)),0)
```

### 2. Hoja "Reportes Mensuales" (histórico)

**Columnas anteriores:** 36 columnas
**Columnas nuevas:** 41 columnas (se agregaron 5 columnas)

**Nuevas columnas agregadas:**
- Columna 12: `Inasistencias Gerber`
- Columna 15: `Inasistencias Melissa`
- Columna 18: `Inasistencias Diana`
- Columna 21: `Inasistencias Karina`
- Columna 24: `Total Inasistencias`

**Estructura actualizada:**

| Col | Nombre | Descripción |
|-----|--------|-------------|
| A | Mes/Año | Enero 2026, Febrero 2026, etc. |
| B-C | Nuevos Ingresos | Total y Este mes |
| D-E | Personas No Asistidas | Total y Este mes |
| F-G | Derivaciones | Total y Este mes |
| H-I | Formulario Bienestar | Total y Alertas |
| J | Activos Gerber | Casos activos |
| K | Sesiones Gerber | Sesiones del mes |
| **L** | **Inasistencias Gerber** | **NUEVO** ⭐ |
| M | Activos Melissa | Casos activos |
| N | Sesiones Melissa | Sesiones del mes |
| **O** | **Inasistencias Melissa** | **NUEVO** ⭐ |
| P | Activos Diana | Casos activos |
| Q | Sesiones Diana | Sesiones del mes |
| **R** | **Inasistencias Diana** | **NUEVO** ⭐ |
| S | Activos Karina | Casos activos |
| T | Sesiones Karina | Sesiones del mes |
| **U** | **Inasistencias Karina** | **NUEVO** ⭐ |
| V | Total Activos | Total de casos |
| W | Total Sesiones | Total de sesiones |
| **X** | **Total Inasistencias** | **NUEVO** ⭐ |
| Y-Z | Procesos Culminados | Total, Mes, Tasa |
| AA-AB | Retiradx | Total, Mes, Tasa |
| AC | Casos Intervención | Total |
| AD-AF | Resumen General | Total Procesados, Tasa Éxito, Casos Activos |
| AG-AL | Captación | Hoja Interés, Referencias, Derivaciones |
| AM | Fecha Guardado | Fecha y hora |

---

## 🔧 Funciones Modificadas

### 1. `crearReportesMensuales()`

**Archivo:** `SistemaCompleto.gs`
**Líneas:** 808-855

**Cambios:**
- ✅ Headers actualizados con 5 columnas nuevas de inasistencias
- ✅ Anchos de columna ajustados de 36 a 41 columnas

### 2. `actualizarHeadersReportesMensuales()`

**Archivo:** `SistemaCompleto.gs`
**Líneas:** 861-940

**Cambios:**
- ✅ Headers actualizados con columnas de inasistencias
- ✅ Anchos de columna ajustados de 36 a 41 columnas
- ✅ Mensaje actualizado: "41 columnas con todas las métricas"

### 3. `guardarReporteMensual()`

**Archivo:** `SistemaCompleto.gs`
**Líneas:** 3599-3722

**Cambios:**
- ✅ Lee las inasistencias de la hoja "Reporte" (columna D, filas 17-21)
- ✅ Guarda las inasistencias en "Reportes Mensuales"

**Variables agregadas:**
```javascript
const inasistenciasGerber = reporte.getRange('D17').getValue();
const inasistenciasMelissa = reporte.getRange('D18').getValue();
const inasistenciasDiana = reporte.getRange('D19').getValue();
const inasistenciasKarina = reporte.getRange('D20').getValue();
const totalInasistencias = reporte.getRange('D21').getValue();
```

**Array de datos actualizado:**
```javascript
const datos = [
  mesActual,
  // ... otros datos ...
  activosGerber, sesionesGerber, inasistenciasGerber,
  activosMelissa, sesionesMelissa, inasistenciasMelissa,
  activosDiana, sesionesDiana, inasistenciasDiana,
  activosKarina, sesionesKarina, inasistenciasKarina,
  totalActivos, totalSesiones, totalInasistencias,
  // ... otros datos ...
];
```

### 4. `generarReporteMarzo2026()`

**Archivo:** `SistemaCompleto.gs` y `GenerarReporteMarzo2026.gs`
**Líneas:** 9787-10054

**Cambios:**
- ✅ Cuenta las inasistencias de cada terapeuta (columna L de "Terapias Individual")
- ✅ Calcula el total de inasistencias
- ✅ Guarda las inasistencias en "Reportes Mensuales"
- ✅ Muestra las inasistencias en los mensajes de resumen

**Estructura de datos actualizada:**
```javascript
datosTerapeutas[terapeuta] = {
  activos: 0,
  sesiones: 0,
  inasistencias: 0  // NUEVO
};
```

**Lectura de inasistencias:**
```javascript
const inasistencias = fila[11] || 0; // Columna L: Inasistencias
datosTerapeutas[terapeuta].inasistencias += Number(inasistencias);
```

**Mensaje actualizado:**
```
📊 RESUMEN DEL REPORTE DE MARZO 2026
═══════════════════════════════════════

CASOS ACTIVOS POR TERAPEUTA:
   • Gerber: 6 casos, 40 sesiones, 3 inasistencias
   • Melissa: 7 casos, 35 sesiones, 2 inasistencias
   • Diana: 16 casos, 50 sesiones, 5 inasistencias
   • Karina: 9 casos, 31 sesiones, 1 inasistencia
   • TOTAL: 38 casos, 156 sesiones, 11 inasistencias
```

---

## 🚀 Cómo Usar los Cambios

### Para el Próximo Mes (Abril 2026)

1. **Al final del mes**, ve al menú:
   ```
   🏥 Apoyo Emocional → 📊 Guardar Reporte Mensual
   ```

2. El sistema guardará **automáticamente**:
   - ✅ Todos los datos anteriores
   - ✅ **NUEVO:** Inasistencias de cada terapeuta
   - ✅ **NUEVO:** Total de inasistencias del mes

3. Verifica en "Reportes Mensuales" que las columnas L, O, R, U, X tengan los datos de inasistencias.

### Para Actualizar la Hoja "Reportes Mensuales" Existente

Si ya tienes datos guardados en "Reportes Mensuales" **sin** las columnas de inasistencias:

1. Ve al menú:
   ```
   🏥 Apoyo Emocional → ⚙️ Avanzado → 📊 Actualizar Headers Reportes Mensuales
   ```

2. El sistema actualizará los headers para incluir las 5 columnas nuevas de inasistencias.

3. **IMPORTANTE:** Los reportes antiguos (ya guardados) **NO** tendrán datos en las columnas de inasistencias porque no se guardaron en su momento. Solo los nuevos reportes tendrán esos datos.

### Para Regenerar el Reporte de Marzo 2026

Si ya generaste el reporte de marzo 2026 **antes** de estos cambios:

1. Ve al menú:
   ```
   🏥 Apoyo Emocional → 📅 Generar Reporte Marzo 2026
   ```

2. El sistema:
   - ✅ Calculará las inasistencias de marzo usando los datos actuales
   - ✅ Actualizará la fila de "Marzo 2026" en "Reportes Mensuales"
   - ✅ Incluirá las inasistencias en todas las columnas

---

## 📊 ¿De Dónde Vienen las Inasistencias?

Las inasistencias se cuentan desde la hoja **"Terapias Individual"**, columna **L** (Inasistencias).

**¿Cómo se incrementan las inasistencias?**

Cuando cambias el **"No. Sesión"** (columna H) de un participante:
1. El sistema pregunta: "¿El participante asistió a esta sesión?"
2. Si seleccionas **"No"**:
   - ✅ El número de sesión se revierte al anterior
   - ✅ El contador de **Inasistencias** (columna L) se incrementa en 1

**Ejemplo:**
```
Participante: Andrea Yamileth
No. Sesión: 5
Estado: En proceso
Inasistencias actuales: 2

Cambias No. Sesión a 6 → Sistema pregunta

Seleccionas "No" →
  • No. Sesión vuelve a 5
  • Inasistencias pasa a 3 ✅
```

---

## ✅ Verificación de los Cambios

### 1. Verificar Hoja "Reporte"

1. Abre la hoja **"Reporte"**
2. Ve a las filas 17-21 (CASOS ACTIVOS POR TERAPEUTA)
3. Verifica que la columna **D** tenga números de inasistencias

**Ejemplo esperado:**
```
                      Casos   Sesiones   Inasistencias
Gerber                  6        40           3
Melissa                 7        35           2
Diana                  16        50           5
Karina                  9        31           1
TOTAL                  38       156          11
```

### 2. Verificar Hoja "Reportes Mensuales"

1. Abre la hoja **"Reportes Mensuales"**
2. Verifica que los headers tengan las columnas:
   - **L:** Inasistencias Gerber
   - **O:** Inasistencias Melissa
   - **R:** Inasistencias Diana
   - **U:** Inasistencias Karina
   - **X:** Total Inasistencias

3. Si guardaste un reporte después de los cambios, verifica que esas columnas tengan datos.

### 3. Verificar Función de Guardar

1. Ve al menú: **🏥 Apoyo Emocional → 📊 Guardar Reporte Mensual**
2. Después de guardar, abre "Reportes Mensuales"
3. Verifica que la última fila tenga datos en las columnas de inasistencias

---

## ⚠️ IMPORTANTE: Datos Históricos

### Reportes Antiguos

Los reportes mensuales que guardaste **ANTES** de estos cambios **NO tendrán** datos en las columnas de inasistencias (L, O, R, U, X estarán vacías).

Esto es **normal** porque esos datos no se guardaron en su momento.

### Reportes Nuevos

Todos los reportes que guardes **DESPUÉS** de actualizar el código **SÍ tendrán** las inasistencias.

### ¿Cómo completar datos históricos?

Si necesitas las inasistencias de meses anteriores:

1. **Si aún tienes los datos en "Terapias Individual":**
   - Puedes usar funciones similares a `generarReporteMarzo2026()` para regenerar reportes de otros meses
   - Contacta si necesitas ayuda para crear esas funciones

2. **Si ya no tienes los datos:**
   - No es posible recuperar las inasistencias de meses pasados
   - Solo puedes tener datos de inasistencias a partir de este mes

---

## 🎯 Resumen de Cambios

### Antes (36 columnas)
```
Mes | Ingresos | ... | Activos Gerber | Sesiones Gerber | Activos Melissa | ...
```

### Después (41 columnas)
```
Mes | Ingresos | ... | Activos Gerber | Sesiones Gerber | Inasistencias Gerber | Activos Melissa | Sesiones Melissa | Inasistencias Melissa | ...
```

### Archivos Modificados

1. ✅ `SistemaCompleto.gs`
   - `crearReportesMensuales()` - líneas 808-855
   - `actualizarHeadersReportesMensuales()` - líneas 861-940
   - `guardarReporteMensual()` - líneas 3599-3722
   - `generarReporteMarzo2026()` - líneas 9787-10054

2. ✅ `GenerarReporteMarzo2026.gs`
   - `generarReporteMarzo2026()` - función completa

### Datos que se Guardan Ahora

| Terapeuta | Datos Guardados |
|-----------|----------------|
| Gerber | Activos, Sesiones, **Inasistencias** ⭐ |
| Melissa | Activos, Sesiones, **Inasistencias** ⭐ |
| Diana | Activos, Sesiones, **Inasistencias** ⭐ |
| Karina | Activos, Sesiones, **Inasistencias** ⭐ |
| **TOTAL** | Activos, Sesiones, **Inasistencias** ⭐ |

---

## 📞 Próximos Pasos

1. **Actualiza el código:**
   - Copia el código actualizado de `SistemaCompleto.gs` y `GenerarReporteMarzo2026.gs` a tu Google Sheets

2. **Actualiza los headers:**
   - Ejecuta: **Menú → 🏥 Apoyo Emocional → ⚙️ Avanzado → 📊 Actualizar Headers Reportes Mensuales**

3. **Para marzo 2026:**
   - Si ya generaste el reporte, vuelve a ejecutar: **Menú → 📅 Generar Reporte Marzo 2026**
   - Esto actualizará el reporte con las inasistencias

4. **Para abril 2026:**
   - Al final de abril, guarda el reporte normalmente
   - Ya incluirá automáticamente las inasistencias

---

## ✅ Checklist de Verificación

- [ ] Código actualizado en Google Apps Script
- [ ] Headers de "Reportes Mensuales" actualizados (41 columnas)
- [ ] Hoja "Reporte" muestra inasistencias en columna D (filas 17-21)
- [ ] Reporte de marzo 2026 regenerado con inasistencias
- [ ] Próximo reporte mensual incluirá inasistencias automáticamente

---

## 🎉 ¡Listo!

Tu sistema ahora guarda el conteo de **inasistencias** en los reportes mensuales. Esto te permitirá:

- ✅ Ver cuántas inasistencias tuvo cada terapeuta por mes
- ✅ Analizar tendencias de inasistencias
- ✅ Comparar inasistencias vs sesiones
- ✅ Tomar decisiones basadas en datos de asistencia completos

**¡Disfruta de tus reportes mejorados!** 📊✨
