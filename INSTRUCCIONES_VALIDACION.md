# 🔍 INSTRUCCIONES DE USO - VALIDACIÓN DE REPORTES

## ✅ Las funciones YA ESTÁN INTEGRADAS

**NO necesitas instalar nada adicional.** Las funciones de validación ya están integradas en `SistemaCompleto.gs`.

---

## 📋 Cómo Usar

### Paso 1: Abrir tu Hoja de Google Sheets

1. Abre tu hoja de cálculo de **Apoyo Emocional**
2. Espera a que cargue completamente
3. Verás el menú: **🏥 Apoyo Emocional**

### Paso 2: Usar las Funciones de Validación

En el menú principal, verás un nuevo submenú:

```
🏥 Apoyo Emocional
  └── 🔍 Validación de Reportes
      ├── 📊 Analizar Reporte Actual
      ├── 📅 Validar Mes Específico
      └── 📋 Generar Reporte Detallado
```

---

## 🛠️ Funciones Disponibles

### 1️⃣ Analizar Reporte Actual

**¿Qué hace?**
- Compara el reporte del mes actual con los datos reales
- Verifica nuevos ingresos, sesiones, casos activos, culminados y retirados
- Detecta discrepancias automáticamente

**Cómo usarla:**
1. Menú → **🏥 Apoyo Emocional**
2. → **🔍 Validación de Reportes**
3. → **📊 Analizar Reporte Actual**
4. Se creará una nueva hoja con el análisis completo

**Resultado:**
```
📊 ANÁLISIS DEL REPORTE - ABRIL 2026
═══════════════════════════════════════════════════

1️⃣ NUEVOS INGRESOS
─────────────────────────────────
   • Según Reporte: 0
   • Conteo Real: 0
   • Coincide: ✅ SÍ

2️⃣ SESIONES DEL MES POR TERAPEUTA
─────────────────────────────────
   Gerber:
      • Según Reporte: 7 sesiones
      • Conteo Real (Asistencias): 7 sesiones
      • Coincide: ✅
   
   ...

📋 RESUMEN
═══════════════════════════════════════════════════

✅ TODOS LOS DATOS COINCIDEN CORRECTAMENTE
```

---

### 2️⃣ Validar Mes Específico

**¿Qué hace?**
- Compara un mes guardado en "Reportes Mensuales" con los datos reales
- Útil para verificar meses pasados
- Detecta si los datos fueron modificados después de guardar

**Cómo usarla:**
1. Menú → **🏥 Apoyo Emocional**
2. → **🔍 Validación de Reportes**
3. → **📅 Validar Mes Específico**
4. Ingresa el mes y año: **03/2026** (para marzo 2026)
5. Se creará una hoja con la validación

**Ejemplo de entrada:**
```
Formato: MM/YYYY
Ejemplo: 03/2026 para Marzo 2026
Ejemplo: 04/2026 para Abril 2026
```

**Resultado:**
```
🔍 VALIDACIÓN - MARZO 2026
═══════════════════════════════════════════════════

✅ MES ENCONTRADO EN REPORTES MENSUALES (fila 5)

COMPARACIÓN CON DATOS REALES:
─────────────────────────────────
Nuevos Ingresos (Mes):
   • Histórico: 15
   • Real: 15
   • Coincide: ✅
```

---

### 3️⃣ Generar Reporte Detallado

**¿Qué hace?**
- Lista TODOS los casos de un mes específico
- Muestra número de fila, participante, terapeuta
- Incluye sesiones detalladas por caso
- Perfecto para justificar datos con evidencia

**Cómo usarla:**
1. Menú → **🏥 Apoyo Emocional**
2. → **🔍 Validación de Reportes**
3. → **📋 Generar Reporte Detallado**
4. Ingresa el mes: **03/2026**
5. Se creará una hoja con todos los detalles

**Resultado:**
```
📋 REPORTE DETALLADO - MARZO 2026
═══════════════════════════════════════════════════

1️⃣ NUEVOS INGRESOS DEL MES
─────────────────────────────────
   • Fila 2: 03/03/2026 - Andrea Yamileth Arevalo Perez (Melissa)
   • Fila 3: 04/03/2026 - Jackeline Cotina Pablo López (Melissa)
   • Fila 4: 06/03/2026 - Estefani Gabriela Reynosa Castro (Melissa)
   ...
   
   TOTAL: 38 nuevos ingresos

2️⃣ SESIONES DEL MES POR TERAPEUTA
─────────────────────────────────

   Melissa: 16 sesiones
      • Fila 2: Andrea Yamileth Arevalo Perez (6 asistencias)
      • Fila 3: Jackeline Cotina Pablo López (3 asistencias)
      ...

   Diana: 23 sesiones
      • Fila 24: Brenda Sucel Montenegro Robles (2 asistencias)
      ...
```

**Para exportar:**
1. Abre la hoja generada
2. Archivo → Descargar → PDF o Excel
3. Usa este documento como justificación oficial

---

## 📊 Explicación de Tu Caso Específico

### Lo que viste:

**Resumen de Abril 2026:**
- Nuevos Ingresos (Mes): **0**
- Total Activos: **38**
- Total Sesiones: **63**

**Tabla de Terapias Individual:**
- Muchos casos con fechas como 3/3/2026, 4/3/2026, etc.

