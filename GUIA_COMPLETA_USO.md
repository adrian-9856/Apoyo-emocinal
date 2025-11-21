# 📚 GUÍA COMPLETA DE USO - Sistema de Apoyo Emocional

## 🎯 RESUMEN RÁPIDO

Este sistema te permite gestionar participantes de apoyo emocional desde que llegan hasta que terminan el proceso, **TODO AUTOMÁTICO**.

---

## 🔄 FLUJO COMPLETO DEL SISTEMA

```
📋 PASO 1: LISTA DE ESPERA
    ↓ Marcar "Aceptado"
    ↓ 🔥 AUTOMÁTICO

👤 PASO 2: NUEVOS INGRESOS
    ↓ Asignar Terapeuta
    ↓ 🔥 AUTOMÁTICO

👩‍⚕️ PASO 3: ASIGNACIONES Y TERAPIAS
    ↓ Cambiar Estado
    ↓ 🔥 AUTOMÁTICO

🎉 PASO 4: HOJAS FINALES
    • Procesos Culminados
    • Deserciones
    • Gestión de Casos
```

---

## 📋 PASO 1: LISTA DE ESPERA

### ¿Cuándo usar?
Cuando un participante solicita el servicio pero no hay cupo inmediato.

### ¿Cómo registrar?

1. **Ir a hoja "Lista de Espera"** (primera hoja)

2. **Llenar datos en fila vacía:**

| Columna | Qué llenar | Tipo |
|---------|------------|------|
| C | Nombre completo | Escribir |
| D | Creemos ID (opcional) | Escribir |
| E | Sexo | 📋 Desplegable |
| F | Rango de edad | 📋 Desplegable |
| G | Malestar principal | 📋 Desplegable |
| H | **Prioridad** | 📋 Desplegable: **Alta/Media/Baja** |
| I | Tipo de atención | 📋 Desplegable |
| J | Derivado por | Escribir |
| K | Contacto emergencia | Escribir |
| L | Teléfono | Escribir |
| M | Estado | NO TOCAR (automático: "En espera") |
| N | Observaciones | Escribir |

3. **Columnas automáticas** (NO tocar):
   - A: Fecha (se llena sola)
   - B: Número (se llena solo)
   - M: Estado inicial (se llena solo)

### ¿Cómo aceptar participante?

Cuando haya cupo disponible:

1. En la fila del participante
2. Columna **M (Estado)**
3. Hacer clic en la celda
4. Aparece flecha ▼
5. Seleccionar: **"Aceptado"**
6. **ESPERAR 2-3 segundos**
7. Aparece mensaje: "✅ ACEPTADO DESDE LISTA DE ESPERA"
8. La fila se pone **verde**
9. El participante ya está en "Nuevos Ingresos"

### Otros estados:
- **"Rechazado"**: No cumple criterios (queda en lista, no se mueve)
- **"Cancelado"**: Participante desistió (queda en lista, no se mueve)

---

## 👤 PASO 2: NUEVOS INGRESOS

### ¿Cuándo usar?
- Participantes aceptados de Lista de Espera (vienen automáticamente)
- Participantes que entran directo sin lista de espera

### ¿Cómo registrar directo?

Si NO usas lista de espera:

1. **Ir a hoja "Nuevos Ingresos"**
2. **Llenar datos en fila vacía:**

| Columna | Qué llenar | Tipo |
|---------|------------|------|
| C | Nombre completo | Escribir |
| D | Creemos ID | Escribir |
| E | Sexo | 📋 Desplegable |
| F | Rango edad | 📋 Desplegable |
| G | Malestar principal | 📋 Desplegable |
| H | **TERAPEUTA** | 📋 **Desplegable** |
| I | Tipo atención | 📋 Desplegable |
| J | Derivado por | Escribir |
| K | Contacto emergencia | Escribir |

3. **Columnas automáticas** (NO tocar):
   - A: Fecha
   - B: Número
   - L: Estado

### ¿Cómo asignar terapeuta? 🔥

**ESTE ES EL PASO MÁGICO:**

1. En la fila del participante
2. Columna **H (Terapeuta Asignado)**
3. Hacer clic en la celda
4. Aparece flecha ▼
5. Seleccionar: **Gerber, Melissa, Diana o Karina**
6. **ESPERAR 2-3 segundos**
7. Aparece mensaje: "✅ ASIGNACIÓN EXITOSA"
8. Estado cambia a "Asignado" (verde)
9. **YA ESTÁ en "Asignaciones y Terapias"**

---

## 👩‍⚕️ PASO 3: ASIGNACIONES Y TERAPIAS

