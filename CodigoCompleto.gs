/**
 * =========================================================================
 * SISTEMA DE APOYO EMOCIONAL - CÓDIGO COMPLETO UNIFICADO
 * Por Adrian Torres - Manufacturing Operations
 * Versión: 3.0 FINAL - TODO EN UN SOLO ARCHIVO
 * =========================================================================
 *
 * ✅ INSTRUCCIONES DE USO:
 * 1. Copiar TODO este archivo
 * 2. Apps Script → Crear archivo nuevo → Pegar todo
 * 3. Buscar "emailDirector" y cambiar por email real
 * 4. Guardar (Ctrl+S)
 * 5. Ejecutar: instalarSistemaCompletoMejorado
 * 6. Crear trigger: onEditSistemaCompleto (tipo: Al editar)
 *
 * =========================================================================
 */

// =========================================================================
// MENÚ PRINCIPAL
// =========================================================================

function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('🏥 Apoyo Emocional')
    .addItem('🚀 Instalar Sistema Completo', 'instalarSistemaCompletoMejorado')
    .addSeparator()
    .addItem('🔧 Configurar Validaciones', 'configurarValidacionesMejoradas')
    .addItem('🎨 Aplicar Formatos', 'configurarFormatosMejorados')
    .addSeparator()
    .addSubMenu(ui.createMenu('📊 Reportes')
      .addItem('📈 Actualizar Reportes', 'actualizarReportesAutomaticos')
      .addItem('💾 Guardar Reporte Mensual', 'guardarReporteMensual'))
    .addSubMenu(ui.createMenu('🔧 Automatizaciones')
      .addItem('🗑️ Limpiar Triggers', 'limpiarTriggers')
      .addItem('🔍 Verificar Triggers', 'verificarTriggers')
      .addItem('🧪 Diagnóstico Completo', 'diagnosticoCompletoMejorado'))
    .addSubMenu(ui.createMenu('👥 Asistencia Grupal')
      .addItem('📥 Importar desde Otro Archivo', 'importarAsistenciaGrupalDesdeOtroArchivo')
      .addItem('📊 Ver Estadísticas del Mes', 'mostrarEstadisticasAsistencia'))
    .addToUi();
}

// =========================================================================
// GESTIÓN DE TRIGGERS
// =========================================================================

function limpiarTriggers() {
  try {
    const triggers = ScriptApp.getProjectTriggers();
    let count = 0;

    for (let i = 0; i < triggers.length; i++) {
      ScriptApp.deleteTrigger(triggers[i]);
      count++;
    }

    Logger.log("🗑️ Triggers eliminados: " + count);
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "✅ Triggers eliminados: " + count,
      "Limpieza Completa",
      3
    );
    return count;

  } catch (error) {
    Logger.log("❌ Error limpiando triggers: " + error.toString());
    return 0;
  }
}

function verificarTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let mensaje = "🔍 TRIGGERS ACTIVOS: " + triggers.length + "\n\n";

  if (triggers.length === 0) {
    mensaje += "⚠️ NO HAY TRIGGERS CONFIGURADOS\n\n";
    mensaje += "Debes crear un trigger manualmente:\n";
    mensaje += "1. Extensiones → Apps Script\n";
    mensaje += "2. Activadores (⏰)\n";
    mensaje += "3. + Agregar activador\n";
    mensaje += "4. Función: onEditSistemaCompleto\n";
    mensaje += "5. Tipo: Al editar";
  } else {
    for (let i = 0; i < triggers.length; i++) {
      const t = triggers[i];
      mensaje += (i + 1) + ". " + t.getHandlerFunction() + "\n";
      mensaje += "   Tipo: " + t.getEventType() + "\n\n";
    }
  }

  ss.toast(mensaje, "Estado de Triggers", -1);
}

// =========================================================================
// INSTALACIÓN PRINCIPAL
// =========================================================================

function instalarSistemaCompletoMejorado() {
  try {
    Logger.log("🚀 INICIANDO INSTALACIÓN DEL SISTEMA...");

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Crear todas las hojas
    Logger.log("📄 Creando hojas...");
    crearTodasLasHojasMejoradas();

    // 2. Configurar validaciones
    Logger.log("✅ Configurando validaciones...");
    configurarValidacionesMejoradas();

    // 3. Configurar formatos
    Logger.log("🎨 Configurando formatos...");
    configurarFormatosMejorados();

    // 4. Crear datos de ejemplo
    Logger.log("📊 Creando datos de ejemplo...");
    crearDatosEjemploMejorados();

    // 5. Limpiar triggers existentes
    Logger.log("🗑️ Limpiando triggers...");
    limpiarTriggers();

    // Mensaje final
    ss.toast(
      "🎉 SISTEMA INSTALADO EXITOSAMENTE\n\n" +
      "✅ Hojas creadas\n" +
      "✅ Validaciones configuradas\n" +
      "✅ Formatos aplicados\n" +
      "✅ Datos de ejemplo incluidos\n\n" +
      "⚠️ IMPORTANTE:\n" +
      "Ahora debes crear el trigger manualmente:\n" +
      "1. Extensiones → Apps Script\n" +
      "2. Activadores (ícono ⏰)\n" +
      "3. + Agregar activador\n" +
      "4. Función: onEditSistemaCompleto\n" +
      "5. Tipo: Al editar\n" +
      "6. Guardar",
      "✅ Instalación Completa",
      -1
    );

    Logger.log("🎉 INSTALACIÓN COMPLETADA EXITOSAMENTE");
    return true;

  } catch (error) {
    Logger.log("❌ ERROR EN INSTALACIÓN: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "❌ Error en instalación: " + error.toString(),
      "Error",
      10
    );
    return false;
  }
}

function crearTodasLasHojasMejoradas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Eliminar hojas existentes excepto la primera
  const sheets = ss.getSheets();
  for (let i = sheets.length - 1; i > 0; i--) {
    ss.deleteSheet(sheets[i]);
  }

  // Renombrar primera hoja
  sheets[0].setName("Nuevos Ingresos");

  // Crear todas las hojas
  crearHojaListaEspera();
  crearHojaNuevosIngresosMejorada();
  crearHojaAsignacionesMejorada();
  crearHojaProcesosCulminados();
  crearHojaDeserciones();
  crearHojaGestionCasos();
  crearHojaAsistenciaGrupal();
  crearHojaReporteCompleto();
  crearHojaReportesMensuales();
}

// =========================================================================
// CREACIÓN DE HOJAS INDIVIDUALES
// =========================================================================

