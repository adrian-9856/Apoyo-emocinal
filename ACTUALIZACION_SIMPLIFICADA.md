# 🎯 ACTUALIZACIÓN: HOJA ASIGNACIONES SIMPLIFICADA

## 📋 RESUMEN DE CAMBIOS

Se ha simplificado la hoja "Asignaciones y Terapias" para hacerla más fácil de usar y enfocarse en lo esencial.

---

## ✅ ESTRUCTURA ANTERIOR vs NUEVA

### ❌ ANTES (16 columnas):

1. Terapeuta
2. No.
3. Participante
4. Creemos ID
5. Sexo
6. Tipo Terapia
7. No. Sesión Actual
8. **Fecha Última Sesión** ❌ (eliminada)
9. **Próxima Sesión** ❌ (eliminada)
10. **Asistencia Última** ❌ (eliminada)
11. **Comentarios Sesión** ❌ (eliminada)
12. Estado Proceso
13. Fecha Inicio
14. **Fecha Finalización** ❌ (eliminada - ahora automática)
15. Motivo Finalización
16. **Total Sesiones** ❌ (eliminada - no necesaria)

### ✅ AHORA (10 columnas):

| Col | Nombre | Tipo | Descripción |
|-----|--------|------|-------------|
| A | Terapeuta | Auto | Se asigna desde "Nuevos Ingresos" |
| B | No. | Auto | Número consecutivo automático |
| C | Participante | Auto | Nombre del participante |
| D | Creemos ID | Auto | ID del sistema |
| E | Sexo | Auto | Hombre/Mujer/Otro |
| F | Tipo Terapia | Auto | Individual/Grupal/Familiar/Pareja |
| G | **No. Sesión** | **Dropdown 1-20** | Número de sesión actual |
| H | **Estado Proceso** | **Dropdown** | En proceso / Finalizado |
| I | Fecha Inicio | Auto | Fecha de asignación |
| J | Motivo Finalización | Auto | Se llena al finalizar |

---

## 🔥 NUEVA FUNCIONALIDAD: FINALIZAR CON MOTIVO

### ¿Cómo funciona?

```
👩‍⚕️ TERAPEUTA TRABAJA CON PARTICIPANTE
    ↓
🔢 ACTUALIZA NÚMERO DE SESIÓN (1-20)
    ↓
✅ CUANDO TERMINA: Marca "Finalizado"
    ↓
📝 SISTEMA PREGUNTA:
   1️⃣ ¿Qué tipo de finalización?
      • Proceso culminado
      • Deserción
      • Gestión de casos
    ↓
   2️⃣ ¿Motivo detallado?
      (Campo de texto libre)
    ↓
✉️ ENVÍA EMAIL AL DIRECTOR
    ↓
📋 COPIA A HOJA FINAL
   (NO borra el original)
    ↓
🎨 CAMBIA COLOR DE LA FILA
    ↓
📊 ACTUALIZA REPORTES
```

---

## 📝 PASO A PASO: FINALIZAR UN CASO

### PASO 1: Trabajar normalmente

- Registra sesiones en la columna **G (No. Sesión)**
- Usa el dropdown para seleccionar: 1, 2, 3... hasta 20

### PASO 2: Cuando termine el caso

1. En la columna **H (Estado Proceso)**
2. Selecciona: **"Finalizado"**
3. **Espera 2-3 segundos**

### PASO 3: Aparece diálogo 1

```
🏁 FINALIZAR CASO

Seleccione el tipo de finalización:

1 - Proceso culminado
2 - Deserción
3 - Gestión de casos

Ingrese el número (1, 2 o 3):
[______]

[OK]  [Cancelar]
```

- **Escribe el número** (1, 2 o 3)
- Clic en **OK**

### PASO 4: Aparece diálogo 2

```
📝 MOTIVO DE FINALIZACIÓN

Participante: María González
Tipo: Proceso culminado

Ingrese el motivo detallado de la finalización:
[________________________________]

[OK]  [Cancelar]
```

- **Escribe el motivo** (ej: "Objetivos terapéuticos alcanzados, mejoría significativa")
- Clic en **OK**

### PASO 5: Confirmación

```
✅ FINALIZACIÓN EXITOSA

👤 María González
📊 Proceso culminado
🔢 Sesiones: 8
📅 Duración: 45 días
✉️ Email enviado al director
```

---

## ✉️ EMAIL AL DIRECTOR

Cuando finalizas un caso, **automáticamente se envía un email** al director con:

