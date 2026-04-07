# 📊 GUÍA DEL REPORTE MENSUAL

## ¿Qué es el Reporte Mensual?

El sistema tiene **DOS tipos de reportes**:

1. **Reporte** - Muestra datos en TIEMPO REAL del mes actual
2. **Reportes Mensuales** - Guarda un histórico de cada mes

---

## 📋 Hoja "Reporte" (Tiempo Real)

Esta hoja se **actualiza automáticamente** cada vez que haces cambios en el sistema.

### Secciones del Reporte:

#### 1. NUEVOS INGRESOS
- **Total**: Todos los participantes que vinieron a primera cita (histórico)
- **Este mes**: Participantes que vinieron en el mes actual

#### 2. PERSONAS NO ASISTIDAS
- **Total**: Todas las personas que no asistieron (histórico)
- **Este mes**: Personas que no asistieron en el mes actual

#### 3. DERIVACIONES INSTITUCIONALES
- **Total**: Número de derivaciones institucionales

#### 4. FORMULARIO DE BIENESTAR
- **Total**: Formularios recibidos de KoboToolbox
- **Alertas suicidio**: Casos con ideación suicida

#### 5. CASOS ACTIVOS POR TERAPEUTA
Para cada terapeuta (Gerber, Melissa, Diana, Karina):
- **Casos activos**: Cuántos casos tiene actualmente
- **Sesiones mes**: Cuántas sesiones realizó este mes

**TOTAL**: Suma de todos los casos activos y sesiones

#### 6. PROCESOS CULMINADOS
- **Total**: Todos los procesos culminados (histórico)
- **Este mes**: Procesos culminados en el mes actual
- **Promedio sesiones**: Promedio de sesiones por proceso culminado

#### 7. DESERCIONES
- **Total**: Todas las deserciones (histórico)
- **Este mes**: Deserciones en el mes actual
- **Tasa deserción**: Porcentaje de deserciones vs procesos culminados

#### 8. INTERVENCIÓN DE CASOS
- **Total**: Casos registrados en intervención

#### 9. RESUMEN GENERAL
- **Total casos procesados**: Culminados + Deserciones + Intervención
- **Tasa de éxito**: Porcentaje de culminados vs total procesados
- **Casos activos totales**: Total de casos en terapia actualmente

---

## 📅 Hoja "Reportes Mensuales" (Histórico)

Esta hoja **NO se actualiza automáticamente**. Debes guardar manualmente al final de cada mes.

### ¿Cómo Guardar un Reporte Mensual?

**📌 AL FINAL DE CADA MES:**

1. Ve al menú: **🏥 Apoyo Emocional**
2. Haz clic en: **📊 Guardar Reporte Mensual**
3. El sistema:
   - ✅ Toma todos los datos del "Reporte" actual
   - ✅ Crea una nueva fila en "Reportes Mensuales"
   - ✅ Guarda la fecha y el mes
   - ✅ Actualiza "Sesiones Mes Anterior" para empezar el conteo del nuevo mes

### ¿Qué Información Se Guarda?

| Columna | Dato |
|---------|------|
| A | Mes/Año (ej: "Enero 2026") |
| B | Nuevos Ingresos (este mes) |
| C | Culminados (este mes) |
| D | Deserciones (este mes) |
| E | Gestión Casos (total) |
| F | Total Activos |
| G | Tasa Éxito (%) |
| H | Sesiones Gerber |
| I | Sesiones Melissa |
| J | Sesiones Diana |
| K | Sesiones Karina |
| L | Activos Gerber |
| M | Activos Melissa |
| N | Activos Diana |
| O | Activos Karina |
| P | Derivaciones Externas |
| Q | Fecha Guardado |

---

## 🔄 ¿Cómo Funciona "Sesiones del Mes"?

El sistema usa **dos columnas** en la hoja Terapias:

1. **No. Sesión (E)**: Número total de sesiones
2. **Sesiones Mes Anterior (H)**: Sesiones del mes pasado

**Cálculo de sesiones del mes actual:**
```
Sesiones mes = No. Sesión - Sesiones Mes Anterior
```

**Ejemplo:**
- Enero: Participante tiene 5 sesiones
- Guardas reporte mensual → sistema copia 5 a "Sesiones Mes Anterior"
- Febrero: Participante llega a 8 sesiones
- Sesiones de febrero = 8 - 5 = **3 sesiones** ✅

---

## 📌 FLUJO MENSUAL RECOMENDADO

### Último Día del Mes:

1. **Revisar el Reporte**
   - Abre la hoja "Reporte"
   - Verifica que todos los datos son correctos
   - Los datos "Este mes" deben mostrar solo el mes actual

2. **Guardar el Reporte Mensual**
   ```
   Menú → 🏥 Apoyo Emocional → 📊 Guardar Reporte Mensual
   ```

