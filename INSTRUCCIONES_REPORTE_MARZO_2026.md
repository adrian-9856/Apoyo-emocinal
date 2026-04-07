# 📊 CÓMO GENERAR EL REPORTE DE MARZO 2026

## ✅ SOLUCIÓN A TU PROBLEMA

Has eliminado el reporte de marzo que estaba mal, y ahora necesitas generar uno nuevo con todos los datos actuales del sistema.

**¡BUENAS NOTICIAS!** He creado una función especial que genera el reporte de marzo 2026 usando TODOS los datos actuales de tu sistema.

---

## 🚀 PASOS PARA GENERAR EL REPORTE

### 1. Copia los archivos al Apps Script

**Opción A: Si ya tienes acceso a Apps Script**

1. Abre tu Google Sheets
2. Ve a: **Extensiones → Apps Script**
3. Crea un nuevo archivo: **GenerarReporteMarzo2026.gs**
4. Copia todo el código del archivo `GenerarReporteMarzo2026.gs` que creé
5. Guarda (Ctrl + S)

**Opción B: Actualizar el código existente**

1. Abre tu Google Sheets
2. Ve a: **Extensiones → Apps Script**
3. Abre el archivo **SistemaCompleto.gs**
4. Busca la función `onOpen()` y verifica que tenga la línea:
   ```javascript
   .addItem('📅 Generar Reporte Marzo 2026', 'generarReporteMarzo2026')
   ```
5. Guarda todo

---

### 2. Ejecuta la función

1. **Recarga tu Google Sheets** (F5 o actualiza la página)
2. Espera a que aparezca el menú **"🏥 Apoyo Emocional"**
3. Haz clic en: **🏥 Apoyo Emocional → 📅 Generar Reporte Marzo 2026**
4. Aparecerá un cuadro de confirmación, haz clic en **"Sí"**
5. Espera unos segundos mientras se genera el reporte

---

### 3. Verifica el reporte

1. Aparecerá un mensaje con un resumen de los datos:
   ```
   ✅ REPORTE DE MARZO 2026 GUARDADO

   📋 DATOS PRINCIPALES:

   • Nuevos Ingresos (Marzo): [número]
   • Total Casos Activos: [número]
   • Total Sesiones: [número]
   ```

2. Ve a la hoja **"Reportes Mensuales"**
3. Busca la fila que dice **"Marzo 2026"**
4. ¡Listo! Ahí están todos tus datos

---

## 📋 QUÉ HACE ESTA FUNCIÓN

La función **generarReporteMarzo2026()** hace lo siguiente:

### ✅ Cuenta correctamente:

1. **Nuevos Ingresos**: Todos los casos con fecha de ingreso entre 1 y 31 de marzo 2026
2. **Casos Activos por Terapeuta**: Todos los casos "En proceso" de cada terapeuta
3. **Sesiones por Terapeuta**: Usa la columna **"No. Sesión"** (columna H) - NO las asistencias que están en 0
4. **Procesos Culminados**: Casos culminados en marzo 2026
5. **Retirados/Deserciones**: Casos retirados en marzo 2026
6. **Captación**: Hoja de interés, referencias y derivaciones de marzo 2026

### ✅ Guarda en "Reportes Mensuales":

- Si ya existe un reporte de marzo, lo **ACTUALIZA**
- Si no existe, lo **CREA** nuevo
- Guarda la fecha y hora de generación

---

## 🎯 DATOS IMPORTANTES

### Sesiones por Terapeuta

La función usa el **número de "No. Sesión"** (columna H) para contar las sesiones, porque:

❌ Las columnas "Asistencias" e "Inasistencias" están en 0
✅ La columna "No. Sesión" tiene el total real de sesiones

**Ejemplo de lo que verás:**
- Gerber: 6 casos activos, [suma de No. Sesión] sesiones
- Melissa: 7 casos activos, [suma de No. Sesión] sesiones
- Diana: 16 casos activos, [suma de No. Sesión] sesiones
- Karina: 9 casos activos, [suma de No. Sesión] sesiones

---

## ⚠️ IMPORTANTE: Casos que se incluyen

La función cuenta **SOLO** los casos que tienen:

1. **Participante con nombre** (columna D no vacía)
2. **Estado = "En proceso"** (columna I)
3. **Fecha de ingreso entre 1 y 31 de marzo 2026** (para nuevos ingresos)

Si un caso no aparece, verifica que cumple estos requisitos.

---

## 🔍 VERIFICACIÓN

Después de generar el reporte, puedes verificar que los datos sean correctos:

### Opción 1: Usar el script de validación

