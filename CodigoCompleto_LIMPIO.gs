/**
 * =========================================================================
 * SISTEMA DE APOYO EMOCIONAL - VERSIÓN LIMPIA Y SIMPLE
 * Versión: 3.1 LIMPIA - Sin funciones innecesarias
 * =========================================================================
 *
 * INSTRUCCIONES:
 * 1. Copiar TODO este código
 * 2. Apps Script → Pegar en archivo nuevo
 * 3. Cambiar email del director (línea 828)
 * 4. Guardar
 * 5. Ejecutar: instalarSistemaCompleto
 * 6. Crear trigger: onEditSistema (Al editar)
 *
 * =========================================================================
 */

// =========================================================================
// MENÚ
// =========================================================================

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🏥 Apoyo Emocional')
    .addItem('🚀 Instalar Sistema', 'instalarSistemaCompleto')
    .addItem('🔧 Configurar Validaciones', 'configurarValidaciones')
    .addItem('🎨 Aplicar Formatos', 'configurarFormatos')
    .addSeparator()
    .addItem('🔍 Verificar Triggers', 'verificarTriggers')
    .addToUi();
}

// =========================================================================
// TRIGGERS
// =========================================================================

function verificarTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (triggers.length === 0) {
    ss.toast(
      "⚠️ NO HAY TRIGGERS\n\n" +
      "Crear trigger manualmente:\n" +
      "1. Extensiones → Apps Script\n" +
      "2. Activadores (⏰)\n" +
      "3. + Agregar activador\n" +
      "4. Función: onEditSistema\n" +
      "5. Tipo: Al editar",
      "Sin Triggers",
      -1
    );
  } else {
    ss.toast(
      "✅ " + triggers.length + " trigger(s) activo(s)\n\n" +
      triggers[0].getHandlerFunction(),
      "Triggers OK",
      3
    );
  }
}

// =========================================================================
// INSTALACIÓN
// =========================================================================

function instalarSistemaCompleto() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Crear hojas
    crearTodasLasHojas();

    // Configurar
    configurarValidaciones();
    configurarFormatos();
    crearDatosEjemplo();

    ss.toast(
      "✅ SISTEMA INSTALADO\n\n" +
      "Ahora crea el trigger:\n" +
      "1. Extensiones → Apps Script\n" +
      "2. Activadores (⏰)\n" +
      "3. + Agregar activador\n" +
      "4. Función: onEditSistema\n" +
      "5. Tipo: Al editar",
      "Instalación Completa",
      -1
    );

    return true;

  } catch (error) {
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error: " + error.toString(),
      "Error",
      10
    );
    return false;
  }
}

function crearTodasLasHojas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Eliminar hojas existentes excepto primera
  const sheets = ss.getSheets();
  for (let i = sheets.length - 1; i > 0; i--) {
    ss.deleteSheet(sheets[i]);
  }

  sheets[0].setName("Nuevos Ingresos");

  // Crear hojas
  crearHojaListaEspera();
  crearHojaNuevosIngresos();
  crearHojaAsignaciones();
  crearHojaProcesosCulminados();
  crearHojaDeserciones();
  crearHojaGestionCasos();
  crearHojaReporte();
}

// =========================================================================
// HOJAS
// =========================================================================