function crearHojaListaEspera() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Lista de Espera", 0);

  sheet.clear();

  // Encabezados simplificados - solo texto libre + dropdown final
  const headers = [
    "Fecha Solicitud", "No.", "Nombre Completo", "Creemos ID", "Género",
    "Rango Edad", "Malestar Principal", "Derivado Por", "Contacto Emergencia",
    "Teléfono", "Observaciones", "Acción"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formato encabezados
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#e91e63")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Fórmulas automáticas (fila 2)
  sheet.getRange("A2").setFormula('=IF(C2<>"";HOY();"")');
  sheet.getRange("B2").setFormula('=IF(C2<>"";FILA()-1;"")');

  // Copiar fórmulas hacia abajo (100 filas)
  sheet.getRange("A2:A2").copyTo(sheet.getRange("A3:A100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("B2:B2").copyTo(sheet.getRange("B3:B100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);

  // Ajustar anchos
  const widths = [110, 60, 200, 120, 100, 100, 250, 150, 180, 120, 200, 150];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Instrucciones
  sheet.getRange("N1").setValue("📋 LISTA DE ESPERA");
  sheet.getRange("N2").setValue("═".repeat(25));
  sheet.getRange("N3").setValue("🎯 INSTRUCCIONES:");
  sheet.getRange("N4").setValue("1. Llenar datos del participante");
  sheet.getRange("N5").setValue("2. Todos los campos son texto libre");
  sheet.getRange("N6").setValue("3. Al final (columna L):");
  sheet.getRange("N7").setValue("   → Seleccionar: 'Enviar'");
  sheet.getRange("N8").setValue("   → Se mueve automáticamente");
  sheet.getRange("N9").setValue("   → a 'Nuevos Ingresos'");
  sheet.getRange("N10").setValue("");
  sheet.getRange("N11").setValue("⚠️ ACCIÓN (Columna L):");
  sheet.getRange("N12").setValue("• (vacío) = en espera");
  sheet.getRange("N13").setValue("• Enviar = mover a Nuevos Ingresos");
  sheet.getRange("N1:N13").setBackground("#fce4ec").setFontWeight("bold");

  // Proteger columnas automáticas
  sheet.getRange("A2:A100").protect().setWarningOnly(true);
  sheet.getRange("B2:B100").protect().setWarningOnly(true);
}

function crearHojaNuevosIngresosMejorada() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Nuevos Ingresos");

  sheet.clear();

  // Encabezados reorganizados - TERAPEUTA AL FINAL
  const headers = [
    "Fecha Ingreso", "No.", "Nombre Completo", "Creemos ID", "Género",
    "Rango Edad", "Malestar Principal", "Tipo Atención", "Derivado Por",
    "Contacto Emergencia", "Terapeuta Asignado"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formato encabezados
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#1f4788")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Ajustar anchos
  const widths = [110, 60, 200, 120, 100, 100, 250, 120, 150, 180, 150];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Fórmulas automáticas (fila 2)
  sheet.getRange("A2").setFormula('=IF(C2<>"";HOY();"")');
  sheet.getRange("B2").setFormula('=IF(C2<>"";FILA()-1;"")');

  // Copiar fórmulas hacia abajo (100 filas)
  sheet.getRange("A2:A2").copyTo(sheet.getRange("A3:A100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("B2:B2").copyTo(sheet.getRange("B3:B100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);

  // Instrucciones
  sheet.getRange("M1").setValue("🎯 FLUJO DE USO");
  sheet.getRange("M2").setValue("═".repeat(25));
  sheet.getRange("M3").setValue("ORDEN CORRECTO:");
  sheet.getRange("M4").setValue("1️⃣ Llenar TODA la información");
  sheet.getRange("M5").setValue("   C-J (Nombre hasta Contacto)");
  sheet.getRange("M6").setValue("");
  sheet.getRange("M7").setValue("2️⃣ AL FINAL: Asignar Terapeuta");
  sheet.getRange("M8").setValue("   Columna K (dropdown)");
  sheet.getRange("M9").setValue("");
  sheet.getRange("M10").setValue("3️⃣ AUTOMÁTICO: Se envía");
  sheet.getRange("M11").setValue("   → a Asignaciones y Terapias");
  sheet.getRange("M12").setValue("");
  sheet.getRange("M13").setValue("TERAPEUTAS:");
  sheet.getRange("M14").setValue("• Gerber");
  sheet.getRange("M15").setValue("• Melissa");
  sheet.getRange("M16").setValue("• Diana");
  sheet.getRange("M17").setValue("• Karina");
  sheet.getRange("M1:M17").setBackground("#e8f5e8").setFontWeight("bold");
}

function crearHojaAsignacionesMejorada() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Asignaciones y Terapias");

  // COLUMNAS SIMPLIFICADAS - Solo 10 columnas
  const headers = [
    "Terapeuta", "No.", "Participante", "Creemos ID", "Género",
    "Tipo Terapia", "No. Sesión", "Estado Proceso",
    "Fecha Inicio", "Motivo Finalización"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formato encabezados
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#2e7d32")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Ajustar anchos SIMPLIFICADOS
  const widths = [150, 60, 200, 120, 80, 120, 100, 150, 120, 300];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Fórmulas automáticas SIMPLIFICADAS
  sheet.getRange("B2").setFormula('=IF(A2<>"";FILA()-1;"")');
  sheet.getRange("F2").setFormula('=IF(A2<>"";"Individual";"")');
  sheet.getRange("G2").setFormula('=IF(A2<>"";1;"")');
  sheet.getRange("H2").setFormula('=IF(A2<>"";"En proceso";"")');
  sheet.getRange("I2").setFormula('=IF(A2<>"";HOY();"")');

  // Copiar fórmulas
  sheet.getRange("B2:B2").copyTo(sheet.getRange("B3:B200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("F2:F2").copyTo(sheet.getRange("F3:F200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("G2:G2").copyTo(sheet.getRange("G3:G200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("H2:H2").copyTo(sheet.getRange("H3:H200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("I2:I2").copyTo(sheet.getRange("I3:I200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);

  // Instrucciones SIMPLIFICADAS
  sheet.getRange("L1").setValue("⚡ INSTRUCCIONES");
  sheet.getRange("L2").setValue("═".repeat(25));
  sheet.getRange("L3").setValue("COLUMNAS CLAVE:");
  sheet.getRange("L4").setValue("G. No. Sesión (1-20)");
  sheet.getRange("L5").setValue("H. Estado:");
  sheet.getRange("L6").setValue("  • En proceso");
  sheet.getRange("L7").setValue("  • Finalizado");
  sheet.getRange("L8").setValue("");
  sheet.getRange("L9").setValue("🔥 AL SELECCIONAR 'Finalizado':");
  sheet.getRange("L10").setValue("1. Pregunta motivo");
  sheet.getRange("L11").setValue("2. Envía correo a director");
  sheet.getRange("L12").setValue("3. Copia a hoja final");
  sheet.getRange("L13").setValue("4. Mantiene registro aquí");
  sheet.getRange("L1:L13").setBackground("#fff3e0").setFontWeight("bold");
}

function crearHojaProcesosCulminados() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Procesos Culminados");

  const headers = [
    "Fecha Culminación", "No.", "Participante", "Terapeuta", "Creemos ID",
    "Total Sesiones", "Duración (días)", "Motivo Culminación", "Objetivos Alcanzados",
    "Nivel Satisfacción", "Recomendaciones", "Seguimiento Requerido", "Mes Culminación"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formato encabezados
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#388e3c")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Ajustar anchos
  const widths = [120, 60, 180, 120, 120, 100, 100, 200, 200, 120, 200, 150, 120];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Fórmulas
  sheet.getRange("B2").setFormula('=IF(A2<>"";FILA()-1;"")');
  sheet.getRange("M2").setFormula('=IF(A2<>"";TEXTO(A2;"MMMM AAAA");"")');

  // Copiar fórmulas
  sheet.getRange("B2:B2").copyTo(sheet.getRange("B3:B200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("M2:M2").copyTo(sheet.getRange("M3:M200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);

  // Estadísticas
  sheet.getRange("O1").setValue("📊 ESTADÍSTICAS");
  sheet.getRange("O2").setValue("Total este mes:");
  sheet.getRange("P2").setFormula('=CONTAR.SI(M:M;TEXTO(HOY();"MMMM AAAA"))');
  sheet.getRange("O3").setValue("Promedio sesiones:");
  sheet.getRange("P3").setFormula('=SI(CONTARA(F:F)>1;PROMEDIO(F2:F);0)');
  sheet.getRange("O1:P3").setBackground("#e8f5e8").setFontWeight("bold");
}

function crearHojaDeserciones() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Deserciones");

  const headers = [
    "Fecha Deserción", "No.", "Participante", "Terapeuta", "Creemos ID",
    "Sesiones Asistidas", "Última Asistencia", "Motivo Deserción",
    "Intentos Contacto", "Factores Identificados"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formato
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#d32f2f")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Anchos
  const widths = [120, 60, 180, 120, 120, 100, 120, 200, 150, 200];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Fórmula
  sheet.getRange("B2").setFormula('=IF(A2<>"";FILA()-1;"")');
  sheet.getRange("B2:B2").copyTo(sheet.getRange("B3:B200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
}

function crearHojaGestionCasos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Gestión de Casos");

  const headers = [
    "Fecha Gestión", "No.", "Participante", "Terapeuta", "Creemos ID",
    "Tipo Gestión", "Motivo Gestión", "Acciones Tomadas",
    "Derivado A", "Estado Actual"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formato
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#f57c00")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Anchos
  const widths = [120, 60, 180, 120, 120, 150, 200, 200, 150, 120];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Fórmula
  sheet.getRange("B2").setFormula('=IF(A2<>"";FILA()-1;"")');
  sheet.getRange("B2:B2").copyTo(sheet.getRange("B3:B200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
}

function crearHojaAsistenciaGrupal() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Asistencia Grupal");

  // Encabezados
  sheet.getRange("A1").setValue("Nombre");
  sheet.getRange("B1").setValue("Teléfono");

  // Crear fechas (últimos 8 lunes)
  const hoy = new Date();
  for (let i = 7; i >= 0; i--) {
    const fecha = new Date(hoy.getTime() - (i * 7 * 24 * 60 * 60 * 1000));
    const diasParaLunes = (fecha.getDay() + 6) % 7;
    fecha.setDate(fecha.getDate() - diasParaLunes);

    const col = String.fromCharCode(67 + (7 - i));
    sheet.getRange(col + "1").setValue(Utilities.formatDate(fecha, Session.getScriptTimeZone(), "dd/MM/yyyy"));
  }

  // Formato encabezados
  sheet.getRange(1, 1, 1, 10)
    .setBackground("#4CAF50")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Participantes de ejemplo
  const participantes = [
    ["María González", "12345678"],
    ["Carlos López", "87654321"],
    ["Ana Morales", "11223344"],
    ["José Torres", "44332211"],
    ["Sofia Ramírez", "55667788"]
  ];

  participantes.forEach((participante, index) => {
    const fila = index + 2;
    sheet.getRange(fila, 1, 1, 2).setValues([participante]);

    // Agregar checkboxes
    for (let col = 3; col <= 10; col++) {
      sheet.getRange(fila, col).insertCheckboxes();
    }
  });

  // Ajustar anchos
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 120);
  for (let col = 3; col <= 10; col++) {
    sheet.setColumnWidth(col, 100);
  }

  // Estadísticas
  sheet.getRange("L1").setValue("Total Participantes:");
  sheet.getRange("M1").setFormula('=CONTARA(A2:A)-CONTAR.BLANCO(A2:A)');
  sheet.getRange("L2").setValue("Asistencias Totales:");
  sheet.getRange("M2").setFormula('=SUMAPRODUCTO(C2:J6)');
  sheet.getRange("L3").setValue("% Asistencia:");
  sheet.getRange("M3").setFormula('=SI(M1>0;M2/(M1*8)*100&"%";"0%")');

  sheet.getRange("L1:M3").setBackground("#fff3e0").setFontWeight("bold");
}

function crearHojaReporteCompleto() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Reporte Automático Completo");

  const data = [
    ["📊 REPORTE AUTOMÁTICO COMPLETO", ""],
    ["🔄 Última actualización:", "=AHORA()"],
    ["📅 Mes actual:", "=TEXTO(HOY();\"MMMM AAAA\")"],
    ["", ""],
    ["👥 NUEVOS INGRESOS", ""],
    ["Total ingresos", '=CONTARA(\'Nuevos Ingresos\'!C:C)-1'],
    ["Ingresos este mes", '=CONTAR.SI.CONJUNTO(\'Nuevos Ingresos\'!A:A;">="&FECHA(AÑO(HOY());MES(HOY());1);\'Nuevos Ingresos\'!A:A;"<="&FIN.MES(HOY();0))'],
    ["Pendientes asignar", '=CONTAR.SI.CONJUNTO(\'Nuevos Ingresos\'!K:K;"";\'Nuevos Ingresos\'!C:C;"<>")'],
    ["Ya asignados", '=CONTAR.SI.CONJUNTO(\'Nuevos Ingresos\'!K:K;"<>";\'Nuevos Ingresos\'!C:C;"<>")'],
    ["", ""],
    ["👩‍⚕️ CASOS ACTIVOS POR TERAPEUTA", ""],
    ["Gerber - Casos activos", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Gerber";\'Asignaciones y Terapias\'!H:H;"En proceso")'],
    ["Melissa - Casos activos", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Melissa";\'Asignaciones y Terapias\'!H:H;"En proceso")'],
    ["Diana - Casos activos", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Diana";\'Asignaciones y Terapias\'!H:H;"En proceso")'],
    ["Karina - Casos activos", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Karina";\'Asignaciones y Terapias\'!H:H;"En proceso")'],
    ["Total casos activos", "=B12+B13+B14+B15"],
    ["", ""],
    ["🎉 PROCESOS CULMINADOS", ""],
    ["Total culminados", '=CONTARA(\'Procesos Culminados\'!A:A)-1'],
    ["Culminados este mes", '=CONTAR.SI(\'Procesos Culminados\'!M:M;TEXTO(HOY();"MMMM AAAA"))'],
    ["Promedio sesiones", '=SI(B19>0;PROMEDIO(\'Procesos Culminados\'!F:F);0)'],
    ["", ""],
    ["⚠️ DESERCIONES", ""],
    ["Total deserciones", '=CONTARA(Deserciones!A:A)-1'],
    ["Deserciones este mes", '=CONTAR.SI.CONJUNTO(Deserciones!A:A;">="&FECHA(AÑO(HOY());MES(HOY());1);Deserciones!A:A;"<="&FIN.MES(HOY();0))'],
    ["Tasa deserción", '=SI((B19+B23)>0;B23/(B19+B23)*100&"%";"0%")'],
    ["", ""],
    ["📋 GESTIÓN DE CASOS", ""],
    ["Total en gestión", '=CONTARA(\'Gestión de Casos\'!A:A)-1'],
    ["", ""],
    ["📊 ESTADÍSTICAS GENERALES", ""],
    ["Total casos procesados", "=B19+B23+B27"],
    ["Tasa de éxito", '=SI(B30>0;B19/B30*100&"%";"0%")'],
    ["Casos activos", "=B16"]
  ];

  sheet.getRange(1, 1, data.length, 2).setValues(data);

  // Formatos
  sheet.getRange("A1:B1").merge()
    .setBackground("#1f4788")
    .setFontColor("white")
    .setFontWeight("bold")
    .setFontSize(16)
    .setHorizontalAlignment("center");

  const sectionRows = [5, 11, 18, 22, 26, 29];
  sectionRows.forEach(row => {
    sheet.getRange("A" + row + ":B" + row)
      .setBackground("#4caf50")
      .setFontColor("white")
      .setFontWeight("bold");
  });

  sheet.setColumnWidth(1, 300);
  sheet.setColumnWidth(2, 150);
}

function crearHojaReportesMensuales() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Reportes Mensuales");

  const headers = [
    "Mes/Año", "Nuevos Ingresos", "Culminados", "Deserciones", "Gestión Casos",
    "Casos Activos", "Tasa Éxito (%)", "Gerber", "Melissa", "Diana", "Karina",
    "Asist. Grupales", "% Asist. Grupal", "Fecha Guardado"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formato
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#6a1b9a")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Anchos
  const widths = [120, 100, 100, 100, 100, 100, 100, 80, 80, 80, 80, 100, 100, 120];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Fórmulas para mes actual (fila 2)
  const formulas = [
    '=TEXTO(HOY();"MMMM AAAA")',
    '=CONTAR.SI.CONJUNTO(\'Nuevos Ingresos\'!A:A;">="&FECHA(AÑO(HOY());MES(HOY());1);\'Nuevos Ingresos\'!A:A;"<="&FIN.MES(HOY();0))',
    '=CONTAR.SI(\'Procesos Culminados\'!M:M;TEXTO(HOY();"MMMM AAAA"))',
    '=CONTAR.SI.CONJUNTO(Deserciones!A:A;">="&FECHA(AÑO(HOY());MES(HOY());1);Deserciones!A:A;"<="&FIN.MES(HOY();0))',
    '=CONTAR.SI.CONJUNTO(\'Gestión de Casos\'!A:A;">="&FECHA(AÑO(HOY());MES(HOY());1);\'Gestión de Casos\'!A:A;"<="&FIN.MES(HOY();0))',
    '=CONTAR.SI(\'Asignaciones y Terapias\'!H:H;"En proceso")',
    '=SI((C2+D2)>0;C2/(C2+D2)*100;0)',
    '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Gerber";\'Asignaciones y Terapias\'!H:H;"En proceso")',
    '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Melissa";\'Asignaciones y Terapias\'!H:H;"En proceso")',
    '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Diana";\'Asignaciones y Terapias\'!H:H;"En proceso")',
    '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Karina";\'Asignaciones y Terapias\'!H:H;"En proceso")',
    '=SUMAPRODUCTO(\'Asistencia Grupal\'!C2:J6)',
    '=SI(CONTARA(\'Asistencia Grupal\'!A2:A)>0;L2/(CONTARA(\'Asistencia Grupal\'!A2:A)*8)*100;0)',
    '=HOY()'
  ];

  sheet.getRange(2, 1, 1, formulas.length).setFormulas([formulas]);
}

// =========================================================================
// CONFIGURACIONES
// =========================================================================

function configurarValidacionesMejoradas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nuevos = ss.getSheetByName("Nuevos Ingresos");
  const asignaciones = ss.getSheetByName("Asignaciones y Terapias");

  // Género (actualizado con más opciones)
  const generoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Hombre", "Mujer", "Trans hombre", "No binario", "Otro"])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange("E2:E200").setDataValidation(generoRule);
  asignaciones.getRange("E2:E200").setDataValidation(generoRule);

  // Terapeuta - AHORA EN COLUMNA K (al final, porque es la acción que envía)
  const terapeutaRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Gerber", "Melissa", "Diana", "Karina"])
    .setAllowInvalid(false)
    .setHelpText("Al seleccionar se enviará automáticamente a Asignaciones")
    .build();
  nuevos.getRange("K2:K200").setDataValidation(terapeutaRule);
  asignaciones.getRange("A2:A200").setDataValidation(terapeutaRule);

  // Tipo atención - AHORA EN COLUMNA H de Nuevos Ingresos
  const tipoAtencionRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Individual", "Grupal", "Familiar", "Pareja"])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange("H2:H200").setDataValidation(tipoAtencionRule);
  asignaciones.getRange("F2:F200").setDataValidation(tipoAtencionRule);

  // No. Sesión (1-20) - Columna G en Asignaciones
  const sesionNumbers = [];
  for (let i = 1; i <= 20; i++) {
    sesionNumbers.push(i.toString());
  }
  const sesionRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(sesionNumbers)
    .setAllowInvalid(false)
    .setHelpText("Número de sesión actual (1-20)")
    .build();
  asignaciones.getRange("G2:G200").setDataValidation(sesionRule);

  // Estado proceso - Columna H en Asignaciones (simplificado)
  const estadoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "En proceso",
      "Finalizado"
    ])
    .setAllowInvalid(false)
    .setHelpText("Al seleccionar 'Finalizado' se solicitará el motivo")
    .build();
  asignaciones.getRange("H2:H200").setDataValidation(estadoRule);

  // ===== VALIDACIONES PARA LISTA DE ESPERA =====
  const listaEspera = ss.getSheetByName("Lista de Espera");

  if (listaEspera) {
    // SOLO UN DROPDOWN: Acción (Columna L)
    const accionListaRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["Enviar"])
      .setAllowInvalid(false)
      .setHelpText("Seleccionar 'Enviar' moverá automáticamente a Nuevos Ingresos")
      .build();
    listaEspera.getRange("L2:L200").setDataValidation(accionListaRule);
  }
}

function configurarFormatosMejorados() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Asignaciones - Estados (columna H simplificada)
  const asignaciones = ss.getSheetByName("Asignaciones y Terapias");

  const procesoRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("En proceso")
    .setBackground("#d1ecf1")
    .setRanges([asignaciones.getRange("H2:H200")])
    .build();

  const finalizadoRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Finalizado")
    .setBackground("#fff3cd")
    .setFontColor("#856404")
    .setRanges([asignaciones.getRange("H2:H200")])
    .build();

  asignaciones.setConditionalFormatRules([procesoRule, finalizadoRule]);
}

function crearDatosEjemploMejorados() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nuevos = ss.getSheetByName("Nuevos Ingresos");

  // Limpiar datos existentes (excepto fórmulas)
  if (nuevos.getLastRow() > 1) {
    nuevos.getRange(2, 3, nuevos.getLastRow() - 1, 10).clearContent();
  }

  // Ejemplos con nueva estructura (C a J - 8 columnas)
  const ejemplos = [
    ["María González Pérez", "MG001", "Mujer", "26 a 30", "Sintomatología de ansiedad", "Individual", "Centro de Salud", "Juan Pérez - 12345678"],
    ["Carlos López Morales", "CL002", "Hombre", "31 a 40", "Sintomatología depresiva", "Individual", "Derivación médica", "Ana López - 87654321"],
    ["Ana Morales Rivera", "AM003", "No binario", "16 a 25", "Violencia de género", "Individual", "Servicios sociales", "María Morales - 11223344"],
    ["José Torres Vega", "JT004", "Trans hombre", "41 a 50", "Dificultad en las relaciones interpersonales", "Pareja", "Consulta voluntaria", "Carmen Torres - 44332211"],
    ["Sofia Ramírez Castro", "SR005", "Mujer", "26 a 30", "Sintomatología de TEA o TEPT", "Individual", "Hospital público", "Luis Ramírez - 55667788"]
  ];

  // Insertar datos (columnas C a J - 8 columnas)
  nuevos.getRange(2, 3, ejemplos.length, 8).setValues(ejemplos);

  SpreadsheetApp.flush();

  ss.toast(
    "✅ DATOS DE EJEMPLO CREADOS\n\n" +
    "5 participantes registrados\n" +
    "Estado: Pendientes de asignar\n\n" +
    "Siguiente paso:\n" +
    "Asigna un terapeuta en columna K (al final)",
    "Datos Listos",
    6
  );
}

// =========================================================================
// AUTOMATIZACIONES - TRIGGER PRINCIPAL
// =========================================================================

function onEditSistemaCompleto(e) {
  try {
    // Validaciones básicas
    if (!e || !e.range) {
      Logger.log("⚠️ onEditSistemaCompleto: evento no válido");
      return;
    }

    const sheet = e.range.getSheet();

    if (!sheet || typeof sheet.getName !== 'function') {
      Logger.log("❌ ERROR: No se pudo obtener la hoja del evento");
      return;
    }

    const fila = e.range.getRow();
    const columna = e.range.getColumn();
    const valor = e.range.getValue();

    // Ignorar encabezados
    if (fila <= 1) {
      return;
    }

    // Ignorar valores vacíos
    if (!valor || valor.toString().trim() === "") {
      return;
    }

    const valorLimpio = valor.toString().trim();
    const nombreHoja = sheet.getName();

    Logger.log("🔥 EDIT: " + nombreHoja + " | Fila: " + fila + " | Col: " + columna + " | Valor: " + valorLimpio);

    // AUTOMATIZACIÓN 0: ENVIAR DE LISTA DE ESPERA
    // Hoja: "Lista de Espera", Columna L (12) - Acción
    if (nombreHoja === "Lista de Espera" && columna === 12) {
      if (valorLimpio === "Enviar") {
        Logger.log("📋 Procesando envío desde lista de espera");

        Utilities.sleep(300);

        const resultado = procesarEnvioListaEspera(sheet, fila);

        if (resultado) {
          Logger.log("✅ Movido a Nuevos Ingresos exitosamente");
          actualizarReportesAutomaticos();
        } else {
          Logger.log("❌ Error moviendo de lista de espera");
        }
      }
    }

    // AUTOMATIZACIÓN 1: ASIGNACIÓN DE TERAPEUTA
    // Hoja: "Nuevos Ingresos", Columna K (11) - AL FINAL
    if (nombreHoja === "Nuevos Ingresos" && columna === 11) {
      const terapeutas = ["Gerber", "Melissa", "Diana", "Karina"];

      if (terapeutas.indexOf(valorLimpio) !== -1) {
        Logger.log("🎯 Procesando asignación: " + valorLimpio);

        Utilities.sleep(300);

        const resultado = procesarAsignacionCompleta(sheet, fila, valorLimpio);

        if (resultado) {
          Logger.log("✅ Asignación exitosa");
          actualizarReportesAutomaticos();
        } else {
          Logger.log("❌ Error en asignación");
        }
      }
    }

    // AUTOMATIZACIÓN 2: FINALIZACIÓN DE CASO
    // Hoja: "Asignaciones y Terapias", Columna H (8)
    if (nombreHoja === "Asignaciones y Terapias" && columna === 8) {
      if (valorLimpio === "Finalizado") {
        Logger.log("🏁 Procesando finalización");

        Utilities.sleep(300);

        const resultado = procesarFinalizacionConPrompt(sheet, fila);

        if (resultado) {
          Logger.log("✅ Finalización exitosa");
          actualizarReportesAutomaticos();
        } else {
          Logger.log("❌ Error en finalización");
        }
      }
    }

  } catch (error) {
    Logger.log("❌ ERROR EN AUTOMATIZACIÓN: " + error.toString());

    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error en automatización: " + error.toString(),
      "Error",
      5
    );
  }
}

// =========================================================================
// PROCESAMIENTO DE ASIGNACIONES
// =========================================================================

function procesarAsignacionCompleta(sheetOrigen, fila, terapeuta) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Validar parámetros
    if (!sheetOrigen || typeof sheetOrigen.getRange !== 'function') {
      Logger.log("❌ ERROR: sheetOrigen no es válido");
      ss.toast("Error: Parámetro inválido en procesarAsignacionCompleta", "Error", 3);
      return false;
    }

    if (!fila || fila < 2) {
      Logger.log("❌ ERROR: fila inválida: " + fila);
      return false;
    }

    const asignaciones = ss.getSheetByName("Asignaciones y Terapias");

    if (!asignaciones) {
      Logger.log("❌ Hoja 'Asignaciones y Terapias' no encontrada");
      return false;
    }

    // Obtener datos del participante (Nuevos Ingresos - 11 columnas)
    const datos = sheetOrigen.getRange(fila, 1, 1, 11).getValues()[0];
    const nombre = datos[2];          // C
    const creemosId = datos[3];       // D
    const genero = datos[4];          // E
    const tipoAtencion = datos[7];    // H

    if (!nombre || nombre.toString().trim() === "") {
      Logger.log("❌ No hay nombre de participante");
      return false;
    }

    const nombreLimpio = nombre.toString().trim();

    Logger.log("👤 Procesando: " + nombreLimpio + " → " + terapeuta);

    // Verificar si ya existe en Asignaciones
    const datosAsignaciones = asignaciones.getDataRange().getValues();
    for (let i = 1; i < datosAsignaciones.length; i++) {
      if (datosAsignaciones[i][2] && datosAsignaciones[i][2].toString().trim() === nombreLimpio) {
        Logger.log("⚠️ Ya existe en Asignaciones");
        sheetOrigen.getRange(fila, 1, 1, 11).setBackground("#d4edda");
        ss.toast(nombreLimpio + " ya estaba asignado", "Ya Procesado", 2);
        return true;
      }
    }

    // Crear nueva asignación (estructura simplificada - 10 columnas)
    const nuevaFila = asignaciones.getLastRow() + 1;
    const hoy = new Date();

    const nuevaAsignacion = [
      terapeuta,                          // A - Terapeuta
      nuevaFila - 1,                      // B - No.
      nombreLimpio,                       // C - Participante
      creemosId || "",                    // D - Creemos ID
      genero || "",                       // E - Género
      tipoAtencion || "Individual",       // F - Tipo Terapia
      "1",                                // G - No. Sesión (empieza en 1)
      "En proceso",                       // H - Estado Proceso
      hoy,                                // I - Fecha Inicio
      ""                                  // J - Motivo Finalización (vacío)
    ];

    asignaciones.getRange(nuevaFila, 1, 1, 10).setValues([nuevaAsignacion]);

    // Marcar fila en Nuevos Ingresos como procesada (verde)
    sheetOrigen.getRange(fila, 1, 1, 11).setBackground("#d4edda");

    // Mensaje de confirmación
    ss.toast(
      "✅ ASIGNACIÓN EXITOSA\n\n" +
      "👤 " + nombreLimpio + "\n" +
      "👩‍⚕️ " + terapeuta + "\n" +
      "📅 Primera sesión: " + Utilities.formatDate(hoy, Session.getScriptTimeZone(), "dd/MM/yyyy"),
      "Asignación Completa",
      4
    );

    Logger.log("✅ Asignación completa: " + nombreLimpio + " → " + terapeuta);

    return true;

  } catch (error) {
    Logger.log("❌ Error en procesarAsignacionCompleta: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error: " + error.toString(),
      "Error en Asignación",
      5
    );
    return false;
  }
}

function procesarEnvioListaEspera(sheetOrigen, fila) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Validar parámetros
    if (!sheetOrigen || typeof sheetOrigen.getRange !== 'function') {
      Logger.log("❌ ERROR: sheetOrigen no es válido");
      ss.toast("Error: Parámetro inválido en procesarEnvioListaEspera", "Error", 3);
      return false;
    }

    if (!fila || fila < 2) {
      Logger.log("❌ ERROR: fila inválida: " + fila);
      return false;
    }

    const nuevosIngresos = ss.getSheetByName("Nuevos Ingresos");

    if (!nuevosIngresos) {
      Logger.log("❌ Hoja 'Nuevos Ingresos' no encontrada");
      return false;
    }

    // Obtener datos del participante de Lista de Espera (12 columnas)
    const datos = sheetOrigen.getRange(fila, 1, 1, 12).getValues()[0];
    const nombre = datos[2];       // C
    const creemosId = datos[3];    // D
    const genero = datos[4];       // E
    const rangoEdad = datos[5];    // F
    const malestar = datos[6];     // G
    const derivadoPor = datos[7];  // H
    const contacto = datos[8];     // I

    if (!nombre || nombre.toString().trim() === "") {
      Logger.log("❌ No hay nombre de participante");
      return false;
    }

    const nombreLimpio = nombre.toString().trim();

    Logger.log("📋 Moviendo de lista de espera: " + nombreLimpio);

    // Verificar si ya existe en Nuevos Ingresos
    const datosNuevos = nuevosIngresos.getDataRange().getValues();
    for (let i = 1; i < datosNuevos.length; i++) {
      if (datosNuevos[i][2] && datosNuevos[i][2].toString().trim() === nombreLimpio) {
        Logger.log("⚠️ Ya existe en Nuevos Ingresos");
        ss.toast(nombreLimpio + " ya existe en Nuevos Ingresos", "Ya Registrado", 3);

        // Marcar como procesado en Lista de Espera
        sheetOrigen.getRange(fila, 1, 1, 12).setBackground("#d4edda");

        return true;
      }
    }

    // Encontrar primera fila vacía en Nuevos Ingresos
    let nuevaFila = nuevosIngresos.getLastRow() + 1;

    // Buscar desde fila 2 por si hay filas intermedias vacías
    for (let i = 2; i <= nuevosIngresos.getLastRow() + 1; i++) {
      const nombreExistente = nuevosIngresos.getRange(i, 3).getValue();
      if (!nombreExistente || nombreExistente.toString().trim() === "") {
        nuevaFila = i;
        break;
      }
    }

    // Insertar en Nuevos Ingresos (11 columnas)
    nuevosIngresos.getRange(nuevaFila, 3).setValue(nombreLimpio);           // C
    nuevosIngresos.getRange(nuevaFila, 4).setValue(creemosId || "");        // D
    nuevosIngresos.getRange(nuevaFila, 5).setValue(genero || "");           // E
    nuevosIngresos.getRange(nuevaFila, 6).setValue(rangoEdad || "");        // F
    nuevosIngresos.getRange(nuevaFila, 7).setValue(malestar || "");         // G
    nuevosIngresos.getRange(nuevaFila, 8).setValue("Individual");           // H - Tipo Atención (default)
    nuevosIngresos.getRange(nuevaFila, 9).setValue(derivadoPor || "");      // I
    nuevosIngresos.getRange(nuevaFila, 10).setValue(contacto || "");        // J

    // Marcar fila en Lista de Espera como procesada (verde)
    sheetOrigen.getRange(fila, 1, 1, 12).setBackground("#d4edda");

    // Mensaje de confirmación
    ss.toast(
      "✅ ENVIADO DESDE LISTA DE ESPERA\n\n" +
      "👤 " + nombreLimpio + "\n" +
      "📋 Movido a 'Nuevos Ingresos'\n" +
      "👩‍⚕️ Siguiente: Asignar terapeuta (col K)",
      "Envío Completo",
      5
    );

    Logger.log("✅ Movido de lista de espera: " + nombreLimpio + " → Nuevos Ingresos (fila " + nuevaFila + ")");

    return true;

  } catch (error) {
    Logger.log("❌ Error en procesarEnvioListaEspera: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error: " + error.toString(),
      "Error en Envío",
      5
    );
    return false;
  }
}

// =========================================================================
// PROCESAMIENTO DE FINALIZACIONES
// =========================================================================

function procesarFinalizacionConPrompt(sheetOrigen, fila) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ui = SpreadsheetApp.getUi();

    // Validar parámetros
    if (!sheetOrigen || typeof sheetOrigen.getRange !== 'function') {
      Logger.log("❌ ERROR: sheetOrigen no es válido");
      ss.toast("Error: Parámetro inválido en procesarFinalizacionConPrompt", "Error", 3);
      return false;
    }

    if (!fila || fila < 2) {
      Logger.log("❌ ERROR: fila inválida: " + fila);
      return false;
    }

    // Obtener datos del caso (estructura de 10 columnas)
    const datos = sheetOrigen.getRange(fila, 1, 1, 10).getValues()[0];
    const terapeuta = datos[0];        // A
    const participante = datos[2];     // C
    const creemosId = datos[3];        // D
    const genero = datos[4];           // E
    const tipoTerapia = datos[5];      // F
    const numSesion = datos[6];        // G
    const fechaInicio = datos[8];      // I

    if (!participante || participante.toString().trim() === "") {
      ui.alert("Error", "No hay nombre de participante en esta fila.", ui.ButtonSet.OK);
      return false;
    }

    const nombreLimpio = participante.toString().trim();

    // PASO 1: Preguntar tipo de finalización
    const tipoResponse = ui.prompt(
      "🏁 FINALIZAR CASO",
      "Seleccione el tipo de finalización:\n\n" +
      "1 - Proceso culminado\n" +
      "2 - Deserción\n" +
      "3 - Gestión de casos\n\n" +
      "Ingrese el número (1, 2 o 3):",
      ui.ButtonSet.OK_CANCEL
    );

    if (tipoResponse.getSelectedButton() !== ui.Button.OK) {
      // Usuario canceló, revertir estado
      sheetOrigen.getRange(fila, 8).setValue("En proceso");
      return false;
    }

    const tipoNumero = tipoResponse.getResponseText().trim();
    let tipoFinalizacion = "";

    if (tipoNumero === "1") {
      tipoFinalizacion = "Proceso culminado";
    } else if (tipoNumero === "2") {
      tipoFinalizacion = "Deserción";
    } else if (tipoNumero === "3") {
      tipoFinalizacion = "Gestión de casos";
    } else {
      ui.alert("Error", "Opción no válida. Debe ingresar 1, 2 o 3.", ui.ButtonSet.OK);
      sheetOrigen.getRange(fila, 8).setValue("En proceso");
      return false;
    }

    // PASO 2: Preguntar motivo detallado
    const motivoResponse = ui.prompt(
      "📝 MOTIVO DE FINALIZACIÓN",
      "Participante: " + nombreLimpio + "\n" +
      "Tipo: " + tipoFinalizacion + "\n\n" +
      "Ingrese el motivo detallado de la finalización:",
      ui.ButtonSet.OK_CANCEL
    );

    if (motivoResponse.getSelectedButton() !== ui.Button.OK) {
      // Usuario canceló, revertir estado
      sheetOrigen.getRange(fila, 8).setValue("En proceso");
      return false;
    }

    const motivo = motivoResponse.getResponseText().trim();

    if (!motivo || motivo === "") {
      ui.alert("Error", "Debe ingresar un motivo para finalizar el caso.", ui.ButtonSet.OK);
      sheetOrigen.getRange(fila, 8).setValue("En proceso");
      return false;
    }

    // PASO 3: Actualizar motivo en la fila
    sheetOrigen.getRange(fila, 10).setValue(motivo); // Columna J

    // PASO 4: Calcular duración
    const fechaFin = new Date();
    const fechaInicioDate = new Date(fechaInicio);
    const duracionDias = Math.round((fechaFin - fechaInicioDate) / (1000 * 60 * 60 * 24));

    // PASO 5: Enviar email al director
    const emailEnviado = enviarEmailFinalizacion(
      nombreLimpio,
      terapeuta,
      tipoFinalizacion,
      motivo,
      numSesion,
      duracionDias
    );

    // PASO 6: COPIAR (no mover) a hoja correspondiente
    let copiaExitosa = false;

    if (tipoFinalizacion === "Proceso culminado") {
      copiaExitosa = enviarAProcesosCulminados(
        nombreLimpio, terapeuta, creemosId, numSesion, duracionDias, motivo
      );
    } else if (tipoFinalizacion === "Deserción") {
      copiaExitosa = enviarADeserciones(
        nombreLimpio, terapeuta, creemosId, numSesion, motivo, duracionDias
      );
    } else if (tipoFinalizacion === "Gestión de casos") {
      copiaExitosa = enviarAGestionCasos(
        nombreLimpio, terapeuta, creemosId, motivo, tipoTerapia, numSesion
      );
    }

    if (copiaExitosa) {
      // Cambiar color según estado (mantener en Asignaciones)
      const colores = {
        "Proceso culminado": "#d4edda",
        "Deserción": "#f8d7da",
        "Gestión de casos": "#fff3cd"
      };

      sheetOrigen.getRange(fila, 1, 1, 10).setBackground(colores[tipoFinalizacion]);

      // Notificación
      ss.toast(
        "✅ FINALIZACIÓN EXITOSA\n\n" +
        "👤 " + nombreLimpio + "\n" +
        "📊 " + tipoFinalizacion + "\n" +
        "🔢 Sesiones: " + numSesion + "\n" +
        "📅 Duración: " + duracionDias + " días\n" +
        (emailEnviado ? "✉️ Email enviado al director" : "⚠️ Email no enviado"),
        "Caso Finalizado",
        6
      );

      Logger.log("✅ Finalización completa: " + nombreLimpio + " → " + tipoFinalizacion);

      return true;
    } else {
      ui.alert("Error", "No se pudo copiar el registro a la hoja final.", ui.ButtonSet.OK);
      return false;
    }

  } catch (error) {
    Logger.log("❌ Error en procesarFinalizacionConPrompt: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().getUi().alert(
      "Error",
      "Error en finalización: " + error.toString(),
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    return false;
  }
}

function enviarEmailFinalizacion(participante, terapeuta, tipo, motivo, sesiones, duracion) {
  try {
    // ⚠️ CAMBIAR POR EL EMAIL REAL DEL DIRECTOR
    const emailDirector = "director@apoyoemocional.org";

    const asunto = "🏁 Finalización de Caso - " + participante;

    const cuerpo =
      "Se ha finalizado un caso en el sistema de Apoyo Emocional.\n\n" +
      "═══════════════════════════════════════\n" +
      "INFORMACIÓN DEL CASO\n" +
      "═══════════════════════════════════════\n\n" +
      "👤 Participante: " + participante + "\n" +
      "👩‍⚕️ Terapeuta: " + terapeuta + "\n" +
      "📊 Tipo de finalización: " + tipo + "\n" +
      "🔢 Sesiones realizadas: " + sesiones + "\n" +
      "📅 Duración: " + duracion + " días\n\n" +
      "═══════════════════════════════════════\n" +
      "MOTIVO DE FINALIZACIÓN\n" +
      "═══════════════════════════════════════\n\n" +
      motivo + "\n\n" +
      "═══════════════════════════════════════\n\n" +
      "Este es un mensaje automático del Sistema de Apoyo Emocional.\n" +
      "Fecha: " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm");

    MailApp.sendEmail(emailDirector, asunto, cuerpo);

    Logger.log("✅ Email enviado a: " + emailDirector);
    return true;

  } catch (error) {
    Logger.log("⚠️ Error enviando email: " + error.toString());
    return false;
  }
}

// =========================================================================
// FUNCIONES DE ENVÍO A HOJAS FINALES
// =========================================================================

function enviarAProcesosCulminados(participante, terapeuta, creemosId, sesiones, duracion, motivo) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Procesos Culminados");

    if (!sheet) {
      Logger.log("❌ Hoja 'Procesos Culminados' no encontrada");
      return false;
    }

    const nuevaFila = sheet.getLastRow() + 1;
    const hoy = new Date();

    const datos = [
      hoy,
      nuevaFila - 1,
      participante,
      terapeuta,
      creemosId || "",
      parseInt(sesiones) || 1,
      parseInt(duracion) || 0,
      motivo,
      "Objetivos terapéuticos alcanzados",
      "Alto",
      "Seguimiento opcional en 3 meses",
      "No requerido",
      Utilities.formatDate(hoy, Session.getScriptTimeZone(), "MMMM yyyy")
    ];

    sheet.getRange(nuevaFila, 1, 1, 13).setValues([datos]);

    Logger.log("✅ Enviado a Procesos Culminados: " + participante);
    return true;

  } catch (error) {
    Logger.log("❌ Error enviando a culminados: " + error.toString());
    return false;
  }
}

