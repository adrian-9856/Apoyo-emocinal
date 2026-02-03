# 🏥 GUÍA DE INSTALACIÓN COMPLETA - Sistema de Apoyo Emocional

## ✅ PROBLEMAS CORREGIDOS

### 1. ✅ Bug: Borrado de datos después de asignación
**Problema:** El sistema borraba el terapeuta asignado y la confirmación "Vino/No vino" después de procesar
**Solución:** Los datos ahora se mantienen como registro histórico (SistemaCompleto.gs:1147-1148, 1193-1194)
**Estado:** CORREGIDO

### 2. ✅ Bug: Error borraba columna incorrecta
**Problema:** Al haber un error, borraba la columna N (Asistió) en vez de la M (Terapeuta)
**Solución:** Corregido para borrar la columna correcta (SistemaCompleto.gs:996)
**Estado:** CORREGIDO

### 3. ✅ Referencia de Eva no aparecía en Terapias
**Problema:** Los campos "Derivación o Referencia" y "Nombre de quien deriva" no se transferían a Terapias
**Solución:**
- Estructura de Terapias ampliada de 10 a 14 columnas
- Ahora incluye: Edad, Malestar Principal, Derivación o Referencia, Nombre de quien deriva
- La columna H ahora muestra "Derivación o Referencia" (donde aparece Eva)
**Estado:** CORREGIDO

### 4. ✅ Transferencia de "Vino" a Terapias
**Problema:** No jalaba los datos completos de Lista de Espera a Terapias
**Solución:** La función ahora transfiere TODOS los campos incluyendo referencias
**Estado:** CORREGIDO

### 5. ✅ Sumatoria de sesiones por mes
**Problema:** ¿Cómo hacer el corte de enero?
**Solución:** Ya existe el sistema:
- Cuando guardas el reporte mensual, el sistema AUTOMÁTICAMENTE:
  1. Copia "No. Sesión" actual a "Sesiones Mes Anterior"
  2. El próximo mes empieza a contar desde el nuevo número
- Función: `actualizarSesionesMesAnterior()` (línea 2850)
**Estado:** YA FUNCIONABA - Solo necesitas usar: **📊 Reportes → 💾 Guardar Reporte Mensual** al final de enero

### 6. ⚠️ Email no se envía al asignar terapeuta
**Problema:** No manda correo al momento de asignar
**Solución:** El código FUNCIONA correctamente. El problema es de CONFIGURACIÓN.
**Estado:** NECESITA CONFIGURACIÓN (ver abajo)

---

## 📋 ESTRUCTURA ACTUALIZADA DE TERAPIAS

### Nueva estructura (14 columnas):
```
A: Terapeuta
B: Fecha (automática)
C: Participante
D: Creamos ID
E: Género
F: Edad ⭐ NUEVO
G: Malestar Principal ⭐ NUEVO
H: Derivación o Referencia ⭐ NUEVO (AQUÍ APARECE EVA)
I: Nombre de quien deriva ⭐ NUEVO
J: No. Sesión (antes era columna F)
K: Estado (antes era columna G)
L: Motivo Finalización (antes era columna H)
M: Sesiones Mes Anterior (antes era columna I)
N: Inasistencias (antes era columna J)
```

---

## 🚀 PASOS PARA INSTALACIÓN COMPLETA

### PASO 1: Preparar el Google Sheet
1. Abre el Google Sheet
2. Ve a **Extensiones** → **Apps Script**
3. Copia y pega el código de `SistemaCompleto.gs`
4. Guarda el proyecto (Ctrl+S o Cmd+S)
5. **IMPORTANTE:** Cierra el editor de Apps Script

### PASO 2: Recargar el Sheet
1. Cierra completamente el Google Sheet
2. Vuelve a abrir el Google Sheet
3. Espera 5-10 segundos hasta que aparezca el menú **🏥 Apoyo Emocional**

