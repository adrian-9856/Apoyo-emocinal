# 🏥 GUÍA DE INSTALACIÓN - SISTEMA DE APOYO EMOCIONAL

## ✅ INSTALACIÓN PASO A PASO

### 1. COPIAR EL CÓDIGO

1. Abrir el archivo `SistemaCompleto.gs`
2. Copiar **TODO** el contenido (Ctrl+A, Ctrl+C)

### 2. CREAR NUEVO PROYECTO EN APPS SCRIPT

1. Abrir Google Sheets (crear una nueva hoja en blanco)
2. Ir a **Extensiones → Apps Script**
3. Borrar todo el código que aparece por defecto
4. Pegar el código completo de `SistemaCompleto.gs`
5. **Guardar** (Ctrl+S)

### 3. CAMBIAR EMAIL (IMPORTANTE)

Buscar la línea que dice:
```javascript
const emailDirector = 'director@apoyoemocional.org';
```

Cambiar por tu email real:
```javascript
const emailDirector = 'tuemail@gmail.com';
```

### 4. EJECUTAR INSTALACIÓN

1. En Apps Script, seleccionar la función `instalarSistema` del desplegable
2. Click en **Ejecutar** (▶️)
3. La primera vez pedirá permisos:
   - Click en "Revisar permisos"
   - Seleccionar tu cuenta de Google
   - Click en "Avanzado"
   - Click en "Ir a [nombre del proyecto] (no seguro)"
   - Click en "Permitir"
4. Esperar a que termine (aparecerá mensaje de éxito)

### 5. CREAR TRIGGER AL EDITAR (OBLIGATORIO)

1. En Apps Script, ir a **Activadores** (icono de reloj ⏰)
2. Click en **+ Agregar activador**
3. Configurar:
   - Función: `alEditar`
   - Tipo de evento: `Al editar`
   - Tipo de fuente del evento: `Desde hoja de cálculo`
4. Click en **Guardar**
5. Aceptar permisos si los pide

### 6. VOLVER A GOOGLE SHEETS

1. Cerrar la pestaña de Apps Script
2. Volver a tu Google Sheet
3. **Recargar la página** (F5)
4. Debería aparecer el menú **🏥 Apoyo Emocional**

### 7. VERIFICAR INSTALACIÓN

1. Menú → `✅ Verificar Instalación`
2. Debe mostrar:
   - ✅ Hojas: 8/8
   - ✅ Trigger al editar: OK

### 8. REPARAR VALIDACIONES

1. Menú → `🔧 Reparar Validaciones`
2. Esperar mensaje de éxito
3. Esto configura todos los desplegables correctamente

### 9. PROBAR EL SISTEMA

1. Menú → `🧪 Crear Datos de Prueba`
2. Ir a hoja "Lista de Espera"
3. En fila 2, columna L → Seleccionar "Enviar"
4. Verificar que aparezca en "Nuevos Ingresos" con fecha y número
5. En "Nuevos Ingresos", columna K → Seleccionar un terapeuta
6. Verificar que aparezca en "Terapias"

---

## 🔧 SI ALGO NO FUNCIONA

### Problema: No aparece el menú

**Solución:**
1. Recargar la página (F5)
2. Cerrar y volver a abrir Google Sheets

### Problema: Error al ejecutar instalarSistema

**Solución:**
1. Verificar que copiaste TODO el código
2. Guardar de nuevo (Ctrl+S)
3. Intentar de nuevo

### Problema: Columna L sigue teniendo desplegable

**Solución:**
1. Menú → `🔧 Reparar Validaciones`
2. Si persiste, ejecutar en Apps Script:
   ```javascript
   configurarValidaciones()
   ```

### Problema: Reportes no se actualizan

**Solución:**
1. Menú → `📊 Actualizar Reportes`
2. Debe aparecer mensaje de confirmación
3. Si no aparece, verificar que existe la hoja "Reporte"

### Problema: Reporte muestra #NAME? en todas las celdas

**Causa:** Las fórmulas están en inglés pero tu Google Sheets está en español (o viceversa)

**Solución:**
1. Las fórmulas del código están en INGLÉS (NOW, COUNTA, COUNTIFS, IF, etc.)
2. Si tu Google Sheets está en español, las fórmulas ya están corregidas
3. Si persiste el error, ejecutar: Menú → `🚀 Instalar Sistema` de nuevo
4. El sistema recreará las hojas con las fórmulas correctas

---

## 📋 ESTRUCTURA FINAL DEL SISTEMA

### Hojas creadas:
1. **Lista de Espera** - Solicitudes pendientes
2. **Nuevos Ingresos** - Casos recibidos
3. **Terapias** - Casos activos
4. **Procesos Culminados** - Casos finalizados con éxito
5. **Deserciones** - Casos interrumpidos
6. **Gestión de Casos** - Casos especiales
7. **Reporte** - Dashboard con métricas
8. **Reportes Mensuales** - Histórico mensual

### Desplegables configurados:
- **Género:** Hombre, Mujer, Trans hombre, No binario, Otro
- **Rango Edad:** 13 a 17, 18 a 25, 26 a 30, 31 a 40, 41 a 50, 51 a 60, 61+
- **Malestar Principal:** Ansiedad, Depresión, Estrés, Duelo, Trauma, etc.
- **Tipo Atención:** Individual, Grupal, Familiar, Pareja
- **Terapeuta:** Gerber, Melissa, Diana, Karina
- **Acción (solo en Lista de Espera):** Enviar

---

## 🎯 FLUJO DE TRABAJO

```
Lista de Espera
    ↓ [Enviar]
Nuevos Ingresos (con fecha y número)
    ↓ [Asignar Terapeuta]
Terapias (En proceso)
    ↓ [Finalizado]
Procesos Culminados / Deserciones / Gestión de Casos
    ↓
Reportes (actualización automática)
```

---

## ⏰ OPCIONAL: TRIGGER DE TIEMPO

Para actualizar reportes automáticamente cada hora:

1. Menú → `⏰ Instalar Trigger de Tiempo`
2. Confirmar instalación
3. Los reportes se actualizarán automáticamente

---

## 🧹 LIMPIAR DATOS DE PRUEBA

Cuando termines de probar:

1. Menú → `🧹 Limpiar Todos los Datos`
2. Confirmar
3. Todas las hojas quedarán limpias y listas para usar

---

## 📞 SOPORTE

Si tienes problemas:
1. Revisar esta guía completa
2. Verificar que seguiste TODOS los pasos
3. Probar con datos de prueba primero
4. Verificar permisos en Apps Script

**¡El sistema está listo para usar!** 🎉