function crearHojaListaEspera() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Lista de Espera", 0);
  sheet.clear();

  const headers = [
    "Fecha Solicitud", "No.", "Nombre Completo", "Creemos ID", "Género",
    "Rango Edad", "Malestar Principal", "Derivado Por", "Contacto Emergencia",
    "Teléfono", "Observaciones", "Hoja de Interés"
  ];

  sheet.getRange(1, 1, 1, 12).setValues([headers]);

  // Formato
  sheet.getRange(1, 1, 1, 12)
    .setBackground("#e91e63")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Fórmulas
  sheet.getRange("A2").setFormula('=IF(C2<>"";HOY();"")');
  sheet.getRange("B2").setFormula('=IF(C2<>"";FILA()-1;"")');
  sheet.getRange("L2").setFormula('=IF(C2<>"","No","")');
  sheet.getRange("A2:A2").copyTo(sheet.getRange("A3:A100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("B2:B2").copyTo(sheet.getRange("B3:B100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("L2:L2").copyTo(sheet.getRange("L3:L100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);

  // Anchos
  const widths = [110, 60, 200, 120, 100, 100, 250, 150, 180, 120, 200, 120];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Proteger
  sheet.getRange("A2:A100").protect().setWarningOnly(true);
  sheet.getRange("B2:B100").protect().setWarningOnly(true);
}

function crearHojaNuevosIngresos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Nuevos Ingresos");
  sheet.clear();

  const headers = [
    "Fecha Ingreso", "No.", "Nombre Completo", "Creemos ID", "Género",
    "Rango Edad", "Malestar Principal", "Tipo Atención", "Derivado Por",
    "Contacto Emergencia", "Terapeuta Asignado"
  ];

  sheet.getRange(1, 1, 1, 11).setValues([headers]);

  // Formato
  sheet.getRange(1, 1, 1, 11)
    .setBackground("#1f4788")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Anchos
  const widths = [110, 60, 200, 120, 100, 100, 250, 120, 150, 180, 150];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Fórmulas
  sheet.getRange("A2").setFormula('=IF(C2<>"";HOY();"")');
  sheet.getRange("B2").setFormula('=IF(C2<>"";FILA()-1;"")');
  sheet.getRange("A2:A2").copyTo(sheet.getRange("A3:A100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("B2:B2").copyTo(sheet.getRange("B3:B100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
}

function crearHojaAsignaciones() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Asignaciones y Terapias");

  // 9 columnas - Orden actualizado con Malestar Inicial
  const headers = [
    "Terapeuta", "Creemos ID", "Participante", "Malestar Inicial",
    "Género", "Tipo Terapia", "No. Sesión", "Estado",
    "Motivo Finalización"
  ];

  sheet.getRange(1, 1, 1, 9).setValues([headers]);

  // Formato
  sheet.getRange(1, 1, 1, 9)
    .setBackground("#2e7d32")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Anchos
  const widths = [120, 120, 200, 250, 80, 120, 80, 120, 300];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });
}

function crearHojaProcesosCulminados() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Procesos Culminados");

  const headers = [
    "Fecha", "Participante", "Terapeuta", "Creemos ID",
    "Total Sesiones", "Motivo"
  ];

  sheet.getRange(1, 1, 1, 6).setValues([headers]);

  sheet.getRange(1, 1, 1, 6)
    .setBackground("#388e3c")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  const widths = [120, 200, 120, 120, 100, 300];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });
}

function crearHojaDeserciones() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Deserciones");

  const headers = [
    "Fecha", "Participante", "Terapeuta", "Creemos ID",
    "Sesiones", "Motivo"
  ];

  sheet.getRange(1, 1, 1, 6).setValues([headers]);

  sheet.getRange(1, 1, 1, 6)
    .setBackground("#d32f2f")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  const widths = [120, 200, 120, 120, 100, 300];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });
}

function crearHojaGestionCasos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Gestión de Casos");

  const headers = [
    "Fecha", "Participante", "Terapeuta", "Creemos ID",
    "Tipo", "Motivo"
  ];

  sheet.getRange(1, 1, 1, 6).setValues([headers]);

  sheet.getRange(1, 1, 1, 6)
    .setBackground("#f57c00")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  const widths = [120, 200, 120, 120, 120, 300];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });
}

