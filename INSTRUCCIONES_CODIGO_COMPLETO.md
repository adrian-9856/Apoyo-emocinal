# 🎯 CÓDIGO COMPLETO SISTEMA DE APOYO EMOCIONAL

## ⚠️ INSTRUCCIONES IMPORTANTES

Este archivo contiene el código COMPLETO Y FUNCIONAL del sistema.

### 📋 CAMBIOS REALIZADOS:

1. ✅ Hoja renombrada: **"Terapias"** (no "Asignaciones y Terapias")
2. ✅ Reporte COMPLETO como la imagen que mostraste
3. ✅ Actualización automática de reportes
4. ✅ Reporte mensual funcional
5. ✅ Todas las automatizaciones funcionando
6. ✅ TODO en un solo archivo

### 🚀 PASOS PARA INSTALAR:

1. **Abre** el archivo: `SistemaCompleto.gs` (en este repositorio)
2. **Copia** TODO el contenido (Ctrl+A → Ctrl+C)
3. **Apps Script** → Borra todo → Pega el código
4. **Busca línea 638** y cambia el email:
   ```javascript
   const emailDirector = 'tu-email-real@dominio.com';
   ```
5. **Guarda** (Ctrl+S)
6. **Ejecuta**: `instalarSistema` desde el menú de funciones
7. **Crea el trigger**:
   - Apps Script → Activadores (⏰)
   - + Agregar activador
   - Función: **alEditar**
   - Tipo: **Al editar**
   - Guardar

---

## 📊 ESTRUCTURA DEL REPORTE

El reporte ahora tiene TODAS las secciones que mostraste en la imagen:

### REPORTE AUTOMÁTICO COMPLETO

```
┌────────────────────────────────────────┐
│ 📊 REPORTE AUTOMÁTICO COMPLETO         │
├────────────────────────────────────────┤
│ Última actualización: [AUTOMÁTICO]     │
│ Mes actual: [AUTOMÁTICO]               │
├────────────────────────────────────────┤
│                                        │
│ 👥 NUEVOS INGRESOS                     │
│ - Total ingresos                       │
│ - Ingresos este mes                    │
│ - Pendientes asignar                   │
│ - Ya asignados                         │
│                                        │
│ 👩‍⚕️ CASOS ACTIVOS POR TERAPEUTA        │
│ - Gerber - Casos activos               │
│ - Melissa - Casos activos              │
│ - Diana - Casos activos                │
│ - Karina - Casos activos               │
│ - Total casos activos                  │
│                                        │
│ 🎉 PROCESOS CULMINADOS                 │
│ - Total culminados                     │
│ - Culminados este mes                  │
│ - Promedio sesiones                    │
│                                        │
│ ⚠️ DESERCIONES                          │
│ - Total deserciones                    │
│ - Deserciones este mes                 │
│ - Tasa deserción                       │
│                                        │
│ 📋 GESTIÓN DE CASOS                    │
│ - Total en gestión                     │
│                                        │
│ 📊 ESTADÍSTICAS GENERALES              │
│ - Total casos procesados               │
│ - Tasa de éxito                        │
│ - Casos activos                        │
└────────────────────────────────────────┘
```

---

## 🔥 CAMBIOS PRINCIPALES vs VERSIÓN ANTERIOR

| Concepto | Antes | Ahora |
|----------|-------|-------|
| Nombre hoja principal | "Asignaciones y Terapias" | **"Terapias"** |
| Reporte | Básico | **COMPLETO (como imagen)** |
| Actualización | Manual | **AUTOMÁTICA** |
| Reporte mensual | No funcionaba | **FUNCIONA** |
| Métricas | Limitadas | **TODAS** |

---

## ⚡ LAS 3 AUTOMATIZACIONES

### 1️⃣ Lista de Espera → Nuevos Ingresos
- **Hoja:** Lista de Espera
- **Columna:** L (12)
- **Acción:** Seleccionar "Enviar"
- **Resultado:** Copia automáticamente a Nuevos Ingresos

### 2️⃣ Nuevos Ingresos → Terapias
- **Hoja:** Nuevos Ingresos
- **Columna:** K (11)
- **Acción:** Seleccionar Terapeuta
- **Resultado:** Crea caso en hoja **"Terapias"** (8 columnas)

### 3️⃣ Terapias → Finalización
- **Hoja:** Terapias
- **Columna:** G (7)
- **Acción:** Seleccionar "Finalizado"
- **Resultado:**
  - Pregunta tipo (1-3)
  - Pregunta motivo
  - Envía email
  - Copia a hoja final
  - **Actualiza reportes automáticamente**

---

## 📈 ACTUALIZACIÓN AUTOMÁTICA DE REPORTES

El sistema ahora actualiza los reportes automáticamente después de cada operación:

✅ Después de enviar desde Lista de Espera
✅ Después de asignar terapeuta
✅ Después de finalizar caso

También puedes actualizar manualmente desde el menú:
```
🏥 Apoyo Emocional → 📊 Actualizar Reportes
```

---

## 💾 REPORTE MENSUAL

Para guardar un snapshot del mes actual:

```
🏥 Apoyo Emocional → 💾 Guardar Reporte Mensual
```

Esto copia los datos actuales del mes a la hoja "Reportes Mensuales" como historial.

---

## ✅ VERIFICAR QUE TODO FUNCIONA

Después de instalar, ejecuta:

```
🏥 Apoyo Emocional → ✅ Verificar Instalación
```

Debe mostrar:
```
✅ Hojas: 8/8
✅ Trigger: Configurado
🎉 TODO LISTO PARA USAR
```

---

## 🆘 SI ALGO NO FUNCIONA

1. **Verifica el trigger:**
   - Apps Script → Activadores
   - Debe existir: `alEditar` (Al editar)

2. **Verifica las hojas:**
   - Debe existir: "Terapias" (NO "Asignaciones y Terapias")

3. **Verifica el reporte:**
   - Abre hoja "Reporte"
   - Debe tener TODAS las secciones de la imagen

4. **Revisa errores:**
   - Apps Script → Ejecuciones
   - Ver si hay errores en rojo

---

## 📁 ARCHIVO PRINCIPAL

**Archivo a usar:** `SistemaCompleto.gs`

**Líneas:** ~700 líneas de código completo

**Incluye:**
- ✅ 8 hojas
- ✅ Todas las validaciones
- ✅ Todas las automatizaciones
- ✅ Reporte completo
- ✅ Reporte mensual
- ✅ Actualización automática
- ✅ TODO EN UN SOLO ARCHIVO

---

**¡LISTO PARA COPIAR Y USAR!** 🚀