```
Asunto: 🏁 Finalización de Caso - María González

Se ha finalizado un caso en el sistema de Apoyo Emocional.

═══════════════════════════════════════
INFORMACIÓN DEL CASO
═══════════════════════════════════════

👤 Participante: María González
👩‍⚕️ Terapeuta: Diana
📊 Tipo de finalización: Proceso culminado
🔢 Sesiones realizadas: 8
📅 Duración: 45 días

═══════════════════════════════════════
MOTIVO DE FINALIZACIÓN
═══════════════════════════════════════

Objetivos terapéuticos alcanzados, mejoría
significativa en sintomatología de ansiedad.

═══════════════════════════════════════

Este es un mensaje automático del Sistema de Apoyo Emocional.
Fecha: 21/11/2024 14:30
```

### ⚠️ IMPORTANTE: CONFIGURAR EMAIL

**Debes cambiar el email del director en el código:**

1. Apps Script → Automatizaciones.gs
2. Buscar línea 565: `const emailDirector = "director@apoyoemocional.org";`
3. **Cambiar por el email real del director**
4. Guardar (Ctrl+S)

---

## 🎨 COLORES AUTOMÁTICOS

Cuando finalizas un caso, la fila completa cambia de color:

- 🟢 **Verde claro** → Proceso culminado
- 🔴 **Rojo claro** → Deserción
- 🟡 **Amarillo claro** → Gestión de casos

Esto ayuda a identificar visualmente el estado de cada caso.

---

## ⚠️ IMPORTANTE: DATOS NO SE BORRAN

**Diferencia clave con el sistema anterior:**

### ❌ ANTES:
- Al finalizar → Se **movía** a hoja final
- Desaparecía de "Asignaciones"

### ✅ AHORA:
- Al finalizar → Se **copia** a hoja final
- **Permanece** en "Asignaciones" (con color)

**Ventaja:** Puedes ver el historial completo de todos los casos en una sola hoja.

---

## 🔧 ACTUALIZAR TU SISTEMA

### PASO 1: Actualizar código

1. Apps Script → Code.gs
2. Copiar el nuevo código del repositorio
3. Guardar (Ctrl+S)

4. Apps Script → Automatizaciones.gs
5. Copiar el nuevo código del repositorio
6. Guardar (Ctrl+S)

### PASO 2: Configurar email del director

1. En Automatizaciones.gs, línea 565
2. Cambiar `"director@apoyoemocional.org"` por el email real
3. Guardar

### PASO 3: Reinstalar sistema (OPCIONAL)

⚠️ **CUIDADO:** Esto recreará todas las hojas y borrará datos existentes.

Si quieres mantener tus datos actuales:
1. **Exporta** cada hoja a CSV o Excel
2. Ejecuta: 🏥 Apoyo Emocional → 🚀 Instalar Sistema Completo
3. **Importa** los datos de vuelta manualmente

Si prefieres **NO reinstalar**:
- Las validaciones y formatos se actualizarán automáticamente
- La automatización funcionará con la nueva estructura
- Pero la hoja "Asignaciones" mantendrá las 16 columnas antiguas
- **Recomendado:** Crear una nueva hoja manualmente con las 10 columnas

---

## 📊 VENTAJAS DE LA SIMPLIFICACIÓN

### ✅ Más simple
- Solo 10 columnas vs 16 anteriores
- Menos campos que llenar
- Más fácil de entender

### ✅ Más rápido
- Dropdown con números 1-20
- Solo 2 estados: En proceso / Finalizado
- Menos clics

### ✅ Mejor control
- Motivo obligatorio al finalizar
- Director recibe notificación automática
- Datos no se pierden (se copian, no se mueven)

### ✅ Mejor seguimiento
- Historial completo visible
- Colores para identificar estados
- Reportes más precisos

---

## 🎯 FLUJO COMPLETO ACTUALIZADO

```
📋 LISTA DE ESPERA
   • Registrar participante
   • Priorizar (Alta/Media/Baja)
   • Marcar: "Aceptado"
   ↓ 🔥 AUTOMÁTICO

👤 NUEVOS INGRESOS
   • Se crea automáticamente
   • Asignar terapeuta (dropdown)
   ↓ 🔥 AUTOMÁTICO

👩‍⚕️ ASIGNACIONES Y TERAPIAS (SIMPLIFICADA)
   • 10 columnas esenciales
   • Actualizar sesión (1-20)
   • Marcar: "Finalizado"
   ↓ 🔥 PROMPTS + EMAIL

📊 HOJAS FINALES
   • Procesos Culminados
   • Deserciones
   • Gestión de Casos
   ↓

📈 REPORTES AUTOMÁTICOS
```