function crearHojaReporte() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Reporte");

  const data = [
    ["📊 REPORTE AUTOMÁTICO"],
    ["Última actualización:", "=AHORA()"],
    [""],
    ["👥 NUEVOS INGRESOS"],
    ["Total ingresos", '=CONTARA(\'Nuevos Ingresos\'!C:C)-1'],
    ["Pendientes asignar", '=CONTAR.SI.CONJUNTO(\'Nuevos Ingresos\'!K:K;"";\'Nuevos Ingresos\'!C:C;"<>")'],
    [""],
    ["👩‍⚕️ CASOS ACTIVOS"],
    ["Gerber", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Gerber";\'Asignaciones y Terapias\'!H:H;"En proceso")'],
    ["Melissa", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Melissa";\'Asignaciones y Terapias\'!H:H;"En proceso")'],
    ["Diana", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Diana";\'Asignaciones y Terapias\'!H:H;"En proceso")'],
    ["Karina", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Karina";\'Asignaciones y Terapias\'!H:H;"En proceso")'],
    ["Total activos", "=B9+B10+B11+B12"],
    [""],
    ["🎉 CULMINADOS"],
    ["Total", '=CONTARA(\'Procesos Culminados\'!A:A)-1'],
    [""],
    ["⚠️ DESERCIONES"],
    ["Total", '=CONTARA(Deserciones!A:A)-1'],
    [""],
    ["📋 GESTIÓN"],
    ["Total", '=CONTARA(\'Gestión de Casos\'!A:A)-1']
  ];

  sheet.getRange(1, 1, data.length, 2).setValues(data);

  sheet.getRange("A1:B1")
    .setBackground("#1f4788")
    .setFontColor("white")
    .setFontWeight("bold")
    .setFontSize(14);

  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 120);
}

// =========================================================================
// VALIDACIONES
// =========================================================================

function configurarValidaciones() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nuevos = ss.getSheetByName("Nuevos Ingresos");
  const asignaciones = ss.getSheetByName("Asignaciones y Terapias");
  const listaEspera = ss.getSheetByName("Lista de Espera");

  // Género
  const generoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Hombre", "Mujer", "Trans hombre", "No binario", "Otro"])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange("E2:E200").setDataValidation(generoRule);

  // Terapeuta - SOLO en Nuevos Ingresos
  const terapeutaRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Gerber", "Melissa", "Diana", "Karina"])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange("K2:K200").setDataValidation(terapeutaRule);

  // Tipo atención - SOLO en Nuevos Ingresos
  const tipoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Individual", "Grupal", "Familiar", "Pareja"])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange("H2:H200").setDataValidation(tipoRule);

  // Sesión (0-20) - En Asignaciones (columna G)
  const sesionNumbers = [];
  for (let i = 0; i <= 20; i++) {
    sesionNumbers.push(i.toString());
  }
  const sesionRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(sesionNumbers)
    .setAllowInvalid(false)
    .build();
  asignaciones.getRange("G2:G200").setDataValidation(sesionRule);

  // Estado - En Asignaciones (columna H)
  const estadoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["En proceso", "Finalizado"])
    .setAllowInvalid(false)
    .build();
  asignaciones.getRange("H2:H200").setDataValidation(estadoRule);

  // Hoja de Interés - Lista Espera (columna L) - No editable por fórmula
  // La validación se aplicará solo si el usuario cambia manualmente
  const hojaInteresRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["No", "Sí"])
    .setAllowInvalid(false)
    .build();
  listaEspera.getRange("L2:L200").setDataValidation(hojaInteresRule);
}

function configurarFormatos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const asignaciones = ss.getSheetByName("Asignaciones y Terapias");
  const listaEspera = ss.getSheetByName("Lista de Espera");

  // Formatos para Asignaciones - columna H (Estado)
  const procesoRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("En proceso")
    .setBackground("#d1ecf1")
    .setRanges([asignaciones.getRange("H2:H200")])
    .build();

  const finalizadoRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Finalizado")
    .setBackground("#fff3cd")
    .setRanges([asignaciones.getRange("H2:H200")])
    .build();

  asignaciones.setConditionalFormatRules([procesoRule, finalizadoRule]);

  // Formatos para Lista de Espera - Hoja de Interés
  const hojaInteresSiRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Sí")
    .setBackground("#d4edda")
    .setRanges([listaEspera.getRange("L2:L200")])
    .build();

  const hojaInteresNoRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("No")
    .setBackground("#f8d7da")
    .setRanges([listaEspera.getRange("L2:L200")])
    .build();

  listaEspera.setConditionalFormatRules([hojaInteresSiRule, hojaInteresNoRule]);
}

function crearDatosEjemplo() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nuevos = ss.getSheetByName("Nuevos Ingresos");

  const ejemplos = [
    ["María González", "MG001", "Mujer", "26 a 30", "Ansiedad", "Individual", "Centro Salud", "Juan Pérez - 12345678"],
    ["Carlos López", "CL002", "Hombre", "31 a 40", "Depresión", "Individual", "Derivación", "Ana López - 87654321"],
    ["Ana Morales", "AM003", "No binario", "16 a 25", "Violencia", "Individual", "Servicios sociales", "María Morales - 11223344"]
  ];

  nuevos.getRange(2, 3, ejemplos.length, 8).setValues(ejemplos);
}