### ¿Para qué sirve?
Aquí gestionas todas las sesiones del participante.

### Columnas importantes:

| Columna | Para qué | Cuándo actualizar |
|---------|----------|-------------------|
| A | Terapeuta | No cambiar (viene de asignación) |
| B | Número | Automático |
| C | Participante | No cambiar |
| G | **No. Sesión Actual** | **Cada sesión** (1, 2, 3, 4...) |
| H | Fecha última sesión | Automático al cambiar G |
| I | Próxima sesión | Automático (7 días después) |
| J | **Asistencia Última** | **Cada sesión** |
| K | **Comentarios Sesión** | **Cada sesión** |
| L | **Estado Proceso** | Cuando termine |
| M | Fecha inicio | Automático |
| N | Fecha fin | Automático al cambiar L |
| O | Motivo fin | Automático al cambiar L |
| P | Total sesiones | Automático |

### ¿Cómo registrar sesión?

**Después de cada sesión:**

1. **Actualizar número de sesión (G):**
   - Sesión 1, 2, 3, 4...
   - Se actualiza fecha automáticamente

2. **Registrar asistencia (J):**
   - "Asistió" ✅
   - "Faltó" ❌
   - "Falta justificada"
   - "Cancelada"
   - "Reprogramada"

3. **Escribir comentarios (K):**
   - Resumen de la sesión
   - Observaciones importantes
   - Avances o retrocesos

### ¿Cómo finalizar caso? 🔥

**Cuando el participante termine (por cualquier motivo):**

1. En la fila del participante
2. Columna **L (Estado Proceso)**
3. Hacer clic en la celda
4. Aparece flecha ▼
5. Seleccionar UNO de estos:

   **A) "Proceso culminado"** (completó exitosamente)
   - 🔥 Se mueve SOLO a "Procesos Culminados"
   - Color verde

   **B) "Deserción"** (abandonó el proceso)
   - 🔥 Se mueve SOLO a "Deserciones"
   - Color rojo

   **C) "Gestión de casos"** (necesita atención especializada)
   - 🔥 Se mueve SOLO a "Gestión de Casos"
   - Color amarillo

6. **ESPERAR 2-3 segundos**
7. Aparece mensaje: "✅ FINALIZACIÓN EXITOSA"
8. **La fila se colorea**
9. **YA ESTÁ en la hoja correspondiente**

---

## 🎉 PASO 4: HOJAS FINALES

### A) Procesos Culminados

**¿Qué hay aquí?**
Casos que terminaron exitosamente.

**Datos que se guardan:**
- Total de sesiones
- Duración del proceso (días)
- Motivo de culminación
- Objetivos alcanzados
- Nivel de satisfacción
- Recomendaciones
- Mes de culminación

**¿Qué hacer?**
- Revisar periódicamente
- Identificar casos exitosos
- Análisis de efectividad

### B) Deserciones

**¿Qué hay aquí?**
Participantes que abandonaron.

**Datos que se guardan:**
- Sesiones asistidas antes de desertar
- Última asistencia registrada
- Motivo de deserción
- Intentos de contacto
- Factores identificados

**¿Qué hacer?**
- Analizar patrones
- Identificar causas comunes
- Mejorar retención

### C) Gestión de Casos

**¿Qué hay aquí?**
Casos que necesitan atención especializada.

**Datos que se guardan:**
- Tipo de gestión requerida
- Motivo
- Acciones tomadas
- A dónde se derivó
- Estado actual

**¿Qué hacer?**
- Seguimiento especializado
- Coordinación con otros servicios
- Documentación detallada

---

## 👥 ASISTENCIA GRUPAL

### ¿Para qué sirve?
Controlar asistencia a sesiones grupales (talleres, grupos de apoyo).

### Opción 1: Usar la hoja directa

1. **Ir a hoja "Asistencia Grupal"**
2. **Agregar participantes:**
   - Columna A: Nombre
   - Columna B: Teléfono
3. **Marcar asistencia:**
   - Columnas C-J tienen fechas
   - Hacer clic en checkbox
   - ✅ = Asistió
   - ⬜ = No asistió
4. **Estadísticas automáticas:**
   - Se calculan solas arriba

### Opción 2: Importar desde otro archivo 🔥

**Si tienes las asistencias en OTRO Google Sheets:**

1. **Menú:** 🏥 Apoyo Emocional
2. **→ Asistencia Grupal**
3. **→ 📥 Importar desde Otro Archivo**
4. Aparece ventana
5. **Pegar URL** del archivo con asistencias
6. Ejemplo:
   ```
   https://docs.google.com/spreadsheets/d/ABC123XYZ/edit
   ```
