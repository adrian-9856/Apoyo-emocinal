/**
 * =========================================================================
 * SISTEMA DE APOYO EMOCIONAL - VERSIÓN CORREGIDA Y FUNCIONAL
 * Por Adrian Torres - Manufacturing Operations
 * Versión: 2.0 - Corregida y Optimizada
 * =========================================================================
 */

// =========================================================================
// INSTALACIÓN PRINCIPAL
// =========================================================================

/**
 * Instalación completa del sistema
 * Esta función instala todo el sistema desde cero
 */
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

/**
 * Crear todas las hojas del sistema
 */
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

/**
 * Crear hoja Nuevos Ingresos
 */
function crearHojaNuevosIngresosMejorada() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Nuevos Ingresos");

  sheet.clear();

  // Encabezados
  const headers = [
    "Fecha Ingreso", "No.", "Nombre Completo", "Creemos ID", "Sexo",
    "Rango Edad", "Malestar Principal", "Terapeuta Asignado",
    "Tipo Atención", "Derivado Por", "Contacto Emergencia", "Estado Ingreso"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formato encabezados
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#1f4788")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Ajustar anchos
  const widths = [110, 60, 200, 120, 80, 100, 250, 150, 120, 150, 180, 120];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Fórmulas automáticas (fila 2)
  sheet.getRange("A2").setFormula('=IF(C2<>"";HOY();"")');
  sheet.getRange("B2").setFormula('=IF(C2<>"";FILA()-1;"")');
  sheet.getRange("L2").setFormula('=IF(H2<>"";"Asignado";"Pendiente")');

  // Copiar fórmulas hacia abajo (100 filas)
  sheet.getRange("A2:A2").copyTo(sheet.getRange("A3:A100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("B2:B2").copyTo(sheet.getRange("B3:B100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("L2:L2").copyTo(sheet.getRange("L3:L100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);

  // Instrucciones
  sheet.getRange("N1").setValue("🎯 INSTRUCCIONES");
  sheet.getRange("N2").setValue("═".repeat(20));
  sheet.getRange("N3").setValue("1. Llenar datos del participante");
  sheet.getRange("N4").setValue("2. ASIGNAR TERAPEUTA (col H)");
  sheet.getRange("N5").setValue("3. → Envío AUTOMÁTICO");
  sheet.getRange("N6").setValue("");
  sheet.getRange("N7").setValue("TERAPEUTAS:");
  sheet.getRange("N8").setValue("• Gerber");
  sheet.getRange("N9").setValue("• Melissa");
  sheet.getRange("N10").setValue("• Diana");
  sheet.getRange("N11").setValue("• Karina");
  sheet.getRange("N1:N11").setBackground("#e8f5e8").setFontWeight("bold");
}

/**
 * Crear hoja Asignaciones y Terapias
 */
function crearHojaAsignacionesMejorada() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Asignaciones y Terapias");

  const headers = [
    "Terapeuta", "No.", "Participante", "Creemos ID", "Sexo",
    "Tipo Terapia", "No. Sesión Actual", "Fecha Última Sesión", "Próxima Sesión",
    "Asistencia Última", "Comentarios Sesión", "Estado Proceso",
    "Fecha Inicio", "Fecha Finalización", "Motivo Finalización", "Total Sesiones"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formato encabezados
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#2e7d32")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Ajustar anchos
  const widths = [120, 60, 180, 120, 80, 120, 100, 120, 120, 120, 200, 150, 100, 120, 200, 100];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Fórmulas para fila 2
  sheet.getRange("B2").setFormula('=IF(A2<>"";FILA()-1;"")');
  sheet.getRange("F2").setFormula('=IF(A2<>"";"Individual";"")');
  sheet.getRange("G2").setFormula('=IF(A2<>"";1;"")');
  sheet.getRange("L2").setFormula('=IF(A2<>"";"En proceso";"")');
  sheet.getRange("M2").setFormula('=IF(A2<>"";HOY();"")');
  sheet.getRange("P2").setFormula('=IF(G2<>"";G2;0)');

  // Copiar fórmulas
  sheet.getRange("B2:B2").copyTo(sheet.getRange("B3:B200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("F2:F2").copyTo(sheet.getRange("F3:F200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("G2:G2").copyTo(sheet.getRange("G3:G200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("L2:L2").copyTo(sheet.getRange("L3:L200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("M2:M2").copyTo(sheet.getRange("M3:M200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("P2:P2").copyTo(sheet.getRange("P3:P200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);

  // Instrucciones
  sheet.getRange("R1").setValue("⚡ AUTOMATIZACIÓN");
  sheet.getRange("R2").setValue("═".repeat(20));
  sheet.getRange("R3").setValue("COLUMNAS CLAVE:");
  sheet.getRange("R4").setValue("G. No. Sesión");
  sheet.getRange("R5").setValue("J. Asistencia");
  sheet.getRange("R6").setValue("K. Comentarios");
  sheet.getRange("R7").setValue("L. ESTADO:");
  sheet.getRange("R8").setValue("  • En proceso");
  sheet.getRange("R9").setValue("  • Proceso culminado");
  sheet.getRange("R10").setValue("  • Deserción");
  sheet.getRange("R11").setValue("  • Gestión de casos");
  sheet.getRange("R1:R11").setBackground("#fff3e0").setFontWeight("bold");
}

/**
 * Crear hoja Procesos Culminados
 */
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

/**
 * Crear hoja Deserciones
 */
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

/**
 * Crear hoja Gestión de Casos
 */
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

/**
 * Crear hoja Asistencia Grupal
 */
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

    const col = String.fromCharCode(67 + (7 - i)); // C, D, E, F, G, H, I, J
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

/**
 * Crear hoja Reporte Completo
 */
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
    ["Pendientes asignar", '=CONTAR.SI.CONJUNTO(\'Nuevos Ingresos\'!H:H;"";\'Nuevos Ingresos\'!C:C;"<>")'],
    ["Ya asignados", '=CONTAR.SI(\'Nuevos Ingresos\'!L:L;"Asignado")'],
    ["", ""],
    ["👩‍⚕️ CASOS ACTIVOS POR TERAPEUTA", ""],
    ["Gerber - Casos activos", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Gerber";\'Asignaciones y Terapias\'!L:L;"En proceso")'],
    ["Melissa - Casos activos", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Melissa";\'Asignaciones y Terapias\'!L:L;"En proceso")'],
    ["Diana - Casos activos", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Diana";\'Asignaciones y Terapias\'!L:L;"En proceso")'],
    ["Karina - Casos activos", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Karina";\'Asignaciones y Terapias\'!L:L;"En proceso")'],
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

/**
 * Crear hoja Reportes Mensuales
 */
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
    '=CONTAR.SI(\'Asignaciones y Terapias\'!L:L;"En proceso")',
    '=SI((C2+D2)>0;C2/(C2+D2)*100;0)',
    '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Gerber";\'Asignaciones y Terapias\'!L:L;"En proceso")',
    '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Melissa";\'Asignaciones y Terapias\'!L:L;"En proceso")',
    '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Diana";\'Asignaciones y Terapias\'!L:L;"En proceso")',
    '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Karina";\'Asignaciones y Terapias\'!L:L;"En proceso")',
    '=SUMAPRODUCTO(\'Asistencia Grupal\'!C2:J6)',
    '=SI(CONTARA(\'Asistencia Grupal\'!A2:A)>0;L2/(CONTARA(\'Asistencia Grupal\'!A2:A)*8)*100;0)',
    '=HOY()'
  ];

  sheet.getRange(2, 1, 1, formulas.length).setFormulas([formulas]);
}

// =========================================================================
// CONFIGURACIONES
// =========================================================================

/**
 * Configurar validaciones de datos
 */
function configurarValidacionesMejoradas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nuevos = ss.getSheetByName("Nuevos Ingresos");
  const asignaciones = ss.getSheetByName("Asignaciones y Terapias");

  // Sexo
  const sexoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Hombre", "Mujer", "Otro"])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange("E2:E200").setDataValidation(sexoRule);
  asignaciones.getRange("E2:E200").setDataValidation(sexoRule);

  // Edad
  const edadRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["16 a 25", "26 a 30", "31 a 40", "41 a 50", "51 a 60", "60+"])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange("F2:F200").setDataValidation(edadRule);

  // Malestar
  const malestarRule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "Sintomatología depresiva",
      "Sintomatología de ansiedad",
      "Sintomatología de TEA o TEPT",
      "Violencia de género",
      "Dificultad en las relaciones interpersonales",
      "Dinámica familiar disfuncional",
      "Requerimiento legal",
      "Duelo y pérdidas",
      "Trastornos alimentarios",
      "Adicciones",
      "Otros"
    ])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange("G2:G200").setDataValidation(malestarRule);

  // Terapeuta
  const terapeutaRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Gerber", "Melissa", "Diana", "Karina"])
    .setAllowInvalid(false)
    .setHelpText("Al seleccionar se enviará automáticamente a Asignaciones")
    .build();
  nuevos.getRange("H2:H200").setDataValidation(terapeutaRule);
  asignaciones.getRange("A2:A200").setDataValidation(terapeutaRule);

  // Tipo atención
  const tipoAtencionRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Individual", "Grupal", "Familiar", "Pareja"])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange("I2:I200").setDataValidation(tipoAtencionRule);
  asignaciones.getRange("F2:F200").setDataValidation(tipoAtencionRule);

  // Asistencia
  const asistenciaRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Asistió", "Faltó", "Falta justificada", "Cancelada", "Reprogramada"])
    .setAllowInvalid(false)
    .build();
  asignaciones.getRange("J2:J200").setDataValidation(asistenciaRule);

  // Estado proceso
  const estadoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "En proceso",
      "Proceso culminado",
      "Deserción",
      "Gestión de casos"
    ])
    .setAllowInvalid(false)
    .setHelpText("Al cambiar estado se procesa automáticamente")
    .build();
  asignaciones.getRange("L2:L200").setDataValidation(estadoRule);
}

/**
 * Configurar formato condicional
 */
function configurarFormatosMejorados() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Nuevos Ingresos - Estados
  const nuevos = ss.getSheetByName("Nuevos Ingresos");

  const asignadoRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Asignado")
    .setBackground("#d4edda")
    .setRanges([nuevos.getRange("L2:L200")])
    .build();

  const pendienteRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Pendiente")
    .setBackground("#f8d7da")
    .setRanges([nuevos.getRange("L2:L200")])
    .build();

  nuevos.setConditionalFormatRules([asignadoRule, pendienteRule]);

  // Asignaciones - Asistencia y Estados
  const asignaciones = ss.getSheetByName("Asignaciones y Terapias");

  const asistioRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Asistió")
    .setBackground("#d4edda")
    .setRanges([asignaciones.getRange("J2:J200")])
    .build();

  const faltoRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Faltó")
    .setBackground("#f8d7da")
    .setRanges([asignaciones.getRange("J2:J200")])
    .build();

  const procesoRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("En proceso")
    .setBackground("#d1ecf1")
    .setRanges([asignaciones.getRange("L2:L200")])
    .build();

  const culminadoRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Proceso culminado")
    .setBackground("#d4edda")
    .setFontColor("#155724")
    .setRanges([asignaciones.getRange("L2:L200")])
    .build();

  const desercionRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Deserción")
    .setBackground("#f8d7da")
    .setFontColor("#721c24")
    .setRanges([asignaciones.getRange("L2:L200")])
    .build();

  const gestionRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Gestión de casos")
    .setBackground("#fff3cd")
    .setFontColor("#856404")
    .setRanges([asignaciones.getRange("L2:L200")])
    .build();

  asignaciones.setConditionalFormatRules([
    asistioRule, faltoRule, procesoRule, culminadoRule, desercionRule, gestionRule
  ]);
}

/**
 * Crear datos de ejemplo
 */
function crearDatosEjemploMejorados() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nuevos = ss.getSheetByName("Nuevos Ingresos");

  // Limpiar datos existentes (excepto fórmulas)
  if (nuevos.getLastRow() > 1) {
    nuevos.getRange(2, 3, nuevos.getLastRow() - 1, 10).clearContent();
  }

  const ejemplos = [
    ["María González Pérez", "MG001", "Mujer", "26 a 30", "Sintomatología de ansiedad", "", "Individual", "Centro de Salud", "Juan Pérez - 12345678"],
    ["Carlos López Morales", "CL002", "Hombre", "31 a 40", "Sintomatología depresiva", "", "Individual", "Derivación médica", "Ana López - 87654321"],
    ["Ana Morales Rivera", "AM003", "Mujer", "16 a 25", "Violencia de género", "", "Individual", "Servicios sociales", "María Morales - 11223344"],
    ["José Torres Vega", "JT004", "Hombre", "41 a 50", "Dificultad en las relaciones interpersonales", "", "Pareja", "Consulta voluntaria", "Carmen Torres - 44332211"],
    ["Sofia Ramírez Castro", "SR005", "Mujer", "26 a 30", "Sintomatología de TEA o TEPT", "", "Individual", "Hospital público", "Luis Ramírez - 55667788"]
  ];

  // Insertar datos (columnas C a K)
  nuevos.getRange(2, 3, ejemplos.length, 9).setValues(ejemplos);

  SpreadsheetApp.flush();

  ss.toast(
    "✅ DATOS DE EJEMPLO CREADOS\n\n" +
    "5 participantes registrados\n" +
    "Estado: Pendientes de asignar\n\n" +
    "Siguiente paso:\n" +
    "Asigna un terapeuta en columna H",
    "Datos Listos",
    6
  );
}

// Continúa en siguiente mensaje...