// =========================================================================
// TRIGGER PRINCIPAL
// =========================================================================

function onEditSistema(e) {
  try {
    if (!e || !e.range) return;

    const sheet = e.range.getSheet();
    if (!sheet || typeof sheet.getName !== 'function') return;

    const fila = e.range.getRow();
    const columna = e.range.getColumn();
    const valor = e.range.getValue();

    if (fila <= 1) return;
    if (!valor || valor.toString().trim() === "") return;

    const valorLimpio = valor.toString().trim();
    const nombreHoja = sheet.getName();

    // AUTOMATIZACIÓN 1: Cuando marcan "Sí" en Hoja de Interés (columna 12)
    if (nombreHoja === "Lista de Espera" && columna === 12) {
      if (valorLimpio === "Sí") {
        procesarEnvioListaEspera(sheet, fila);
      }
    }

    // AUTOMATIZACIÓN 2: Asignar Terapeuta (columna 11)
    if (nombreHoja === "Nuevos Ingresos" && columna === 11) {
      const terapeutas = ["Gerber", "Melissa", "Diana", "Karina"];
      if (terapeutas.indexOf(valorLimpio) !== -1) {
        procesarAsignacion(sheet, fila, valorLimpio);
      }
    }

    // AUTOMATIZACIÓN 3: Finalizar (columna 8 - Estado)
    if (nombreHoja === "Asignaciones y Terapias" && columna === 8) {
      if (valorLimpio === "Finalizado") {
        procesarFinalizacion(sheet, fila);
      }
    }

  } catch (error) {
    Logger.log("Error: " + error.toString());
  }
}

// =========================================================================
// PROCESAMIENTO
// =========================================================================

function procesarEnvioListaEspera(sheetOrigen, fila) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (!sheetOrigen || typeof sheetOrigen.getRange !== 'function') return false;
    if (!fila || fila < 2) return false;

    const nuevosIngresos = ss.getSheetByName("Nuevos Ingresos");
    if (!nuevosIngresos) return false;

    // Obtener datos (columnas C-K de Lista Espera)
    const datos = sheetOrigen.getRange(fila, 1, 1, 12).getValues()[0];
    const nombre = datos[2];       // C
    const creemosId = datos[3];    // D
    const genero = datos[4];       // E
    const rangoEdad = datos[5];    // F
    const malestar = datos[6];     // G
    const derivadoPor = datos[7];  // H
    const contacto = datos[8];     // I

    if (!nombre || nombre.toString().trim() === "") return false;

    const nombreLimpio = nombre.toString().trim();

    // Verificar duplicado
    const datosNuevos = nuevosIngresos.getDataRange().getValues();
    for (let i = 1; i < datosNuevos.length; i++) {
      if (datosNuevos[i][2] && datosNuevos[i][2].toString().trim() === nombreLimpio) {
        sheetOrigen.getRange(fila, 1, 1, 12).setBackground("#d4edda");
        ss.toast(nombreLimpio + " ya existe", "Ya Registrado", 2);
        return true;
      }
    }

    // Insertar en Nuevos Ingresos
    const nuevaFila = nuevosIngresos.getLastRow() + 1;

    nuevosIngresos.getRange(nuevaFila, 3).setValue(nombreLimpio);
    nuevosIngresos.getRange(nuevaFila, 4).setValue(creemosId || "");
    nuevosIngresos.getRange(nuevaFila, 5).setValue(genero || "");
    nuevosIngresos.getRange(nuevaFila, 6).setValue(rangoEdad || "");
    nuevosIngresos.getRange(nuevaFila, 7).setValue(malestar || "");
    nuevosIngresos.getRange(nuevaFila, 8).setValue("Individual");
    nuevosIngresos.getRange(nuevaFila, 9).setValue(derivadoPor || "");
    nuevosIngresos.getRange(nuevaFila, 10).setValue(contacto || "");

    sheetOrigen.getRange(fila, 1, 1, 12).setBackground("#d4edda");

    ss.toast("✅ " + nombreLimpio + "\nMovido a Nuevos Ingresos", "Enviado", 3);

    return true;

  } catch (error) {
    Logger.log("Error envío: " + error.toString());
    return false;
  }
}