7. Clic en **OK**
8. **ESPERAR** 3-5 segundos
9. Mensaje: "✅ ASISTENCIAS IMPORTADAS"
10. **Los datos ya están aquí**

### Ver estadísticas del mes

1. **Menú:** 🏥 Apoyo Emocional
2. **→ Asistencia Grupal**
3. **→ 📊 Ver Estadísticas del Mes**
4. Aparece ventana con:
   - Total participantes
   - Sesiones realizadas este mes
   - Asistencias registradas
   - Porcentaje de asistencia

---

## 📊 REPORTES

### Reporte Automático Completo

**¿Dónde verlo?**
Hoja: "Reporte Automático Completo"

**¿Qué muestra?**
- 👥 Nuevos ingresos (total y del mes)
- 👩‍⚕️ Carga por terapeuta (casos activos)
- 🎉 Procesos culminados (total y del mes)
- ⚠️ Deserciones (total y tasa)
- 📋 Gestión de casos
- 👥 Asistencia grupal
- 📊 Estadísticas generales

**¿Se actualiza?**
✅ **SÍ, AUTOMÁTICAMENTE** cada vez que:
- Aceptas participante de lista
- Asignas terapeuta
- Finalizas caso
- Importas asistencias

### Reportes Mensuales

**¿Dónde verlo?**
Hoja: "Reportes Mensuales"

**¿Qué muestra?**
Fila 2 = Mes actual (siempre actualizado)
- Nuevos ingresos del mes
- Culminados del mes
- Deserciones del mes
- Gestión de casos del mes
- Casos activos
- Tasa de éxito
- Distribución por terapeuta
- Asistencias grupales
- % de asistencia grupal

**¿Cómo guardar historial?**
1. **Menú:** 🏥 Apoyo Emocional
2. **→ Datos**
3. **→ 📅 Guardar Reporte Mensual**
4. Se guarda snapshot del mes

---

## 🔥 MENÚ COMPLETO

```
🏥 Apoyo Emocional
├── 🚀 Instalar Sistema Completo
│
├── ⚡ Automatizaciones
│   ├── 🔍 Verificar Triggers
│   ├── 🧪 Probar Sistema
│   └── 📊 Diagnóstico Completo
│
├── 📊 Datos
│   ├── 📋 Crear Datos Ejemplo
│   ├── 📅 Guardar Reporte Mensual
│   └── 🔄 Actualizar Reportes
│
├── 👥 Asistencia Grupal
│   ├── 📥 Importar desde Otro Archivo
│   └── 📊 Ver Estadísticas del Mes
│
└── ❓ Ayuda
```

---

## ✅ REGLAS DE ORO

### 1. **SIEMPRE usar listas desplegables** ▼
❌ NO escribir manualmente
✅ Hacer clic en flecha y seleccionar

### 2. **ESPERAR 2-3 segundos** después de seleccionar
Debe aparecer mensaje de confirmación

### 3. **NO tocar columnas automáticas**
- Columnas con fórmulas (A, B, L, M, N, etc.)
- Columnas que dicen "Automático"

### 4. **Verificar trigger activo**
Mínimo 1 vez por semana:
```
Menú → Automatizaciones → Verificar Triggers
Debe decir: ✅ 1 trigger(s) activo(s)
```

### 5. **Si algo no funciona**
1. Ver si aparece mensaje de error
2. Verificar trigger activo
3. Consultar TROUBLESHOOTING.md
4. Contactar administrador

---

## 📈 ESTADÍSTICAS Y ANÁLISIS

### Métricas clave a revisar:

**Semanal:**
- Nuevos ingresos
- Casos activos por terapeuta
- Asistencias a sesiones
- Deserciones

**Mensual:**
- Procesos culminados
- Tasa de éxito
- Tasa de deserción
- Asistencia a grupos
- Carga de trabajo por terapeuta

**Trimestral:**
- Tendencias de ingresos
- Efectividad por tipo de intervención
- Motivos de deserción más comunes
- Satisfacción de participantes

---

## 🎯 CASOS DE USO COMUNES

### Caso 1: Participante nuevo con lista de espera

```
1. Lista de Espera → Registrar datos
2. Asignar Prioridad: Alta
3. Cuando hay cupo → Marcar "Aceptado"
4. 🔥 Va automático a Nuevos Ingresos
5. Asignar Terapeuta
6. 🔥 Va automático a Asignaciones
7. Gestionar sesiones
8. Finalizar cuando corresponda
```

**Tiempo:** 2 minutos por paso