function enviarADeserciones(participante, terapeuta, creemosId, sesiones, motivo, duracion) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Deserciones");

    if (!sheet) {
      Logger.log("❌ Hoja 'Deserciones' no encontrada");
      return false;
    }

    const nuevaFila = sheet.getLastRow() + 1;
    const hoy = new Date();

    const datos = [
      hoy,
      nuevaFila - 1,
      participante,
      terapeuta,
      creemosId || "",
      parseInt(sesiones) || 1,
      hoy,
      motivo,
      "Múltiples intentos",
      "Pérdida de contacto"
    ];

    sheet.getRange(nuevaFila, 1, 1, 10).setValues([datos]);

    Logger.log("✅ Enviado a Deserciones: " + participante);
    return true;

  } catch (error) {
    Logger.log("❌ Error enviando a deserciones: " + error.toString());
    return false;
  }
}

function enviarAGestionCasos(participante, terapeuta, creemosId, motivo, tipoTerapia, sesiones) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Gestión de Casos");

    if (!sheet) {
      Logger.log("❌ Hoja 'Gestión de Casos' no encontrada");
      return false;
    }

    const nuevaFila = sheet.getLastRow() + 1;
    const hoy = new Date();

    const datos = [
      hoy,
      nuevaFila - 1,
      participante,
      terapeuta,
      creemosId || "",
      tipoTerapia || "Individual",
      motivo,
      "Derivación a atención especializada",
      "Servicios especializados",
      "En proceso de derivación"
    ];

    sheet.getRange(nuevaFila, 1, 1, 10).setValues([datos]);

    Logger.log("✅ Enviado a Gestión de Casos: " + participante);
    return true;

  } catch (error) {
    Logger.log("❌ Error enviando a gestión: " + error.toString());
    return false;
  }
}

