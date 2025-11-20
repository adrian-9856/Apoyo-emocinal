# 🚀 Guía de Instalación Rápida

## ⏱️ Tiempo estimado: 10-15 minutos

---

## 📋 Requisitos Previos

- ✅ Cuenta de Google
- ✅ Acceso a Google Sheets
- ✅ Navegador web actualizado (Chrome, Firefox, Safari, Edge)
- ✅ Conexión a internet

---

## 🎯 Pasos de Instalación

### PASO 1: Crear Hoja de Cálculo
**⏱️ 1 minuto**

1. Ve a [Google Sheets](https://sheets.google.com)
2. Clic en **+ Nuevo** o **Crear**
3. Nombra la hoja: **"Sistema Apoyo Emocional"**

---

### PASO 2: Abrir Editor de Apps Script
**⏱️ 30 segundos**

1. En el menú superior: **Extensiones → Apps Script**
2. Se abrirá una nueva pestaña con el editor

---

### PASO 3: Preparar Archivos
**⏱️ 1 minuto**

1. **Eliminar código por defecto:**
   - Verás un archivo `Code.gs` con código de ejemplo
   - Selecciona todo (`Ctrl+A` o `Cmd+A`)
   - Elimina (`Delete` o `Backspace`)

2. **Crear archivos adicionales:**
   - Clic en **+** junto a "Archivos"
   - Selecciona **Secuencia de comandos**
   - Crea 2 archivos más:
     - `Automatizaciones`
     - `Utilidades`

Deberías tener 3 archivos:
- ✅ `Code.gs`
- ✅ `Automatizaciones.gs`
- ✅ `Utilidades.gs`

---

### PASO 4: Copiar Código
**⏱️ 3 minutos**

#### 4.1 Copiar Code.gs

1. Abre el archivo [`Code.gs`](Code.gs) de este repositorio
2. Clic en el botón **"Raw"** (esquina superior derecha)
3. Selecciona todo (`Ctrl+A` o `Cmd+A`)
4. Copia (`Ctrl+C` o `Cmd+C`)
5. Vuelve al editor de Apps Script
6. Pega en `Code.gs` (`Ctrl+V` o `Cmd+V`)

#### 4.2 Copiar Automatizaciones.gs

1. Abre [`Automatizaciones.gs`](Automatizaciones.gs) de este repositorio
2. Repite los pasos anteriores
3. Pega en `Automatizaciones.gs`

#### 4.3 Copiar Utilidades.gs

1. Abre [`Utilidades.gs`](Utilidades.gs) de este repositorio
2. Repite los pasos anteriores
3. Pega en `Utilidades.gs`

---

### PASO 5: Guardar Proyecto
**⏱️ 30 segundos**

1. Clic en **ícono del disco** 💾 o presiona `Ctrl+S`
2. Dale nombre al proyecto: **"Sistema Apoyo Emocional"**
3. Espera confirmación: "Proyecto guardado"

---

### PASO 6: Autorizar Permisos (Primera vez)
**⏱️ 2 minutos**

> ⚠️ **IMPORTANTE:** Este paso es necesario para que el script pueda acceder a tu hoja.

1. En el editor, selecciona función: `instalarSistemaCompletoMejorado`

   ![Selector de función](https://via.placeholder.com/400x50/4CAF50/FFFFFF?text=instalarSistemaCompletoMejorado)

2. Clic en **▶️ Ejecutar**

3. **Aparecerá ventana de autorización:**
   ```
   ⚠️ Autorización necesaria
   ```

4. **Clic en "Revisar permisos"**

5. **Selecciona tu cuenta de Google**

6. **Aparecerá advertencia:**
   ```
   ⚠️ Google no ha verificado esta aplicación
   ```

7. **Clic en "Opciones avanzadas"** (texto pequeño abajo)

8. **Clic en "Ir a Sistema Apoyo Emocional (no seguro)"**

9. **Lee los permisos solicitados:**
   - Ver, editar, crear hojas de cálculo
   - Conectarse a servicios externos
   - Ejecutar automáticamente

10. **Clic en "Permitir"**

11. **Espera a que termine la ejecución** (30-60 segundos)

---

### PASO 7: Ejecutar Instalación
**⏱️ 2 minutos**

1. **Cerrar el editor de Apps Script**
2. **Volver a tu hoja de Google Sheets**
3. **Recargar la página** (`F5` o `Ctrl+R`)
4. **Espera a que aparezca el menú:** 🏥 Apoyo Emocional (puede tardar 5-10 segundos)
5. **Clic en:** 🏥 Apoyo Emocional → 🚀 Instalar Sistema Completo
6. **Espera el mensaje de confirmación** (30-60 segundos)

Deberías ver:
```
🎉 SISTEMA INSTALADO EXITOSAMENTE

✅ Hojas creadas
✅ Validaciones configuradas
✅ Formatos aplicados
✅ Datos de ejemplo incluidos

⚠️ IMPORTANTE:
Ahora debes crear el trigger manualmente
```

---

### PASO 8: Crear Trigger (CRÍTICO)
**⏱️ 2 minutos**

> 🔥 **SIN ESTE PASO LAS AUTOMATIZACIONES NO FUNCIONARÁN**

#### ¿Qué es un Trigger?
Un trigger es un "activador" que ejecuta código automáticamente cuando editas la hoja.

#### Pasos para crear:

1. **Ir a Apps Script:**
   - Menú: **Extensiones → Apps Script**

2. **Abrir Activadores:**
   - En el menú lateral izquierdo, clic en **ícono del reloj ⏰**
   - (Dice "Activadores" o "Triggers")

3. **Agregar nuevo trigger:**
   - Clic en **"+ Agregar activador"** (esquina inferior derecha)

4. **Configurar así:**
   ```
   Elija qué función ejecutar: onEditSistemaCompleto
   Tipo de origen del evento: Desde una hoja de cálculo
   Tipo de evento: Al editar
   Configuración de notificaciones: Notificarme inmediatamente
   ```

5. **Guardar:**
   - Clic en **"Guardar"**

6. **Si pide autorización nuevamente:**
   - Repite pasos de PASO 6 (Autorizar Permisos)

7. **Verificar:**
   - Deberías ver el trigger listado
   - Función: `onEditSistemaCompleto`
   - Tipo: Al editar

---

### PASO 9: Verificar Instalación
**⏱️ 1 minuto**

1. **Cerrar editor de Apps Script**
2. **Volver a la hoja**
3. **Ejecutar verificación:**
   ```
   Menú: 🏥 Apoyo Emocional → Automatizaciones → 🔍 Verificar Triggers
   ```

4. **Debe aparecer:**
   ```
   ✅ 1 trigger(s) activo(s)
   • onEditSistemaCompleto

   🎉 AUTOMATIZACIÓN FUNCIONANDO
   ```

   Si dice "❌ NO HAY TRIGGERS", repite PASO 8.

---

### PASO 10: Probar Sistema
**⏱️ 2 minutos**

1. **Ejecutar prueba:**
   ```
   Menú: 🏥 Apoyo Emocional → Automatizaciones → 🧪 Probar Sistema
   ```

2. **Debe aparecer:**
   ```
   🎉 PRUEBA EXITOSA

   ✅ Participante: [Nombre]
   ✅ Asignado a: Diana
   ✅ Creado en Asignaciones
   ✅ Reportes actualizados

   🔥 SISTEMA FUNCIONANDO
   ```

3. **Verificar manualmente:**
   - Ve a la hoja **"Nuevos Ingresos"**
   - Busca el participante marcado en verde
   - Ve a la hoja **"Asignaciones y Terapias"**
   - Debe aparecer el mismo participante

---

## 🎉 ¡Instalación Completa!

### ✅ Checklist Final

Verifica que todo esté funcionando:

- ✅ Aparece menú "🏥 Apoyo Emocional"
- ✅ Existen 8 hojas del sistema
- ✅ Hay datos de ejemplo en "Nuevos Ingresos"
- ✅ Verificar Triggers muestra "✅ 1 trigger(s) activo(s)"
- ✅ Probar Sistema muestra "🎉 PRUEBA EXITOSA"
- ✅ Hay listas desplegables en columnas (E, F, G, H, I)
- ✅ Los colores cambian según estados

### 🎯 Próximos Pasos

1. **Leer la documentación completa:** [README.md](README.md)
2. **Familiarizarte con el flujo de trabajo**
3. **Capacitar a tu equipo**
4. **Comenzar a usar el sistema**

---

## 🆘 ¿Problemas en la Instalación?

### Error: "No se puede ejecutar la función"
**Solución:** Repetir PASO 6 (Autorizar Permisos)

### Error: "No aparece el menú"
**Solución:**
1. Recargar página (`F5`)
2. Esperar 10-15 segundos
3. Si persiste, ir a Extensiones → Apps Script → Ejecutar → `onOpen`

### Error: "Las automatizaciones no funcionan"
**Solución:**
1. Verificar que el trigger esté creado (PASO 8)
2. Ir a: 🏥 Apoyo Emocional → Automatizaciones → 🔍 Verificar Triggers
3. Debe mostrar: "✅ 1 trigger(s) activo(s)"

### Error: "Falta hoja X"
**Solución:**
```
Menú: 🏥 Apoyo Emocional → 🚀 Instalar Sistema Completo
```
(Puedes ejecutarlo múltiples veces, no afectará datos existentes)

### Error: "No hay datos de ejemplo"
**Solución:**
```
Menú: 🏥 Apoyo Emocional → Datos → 📋 Crear Datos Ejemplo
```

### Otros problemas
**Consultar:** [Solución de Problemas](README.md#-solución-de-problemas)

---

## 📞 Soporte

Si después de seguir todos los pasos sigues teniendo problemas:

1. **Ejecutar diagnóstico:**
   ```
   Menú: 🏥 Apoyo Emocional → Automatizaciones → 📊 Diagnóstico Completo
   ```

2. **Tomar captura de pantalla del mensaje**

3. **Contactar:**
   - GitHub Issues: [Crear issue](https://github.com/tu-usuario/apoyo-emocional/issues)
   - Email: adrian.torres@ejemplo.com

---

## 📹 Video Tutorial

> 🎬 Próximamente: Video paso a paso de la instalación

---

## 📝 Notas Importantes

### Sobre los Permisos

El sistema solicita estos permisos:

- ✅ **Ver y editar hojas de cálculo:** Necesario para crear hojas y registrar datos
- ✅ **Ejecutar al editar:** Necesario para automatizaciones
- ✅ **Mostrar notificaciones:** Para mostrar mensajes de confirmación

**¿Es seguro?**
- ✅ El código es de código abierto (puedes revisarlo)
- ✅ Se ejecuta en TU cuenta de Google (no compartimos datos)
- ✅ No se conecta a servicios externos
- ✅ No envía información a terceros

### Sobre el Trigger

**¿Por qué debo crearlo manualmente?**
- Por seguridad, Google no permite que scripts creen triggers automáticamente
- Es una protección para evitar que scripts maliciosos se ejecuten sin tu permiso

**¿Puedo eliminarlo después?**
- Sí, pero las automatizaciones dejarán de funcionar
- Para eliminar: Apps Script → Activadores → Eliminar (ícono de basura)

### Sobre los Datos de Ejemplo

**¿Puedo eliminarlos?**
- Sí, en cualquier momento
- Menú → Datos → O borrar manualmente las filas 2-6 en "Nuevos Ingresos"

**¿Son datos reales?**
- No, son completamente ficticios para demostración

---

## ✅ Checklist de Instalación

Imprime esta lista para verificar cada paso:

```
□ PASO 1: Crear hoja de Google Sheets
□ PASO 2: Abrir Apps Script
□ PASO 3: Crear 3 archivos (Code.gs, Automatizaciones.gs, Utilidades.gs)
□ PASO 4: Copiar código en cada archivo
□ PASO 5: Guardar proyecto
□ PASO 6: Autorizar permisos (primera vez)
□ PASO 7: Ejecutar instalación
□ PASO 8: Crear trigger ⚡ (CRÍTICO)
□ PASO 9: Verificar instalación
□ PASO 10: Probar sistema

VERIFICACIÓN FINAL:
□ Aparece menú "🏥 Apoyo Emocional"
□ Existen 8 hojas del sistema
□ Trigger activo (Verificar Triggers = ✅)
□ Prueba exitosa (Probar Sistema = 🎉)
```

---

**Tiempo total invertido:** ~15 minutos
**Resultado:** Sistema completamente funcional y automatizado

🎉 **¡Felicidades! Ya puedes comenzar a usar el sistema.**

---

¿Listo para usar el sistema? → [Ver Guía de Uso](README.md#-uso-del-sistema)