function procesarAsignacion(sheetOrigen, fila, terapeuta) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (!sheetOrigen || typeof sheetOrigen.getRange !== 'function') return false;
    if (!fila || fila < 2) return false;

    const asignaciones = ss.getSheetByName("Asignaciones y Terapias");
    if (!asignaciones) return false;

    // Obtener datos de Nuevos Ingresos
    const datos = sheetOrigen.getRange(fila, 1, 1, 11).getValues()[0];
    const nombre = datos[2];          // C
    const creemosId = datos[3];       // D
    const genero = datos[4];          // E
    const malestar = datos[6];        // G - Malestar Principal
    const tipoAtencion = datos[7];    // H

    if (!nombre || nombre.toString().trim() === "") return false;

    const nombreLimpio = nombre.toString().trim();

    // Verificar duplicado - ahora Participante está en columna C (índice 2)
    const datosAsignaciones = asignaciones.getDataRange().getValues();
    for (let i = 1; i < datosAsignaciones.length; i++) {
      if (datosAsignaciones[i][2] && datosAsignaciones[i][2].toString().trim() === nombreLimpio) {
        sheetOrigen.getRange(fila, 1, 1, 11).setBackground("#d4edda");
        ss.toast(nombreLimpio + " ya asignado", "Ya Procesado", 2);
        return true;
      }
    }

    // Crear asignación (9 columnas con nuevo orden)
    const nuevaFila = asignaciones.getLastRow() + 1;

    const nuevaAsignacion = [
      terapeuta,                    // A - Terapeuta
      creemosId || "",              // B - Creemos ID
      nombreLimpio,                 // C - Participante
      malestar || "",               // D - Malestar Inicial
      genero || "",                 // E - Género
      tipoAtencion || "Individual", // F - Tipo Terapia
      "1",                          // G - No. Sesión
      "En proceso",                 // H - Estado
      ""                            // I - Motivo (vacío)
    ];

    asignaciones.getRange(nuevaFila, 1, 1, 9).setValues([nuevaAsignacion]);

    sheetOrigen.getRange(fila, 1, 1, 11).setBackground("#d4edda");

    ss.toast("✅ " + nombreLimpio + "\n→ " + terapeuta, "Asignado", 3);

    return true;

  } catch (error) {
    Logger.log("Error asignación: " + error.toString());
    return false;
  }
}

function procesarFinalizacion(sheetOrigen, fila) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ui = SpreadsheetApp.getUi();

    if (!sheetOrigen || typeof sheetOrigen.getRange !== 'function') return false;
    if (!fila || fila < 2) return false;

    // Obtener datos (9 columnas con nuevo orden)
    const datos = sheetOrigen.getRange(fila, 1, 1, 9).getValues()[0];
    const terapeuta = datos[0];      // A - Terapeuta
    const creemosId = datos[1];      // B - Creemos ID
    const participante = datos[2];   // C - Participante
    const malestar = datos[3];       // D - Malestar Inicial
    const genero = datos[4];         // E - Género
    const tipoTerapia = datos[5];    // F - Tipo Terapia
    const numSesion = datos[6];      // G - No. Sesión

    if (!participante || participante.toString().trim() === "") return false;

    const nombreLimpio = participante.toString().trim();

    // Preguntar tipo
    const tipoResponse = ui.prompt(
      "Tipo de finalización:",
      "1 = Proceso culminado\n2 = Deserción\n3 = Gestión de casos\n\nIngrese 1, 2 o 3:",
      ui.ButtonSet.OK_CANCEL
    );

    if (tipoResponse.getSelectedButton() !== ui.Button.OK) {
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
      ui.alert("Debe ingresar 1, 2 o 3");
      sheetOrigen.getRange(fila, 8).setValue("En proceso");
      return false;
    }

    // Preguntar motivo
    const motivoResponse = ui.prompt(
      "Motivo de finalización:",
      "Participante: " + nombreLimpio + "\nTipo: " + tipoFinalizacion + "\n\nIngrese el motivo:",
      ui.ButtonSet.OK_CANCEL
    );

    if (motivoResponse.getSelectedButton() !== ui.Button.OK) {
      sheetOrigen.getRange(fila, 8).setValue("En proceso");
      return false;
    }

    const motivo = motivoResponse.getResponseText().trim();

    if (!motivo || motivo === "") {
      ui.alert("Debe ingresar un motivo");
      sheetOrigen.getRange(fila, 8).setValue("En proceso");
      return false;
    }

    // Actualizar motivo
    sheetOrigen.getRange(fila, 9).setValue(motivo);

    // Enviar email
    enviarEmail(nombreLimpio, terapeuta, tipoFinalizacion, motivo, numSesion);

    // Copiar a hoja correspondiente
    let copiaExitosa = false;

    if (tipoFinalizacion === "Proceso culminado") {
      copiaExitosa = copiarACulminados(nombreLimpio, terapeuta, creemosId, numSesion, motivo);
    } else if (tipoFinalizacion === "Deserción") {
      copiaExitosa = copiarADeserciones(nombreLimpio, terapeuta, creemosId, numSesion, motivo);
    } else if (tipoFinalizacion === "Gestión de casos") {
      copiaExitosa = copiarAGestion(nombreLimpio, terapeuta, creemosId, tipoTerapia, motivo);
    }

    if (copiaExitosa) {
      // Color según tipo
      const colores = {
        "Proceso culminado": "#d4edda",
        "Deserción": "#f8d7da",
        "Gestión de casos": "#fff3cd"
      };

      sheetOrigen.getRange(fila, 1, 1, 9).setBackground(colores[tipoFinalizacion]);

      ss.toast(
        "✅ " + nombreLimpio + "\n" + tipoFinalizacion + "\nSesiones: " + numSesion,
        "Finalizado",
        4
      );

      return true;
    }

    return false;

  } catch (error) {
    Logger.log("Error finalización: " + error.toString());
    return false;
  }
}