// =========================================================================
// UTILIDADES Y DIAGNÓSTICO
// =========================================================================

function actualizarReportesAutomaticos() {
  // Los reportes se actualizan automáticamente con fórmulas
  SpreadsheetApp.flush();
  Logger.log("📊 Reportes actualizados");
}

function guardarReporteMensual() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const reportes = ss.getSheetByName("Reportes Mensuales");

    if (!reportes) {
      ss.toast("❌ Hoja 'Reportes Mensuales' no encontrada", "Error", 3);
      return;
    }

    // Los datos ya están en la fila 2 con fórmulas
    // Solo necesitamos actualizarlos
    SpreadsheetApp.flush();

    ss.toast(
      "✅ REPORTE MENSUAL ACTUALIZADO\n\n" +
      "Los datos del mes actual están en la fila 2.\n" +
      "Puedes copiar esta fila al final para guardar un histórico.",
      "Reporte Guardado",
      5
    );

  } catch (error) {
    Logger.log("❌ Error guardando reporte: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error: " + error.toString(),
      "Error",
      5
    );
  }
}

function diagnosticoCompletoMejorado() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    let mensaje = "🔍 DIAGNÓSTICO COMPLETO\n\n";

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

    mensaje += "📄 HOJAS:\n";
    let hojasOk = 0;
    hojasRequeridas.forEach(nombreHoja => {
      const hoja = ss.getSheetByName(nombreHoja);
      if (hoja) {
        mensaje += "✅ " + nombreHoja + "\n";
        hojasOk++;
      } else {
        mensaje += "❌ " + nombreHoja + " (FALTA)\n";
      }
    });
    mensaje += "\n";

    // 2. Verificar triggers
    const triggers = ScriptApp.getProjectTriggers();
    mensaje += "⚡ TRIGGERS: " + triggers.length + "\n";
    if (triggers.length === 0) {
      mensaje += "⚠️ NO HAY TRIGGERS ACTIVOS\n";
    } else {
      triggers.forEach(t => {
        mensaje += "✅ " + t.getHandlerFunction() + "\n";
      });
    }
    mensaje += "\n";

    // 3. Resumen
    mensaje += "📊 RESUMEN:\n";
    mensaje += "Hojas: " + hojasOk + "/" + hojasRequeridas.length + "\n";
    mensaje += "Triggers: " + triggers.length + "\n\n";

    if (hojasOk === hojasRequeridas.length && triggers.length > 0) {
      mensaje += "✅ SISTEMA OPERATIVO";
    } else {
      mensaje += "⚠️ REQUIERE ATENCIÓN";
    }

    Logger.log(mensaje);
    ss.toast(mensaje, "Diagnóstico", -1);

  } catch (error) {
    Logger.log("❌ Error en diagnóstico: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error: " + error.toString(),
      "Error",
      5
    );
  }
}

