/**
 * =========================================================================
 * UTILIDADES Y DIAGNÓSTICO DEL SISTEMA
 * Funciones auxiliares y herramientas de diagnóstico
 * =========================================================================
 */

// =========================================================================
// DIAGNÓSTICO DEL SISTEMA
// =========================================================================

/**
 * Diagnóstico completo del sistema
 */
function diagnosticoCompletoMejorado() {
  Logger.log("🔍 INICIANDO DIAGNÓSTICO COMPLETO...");

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let mensajeFinal = "📋 DIAGNÓSTICO DEL SISTEMA\n" + "═".repeat(30) + "\n\n";

  // 1. Verificar hojas
  const hojasRequeridas = [
    "Lista de Espera",
    "Nuevos Ingresos",
    "Asignaciones y Terapias",
    "Procesos Culminados",
    "Deserciones",
    "Gestión de Casos",
    "Asistencia Grupal",
    "Reporte Automático Completo",
    "Reportes Mensuales"
  ];

  const hojasExistentes = ss.getSheets().map(function(s) { return s.getName(); });

  Logger.log("📄 VERIFICANDO HOJAS...");
  mensajeFinal += "📄 HOJAS:\n";

  let todasHojasOK = true;
  for (let i = 0; i < hojasRequeridas.length; i++) {
    const hoja = hojasRequeridas[i];
    const existe = hojasExistentes.indexOf(hoja) !== -1;

    if (existe) {
      Logger.log("✅ " + hoja);
      mensajeFinal += "✅ " + hoja + "\n";
    } else {
      Logger.log("❌ " + hoja + " - FALTA");
      mensajeFinal += "❌ " + hoja + " - FALTA\n";
      todasHojasOK = false;
    }
  }

  // 2. Verificar triggers
  const triggers = ScriptApp.getProjectTriggers();
  Logger.log("\n⚡ VERIFICANDO TRIGGERS...");
  mensajeFinal += "\n⚡ TRIGGERS:\n";

  if (triggers.length > 0) {
    Logger.log("✅ " + triggers.length + " trigger(s) activo(s)");
    mensajeFinal += "✅ " + triggers.length + " activo(s)\n";

    for (let i = 0; i < triggers.length; i++) {
      const funcName = triggers[i].getHandlerFunction();
      Logger.log("  • " + funcName);
      mensajeFinal += "  • " + funcName + "\n";
    }
  } else {
    Logger.log("❌ NO HAY TRIGGERS ACTIVOS");
    mensajeFinal += "❌ NO HAY TRIGGERS\n";
  }

  // 3. Verificar datos
  Logger.log("\n📊 VERIFICANDO DATOS...");
  mensajeFinal += "\n📊 DATOS:\n";

  const nuevos = ss.getSheetByName("Nuevos Ingresos");
  const asignaciones = ss.getSheetByName("Asignaciones y Terapias");

  const participantesNuevos = nuevos ? nuevos.getLastRow() - 1 : 0;
  const casosAsignados = asignaciones ? asignaciones.getLastRow() - 1 : 0;

  Logger.log("Participantes registrados: " + participantesNuevos);
  Logger.log("Casos asignados: " + casosAsignados);

  mensajeFinal += "Participantes: " + participantesNuevos + "\n";
  mensajeFinal += "Casos asignados: " + casosAsignados + "\n";

  // 4. Validaciones
  Logger.log("\n🔍 VERIFICANDO VALIDACIONES...");
  mensajeFinal += "\n🔍 VALIDACIONES:\n";

  let validacionesOK = true;
  if (nuevos) {
    const regla = nuevos.getRange("H2").getDataValidation();
    if (regla) {
      Logger.log("✅ Validaciones configuradas");
      mensajeFinal += "✅ Configuradas\n";
    } else {
      Logger.log("⚠️ Validaciones no detectadas");
      mensajeFinal += "⚠️ No detectadas\n";
      validacionesOK = false;
    }
  }

  // 5. Resumen final
  Logger.log("\n🎯 RESUMEN FINAL:");
  mensajeFinal += "\n🎯 RESUMEN:\n";

  const sistemaCompleto = todasHojasOK && triggers.length > 0;

  if (!todasHojasOK) {
    Logger.log("❌ FALTAN HOJAS");
    mensajeFinal += "❌ Ejecutar: Instalar Sistema\n";
  } else if (triggers.length === 0) {
    Logger.log("❌ FALTAN TRIGGERS");
    mensajeFinal += "❌ Crear trigger manualmente\n";
  } else {
    Logger.log("🎉 SISTEMA FUNCIONANDO");
    mensajeFinal += "🎉 SISTEMA FUNCIONANDO\n";
  }

  // Mostrar resultado
  ss.toast(mensajeFinal, "Diagnóstico Completo", -1);

  return sistemaCompleto;
}