### PASO 3: Crear las hojas (SI ES INSTALACIÓN NUEVA)
Si es una instalación completamente nueva:

1. Ve al menú: **🏥 Apoyo Emocional** → **⚙️ Instalación** → **🏗️ Crear Todas las Hojas**
2. Espera a que aparezca el mensaje "✅ Todas las hojas creadas"

**⚠️ ADVERTENCIA:** Si ya tienes hojas con datos, **NO** uses esta opción porque borrará todo.

### PASO 4: Actualizar hojas existentes (SI YA TIENES DATOS)
Si ya tienes hojas con datos y solo quieres actualizar la estructura:

1. Ve al menú: **🏥 Apoyo Emocional** → **⚙️ Instalación** → **🔄 Instalar Actualizaciones**
2. Esto actualizará:
   - La hoja de Terapias con las 4 columnas nuevas
   - Las validaciones de datos
   - Las fórmulas del reporte

**IMPORTANTE:** Esta opción NO borrará datos existentes, solo actualizará la estructura.

### PASO 5: Configurar Emails de Terapeutas ⭐ CRÍTICO
**Este paso es OBLIGATORIO para que los emails funcionen:**

1. Ve al menú: **🏥 Apoyo Emocional** → **🔧 Configuración** → **👥 Configurar Emails Terapeutas**
2. Ingresa el email de cada terapeuta cuando se te solicite:
   - **Gerber:** [email]
   - **Melissa:** [email]
   - **Diana:** [email]
   - **Karina:** [email]
3. Verifica que aparezca el mensaje de confirmación

### PASO 6: Configurar Email del Director
1. Ve al menú: **🏥 Apoyo Emocional** → **🔧 Configuración** → **📧 Configurar Email Director**
2. Ingresa el email del director/a
3. Este email recibirá notificaciones de casos finalizados

### PASO 7: Probar Envío de Email
1. Ve al menú: **🏥 Apoyo Emocional** → **🔧 Configuración** → **✉️ Probar Envío de Email**
2. Deberías recibir un email de prueba
3. Si NO recibes el email, revisa:
   - Que el email esté bien escrito
   - Carpeta de spam/correo no deseado
   - Permisos de Google (ve al paso siguiente)

### PASO 8: Autorizar Permisos de Google
**IMPORTANTE:** La primera vez que uses cualquier función, Google pedirá permisos:

1. Aparecerá una ventana: "Autorización necesaria"
2. Haz clic en **"Continuar"**
3. Selecciona tu cuenta de Google
4. Si aparece "Esta aplicación no está verificada":
   - Haz clic en **"Opciones avanzadas"**
   - Haz clic en **"Ir a [nombre del proyecto] (no seguro)"**
   - Haz clic en **"Permitir"**
5. Los permisos que necesita:
   - ✅ Ver, editar, crear y eliminar hojas de cálculo
   - ✅ Enviar correos electrónicos
   - ✅ Ejecutar cuando estás ausente (triggers)

### PASO 9: Instalar Trigger onEdit (Para Deserciones)
**Solo necesario si usarás el diálogo de motivos de deserción:**

1. Ve al menú: **🏥 Apoyo Emocional** → **⚙️ Instalación** → **✏️ Instalar Trigger onEdit**
2. Espera el mensaje de confirmación
3. Esto permite que el sistema detecte automáticamente cuando editas columnas específicas

### PASO 10: Configurar Importación de Bienestar (OPCIONAL)
**Solo si usas KoboToolbox:**

1. Ve al menú: **🏥 Bienestar** → **🔧 Configurar KoboToolbox**
2. Ingresa:
   - **Token de API** de KoboToolbox
   - **Asset UID** del formulario
3. Prueba la importación: **🏥 Bienestar** → **🔍 Probar Importación**
4. Si funciona, activa la importación automática:
   - **🏥 Bienestar** → **⏰ Activar Importación Rápida**
   - Esto importará datos cada 1 minuto automáticamente