function enviarEmail(participante, terapeuta, tipo, motivo, sesiones) {
  try {
    // ⚠️ CAMBIAR EMAIL DEL DIRECTOR AQUÍ
    const emailDirector = "director@apoyoemocional.org";

    const asunto = "Finalización: " + participante;

    const cuerpo =
      "CASO FINALIZADO\n\n" +
      "Participante: " + participante + "\n" +
      "Terapeuta: " + terapeuta + "\n" +
      "Tipo: " + tipo + "\n" +
      "Sesiones: " + sesiones + "\n\n" +
      "Motivo:\n" + motivo + "\n\n" +
      "Fecha: " + new Date().toLocaleDateString();

    MailApp.sendEmail(emailDirector, asunto, cuerpo);

    return true;

  } catch (error) {
    Logger.log("Error email: " + error.toString());
    return false;
  }
}

function copiarACulminados(participante, terapeuta, creemosId, sesiones, motivo) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Procesos Culminados");
    if (!sheet) return false;

    const nuevaFila = sheet.getLastRow() + 1;
    const datos = [
      new Date(),
      participante,
      terapeuta,
      creemosId || "",
      parseInt(sesiones) || 1,
      motivo
    ];

    sheet.getRange(nuevaFila, 1, 1, 6).setValues([datos]);
    return true;

  } catch (error) {
    Logger.log("Error culminados: " + error.toString());
    return false;
  }
}

function copiarADeserciones(participante, terapeuta, creemosId, sesiones, motivo) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Deserciones");
    if (!sheet) return false;

    const nuevaFila = sheet.getLastRow() + 1;
    const datos = [
      new Date(),
      participante,
      terapeuta,
      creemosId || "",
      parseInt(sesiones) || 1,
      motivo
    ];

    sheet.getRange(nuevaFila, 1, 1, 6).setValues([datos]);
    return true;

  } catch (error) {
    Logger.log("Error deserciones: " + error.toString());
    return false;
  }
}

function copiarAGestion(participante, terapeuta, creemosId, tipo, motivo) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Gestión de Casos");
    if (!sheet) return false;

    const nuevaFila = sheet.getLastRow() + 1;
    const datos = [
      new Date(),
      participante,
      terapeuta,
      creemosId || "",
      tipo || "Individual",
      motivo
    ];

    sheet.getRange(nuevaFila, 1, 1, 6).setValues([datos]);
    return true;

  } catch (error) {
    Logger.log("Error gestión: " + error.toString());
    return false;
  }
}