// =========================================================================
// ASISTENCIA GRUPAL (FUNCIONES ADICIONALES)
// =========================================================================

function importarAsistenciaGrupalDesdeOtroArchivo() {
  const ui = SpreadsheetApp.getUi();

  const response = ui.prompt(
    "📥 IMPORTAR ASISTENCIA GRUPAL",
    "Ingresa la URL del archivo de Google Sheets con la asistencia grupal:",
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() !== ui.Button.OK) {
    return;
  }

  try {
    const url = response.getResponseText().trim();

    // Extraer ID del archivo
    let fileId = "";
    if (url.includes("/d/")) {
      fileId = url.split("/d/")[1].split("/")[0];
    } else {
      fileId = url;
    }

    // Abrir archivo externo
    const archivoExterno = SpreadsheetApp.openById(fileId);
    const hojaExterna = archivoExterno.getSheets()[0];

    // Obtener datos
    const datos = hojaExterna.getDataRange().getValues();

    // Copiar a hoja local
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hojaLocal = ss.getSheetByName("Asistencia Grupal");

    if (!hojaLocal) {
      ui.alert("Error", "Hoja 'Asistencia Grupal' no encontrada", ui.ButtonSet.OK);
      return;
    }

    hojaLocal.clear();
    hojaLocal.getRange(1, 1, datos.length, datos[0].length).setValues(datos);

    ui.alert(
      "Éxito",
      "✅ Asistencia importada exitosamente\n\n" +
      "Filas importadas: " + datos.length,
      ui.ButtonSet.OK
    );

  } catch (error) {
    ui.alert(
      "Error",
      "❌ Error importando asistencia:\n\n" + error.toString(),
      ui.ButtonSet.OK
    );
  }
}

function mostrarEstadisticasAsistencia() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hoja = ss.getSheetByName("Asistencia Grupal");

    if (!hoja) {
      ss.toast("❌ Hoja 'Asistencia Grupal' no encontrada", "Error", 3);
      return;
    }

    // Calcular estadísticas
    const totalParticipantes = hoja.getRange("M1").getValue();
    const totalAsistencias = hoja.getRange("M2").getValue();
    const porcentaje = hoja.getRange("M3").getValue();

    const mensaje =
      "📊 ESTADÍSTICAS DE ASISTENCIA GRUPAL\n\n" +
      "👥 Total Participantes: " + totalParticipantes + "\n" +
      "✅ Asistencias Totales: " + totalAsistencias + "\n" +
      "📈 % Asistencia: " + porcentaje;

    ss.toast(mensaje, "Estadísticas", 10);

  } catch (error) {
    Logger.log("❌ Error mostrando estadísticas: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error: " + error.toString(),
      "Error",
      5
    );
  }
}

// =========================================================================
// FIN DEL CÓDIGO UNIFICADO
// =========================================================================