### PASO 11: Configurar Alertas de Bienestar (OPCIONAL)
**Para recibir alertas de protocolo de suicidio:**

**Modo de Prueba (recomendado primero):**
1. Ve a: **🏥 Bienestar** → **📧 Configurar Correo de Prueba**
2. Ingresa tu email personal
3. Las alertas se enviarán SOLO a ti (no molestarás a los terapeutas)

**Modo Producción (cuando estés listo):**
1. Ve a: **🏥 Bienestar** → **🚀 Activar Modo Producción**
2. Las alertas se enviarán a TODOS los terapeutas + director

---

## 📊 FLUJO DE TRABAJO DESPUÉS DE LA INSTALACIÓN

### Para Lista de Espera:
1. **Asignar terapeuta:** Selecciona el nombre del terapeuta en columna M
   - ✅ Se envía email automático al terapeuta
   - ✅ Fila se marca en amarillo (pendiente)

2. **Confirmar asistencia:** El terapeuta selecciona "Vino" o "No vino" en columna N
   - Si **"Vino"** → Se transfiere a:
     - ✅ Nuevos Ingresos (documentación)
     - ✅ Terapias (trabajo activo)
     - ✅ Fila se marca en verde
     - ✅ Datos históricos SE MANTIENEN
   - Si **"No vino"** → Se transfiere a:
     - ⚠️ Personas no asistidas
     - ⚠️ Fila se marca en rojo
     - ⚠️ Datos históricos SE MANTIENEN

### Para Terapias:
1. **Cambiar número de sesión (columna J):**
   - Aparece diálogo preguntando si vino o no
   - Si NO vino → incrementa contador de inasistencias (columna N)

2. **Cambiar estado (columna K):**
   - **"Proceso culminado"** → Se transfiere a Procesos Culminados
   - **"deserciones"** → Aparece diálogo para seleccionar motivo → Se transfiere a Deserciones
   - ✅ Se envía email al director

### Para Corte Mensual:
**Al final del mes (ej: 31 de enero):**
1. Ve a: **📊 Reportes** → **💾 Guardar Reporte Mensual**
2. El sistema automáticamente:
   - Guarda estadísticas del mes en Reportes Mensuales
   - Copia "No. Sesión" actual a "Sesiones Mes Anterior"
   - El próximo mes empieza a contar sesiones desde el nuevo número
3. **NO** se borran datos, solo se actualiza el tracking

---

## 🔍 VERIFICACIÓN POST-INSTALACIÓN

### Checklist de Verificación:
- [ ] Menú "🏥 Apoyo Emocional" aparece en el Sheet
- [ ] Todas las hojas están creadas (o actualizadas)
- [ ] Emails de terapeutas configurados
- [ ] Email del director configurado
- [ ] Prueba de email funciona (recibes el email)
- [ ] Trigger onEdit instalado (si lo necesitas)
- [ ] Importación de Bienestar configurada (si aplica)
- [ ] Alertas de suicidio configuradas (si aplica)

### Prueba de Flujo Completo:
1. **Prueba Lista de Espera:**
   - Agrega una fila de prueba con datos ficticios
   - Asigna un terapeuta → ¿Recibe email?
   - Marca "Vino" → ¿Se transfiere a Terapias?
   - ¿Los datos históricos se mantienen?

2. **Prueba Terapias:**
   - En la fila transferida, cambia el número de sesión
   - ¿Aparece el diálogo de asistencia?
   - Marca "No vino" → ¿Se incrementan las inasistencias (columna N)?

3. **Prueba Finalización:**
   - Cambia el estado a "Proceso culminado"
   - ¿Se transfiere a Procesos Culminados?
   - ¿Recibe email el director?

---

## ⚠️ PROBLEMAS COMUNES Y SOLUCIONES