3. **Confirmar el Guardado**
   - Verás un mensaje: "✅ REPORTE MENSUAL GUARDADO"
   - Incluye el mes y la fila donde se guardó

4. **Verificar en Reportes Mensuales**
   - Abre la hoja "Reportes Mensuales"
   - Verifica que la nueva fila tenga todos los datos
   - La fecha guardado debe ser la actual

### Primer Día del Nuevo Mes:

El sistema ya está listo automáticamente:
- ✅ "Sesiones Mes Anterior" actualizadas
- ✅ Conteo de sesiones del nuevo mes empieza desde cero
- ✅ Los casos activos siguen en Terapias
- ✅ Las fórmulas siguen calculando correctamente

---

## ⚠️ IMPORTANTE: Qué NO Hacer

### ❌ NO Borres Datos de Terapias al Fin de Mes

**INCORRECTO:**
- ❌ Borrar casos de Terapias
- ❌ Limpiar la hoja Terapias
- ❌ "Empezar de cero" manualmente

**CORRECTO:**
- ✅ Solo guarda el reporte mensual
- ✅ Los casos en terapia siguen activos
- ✅ El sistema maneja el conteo automáticamente

### ❌ NO Edites Manualmente "Sesiones Mes Anterior"

Esta columna se actualiza **automáticamente** cuando guardas el reporte mensual.

### ❌ NO Borres Filas de Reportes Mensuales

Esta es tu única copia del histórico. Si borras una fila, pierdes los datos de ese mes para siempre.

---

## 📊 Usar los Reportes Mensuales

### Ver Tendencias

Puedes crear gráficas en Google Sheets:

1. Selecciona los datos de "Reportes Mensuales"
2. Menú → Insertar → Gráfico
3. Elige el tipo de gráfica (líneas, barras, etc.)

**Ejemplos de análisis:**
- Evolución de casos activos por mes
- Comparar sesiones por terapeuta
- Tendencia de procesos culminados vs deserciones
- Tasa de éxito mes a mes

### Exportar Datos

1. Abre "Reportes Mensuales"
2. Archivo → Descargar → CSV o Excel
3. Usa los datos en otros programas (Excel, SPSS, etc.)

---

## 🔧 Solución de Problemas

### Problema: "Sesiones mes" muestra números extraños

**Causa:** No has guardado el reporte mensual antes
**Solución:**
1. Guarda el reporte mensual una vez
2. El sistema actualizará "Sesiones Mes Anterior"
3. El siguiente mes calculará correctamente

### Problema: Datos del reporte no se actualizan

**Causa:** Las fórmulas pueden estar rotas
**Solución:**
1. Menú → 🏥 Apoyo Emocional → 🔧 Reparar Sistema
2. El sistema regenerará todas las fórmulas

### Problema: Guardé el reporte dos veces en el mismo mes

**Solución:**
1. Abre "Reportes Mensuales"
2. Elimina la fila duplicada (la más reciente)
3. Ten cuidado de solo guardar UNA vez por mes

### Problema: Me olvidé de guardar el reporte el mes pasado

**Solución:**
- Los datos ya cambiaron (ahora son del mes actual)
- No puedes recuperar los datos del mes pasado
- Por eso es importante guardar CADA mes
- **Recomendación:** Configura un recordatorio mensual

---

## 📅 Recordatorio Automático

Puedes configurar un recordatorio automático:

1. Menú → 🏥 Apoyo Emocional → ⏰ Configurar Recordatorio Mensual
2. El sistema te enviará un email el último día de cada mes
3. El email te recordará guardar el reporte mensual

---

## 🎯 Resumen Rápido

### Cada Día:
- ✅ Trabaja normalmente en el sistema
- ✅ El "Reporte" se actualiza automáticamente
- ❌ NO toques "Reportes Mensuales"

### Último Día del Mes:
- ✅ Menú → 📊 Guardar Reporte Mensual
- ✅ Verifica que se guardó correctamente
- ✅ Listo para el siguiente mes

### Analizar Datos:
- ✅ Abre "Reporte" para datos actuales
- ✅ Abre "Reportes Mensuales" para histórico
- ✅ Crea gráficas si necesitas visualizar tendencias

---

## 💡 Consejos Útiles

1. **Guarda SIEMPRE al final del mes** - No esperes al siguiente mes
2. **Verifica antes de guardar** - Asegúrate que los datos son correctos
3. **NO borres el histórico** - Es tu única copia
4. **Usa el recordatorio automático** - No te olvides
5. **Haz backup** - Descarga el CSV ocasionalmente como respaldo

---

## 📞 Soporte

Si tienes problemas con los reportes:

1. Intenta primero: Menú → 🔧 Reparar Sistema
2. Revisa esta guía para soluciones comunes
3. Verifica que no editaste las fórmulas manualmente

El sistema está diseñado para ser automático. Si algo no funciona, probablemente es porque se editó manualmente algo que no debía tocarse.