---

## ❓ PREGUNTAS FRECUENTES

### ¿Puedo cancelar la finalización?

**Sí.** En cualquiera de los 2 diálogos, haz clic en **"Cancelar"**.

El sistema revertirá el estado a "En proceso" automáticamente.

### ¿Qué pasa si me equivoco al finalizar?

El registro queda en "Asignaciones" con color. Puedes:
1. Cambiar el estado de vuelta a "En proceso"
2. Eliminar manualmente el registro de la hoja final
3. El email ya fue enviado (no se puede cancelar)

### ¿Puedo usar más de 20 sesiones?

Actualmente el dropdown tiene 1-20. Si necesitas más:
1. Code.gs, función `configurarValidacionesMejoradas()`
2. Línea 695: cambiar `i <= 20` por `i <= 30` (o el número que necesites)
3. Guardar y recargar

### ¿Dónde veo los casos finalizados?

En **3 lugares**:
1. **Asignaciones y Terapias** → Con colores de fondo
2. **Hoja correspondiente** → Procesos Culminados / Deserciones / Gestión Casos
3. **Reportes Automáticos** → Estadísticas

### ¿El director recibe todos los emails?

Sí, **cada finalización envía un email**. Si hay problemas:
1. Verificar que el email está bien escrito
2. Verificar permisos de MailApp en Apps Script
3. Revisar carpeta de spam del director

---

## 🆘 PROBLEMAS COMUNES

### ❌ "No aparecen los dropdowns"

**Solución:**
```
Menú → 🏥 Apoyo Emocional → 🔧 Configurar Validaciones
```

### ❌ "No aparecen los diálogos al finalizar"

**Verificar:**
1. ¿El trigger está activo?
   ```
   Menú → Automatizaciones → Verificar Triggers
   Debe mostrar: ✅ 1 trigger activo
   ```

2. ¿Hay errores en el log?
   ```
   Apps Script → Ejecuciones
   Buscar líneas rojas
   ```

### ❌ "El email no se envía"

**Verificar:**
1. Email correcto en línea 565 de Automatizaciones.gs
2. Permisos de MailApp autorizados
3. Revisar logs: Apps Script → Ejecuciones

### ❌ "El registro no se copia a la hoja final"

**Verificar:**
1. Que existan las hojas: Procesos Culminados, Deserciones, Gestión de Casos
2. Ejecutar diagnóstico:
   ```
   Menú → Automatizaciones → Diagnóstico Completo
   ```

---

## ✅ CHECKLIST DE ACTUALIZACIÓN

```
□ Código actualizado (Code.gs + Automatizaciones.gs)
□ Email del director configurado (línea 565)
□ Sistema reinstalado (opcional) o hoja actualizada manualmente
□ Triggers verificados (debe haber 1 activo)
□ Validaciones configuradas
□ Prueba de finalización:
  □ Marcar "Finalizado"
  □ Seleccionar tipo (1, 2 o 3)
  □ Ingresar motivo
  □ Verificar email enviado
  □ Verificar copia en hoja final
  □ Verificar color de fila
□ Capacitar equipo en nuevo flujo
□ Celebrar la simplificación 🎉
```

---

## 📞 SOPORTE

Si tienes problemas con la actualización:

1. **Revisar logs:**
   ```
   Apps Script → Ejecuciones
   ```

2. **Ejecutar diagnóstico:**
   ```
   Menú → Automatizaciones → Diagnóstico Completo
   ```

3. **Contactar:**
   - GitHub Issues
   - Email de soporte

---

## 🎉 RESUMEN

### Cambios principales:

1. ✅ Hoja Asignaciones simplificada (16 → 10 columnas)
2. ✅ Dropdown 1-20 para sesiones
3. ✅ Solo 2 estados: En proceso / Finalizado
4. ✅ Prompts al finalizar (tipo + motivo)
5. ✅ Email automático al director
6. ✅ Los datos se COPIAN, no se mueven
7. ✅ Colores automáticos por tipo de finalización

### Beneficios:

- 🚀 Más rápido de usar
- 🎯 Más enfocado en lo esencial
- 📧 Mejor comunicación con dirección
- 📊 Datos no se pierden
- 🎨 Visualización clara con colores

---

**Versión:** 3.0
**Fecha:** Noviembre 2024
**Compatibilidad:** Google Sheets + Apps Script

¿Listo para simplificar? ¡Adelante! 🚀
