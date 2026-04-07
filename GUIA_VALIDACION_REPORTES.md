# 🔍 GUÍA DE VALIDACIÓN DE REPORTES MENSUALES

## 📊 El Problema: Discrepancias en los Reportes

### ¿Por qué los números no coinciden?

Cuando comparas el **resumen mensual** con los **datos detallados**, pueden aparecer discrepancias por varias razones:

#### 1. **Confusión con las Fechas**

**MUY IMPORTANTE:** Verifica el formato de fecha que usas:

- **Formato DD/MM/YYYY (Latinoamérica):**
  - `3/3/2026` = 3 de MARZO de 2026
  - `4/3/2026` = 4 de MARZO de 2026
  - `24/03/2026` = 24 de MARZO de 2026

- **Formato MM/DD/YYYY (USA):**
  - `3/3/2026` = 3 de marzo de 2026
  - `4/3/2026` = 3 de ABRIL de 2026

**Tu Caso Específico:**
Los datos que mostraste son de **MARZO 2026**, no de Abril:
- Todas las fechas muestran `/3/2026` o `/03/2026`
- Esto significa el mes 3 (marzo)

Por eso el resumen de **ABRIL 2026** muestra:
- `Nuevos Ingresos (Mes): 0` ← CORRECTO si no hay casos en abril aún

#### 2. **Diferencia entre "Total" y "Este Mes"**

El reporte tiene DOS contadores:

| Columna | Significado |
|---------|-------------|
| **Total** (B) | TODOS los casos históricos (desde siempre) |
| **Este mes** (C) | Solo casos del MES ACTUAL |

**Ejemplo:**
```
Nuevos Ingresos (Total): 156    ← Todos desde que inició el programa
Nuevos Ingresos (Mes): 0        ← Solo casos de abril 2026
```

#### 3. **Conteo de Sesiones**

Las sesiones se calculan así:

```
Sesiones del mes = Columna M (Asistencias)
```

**NO** se cuentan:
- Sesiones de meses anteriores
- Inasistencias (columna L)

#### 4. **Fórmulas Desactualizadas**

Si editaste manualmente el reporte, las fórmulas pueden estar rotas.

---

## 🛠️ SOLUCIÓN: Script de Validación

He creado un script que analiza automáticamente tu reporte y detecta discrepancias.

### 📥 Instalación

1. **Abre tu hoja de cálculo de Google Sheets**

2. **Ve a: Extensiones → Apps Script**

3. **Crea un nuevo archivo:**
   - Haz clic en el **+** junto a "Archivos"
   - Nombre: `ValidacionReporteMensual.gs`

4. **Copia el contenido del archivo:**
   - Abre el archivo `ValidacionReporteMensual.gs` de este repositorio
   - Copia todo el código
   - Pégalo en el editor de Apps Script

5. **Guarda:**
   - Presiona `Ctrl + S` o haz clic en el ícono de guardar

6. **Recarga tu hoja de cálculo**
   - Cierra y vuelve a abrir la hoja de Google Sheets
   - Deberías ver un nuevo menú: **📊 Validación Reporte**

---

## 🔧 Uso del Script

### 1️⃣ Analizar Reporte Actual

**Cuándo usar:** Para verificar que el reporte del mes actual es correcto

**Pasos:**
1. Menú → **📊 Validación Reporte** → **🔍 Analizar Reporte Actual**
2. El script generará una hoja llamada **"Análisis Reporte"**
3. Revisa los resultados:
   - ✅ = Los datos coinciden
   - ❌ = Hay discrepancia

**Ejemplo de resultado:**
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

   Melissa:
      • Según Reporte: 16 sesiones
      • Conteo Real (Asistencias): 16 sesiones
      • Coincide: ✅
   
   ...
```

### 2️⃣ Validar Mes Específico

**Cuándo usar:** Para verificar un mes que ya guardaste en "Reportes Mensuales"

**Pasos:**
1. Menú → **📊 Validación Reporte** → **📅 Validar Mes Específico**
2. Ingresa el mes y año: **03/2026** (para marzo 2026)
3. El script comparará:
   - Lo que guardaste en "Reportes Mensuales"
   - Los datos reales de ese mes

**Ejemplo:**
```
Ingresa: 03/2026

Resultado:
✅ MES ENCONTRADO EN REPORTES MENSUALES (fila 5)

COMPARACIÓN CON DATOS REALES:
─────────────────────────────────
Nuevos Ingresos (Mes):
   • Histórico: 15
   • Real: 15
   • Coincide: ✅