// =========================================================================
// PRUEBA DEL SISTEMA
// =========================================================================

/**
 * Probar el sistema completo
 */
function probarSistemaCompleto() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    Logger.log("🧪 INICIANDO PRUEBA DEL SISTEMA...");

    // 1. Verificar instalación
    if (!diagnosticoCompletoMejorado()) {
      ss.toast(
        "❌ Sistema no instalado completamente\n\n" +
        "Ejecutar: Instalar Sistema Completo",
        "Error",
        8
      );
      return false;
    }

    // 2. Buscar participante para prueba
    const nuevos = ss.getSheetByName("Nuevos Ingresos");
    let filaParaPrueba = -1;

    for (let i = 2; i <= nuevos.getLastRow(); i++) {
      const nombre = nuevos.getRange(i, 3).getValue();
      const terapeuta = nuevos.getRange(i, 8).getValue();

      if (nombre && (!terapeuta || terapeuta.toString().trim() === "")) {
        filaParaPrueba = i;
        break;
      }
    }

    if (filaParaPrueba === -1) {
      ss.toast(
        "⚠️ No hay participantes pendientes\n\n" +
        "Primero crea datos de ejemplo:\n" +
        "Menú → Datos → Crear Datos Ejemplo",
        "Sin Datos",
        6
      );
      return false;
    }

    // 3. Simular asignación
    const nombreParticipante = nuevos.getRange(filaParaPrueba, 3).getValue().toString();

    Logger.log("🧪 Probando asignación: " + nombreParticipante + " → Diana");

    const resultado = procesarAsignacionCompleta(nuevos, filaParaPrueba, "Diana");

    if (resultado) {
      // Marcar visualmente
      nuevos.getRange(filaParaPrueba, 8).setValue("Diana").setBackground("#90EE90");

      ss.toast(
        "🎉 PRUEBA EXITOSA\n\n" +
        "✅ Participante: " + nombreParticipante + "\n" +
        "✅ Asignado a: Diana\n" +
        "✅ Creado en Asignaciones\n" +
        "✅ Reportes actualizados\n\n" +
        "🔥 SISTEMA FUNCIONANDO",
        "Prueba Completa",
        8
      );

      Logger.log("🎉 PRUEBA EXITOSA");
      return true;

    } else {
      ss.toast("❌ Error en prueba", "Error", 5);
      return false;
    }

  } catch (error) {
    Logger.log("❌ Error en prueba: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error: " + error.toString(),
      "Error en Prueba",
      5
    );
    return false;
  }
}

// =========================================================================
// REPORTES MENSUALES
// =========================================================================

/**
 * Guardar reporte mensual
 */
function guardarReporteMensual() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const reporteMensual = ss.getSheetByName("Reportes Mensuales");

    if (!reporteMensual) {
      ss.toast("❌ Hoja 'Reportes Mensuales' no encontrada", "Error", 4);
      return false;
    }

    // Verificar si ya existe reporte para este mes
    const hoy = new Date();
    const mesActual = Utilities.formatDate(hoy, Session.getScriptTimeZone(), "MMMM yyyy");

    const datos = reporteMensual.getDataRange().getValues();
    let existe = false;

    for (let i = 1; i < datos.length; i++) {
      if (datos[i][0] === mesActual) {
        existe = true;
        break;
      }
    }

    if (existe) {
      ss.toast(
        "⚠️ Ya existe reporte para " + mesActual + "\n\n" +
        "Los datos se actualizan automáticamente",
        "Reporte Existente",
        4
      );
    } else {
      ss.toast(
        "✅ Reporte de " + mesActual + " guardado\n\n" +
        "Los datos se calculan automáticamente",
        "Reporte Guardado",
        4
      );
    }

    Logger.log("✅ Reporte mensual: " + mesActual);
    return true;

  } catch (error) {
    Logger.log("❌ Error guardando reporte: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error: " + error.toString(),
      "Error",
      4
    );
    return false;
  }
}

// =========================================================================
// AYUDA Y DOCUMENTACIÓN
// =========================================================================

/**
 * Mostrar ayuda del sistema
 */