### La Explicación:

Las fechas que ves usan formato **DD/MM/YYYY** (Día/Mes/Año):

| Fecha en la hoja | Significado |
|------------------|-------------|
| 3/3/2026 | **3 de MARZO** (día 3, mes 3) |
| 4/3/2026 | **4 de MARZO** (día 4, mes 3) |
| 24/03/2026 | **24 de MARZO** (día 24, mes 3) |

**TODOS esos casos son de MARZO 2026, NO de ABRIL 2026**

Por eso el resumen de **ABRIL 2026** muestra:
- ✅ **Nuevos Ingresos (Mes): 0** - Correcto, no hay casos nuevos en abril
- ✅ **Total Activos: 38** - Casos que siguen en terapia desde marzo
- ✅ **Total Sesiones: 63** - Sesiones realizadas EN ABRIL con esos 38 casos

### Para verificar esto:

1. Usa: **📋 Generar Reporte Detallado**
2. Ingresa: **03/2026** (marzo)
3. Verás la lista completa de los 38 casos de marzo

---

## 🔧 Solución de Problemas

### Problema: "No veo el menú 🔍 Validación de Reportes"

**Solución:**
1. Cierra y vuelve a abrir la hoja de Google Sheets
2. Espera unos segundos a que cargue completamente
3. El menú debería aparecer automáticamente

### Problema: "Error al ejecutar la función"

**Solución:**
1. Verifica que estás usando el menú, NO ejecutando desde el editor de scripts
2. El menú es: **🏥 Apoyo Emocional → 🔍 Validación de Reportes**
3. NUNCA ejecutes las funciones desde Extensiones → Apps Script

### Problema: "Los datos no coinciden"

**Solución:**
1. Usa primero: **📊 Analizar Reporte Actual**
2. Si muestra discrepancias, ve a: **🏥 Apoyo Emocional → ⚙️ Avanzado → 🔧 Reparar Fórmulas Reporte**
3. Vuelve a analizar

---

## ✅ Mejores Prácticas

### Al Final de Cada Mes:

1. **Analiza el reporte:**
   ```
   🏥 Apoyo Emocional → 🔍 Validación de Reportes → 📊 Analizar Reporte Actual
   ```

2. **Si todo está ✅, genera el detalle para tus archivos:**
   ```
   🏥 Apoyo Emocional → 🔍 Validación de Reportes → 📋 Generar Reporte Detallado
   ```

3. **Exporta el reporte detallado:**
   - Abre la hoja generada
   - Archivo → Descargar → PDF
   - Guárdalo como respaldo

4. **Guarda el reporte mensual:**
   ```
   🏥 Apoyo Emocional → 💾 Guardar Reporte Mensual
   ```

### Para Presentar Informes:

1. **Genera reporte detallado del mes:**
   ```
   📋 Generar Reporte Detallado → Ingresa: 03/2026
   ```

2. **Exporta a PDF**

3. **El PDF incluirá:**
   - Lista completa de casos con número de fila
   - Sesiones detalladas por terapeuta
   - Totales exactos
   - Trazabilidad completa

---

## 📞 Preguntas Frecuentes

### P: ¿Las funciones modifican mis datos?

**R:** NO. Las funciones solo:
- ✅ Leen datos
- ✅ Generan análisis
- ✅ Crean hojas nuevas con resultados
- ❌ NO modifican casos
- ❌ NO borran información

### P: ¿Puedo usar las funciones varias veces?

**R:** Sí, todas las veces que quieras. Cada vez se generará una nueva hoja con los resultados actuales.

### P: ¿Qué hago si encuentro discrepancias?

**R:** 
1. Usa: **🏥 Apoyo Emocional → ⚙️ Avanzado → 🔧 Reparar Fórmulas Reporte**
2. Vuelve a analizar
3. Si persiste, revisa los datos en "Terapias Individual" directamente

### P: ¿Cómo exporto los resultados?

**R:**
1. Abre la hoja generada (ej: "Reporte Detallado Marzo 2026")
2. Archivo → Descargar → PDF o Excel
3. El archivo se descargará a tu computadora

---

## 🎯 Resumen Rápido

### Para usar las funciones:

1. ✅ Abre tu hoja de Google Sheets
2. ✅ Espera a que cargue
3. ✅ Usa el menú: **🏥 Apoyo Emocional → 🔍 Validación de Reportes**
4. ✅ Elige la función que necesitas
5. ✅ Revisa los resultados en la hoja generada
6. ✅ Exporta si necesitas

### NO hagas:

- ❌ NO ejecutes desde el editor de Apps Script
- ❌ NO modifiques el código
- ❌ NO uses el archivo ValidacionReporteMensual.gs separado

---

## 📚 Archivos de Documentación

- **GUIA_VALIDACION_REPORTES.md** - Guía completa con ejemplos
- **RESUMEN_TU_PROBLEMA.md** - Explicación de tu caso específico
- **INSTRUCCIONES_VALIDACION.md** - Este archivo (instrucciones de uso)

---

**¿Listo para empezar?**

Ve al menú: **🏥 Apoyo Emocional → 🔍 Validación de Reportes → 📊 Analizar Reporte Actual**

¡Empieza validando tu reporte actual para ver cómo funciona! 🎉