```

### 3️⃣ Generar Reporte Detallado

**Cuándo usar:** Para ver TODOS los casos de un mes específico

**Pasos:**
1. Menú → **📊 Validación Reporte** → **📋 Generar Reporte Detallado**
2. Ingresa el mes: **03/2026**
3. Se creará una hoja con:
   - Lista de todos los nuevos ingresos con número de fila
   - Sesiones por terapeuta con detalles
   - Procesos finalizados

**Ejemplo de resultado:**
```
📋 REPORTE DETALLADO - MARZO 2026
═══════════════════════════════════════════════════

1️⃣ NUEVOS INGRESOS DEL MES
─────────────────────────────────
   • Fila 2: 03/03/2026 - Andrea Yamileth Arevalo Perez (Melissa)
   • Fila 3: 04/03/2026 - Jackeline Cotina Pablo López (Melissa)
   • Fila 4: 04/03/2026 - Taylor Nahomy Nineth Rosales López (Melissa)
   ...
   
   TOTAL: 38 nuevos ingresos

2️⃣ SESIONES DEL MES POR TERAPEUTA
─────────────────────────────────

   Melissa: 16 sesiones
      • Fila 2: Andrea Yamileth Arevalo Perez (6 asistencias)
      • Fila 3: Jackeline Cotina Pablo López (3 asistencias)
      ...
```

### 4️⃣ Corregir Fórmulas

**Cuándo usar:** Cuando el análisis muestra discrepancias

**Pasos:**
1. Menú → **📊 Validación Reporte** → **🔧 Corregir Fórmulas**
2. Confirma la acción
3. El script actualizará todas las fórmulas del reporte

**Esto corrige:**
- ✅ Fórmulas de conteo
- ✅ Cálculo de sesiones
- ✅ Totales por terapeuta
- ✅ Protección contra errores (IFERROR)

---

## 📋 Caso Práctico: Tu Situación

### Tu Problema:
```
Resumen muestra:
- Mes: Abril 2026
- Nuevos Ingresos (Mes): 0
- Total Activos: 38
- Total Sesiones: 63