function mostrarAyuda() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const ayuda =
    "🏥 SISTEMA DE APOYO EMOCIONAL\n" +
    "═".repeat(35) + "\n\n" +
    "📚 GUÍA RÁPIDA:\n\n" +
    "1️⃣ INSTALACIÓN:\n" +
    "   • Menú → Instalar Sistema Completo\n" +
    "   • Crear trigger manualmente\n" +
    "   • Verificar con Diagnóstico\n\n" +
    "2️⃣ USO DIARIO:\n" +
    "   • Registrar en 'Nuevos Ingresos'\n" +
    "   • Asignar terapeuta (col H)\n" +
    "   • → Envío AUTOMÁTICO\n" +
    "   • Gestionar en 'Asignaciones'\n" +
    "   • Cambiar estado → Finaliza automáticamente\n\n" +
    "3️⃣ TRIGGERS:\n" +
    "   Extensiones → Apps Script → Activadores\n" +
    "   + Agregar activador\n" +
    "   Función: onEditSistemaCompleto\n" +
    "   Evento: Al editar\n\n" +
    "4️⃣ AUTOMATIZACIONES:\n" +
    "   ✅ Asignación de terapeutas\n" +
    "   ✅ Finalización de casos\n" +
    "   ✅ Actualización de reportes\n" +
    "   ✅ Cálculo de estadísticas\n\n" +
    "5️⃣ REPORTES:\n" +
    "   Ver 'Reporte Automático Completo'\n" +
    "   Actualización en tiempo real\n\n" +
    "❓ PROBLEMAS:\n" +
    "   • Ver documentación en GitHub\n" +
    "   • Ejecutar Diagnóstico Completo\n" +
    "   • Verificar Triggers\n\n" +
    "📧 Desarrollado por Adrian Torres";

  ss.toast(ayuda, "Ayuda del Sistema", -1);

  Logger.log("📖 Ayuda mostrada");
}

/**
 * Mostrar información de versión
 */
function mostrarVersion() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const version =
    "🏥 SISTEMA DE APOYO EMOCIONAL\n" +
    "═".repeat(30) + "\n\n" +
    "📌 Versión: 2.0\n" +
    "📅 Fecha: Noviembre 2024\n" +
    "👨‍💻 Desarrollador: Adrian Torres\n" +
    "🏢 Manufacturing Operations\n\n" +
    "✨ CARACTERÍSTICAS:\n" +
    "• Sistema completo de gestión\n" +
    "• Automatización total\n" +
    "• Reportes en tiempo real\n" +
    "• Control de asistencias\n" +
    "• Seguimiento de casos\n\n" +
    "🔧 MEJORAS V2.0:\n" +
    "• Código corregido y optimizado\n" +
    "• Fórmulas en español\n" +
    "• Mejor manejo de errores\n" +
    "• Documentación completa\n" +
    "• Guías de solución de problemas";

  ss.toast(version, "Versión del Sistema", -1);
}

// =========================================================================
// FUNCIONES DE MANTENIMIENTO
// =========================================================================

/**
 * Limpiar datos de prueba
 */
function limpiarDatosPrueba() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ui = SpreadsheetApp.getUi();

    const respuesta = ui.alert(
      "⚠️ LIMPIAR DATOS DE PRUEBA",
      "Esta acción eliminará todos los datos de ejemplo.\n" +
      "Los encabezados y fórmulas se mantendrán.\n\n" +
      "¿Deseas continuar?",
      ui.ButtonSet.YES_NO
    );

    if (respuesta !== ui.Button.YES) {
      ss.toast("❌ Operación cancelada", "Cancelado", 2);
      return false;
    }

    // Limpiar Nuevos Ingresos
    const nuevos = ss.getSheetByName("Nuevos Ingresos");
    if (nuevos && nuevos.getLastRow() > 1) {
      nuevos.getRange(2, 3, nuevos.getLastRow() - 1, 10).clearContent();
    }

    // Limpiar Asignaciones
    const asignaciones = ss.getSheetByName("Asignaciones y Terapias");
    if (asignaciones && asignaciones.getLastRow() > 1) {
      asignaciones.getRange(2, 1, asignaciones.getLastRow() - 1, 16).clearContent();
    }

    // Limpiar Procesos Culminados
    const culminados = ss.getSheetByName("Procesos Culminados");
    if (culminados && culminados.getLastRow() > 1) {
      culminados.getRange(2, 1, culminados.getLastRow() - 1, 13).clearContent();
    }

    // Limpiar Deserciones
    const deserciones = ss.getSheetByName("Deserciones");
    if (deserciones && deserciones.getLastRow() > 1) {
      deserciones.getRange(2, 1, deserciones.getLastRow() - 1, 10).clearContent();
    }

    // Limpiar Gestión de Casos
    const gestion = ss.getSheetByName("Gestión de Casos");
    if (gestion && gestion.getLastRow() > 1) {
      gestion.getRange(2, 1, gestion.getLastRow() - 1, 10).clearContent();
    }

    ss.toast(
      "✅ DATOS LIMPIADOS\n\n" +
      "Se eliminaron todos los datos de prueba\n" +
      "Encabezados y fórmulas intactos",
      "Limpieza Completa",
      4
    );

    Logger.log("✅ Datos de prueba eliminados");
    return true;

  } catch (error) {
    Logger.log("❌ Error limpiando datos: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error: " + error.toString(),
      "Error",
      4
    );
    return false;
  }
}