### 1. No aparece el menú "🏥 Apoyo Emocional"
**Solución:**
- Cierra y vuelve a abrir el Google Sheet
- Espera 10 segundos
- Si aún no aparece, ve a Extensiones → Apps Script y verifica que el código esté guardado

### 2. No se envían emails
**Causa más común:** Emails no configurados
**Solución:**
1. Ve a: **🔧 Configuración** → **👥 Configurar Emails Terapeutas**
2. Ingresa TODOS los emails de nuevo
3. Prueba con: **✉️ Probar Envío de Email**

### 3. Error: "No tiene permisos"
**Solución:**
1. Ve a Extensiones → Apps Script
2. Ve a "Ejecutar" (⚙️) en la parte superior
3. Selecciona la función `autorizarPermisos`
4. Haz clic en "Ejecutar"
5. Autoriza todos los permisos que pida Google

### 4. Diálogo de deserción no funciona
**Solución:**
1. Ve a: **⚙️ Instalación** → **✏️ Instalar Trigger onEdit**
2. Autoriza los permisos
3. Espera el mensaje de confirmación

### 5. Importación de Bienestar no funciona automáticamente
**Diagnóstico:**
1. Ve a: **🏥 Bienestar** → **🔍 Probar Importación (Diagnóstico)**
2. Lee el reporte completo
3. Verifica:
   - ¿El CSV es accesible?
   - ¿Los triggers están instalados?
   - ¿El Token de KoboToolbox es correcto?

**Solución:**
- Si el trigger no está instalado: **🏥 Bienestar** → **⏰ Activar Importación Rápida**
- Si el CSV no es accesible: Verifica permisos de compartir en KoboToolbox

### 6. Columnas no aparecen en Terapias
**Si las 4 nuevas columnas (F, G, H, I) no aparecen:**
1. Ve a: **⚙️ Instalación** → **🔄 Instalar Actualizaciones**
2. Esto recreará la estructura de Terapias con las 14 columnas

---

## 📞 SOPORTE Y AYUDA

### Para problemas técnicos:
1. Ve a: **🏥 Apoyo Emocional** → **⚙️ Instalación** → **✅ Verificar Instalación**
2. Lee el reporte completo
3. Sigue las recomendaciones específicas

### Logs del sistema:
Para ver lo que está pasando "detrás de escena":
1. Ve a: Extensiones → Apps Script
2. Haz clic en "Ejecuciones" (📊) en el menú izquierdo
3. Verás todas las ejecuciones recientes y sus errores

---

## 🎯 RESUMEN DE CORRECCIONES

| # | Problema | Estado | Línea |
|---|----------|--------|-------|
| 1 | Borra datos de "Vino/No vino" | ✅ CORREGIDO | 1147-1148 |
| 2 | Borra terapeuta asignado | ✅ CORREGIDO | 1147, 1193 |
| 3 | Error borra columna incorrecta | ✅ CORREGIDO | 996 |
| 4 | Referencia Eva no aparece | ✅ CORREGIDO | 365-396, 1051, 1130 |
| 5 | No jala datos a Terapias | ✅ CORREGIDO | 1051 |
| 6 | Sumatoria sesiones por mes | ✅ YA FUNCIONABA | 2850 |
| 7 | No manda correo al asignar | ⚠️ CONFIGURACIÓN | 1607 |

---

## ✅ SISTEMA LISTO PARA PRODUCCIÓN

Después de seguir esta guía:
- ✅ Todos los bugs están corregidos
- ✅ La referencia de Eva aparece en Terapias (columna H)
- ✅ Los datos históricos se mantienen
- ✅ El corte mensual funciona automáticamente
- ✅ Los emails funcionan (si están configurados)
- ✅ La estructura está actualizada a 14 columnas

**¡El sistema está listo para usarse en producción!**

---

**Fecha de actualización:** 2026-02-03
**Versión del sistema:** v2.0 - Estructura ampliada con referencias