Pero en Terapias ves muchos casos...
```

### Análisis:

1. **Verifica las fechas:**
   ```
   Los casos que ves son de MARZO (mes 3), no de ABRIL (mes 4)
   Ejemplos:
   - 3/3/2026 = 3 de MARZO
   - 4/3/2026 = 4 de MARZO
   - 24/03/2026 = 24 de MARZO
   ```

2. **El resumen de ABRIL 2026 es correcto:**
   - `Nuevos Ingresos (Mes): 0` ← No hay casos nuevos en abril aún
   - `Total Activos: 38` ← Casos que siguen en terapia desde marzo
   - `Total Sesiones: 63` ← Sesiones realizadas en abril

### Solución Paso a Paso:

#### Opción 1: Si quieres el reporte de MARZO 2026

1. Ve a la hoja **"Reportes Mensuales"**
2. Busca la fila de **"Marzo 2026"** (marzo 2026)
3. Ahí verás los datos correctos del mes de marzo

O usa el script:
```
📊 Validación Reporte → 📋 Generar Reporte Detallado
Ingresa: 03/2026
```

#### Opción 2: Si estás en ABRIL y quieres verificar los datos actuales

1. Usa el script de análisis:
   ```
   📊 Validación Reporte → 🔍 Analizar Reporte Actual
   ```

2. El script te dirá si los datos de abril son correctos

3. Si hay discrepancias, usa:
   ```
   📊 Validación Reporte → 🔧 Corregir Fórmulas
   ```

---

## ⚠️ Errores Comunes

### Error 1: "Los nuevos ingresos no coinciden"

**Causa:** Estás comparando el mes equivocado

**Solución:**
1. Verifica el formato de las fechas (DD/MM/YYYY vs MM/DD/YYYY)
2. Usa el script de reporte detallado para ver exactamente qué casos hay en cada mes

### Error 2: "Las sesiones no coinciden"

**Causa:** Puede ser:
- No se actualizó "Sesiones Mes Anterior" al final del mes pasado
- Las asistencias (columna M) no están registradas
- Se editó manualmente "No. Sesión" sin actualizar asistencias

**Solución:**
1. Verifica que columna M (Asistencias) tenga datos
2. Si guardaste el reporte mensual, debería haberse reseteado automáticamente
3. Usa "Corregir Fórmulas" para actualizar

### Error 3: "Total no coincide con la suma de terapeutas"

**Causa:** Fórmulas rotas

**Solución:**
```
📊 Validación Reporte → 🔧 Corregir Fórmulas
```

---

## 📊 Cómo Justificar los Datos

Cuando necesites presentar un informe:

### 1. Usa el Reporte Detallado

```
📊 Validación Reporte → 📋 Generar Reporte Detallado
Ingresa: 03/2026 (o el mes que necesites)
```

Esto te dará:
- ✅ Lista completa de casos con número de fila
- ✅ Participantes por terapeuta
- ✅ Sesiones exactas
- ✅ Procesos finalizados

### 2. Exporta los Datos

1. Abre la hoja generada (ej: "Reporte Detallado Marzo 2026")
2. Archivo → Descargar → PDF o Excel
3. Usa este documento como respaldo

### 3. Verifica con el Análisis

```
📊 Validación Reporte → 🔍 Analizar Reporte Actual
```

Si todo muestra ✅, tus datos son correctos.

---

## 🔄 Flujo de Trabajo Recomendado

### Cada Día:
- ✅ Trabaja normalmente
- ✅ El reporte se actualiza automáticamente

### Último Día del Mes:
1. **Analiza el reporte:**
   ```
   📊 Validación Reporte → 🔍 Analizar Reporte Actual
   ```

2. **Si hay errores:**
   ```
   📊 Validación Reporte → 🔧 Corregir Fórmulas
   ```

3. **Genera reporte detallado para tus archivos:**
   ```
   📊 Validación Reporte → 📋 Generar Reporte Detallado
   ```

4. **Guarda el reporte mensual:**
   ```
   Menú → 🏥 Apoyo Emocional → 📊 Guardar Reporte Mensual
   ```

### Cuando necesites presentar informes:

1. **Genera el reporte detallado del mes:**
   ```
   📊 Validación Reporte → 📋 Generar Reporte Detallado
   ```

2. **Exporta a PDF/Excel**

3. **Anexa capturas de pantalla de las validaciones (las ✅)**

---

## 💡 Tips Útiles

### Tip 1: Fechas Consistentes
- Configura Google Sheets para usar formato DD/MM/YYYY
- Archivo → Configuración → Configuración regional → Guatemala (o tu país)

### Tip 2: Backups Regulares
- Cada mes, descarga "Reportes Mensuales" como CSV
- Así tienes respaldo del histórico

### Tip 3: Documentación
- Usa el reporte detallado como documentación oficial
- Incluye el número de fila para trazabilidad

### Tip 4: Validación Regular
- Corre el análisis al menos una vez por semana
- Detecta problemas temprano

---

## 🆘 Soporte

Si después de usar el script todavía hay discrepancias:

1. **Genera el reporte detallado** del mes problemático
2. **Toma capturas** de:
   - El resumen en "Reporte"
   - La fila en "Reportes Mensuales"
   - El reporte detallado generado
3. **Revisa** la hoja "Terapias Individual" directamente
4. **Compara** las fechas y asegúrate del formato

---

## 📞 Preguntas Frecuentes

### P: ¿Por qué "Nuevos Ingresos (Mes)" está en 0?

**R:** Porque no hay casos nuevos en el MES ACTUAL. Verifica:
1. ¿Qué mes muestra el reporte?
2. ¿Las fechas de tus casos son de ese mes?
3. ¿Estás viendo el formato de fecha correcto?

### P: ¿Por qué "Total Activos" es 38 pero "Nuevos Ingresos" es 0?

**R:** Porque son cosas diferentes:
- **Total Activos**: Casos que SIGUEN en terapia (pueden ser de meses anteriores)
- **Nuevos Ingresos (Mes)**: Casos que EMPEZARON este mes

### P: ¿Cómo sé si mis datos son correctos?

**R:** Usa el script de validación:
```
📊 Validación Reporte → 🔍 Analizar Reporte Actual
```
Si todo muestra ✅, los datos son correctos.

### P: ¿El script modifica mis datos?

**R:** NO. El script solo:
- ✅ Lee datos
- ✅ Genera reportes
- ✅ Muestra análisis
- ❌ NO modifica casos
- ❌ NO borra información

Solo "Corregir Fórmulas" modifica algo (las fórmulas, no los datos).

---

## ✅ Resumen

1. **Instala el script de validación**
2. **Analiza tu reporte actual** para detectar problemas
3. **Genera reportes detallados** para documentación
4. **Usa las validaciones** para justificar datos
5. **Mantén las fórmulas actualizadas**

Con estas herramientas, podrás:
- ✅ Detectar discrepancias rápidamente
- ✅ Entender por qué ocurren
- ✅ Justificar tus números con datos precisos
- ✅ Generar informes profesionales

---

**¿Necesitas ayuda adicional?** Revisa los otros archivos de documentación en este repositorio.
