# 🔧 Guía de Solución de Problemas

Esta guía te ayudará a resolver los problemas más comunes del Sistema de Apoyo Emocional.

---

## 📋 Índice Rápido

1. [Problemas de Instalación](#1-problemas-de-instalación)
2. [Problemas con Triggers](#2-problemas-con-triggers)
3. [Problemas con Automatizaciones](#3-problemas-con-automatizaciones)
4. [Problemas con Fórmulas](#4-problemas-con-fórmulas)
5. [Problemas con Datos](#5-problemas-con-datos)
6. [Problemas de Rendimiento](#6-problemas-de-rendimiento)
7. [Errores Comunes](#7-errores-comunes)

---

## 1. Problemas de Instalación

### 1.1 "No aparece el menú 🏥 Apoyo Emocional"

**Causas posibles:**
- La página no se ha recargado después de instalar
- El código no se guardó correctamente
- Falta la función `onOpen()`

**Soluciones:**

**✅ Solución 1: Recargar página**
```
1. Presiona F5 o Ctrl+R
2. Espera 10-15 segundos
3. El menú debe aparecer
```

**✅ Solución 2: Ejecutar onOpen manualmente**
```
1. Extensiones → Apps Script
2. Selector de función: onOpen
3. Clic en ▶️ Ejecutar
4. Cerrar editor
5. Volver a la hoja
```

**✅ Solución 3: Verificar código**
```
1. Extensiones → Apps Script
2. Abrir Automatizaciones.gs
3. Buscar la función: function onOpen() {
4. Si no existe, copiar código nuevamente
5. Guardar (Ctrl+S)
6. Ejecutar onOpen
```

---

### 1.2 "Error: No tienes permiso para ejecutar esta función"

**Causa:** Script no autorizado

**Solución:**
```
1. Extensiones → Apps Script
2. Selector: instalarSistemaCompletoMejorado
3. Clic en ▶️ Ejecutar
4. Clic en "Revisar permisos"
5. Selecciona tu cuenta
6. "Opciones avanzadas"
7. "Ir a Sistema Apoyo Emocional (no seguro)"
8. "Permitir"
```

---

### 1.3 "No se crean las hojas"

**Síntomas:**
- Solo existe hoja "Nuevos Ingresos"
- Faltan hojas del sistema

**Solución:**
```
1. Ve al menú: 🏥 Apoyo Emocional
2. Clic en: 🚀 Instalar Sistema Completo
3. Espera 30-60 segundos
4. Verifica que aparezcan 8 hojas:
   - Nuevos Ingresos
   - Asignaciones y Terapias
   - Procesos Culminados
   - Deserciones
   - Gestión de Casos
   - Asistencia Grupal
   - Reporte Automático Completo
   - Reportes Mensuales
```

Si persiste:
```
1. Extensiones → Apps Script → Ejecuciones
2. Buscar errores en rojo
3. Copiar mensaje de error completo
4. Contactar soporte con el error
```

---

## 2. Problemas con Triggers

### 2.1 "Las automatizaciones no funcionan"

**Síntomas:**
- Al asignar terapeuta no pasa nada
- Al cambiar estado no se mueve el caso

**Diagnóstico:**
```
Menú: 🏥 Apoyo Emocional → Automatizaciones → 🔍 Verificar Triggers
```

**Si dice "❌ NO HAY TRIGGERS":**

**✅ Solución: Crear trigger manualmente**
```
1. Extensiones → Apps Script
2. Icono del reloj ⏰ (Activadores)
3. + Agregar activador
4. Configurar:
   - Función: onEditSistemaCompleto
   - Tipo de origen: Desde una hoja de cálculo
   - Tipo de evento: Al editar
5. Guardar
6. Autorizar si pide permisos
7. Verificar nuevamente
```

---

### 2.2 "Trigger existe pero no funciona"

**Diagnóstico:**
```
1. Extensiones → Apps Script → Activadores
2. Verificar que dice:
   - Función: onEditSistemaCompleto (no otra)
   - Evento: Al editar (no Al abrir)
```

**Solución 1: Recrear trigger**
```
1. Eliminar trigger existente (ícono basura)
2. Crear nuevo trigger (pasos de 2.1)
```

**Solución 2: Ver errores en ejecuciones**
```
1. Extensiones → Apps Script
2. Ejecuciones (ícono reloj en el menú)
3. Buscar errores recientes (en rojo)
4. Clic en el error para ver detalles
5. Copiar mensaje completo
```

**Errores comunes:**

**Error: "Cannot read property 'range' of undefined"**
```
Causa: El trigger se ejecuta al abrir la hoja
Solución: Recrear trigger con evento "Al editar"
```

**Error: "Exception: Service Spreadsheets failed"**
```
Causa: Google Sheets temporalmente no disponible
Solución: Esperar 5 minutos e intentar nuevamente
```

---

### 2.3 "Trigger se ejecuta pero con errores"

**Ver logs:**
```
1. Extensiones → Apps Script
2. Abrir Automatizaciones.gs
3. Agregar al inicio de onEditSistemaCompleto:
   Logger.log("Trigger ejecutado");
4. Guardar
5. Editar una celda en la hoja
6. Apps Script → Ejecuciones
7. Ver el log completo
```

---

## 3. Problemas con Automatizaciones

### 3.1 "Asignación de terapeuta no funciona"

**Síntomas:**
- Selecciono terapeuta en columna H
- No se crea caso en "Asignaciones y Terapias"

**Diagnóstico paso a paso:**

**1. Verificar trigger (ver sección 2)**

**2. Verificar que hay nombre de participante:**
```
Columna C (Nombre Completo) debe tener un nombre
Si está vacía, llenarla primero
```

**3. Probar manualmente:**
```
1. Extensiones → Apps Script
2. Abrir Automatizaciones.gs
3. Buscar función: procesarAsignacionCompleta
4. Agregar al inicio:
   Logger.log("Procesando asignación...");
5. Guardar
6. Intentar asignar terapeuta nuevamente
7. Apps Script → Ejecuciones → Ver logs
```

**4. Verificar valores exactos:**
```
Los terapeutas deben ser EXACTAMENTE:
- Gerber
- Melissa
- Diana
- Karina

No funciona:
- gerber (minúsculas)
- GERBER (mayúsculas)
- Gerber  (con espacios extras)
```

**Solución: Usar lista desplegable**
```
1. Clic en celda de columna H
2. Debe aparecer flecha ▼
3. Seleccionar de la lista
4. NO escribir manualmente
```

---

### 3.2 "Finalización de caso no funciona"

**Síntomas:**
- Cambio estado en columna L
- No se mueve a hoja final

**Verificaciones:**

**1. Estado debe ser EXACTO:**
```
Valores válidos:
- Proceso culminado
- Deserción
- Gestión de casos

NO válido:
- proceso culminado (minúsculas)
- Culminado (texto diferente)
- Procesos culminados (con 's')
```

**2. Usar lista desplegable:**
```
1. Clic en celda columna L
2. Seleccionar de la lista desplegable
3. NO escribir manualmente
```

**3. Verificar datos completos:**
```
El caso debe tener:
- Columna A: Terapeuta
- Columna C: Nombre participante
- Columna G: Número de sesión

Si falta alguno, completar primero
```

**4. Ver errores en log:**
```
1. Apps Script → Ejecuciones
2. Buscar error reciente
3. Si dice "No hay nombre de participante":
   - Verificar columna C no esté vacía
```

---

### 3.3 "Caso duplicado en Asignaciones"

**Síntomas:**
- Mismo participante aparece 2 veces

**Causa:**
- Asignación manual previa
- Error en verificación de duplicados

**Solución:**
```
1. Ir a "Asignaciones y Terapias"
2. Identificar cuál es el registro correcto
3. Eliminar el registro duplicado:
   - Clic derecho en número de fila
   - "Eliminar fila"
4. Actualizar "Nuevos Ingresos":
   - Buscar participante
   - Columna L debe decir "Asignado"
```

---

## 4. Problemas con Fórmulas

### 4.1 "Columnas automáticas vacías"

**Síntomas:**
- Columna A (Fecha) vacía
- Columna B (No.) vacía
- Columna L (Estado) vacía

**Diagnóstico:**
```
1. Clic en celda A2
2. Ver si hay fórmula en barra superior
3. Si está vacía, falta la fórmula
```

**Solución: Reparar fórmulas**
```
Opción 1 - Automática:
1. Extensiones → Apps Script
2. Ejecutar: repararFormulas
3. Esperar confirmación

Opción 2 - Manual:
1. En celda A2 escribir: =IF(C2<>"";HOY();"")
2. En celda B2 escribir: =IF(C2<>"";FILA()-1;"")
3. En celda L2 escribir: =IF(H2<>"";"Asignado";"Pendiente")
4. Copiar fórmulas hacia abajo
```

---

### 4.2 "Error #REF! en fórmulas"

**Causa:**
- Hoja referenciada fue eliminada o renombrada
- Referencias rotas

**Solución:**
```
1. Identificar celda con error
2. Ver fórmula en barra superior
3. Buscar nombre de hoja incorrecta
4. Corregir a nombre correcto:
   - 'Nuevos Ingresos'
   - 'Asignaciones y Terapias'
   - 'Procesos Culminados'
   - etc.
```

**Si persiste:**
```
Menú: 🏥 Apoyo Emocional → 🚀 Instalar Sistema Completo
(Esto recreará hojas con fórmulas correctas)
```

---

### 4.3 "Error #ERROR! en celdas"

**Causas comunes:**

**1. Función no reconocida:**
```
Error: "Unknown function: HOY"
Causa: Idioma de Google Sheets en inglés
Solución:
  1. Archivo → Configuración → Configuración regional
  2. Cambiar a: España o México
  3. Guardar
  4. Recargar página
```

**2. Sintaxis incorrecta:**
```
Español: =SI(A1<>"";VERDADERO;FALSO)
Inglés: =IF(A1<>"";TRUE;FALSE)

Verificar idioma en Configuración regional
```

---

## 5. Problemas con Datos

### 5.1 "No aparecen listas desplegables"

**Síntomas:**
- Puedo escribir cualquier texto
- No aparece flecha ▼

**Solución:**
```
1. Extensiones → Apps Script
2. Ejecutar: configurarValidacionesMejoradas
3. Esperar confirmación
4. Verificar columnas:
   - E: Sexo
   - F: Edad
   - G: Malestar
   - H: Terapeuta
   - I: Tipo atención
```

**Si sigue sin funcionar:**
```
1. Verificar que estás en fila correcta (2 en adelante)
2. Fila 1 son encabezados (no tiene validación)
3. Columnas sin validación: A, B, C, D, J, K, L
```

---

### 5.2 "Datos no se guardan"

**Síntomas:**
- Escribo datos y desaparecen
- Hoja se recarga sola

**Causa:** Conflicto de sincronización

**Solución:**
```
1. Verificar conexión a internet
2. Cerrar otras pestañas de Google Sheets
3. Recargar página
4. Volver a ingresar datos
5. Esperar ver "Todos los cambios guardados" (arriba)
```

---

### 5.3 "Fechas con formato incorrecto"

**Síntomas:**
- Fecha aparece como número (44562)
- Formato MM/DD/YYYY en lugar de DD/MM/YYYY

**Solución:**
```
1. Seleccionar columnas de fechas (A, H, I, M, N)
2. Clic derecho → "Formato de número"
3. Seleccionar "Fecha"
4. Elegir formato: DD/MM/YYYY
```

**Para todo el documento:**
```
1. Archivo → Configuración
2. Configuración regional: España o México
3. Zona horaria: (tu zona)
4. Guardar
5. Recargar página
```

---

## 6. Problemas de Rendimiento

### 6.1 "Hoja se vuelve lenta"

**Causas:**
- Muchos datos acumulados
- Fórmulas complejas
- Formato condicional excesivo

**Soluciones:**

**✅ Solución 1: Archivar datos antiguos**
```
1. Crear nueva hoja: "Archivo 2024"
2. Copiar casos finalizados del año anterior
3. Eliminar de hojas principales
4. Mantener solo casos activos y recientes
```

**✅ Solución 2: Optimizar fórmulas**
```
1. Evitar referencias a hojas completas (A:A)
2. Usar rangos específicos (A2:A100)
3. En Reporte Completo, cambiar:
   De: =CONTARA('Nuevos Ingresos'!C:C)
   A: =CONTARA('Nuevos Ingresos'!C2:C500)
```

**✅ Solución 3: Limpiar formato condicional**
```
1. Formato → Formato condicional
2. Eliminar reglas no utilizadas
3. Mantener solo las esenciales
```

---

### 6.2 "Trigger tarda mucho"

**Síntomas:**
- Asignación toma más de 10 segundos
- Mensaje de "Ejecutando script..."

**Solución:**
```
1. Apps Script → Ejecuciones
2. Ver tiempo de ejecución
3. Si es > 30 segundos:
   - Revisar si hay loops infinitos
   - Contactar soporte
```

**Optimización temporal:**
```
En Automatizaciones.gs, línea:
Utilities.sleep(300);

Reducir a:
Utilities.sleep(100);
```

---

## 7. Errores Comunes

### 7.1 "Exception: Service invoked too many times"

**Causa:** Demasiadas operaciones en corto tiempo

**Solución:**
```
1. Esperar 1 minuto
2. Intentar nuevamente
3. Evitar ediciones masivas rápidas
```

---

### 7.2 "Exception: You do not have permission"

**Causa:** Falta de permisos o sesión expirada

**Solución:**
```
1. Cerrar sesión de Google
2. Volver a iniciar sesión
3. Extensiones → Apps Script
4. Ejecutar: instalarSistemaCompletoMejorado
5. Autorizar permisos nuevamente
```

---

### 7.3 "TypeError: Cannot read property 'getValue'"

**Causa:** Celda vacía o no seleccionada correctamente

**Solución:**
```
Este error se corrige automáticamente con validaciones del código
Si persiste:
1. Apps Script → Ejecuciones → Ver error completo
2. Copiar mensaje
3. Contactar soporte
```

---

### 7.4 "ReferenceError: SpreadsheetApp is not defined"

**Causa:** Código ejecutándose fuera de Google Apps Script

**Solución:**
```
1. NO ejecutar código en navegador (Consola F12)
2. Ejecutar solo desde:
   Extensiones → Apps Script → Ejecutar
```

---

## 🆘 Diagnóstico General

Si ninguna solución funcionó, ejecuta diagnóstico completo:

```
1. Menú: 🏥 Apoyo Emocional → Automatizaciones → 📊 Diagnóstico Completo

2. Copiar el mensaje completo que aparece

3. Verificar cada punto:
   ✅ o ❌ Hojas
   ✅ o ❌ Triggers
   ✅ o ❌ Datos
   ✅ o ❌ Validaciones

4. Anotar qué tiene ❌

5. Seguir soluciones específicas de esta guía
```

---

## 📞 Contactar Soporte

Si después de intentar todas las soluciones el problema persiste:

### Información a proporcionar:

1. **Descripción del problema:**
   - ¿Qué intentaste hacer?
   - ¿Qué esperabas que pasara?
   - ¿Qué pasó en realidad?

2. **Resultado del diagnóstico:**
   - Copiar mensaje completo de "Diagnóstico Completo"

3. **Errores en Apps Script:**
   - Extensiones → Apps Script → Ejecuciones
   - Captura de pantalla de errores en rojo

4. **Capturas de pantalla:**
   - Del problema específico
   - De la hoja afectada
   - Del mensaje de error

### Canales de soporte:

- **GitHub Issues:** [Crear issue](https://github.com/tu-usuario/apoyo-emocional/issues)
- **Email:** adrian.torres@ejemplo.com

### Formato de reporte:

```
PROBLEMA:
[Descripción breve]

PASOS PARA REPRODUCIR:
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

RESULTADO ESPERADO:
[Qué debería pasar]

RESULTADO ACTUAL:
[Qué pasa realmente]

DIAGNÓSTICO:
[Copiar resultado de Diagnóstico Completo]

ERRORES:
[Copiar errores de Apps Script → Ejecuciones]

CAPTURAS:
[Adjuntar imágenes]
```

---

## ✅ Prevención de Problemas

### Mejores Prácticas:

1. **Siempre usar listas desplegables**
   - No escribir valores manualmente
   - Usar flecha ▼ para seleccionar

2. **Verificar datos antes de asignar**
   - Nombre completo en columna C
   - Datos requeridos completos

3. **No eliminar hojas del sistema**
   - Si necesitas ocultar: Clic derecho → Ocultar

4. **No renombrar hojas**
   - Las fórmulas dependen de nombres exactos

5. **Hacer respaldos regulares**
   - Archivo → Descargar → Excel (.xlsx)
   - Frecuencia: Semanal o mensual

6. **Verificar triggers mensualmente**
   - Menú → Automatizaciones → Verificar Triggers
   - Debe mostrar: ✅ 1 trigger(s) activo(s)

7. **Capacitar al equipo**
   - Todos deben entender el flujo de trabajo
   - Revisar documentación juntos

---

## 🔄 Reinstalación Completa

Si nada funciona, reinstalar:

### Opción 1: Reinstalar sin perder datos

```
1. Hacer copia de seguridad:
   Archivo → Hacer una copia

2. En la hoja original:
   Menú → 🚀 Instalar Sistema Completo

3. Recrear trigger (PASO 8 de instalación)

4. Verificar funcionamiento
```

### Opción 2: Empezar desde cero

```
1. Exportar datos importantes:
   - Nuevos Ingresos
   - Asignaciones y Terapias
   - Procesos Culminados

2. Crear nueva hoja de Google Sheets

3. Seguir guía de instalación completa

4. Importar datos:
   - Copiar y pegar desde archivo exportado
   - Verificar fórmulas automáticas
```

---

## 📚 Recursos Adicionales

- [README.md](README.md) - Documentación completa
- [INSTALACION.md](INSTALACION.md) - Guía de instalación
- [Documentación de Google Apps Script](https://developers.google.com/apps-script)
- [Foro de Google Sheets](https://support.google.com/docs/community)

---

**Última actualización:** Noviembre 2024
**Versión del sistema:** 2.0

¿Resolvimos tu problema? ¡Déjanos saber!