### Caso 2: Participante directo sin espera

```
1. Nuevos Ingresos → Registrar datos
2. Asignar Terapeuta directo
3. 🔥 Va automático a Asignaciones
4. Gestionar sesiones
5. Finalizar cuando corresponda
```

**Tiempo:** 1-2 minutos

### Caso 3: Registrar sesión

```
1. Asignaciones y Terapias
2. Encontrar participante
3. Actualizar No. Sesión (G)
4. Seleccionar Asistencia (J)
5. Escribir Comentarios (K)
```

**Tiempo:** 1 minuto

### Caso 4: Finalizar caso exitoso

```
1. Asignaciones y Terapias
2. Encontrar participante
3. Estado Proceso (L) → "Proceso culminado"
4. 🔥 Va automático a Procesos Culminados
```

**Tiempo:** 30 segundos

### Caso 5: Importar asistencia grupal

```
1. Tener URL del archivo con asistencias
2. Menú → Asistencia Grupal → Importar
3. Pegar URL
4. 🔥 Datos importados automáticamente
```

**Tiempo:** 1 minuto

---

## 🆘 PROBLEMAS FRECUENTES

### "No aparece mensaje de confirmación"

**Causa:** No se usó lista desplegable

**Solución:**
1. Deshacer (Ctrl+Z)
2. Hacer clic en celda
3. Esperar flecha ▼
4. Seleccionar de la lista

### "Trigger no funciona"

**Síntoma:** Nada pasa al seleccionar

**Solución:**
```
Menú → Automatizaciones → Verificar Triggers
Si dice "❌ NO HAY TRIGGERS":
  → Ver archivo: ACTIVAR_TRIGGERS.md
```

### "Datos no se mueven automáticamente"

**Verificar:**
1. ¿Usaste lista desplegable? ✅
2. ¿Valor exacto? ("Aceptado", no "aceptado")
3. ¿Trigger activo?
4. ¿Esperaste 2-3 segundos?

### "Error al importar asistencias"

**Causa común:** No tienes acceso al archivo

**Solución:**
1. Pedir al dueño que comparta contigo
2. Debe ser Editor o Propietario
3. Volver a intentar importar

---

## 📚 DOCUMENTACIÓN ADICIONAL

- **INSTALACION.md** - Cómo instalar desde cero
- **ACTIVAR_TRIGGERS.md** - Cómo activar automatizaciones (👈 IMPORTANTE)
- **ACTUALIZACION.md** - Cambios y nuevas funciones
- **TROUBLESHOOTING.md** - Solución de 50+ problemas
- **README.md** - Manual técnico completo

---

## 🎓 CAPACITACIÓN DEL EQUIPO

### Sesión 1: Introducción (30 min)
- Presentación del sistema
- Flujo completo
- Demostración en vivo

### Sesión 2: Práctica Lista de Espera y Asignación (30 min)
- Registrar en lista de espera
- Aceptar participante
- Asignar terapeuta
- Ver que se mueve automáticamente

### Sesión 3: Gestión de Sesiones (30 min)
- Actualizar número de sesión
- Registrar asistencia
- Escribir comentarios
- Finalizar casos

### Sesión 4: Reportes y Asistencia Grupal (20 min)
- Leer reportes
- Importar asistencias
- Ver estadísticas

### Sesión 5: Solución de Problemas (10 min)
- Qué hacer si falla
- Verificar trigger
- Contactar soporte

---

## ✅ CHECKLIST DIARIO

```
Mañana:
□ Revisar Lista de Espera
□ Verificar Nuevos Ingresos
□ Aceptar participantes si hay cupo
□ Asignar terapeutas

Durante el día:
□ Registrar sesiones realizadas
□ Actualizar asistencias
□ Escribir comentarios

Tarde:
□ Finalizar casos que terminaron hoy
□ Revisar Reporte del Día
□ Verificar que todo se registró

Semanal:
□ Verificar trigger activo
□ Importar asistencia grupal
□ Revisar estadísticas semanales
□ Guardar reporte mensual (fin de mes)
```

---

## 🎉 ¡LISTO PARA USAR!

Con esta guía ya sabes TODO sobre el sistema.

**Recuerda:**
- ✅ Usa listas desplegables siempre
- ✅ Espera confirmación (2-3 seg)
- ✅ Trigger debe estar activo
- ✅ Consulta docs si hay dudas

**¡TODO ES AUTOMÁTICO!** 🔥

---

**Versión:** 2.1
**Última actualización:** Noviembre 2024
**Desarrollado por:** Adrian Torres - Manufacturing Operations