```
Menú → 🔍 Validación de Reportes → 📋 Generar Reporte Detallado
Ingresa: 03/2026
```

Esto te mostrará una lista detallada de:
- Cada nuevo ingreso con su número de fila
- Cada terapeuta con sus casos y sesiones
- Totales exactos

### Opción 2: Verificación manual

1. Ve a la hoja **"Terapias Individual"**
2. Filtra por fecha de ingreso: marzo 2026
3. Cuenta cuántos casos tiene cada terapeuta
4. Compara con el reporte

---

## 📊 EJEMPLO DE RESULTADO

Cuando ejecutes la función, verás algo como esto:

```
✅ REPORTE DE MARZO 2026 GUARDADO

Nueva fila: 15

📋 DATOS PRINCIPALES:

• Nuevos Ingresos (Marzo): 38
• Total Casos Activos: 38
• Total Sesiones: 156

Ve a "Reportes Mensuales" para ver todos los detalles.
```

Y en "Reportes Mensuales" verás una fila con:

| Mes | Nuevos Ingresos (Total) | Nuevos Ingresos (Mes) | ... | Activos Gerber | Sesiones Gerber | ... |
|-----|------------------------|---------------------|-----|---------------|----------------|-----|
| Marzo 2026 | 156 | 38 | ... | 6 | 40 | ... |

---

## ❓ PREGUNTAS FRECUENTES

### ¿Puedo ejecutar esta función varias veces?

**Sí.** Si ya existe un reporte de marzo 2026, la función lo **actualizará** con los datos más recientes.

### ¿Afectará los datos actuales del sistema?

**No.** La función solo **LEE** los datos y los guarda en "Reportes Mensuales". NO modifica ni borra nada de "Terapias Individual" u otras hojas.

### ¿Qué pasa si encuentro errores en el reporte?

1. Verifica los datos en "Terapias Individual"
2. Ejecuta la función nuevamente
3. El reporte se actualizará con los datos correctos

### ¿Puedo crear reportes de otros meses?

Actualmente, esta función está configurada específicamente para **marzo 2026**.

Si necesitas reportes de otros meses, puedo crear funciones similares o una función genérica que te permita elegir el mes.

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error: "No se encontró la hoja..."

**Causa:** Falta una hoja del sistema
**Solución:** 
1. Verifica que existan las hojas: "Terapias Individual", "Reportes Mensuales"
2. Si faltan, ejecuta: **Menú → ⚙️ Avanzado → 🔴 Instalación Completa**

### Error: "No hay datos para procesar"

**Causa:** La hoja está vacía o no hay casos en marzo
**Solución:**
1. Ve a "Terapias Individual"
2. Verifica que haya casos con fechas de marzo 2026
3. Verifica que la columna "Estado" diga "En proceso"

### Los números no coinciden con lo que veo

**Posibles causas:**
1. Hay casos con estado diferente a "En proceso"
2. Las fechas no están en formato correcto
3. Hay filas vacías con espacios

**Solución:**
1. Ejecuta: **Menú → 🔍 Validación de Reportes → 📋 Generar Reporte Detallado**
2. Ingresa: `03/2026`
3. Compara los datos línea por línea

---

## ✅ CHECKLIST FINAL

Después de ejecutar la función, verifica:

- [ ] Existe una fila en "Reportes Mensuales" que dice "Marzo 2026"
- [ ] El número de "Nuevos Ingresos (Mes)" coincide con tus registros
- [ ] El "Total Casos Activos" es correcto (38 según tu captura)
- [ ] Las sesiones por terapeuta tienen sentido
- [ ] La fecha de guardado es la actual

---

## 📞 PRÓXIMOS PASOS

1. **Ejecuta la función** siguiendo los pasos arriba
2. **Verifica los datos** en "Reportes Mensuales"
3. **Exporta el reporte** si necesitas:
   - Abre "Reportes Mensuales"
   - Archivo → Descargar → PDF o Excel

4. **Para abril**: Cuando termine abril, usa el botón normal:
   - **Menú → 🏥 Apoyo Emocional → 💾 Guardar Reporte Mensual**

---

## 🎉 ¡LISTO!

Con esta función podrás generar el reporte de marzo 2026 correctamente usando todos los datos actuales del sistema.

**Recuerda:**
- ✅ La función usa "No. Sesión" (columna H), no "Asistencias"
- ✅ Solo cuenta casos "En proceso"
- ✅ Solo cuenta nuevos ingresos con fechas de marzo 2026
- ✅ Puedes ejecutarla cuantas veces necesites

**Si tienes dudas, revisa el archivo generado o contacta para más ayuda.**