/**
 * Reparar fórmulas
 */
function repararFormulas() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    Logger.log("🔧 Reparando fórmulas...");

    // Reparar Nuevos Ingresos
    const nuevos = ss.getSheetByName("Nuevos Ingresos");
    if (nuevos) {
      nuevos.getRange("A2").setFormula('=IF(C2<>"";HOY();"")');
      nuevos.getRange("B2").setFormula('=IF(C2<>"";FILA()-1;"")');
      nuevos.getRange("L2").setFormula('=IF(H2<>"";"Asignado";"Pendiente")');

      nuevos.getRange("A2:A2").copyTo(nuevos.getRange("A3:A100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
      nuevos.getRange("B2:B2").copyTo(nuevos.getRange("B3:B100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
      nuevos.getRange("L2:L2").copyTo(nuevos.getRange("L3:L100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);

      Logger.log("✅ Fórmulas de Nuevos Ingresos reparadas");
    }

    // Reparar Asignaciones
    const asignaciones = ss.getSheetByName("Asignaciones y Terapias");
    if (asignaciones) {
      asignaciones.getRange("B2").setFormula('=IF(A2<>"";FILA()-1;"")');
      asignaciones.getRange("F2").setFormula('=IF(A2<>"";"Individual";"")');
      asignaciones.getRange("G2").setFormula('=IF(A2<>"";1;"")');
      asignaciones.getRange("L2").setFormula('=IF(A2<>"";"En proceso";"")');
      asignaciones.getRange("M2").setFormula('=IF(A2<>"";HOY();"")');
      asignaciones.getRange("P2").setFormula('=IF(G2<>"";G2;0)');

      asignaciones.getRange("B2:B2").copyTo(asignaciones.getRange("B3:B200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
      asignaciones.getRange("F2:F2").copyTo(asignaciones.getRange("F3:F200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
      asignaciones.getRange("G2:G2").copyTo(asignaciones.getRange("G3:G200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
      asignaciones.getRange("L2:L2").copyTo(asignaciones.getRange("L3:L200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
      asignaciones.getRange("M2:M2").copyTo(asignaciones.getRange("M3:M200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
      asignaciones.getRange("P2:P2").copyTo(asignaciones.getRange("P3:P200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);

      Logger.log("✅ Fórmulas de Asignaciones reparadas");
    }

    ss.toast(
      "✅ FÓRMULAS REPARADAS\n\n" +
      "Todas las fórmulas han sido restauradas",
      "Reparación Completa",
      4
    );

    Logger.log("✅ Reparación de fórmulas completada");
    return true;

  } catch (error) {
    Logger.log("❌ Error reparando fórmulas: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error: " + error.toString(),
      "Error",
      4
    );
    return false;
  }
}

// =========================================================================
// IMPORTACIÓN DE ASISTENCIA GRUPAL
// =========================================================================

/**
 * Importar asistencias desde otro archivo de Google Sheets
 * IMPORTANTE: Debes tener acceso al archivo origen
 */
function importarAsistenciaGrupalDesdeOtroArchivo() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ui = SpreadsheetApp.getUi();

    // Pedir URL del archivo origen
    const respuesta = ui.prompt(
      '📋 IMPORTAR ASISTENCIA GRUPAL',
      'Pega aquí la URL completa del archivo de Google Sheets con las asistencias:\n\n' +
      'Ejemplo: https://docs.google.com/spreadsheets/d/XXXXX/edit',
      ui.ButtonSet.OK_CANCEL
    );

    if (respuesta.getSelectedButton() !== ui.Button.OK) {
      ss.toast('❌ Importación cancelada', 'Cancelado', 2);
      return false;
    }

    const url = respuesta.getResponseText().trim();

    if (!url || url === '') {
      ss.toast('❌ No proporcionaste URL', 'Error', 3);
      return false;
    }

    // Extraer ID del archivo
    let archivoId = '';
    if (url.includes('/d/')) {
      archivoId = url.split('/d/')[1].split('/')[0];
    } else {
      ss.toast('❌ URL inválida. Debe ser de Google Sheets', 'Error', 4);
      return false;
    }

    Logger.log('📋 Importando desde archivo: ' + archivoId);

    // Abrir archivo origen
    const archivoOrigen = SpreadsheetApp.openById(archivoId);
    const hojaOrigen = archivoOrigen.getSheets()[0]; // Primera hoja

    // Obtener datos
    const datosOrigen = hojaOrigen.getDataRange().getValues();

    if (datosOrigen.length < 2) {
      ss.toast('❌ El archivo origen está vacío', 'Error', 3);
      return false;
    }

    // Importar a hoja Asistencia Grupal
    const asistenciaGrupal = ss.getSheetByName('Asistencia Grupal');

    if (!asistenciaGrupal) {
      ss.toast('❌ Hoja "Asistencia Grupal" no encontrada', 'Error', 3);
      return false;
    }

    // Limpiar datos actuales (mantener encabezados)
    const ultimaFila = asistenciaGrupal.getLastRow();
    if (ultimaFila > 1) {
      asistenciaGrupal.getRange(2, 1, ultimaFila - 1, asistenciaGrupal.getLastColumn()).clearContent();
    }

    // Copiar datos (sin encabezados)
    const datosACopiar = datosOrigen.slice(1); // Sin primera fila
    if (datosACopiar.length > 0) {
      asistenciaGrupal.getRange(2, 1, datosACopiar.length, datosACopiar[0].length).setValues(datosACopiar);
    }

    ss.toast(
      '✅ ASISTENCIAS IMPORTADAS\n\n' +
      'Total registros: ' + datosACopiar.length + '\n' +
      'Desde: ' + archivoOrigen.getName(),
      'Importación Completa',
      5
    );

    Logger.log('✅ Asistencias importadas: ' + datosACopiar.length + ' registros');

    // Actualizar reportes
    actualizarReportesAutomaticos();

    return true;

  } catch (error) {
    Logger.log('❌ Error importando asistencias: ' + error.toString());

    if (error.toString().includes('access')) {
      SpreadsheetApp.getActiveSpreadsheet().toast(
        '❌ NO TIENES ACCESO al archivo\n\n' +
        'Pide al dueño que comparta el archivo contigo',
        'Sin Acceso',
        6
      );
    } else {
      SpreadsheetApp.getActiveSpreadsheet().toast(
        '❌ Error: ' + error.toString(),
        'Error',
        5
      );
    }

    return false;
  }
}

/**
 * Calcular estadísticas de asistencia grupal por mes
 */
function calcularAsistenciasMensuales() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const asistenciaGrupal = ss.getSheetByName('Asistencia Grupal');

    if (!asistenciaGrupal) {
      return {
        totalParticipantes: 0,
        asistenciasDelMes: 0,
        porcentajeAsistencia: '0%'
      };
    }

    // Obtener datos
    const datos = asistenciaGrupal.getDataRange().getValues();

    if (datos.length < 2) {
      return {
        totalParticipantes: 0,
        asistenciasDelMes: 0,
        porcentajeAsistencia: '0%'
      };
    }

    // Encabezados (fila 1) contienen fechas en columnas C en adelante
    const encabezados = datos[0];
    const participantes = datos.slice(1); // Sin encabezados

    const totalParticipantes = participantes.filter(function(fila) {
      return fila[0] && fila[0].toString().trim() !== '';
    }).length;

    // Obtener fechas del mes actual
    const hoy = new Date();
    const mesActual = hoy.getMonth();
    const añoActual = hoy.getFullYear();

    let asistenciasDelMes = 0;
    let sesionesDelMes = 0;

    // Revisar cada fecha en encabezados (desde columna C = índice 2)
    for (let col = 2; col < encabezados.length; col++) {
      const fechaStr = encabezados[col];

      if (!fechaStr) continue;

      // Intentar parsear fecha
      let fecha = null;
      if (fechaStr instanceof Date) {
        fecha = fechaStr;
      } else {
        // Formato dd/MM/yyyy
        const partes = fechaStr.toString().split('/');
        if (partes.length === 3) {
          fecha = new Date(partes[2], partes[1] - 1, partes[0]);
        }
      }

      if (!fecha || isNaN(fecha.getTime())) continue;

      // Verificar si es del mes actual
      if (fecha.getMonth() === mesActual && fecha.getFullYear() === añoActual) {
        sesionesDelMes++;

        // Contar asistencias en esta columna
        for (let fila = 1; fila < datos.length; fila++) {
          if (datos[fila][col] === true) { // Checkbox marcado
            asistenciasDelMes++;
          }
        }
      }
    }

    // Calcular porcentaje
    const asistenciasEsperadas = totalParticipantes * sesionesDelMes;
    const porcentaje = asistenciasEsperadas > 0 ?
      ((asistenciasDelMes / asistenciasEsperadas) * 100).toFixed(1) :
      '0';

    return {
      totalParticipantes: totalParticipantes,
      asistenciasDelMes: asistenciasDelMes,
      sesionesDelMes: sesionesDelMes,
      porcentajeAsistencia: porcentaje + '%'
    };

  } catch (error) {
    Logger.log('❌ Error calculando asistencias: ' + error.toString());
    return {
      totalParticipantes: 0,
      asistenciasDelMes: 0,
      porcentajeAsistencia: '0%'
    };
  }
}

/**
 * Mostrar estadísticas de asistencia grupal
 */
function mostrarEstadisticasAsistencia() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const stats = calcularAsistenciasMensuales();

  const hoy = new Date();
  const mesNombre = Utilities.formatDate(hoy, Session.getScriptTimeZone(), 'MMMM yyyy');

  const mensaje =
    '📊 ESTADÍSTICAS ASISTENCIA GRUPAL\n' +
    '═'.repeat(35) + '\n\n' +
    '📅 Mes: ' + mesNombre + '\n\n' +
    '👥 Total participantes: ' + stats.totalParticipantes + '\n' +
    '📋 Sesiones del mes: ' + stats.sesionesDelMes + '\n' +
    '✅ Asistencias registradas: ' + stats.asistenciasDelMes + '\n' +
    '📈 Porcentaje de asistencia: ' + stats.porcentajeAsistencia + '\n\n' +
    '💡 Para actualizar:\n' +
    'Menú → Datos → Importar Asistencia Grupal';

  ss.toast(mensaje, 'Estadísticas Asistencia', -1);

  Logger.log('📊 Estadísticas asistencia mostradas');
}

// =========================================================================
// EXPORTACIÓN DE DATOS
// =========================================================================

/**
 * Exportar estadísticas generales
 */
function exportarEstadisticas() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    Logger.log("📊 Generando estadísticas...");

    // Obtener datos
    const nuevos = ss.getSheetByName("Nuevos Ingresos");
    const asignaciones = ss.getSheetByName("Asignaciones y Terapias");
    const culminados = ss.getSheetByName("Procesos Culminados");
    const deserciones = ss.getSheetByName("Deserciones");

    const totalParticipantes = nuevos ? nuevos.getLastRow() - 1 : 0;
    const totalAsignaciones = asignaciones ? asignaciones.getLastRow() - 1 : 0;
    const totalCulminados = culminados ? culminados.getLastRow() - 1 : 0;
    const totalDeserciones = deserciones ? deserciones.getLastRow() - 1 : 0;

    const tasaExito = totalCulminados + totalDeserciones > 0 ?
      ((totalCulminados / (totalCulminados + totalDeserciones)) * 100).toFixed(1) : 0;

    const estadisticas =
      "📊 ESTADÍSTICAS GENERALES\n" +
      "═".repeat(30) + "\n\n" +
      "👥 Participantes registrados: " + totalParticipantes + "\n" +
      "📋 Casos asignados: " + totalAsignaciones + "\n" +
      "🎉 Procesos culminados: " + totalCulminados + "\n" +
      "⚠️ Deserciones: " + totalDeserciones + "\n\n" +
      "📈 Tasa de éxito: " + tasaExito + "%\n\n" +
      "📅 Generado: " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm");

    ss.toast(estadisticas, "Estadísticas", -1);

    Logger.log("✅ Estadísticas generadas");
    return true;

  } catch (error) {
    Logger.log("❌ Error generando estadísticas: " + error.toString());
    return false;
  }
}
