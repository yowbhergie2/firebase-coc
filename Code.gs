// ============================
// FIREBASE CONFIGURATION
// ============================

const FIRESTORE_PROJECT_ID = 'comptime-tracker-97857';
const FIRESTORE_EMAIL = 'firestore-admin@comptime-tracker-97857.iam.gserviceaccount.com';
const FIRESTORE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/Z9yW+t8TR9Va\nqOKiuafWHsXwtAW+o3cxpzejfZpIgGtAWMm7ZolxwhiBAjc2nShL6G2B/N2tOiov\nCuwA5h+5UcihV97EdmtFiryUjbwU3fVQ8Sfyl3RNZLsyyJ0Q30RXwjV0AI9v1uCQ\nOb6Dg3U4r32Y4IZDgVdc14yD+TYf3mEzzsNIzOhKQlO2wlo5h30zaGu5K2H/5RqF\nQPoKjFReFf71WaaZjoHW4dRnOOAoqkz2zun96qRpjwOGrjo+yvBihrg5CJ9c8pAf\nVqWkII1YICG4JB34HMjXLkzIctcVfSZCUMXc3c98oal/Df6yX0TyDyCoRYsoxo8U\nxaCMaVp7AgMBAAECggEAJKkXgqGFZZN+JXGwivtlTqkxP3Ozn/p+Q3fkO7+8c8OJ\nB1eaN/chPzUubVNH0QGT7MoVY27T5LB90OnWHyv0ipHEDEcgx19pF3ZFvWxSSGrk\n6D5waNIieAphoo3zK36f//EWPOQ4lPLCq00sFNNyect/Em96t+ZHneQ5KTPr7nlb\n5F+tMtiYV8ife0/UpUEjdU7JpNGNqo9PFyd8qAG5FiIHs6OqAvzCmc/0h+mKYCh3\nBIme2L3w63ZVMd1yn6/gWyzEVBbAU4q4rYkH/anARkJMlk5Ep24Mhrrx63BfhviU\n1jTZg48R67Q7s0Q8kd3O3JppBvYaZPhrGfTO9G1p2QKBgQDxpZi9pRoa2uYJnhop\nittwl+ohqj+6C+tKlsaFs9TG5hhTo4vTLkdsMe2wEq1ewnK8qMzKSlqGW/TcC9jQ\nfSirh1FeT3nWn23WNe8TBtVQNfNpgFOIy7lyP/wwXR0BSNZ1zYSCMK1JUMUMNwX+\n/97ZS1YbhCUcJ++w+b+aa0XRswKBgQDKxlCAqvkmH02e2KnSlMFYyAeQifnZ0JzP\nmyKhTFa35u8KJlite4QnUyQAHNN921hS2KgLXGGn4Uzthnc42RZc5nF0ClmommDG\n1iXnAzB2WYDHLNXa/+TFl2E/3fSqwAj2nfsA8bZPuRmDizDsZFUmNdg9vPBYwGWj\nAVvtPligGQKBgF5FKww4/7EgWoPAARbZy/fl2/ocL9ZF1hn4LiR03nplw3HFqMPP\nFx/3bnG1J5uDIj3FYHc+gIhQEXtSx9e2LAqWtMClIrP+6FucGNOEY+1xzq8G2A/S\n4lrW6Wx4ttsMblXwwlQD52ZlsymrwZQUf/ynbkU3zT5puhGBrSTx2oAPAoGAXj9w\n2W0eYq64CDXSMRN9DoPiqDbJT4kb6Y7EuM3fnJiU0FXkb7XyRcjp+bdsQZo64j7b\nVHR622nntJsEPQMB1uoxH2tUIv6mLqUIduhPlSKirXDUcXbw4TosNGA4wUiCogXp\nzZWLVGDHUBHZCnbT8O+j84Ym/ElotCwEiy+oR7kCgYEAmHXhgodnywFht3HeQ/WG\nXggb1aImYa1i0tvSL7RRRbCwNGWT5nyxaXvvR7UYgydX15xDE6sMDKwt2VhucKUt\nI95K0Bc5aX/OjMLwwuUBpLKoS5hE4kPk3m5nhRNZB1sLBzdWC5n0+urP4TgOj4nD\n/p23eqMuKHrA+ijlvuI7qBI=\n-----END PRIVATE KEY-----\n';

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBCxM58B1TRg6HBo9ZNqWtMziliX2N5YZA",
  authDomain: "comptime-tracker-97857.firebaseapp.com",
  projectId: "comptime-tracker-97857",
  storageBucket: "comptime-tracker-97857.firebasestorage.app",
  messagingSenderId: "119022135793",
  appId: "1:119022135793:web:c3f931343d01645c747c50"
};

// Certificate Template Spreadsheet
const CERTIFICATE_TEMPLATE_ID = '1yhFTgHujjncfoM8chjULiSrv_Bq7rMPKZGzM9j4lfwU';

// ============================
// JWT TOKEN CREATION
// ============================

function createJWT() {
  const now = Math.floor(Date.now() / 1000);
  const userEmail = Session.getActiveUser().getEmail();
  
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };
  
  const payload = {
    iss: FIRESTORE_EMAIL,
    sub: FIRESTORE_EMAIL,
    aud: 'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit',
    iat: now,
    exp: now + 3600,
    uid: FIRESTORE_EMAIL,
    claims: {
      email: userEmail
    }
  };
  
  const encodedHeader = Utilities.base64EncodeWebSafe(JSON.stringify(header)).replace(/=+$/, '');
  const encodedPayload = Utilities.base64EncodeWebSafe(JSON.stringify(payload)).replace(/=+$/, '');
  
  const signatureInput = encodedHeader + '.' + encodedPayload;
  
  const signature = Utilities.computeRsaSha256Signature(signatureInput, FIRESTORE_KEY);
  const encodedSignature = Utilities.base64EncodeWebSafe(signature).replace(/=+$/, '');
  
  return signatureInput + '.' + encodedSignature;
}

// ============================
// MENU & UI
// ============================

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('COC Admin')
    .addItem('Open CompTime Tracker', 'showAppModal')
    .addSeparator()
    .addItem('Sync Reports to Sheet', 'syncReportsToSheet')
    .addToUi();
}

function showAppModal() {
  // --- FIX ---
  // Was: HtmlService.createHtmlOutputFromFile('Main')
  // This just gets the raw text.
  //
  // Now: HtmlService.createTemplateFromFile('Main').evaluate()
  // This creates a template, processes all the <?!= ... ?> tags,
  // and returns the final, evaluated HTML.
  const html = HtmlService.createTemplateFromFile('Main').evaluate()
    .setWidth(1400)
    .setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(html, 'CompTime Tracker');
}

// ============================
// HTML INCLUDE HELPER
// ============================

/**
 * Include external HTML files for modular HTML structure
 * Usage in HTML: <?!= include('filename') ?>
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ============================
// CLIENT-SIDE CONFIG & TOKEN
// ============================

function getFirebaseConfigAndToken() {
  try {
    const customToken = createJWT();
    const userEmail = Session.getActiveUser().getEmail();
    
    return {
      config: FIREBASE_CONFIG,
      token: customToken,
      userEmail: userEmail
    };
  } catch (error) {
    throw new Error('Failed to create authentication token: ' + error.toString());
  }
}

// ============================
// FIRESTORE INITIALIZATION
// ============================

function getFirestore() {
  return FirestoreApp.getFirestore(FIRESTORE_EMAIL, FIRESTORE_KEY, FIRESTORE_PROJECT_ID);
}

// ============================
// SERVER-SIDE FUNCTIONS
// ============================

// ========== LOG OVERTIME FEATURE SERVER FUNCTIONS ==========

// Check if overtime can be logged (no certificate or historical balance for that month)
function checkOvertimeBlocks_SERVER(employeeId, month, year) {
  try {
    const db = getFirestore();
    const monthYearStr = `${year}-${String(month + 1).padStart(2, '0')}`;

    // Check for existing certificate for this month/year
    // Query all certificates for employee and filter by monthYear in code
    const allCertificatesQuery = db.getDocuments('certificates');

    for (let i = 0; i < allCertificatesQuery.length; i++) {
      const cert = allCertificatesQuery[i].obj;
      if (cert.employeeId === employeeId && cert.monthYear === monthYearStr) {
        return {
          success: false,
          error: 'A certificate already exists for this month. Cannot log overtime.'
        };
      }
    }

    // Check for historical balance for this month/year
    // Query all creditBatches for employee and filter in code
    const allBatchesQuery = db.getDocuments('creditBatches');

    for (let i = 0; i < allBatchesQuery.length; i++) {
      const batch = allBatchesQuery[i].obj;
      if (batch.employeeId === employeeId &&
          batch.source === 'Historical' &&
          batch.monthYear === monthYearStr) {
        return {
          success: false,
          error: 'Historical balance exists for this month. Cannot log overtime.'
        };
      }
    }

    return { success: true };

  } catch (error) {
    Logger.log('Error checking overtime blocks: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

// Get uncertified overtime logs for a specific month
function getUncertifiedOvertimeForMonth_SERVER(employeeId, month, year) {
  try {
    const db = getFirestore();

    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);

    const logDocs = db.getDocuments('overtimeLogs');
    const logs = [];

    for (let i = 0; i < logDocs.length; i++) {
      const log = logDocs[i].obj;
      if (!log || log.employeeId !== employeeId) {
        continue;
      }

      if (log.status !== 'Uncertified' || !log.overtimeDate) {
        continue;
      }

      const overtimeDate = new Date(log.overtimeDate);
      if (overtimeDate >= monthStart && overtimeDate <= monthEnd) {
        logs.push(log);
      }
    }

    return logs;

  } catch (error) {
    Logger.log('Error getting uncertified overtime: ' + error.toString());
    return [];
  }
}

// Get total balance (Active + Uncertified)
function getTotalBalance_SERVER(employeeId) {
  try {
    const db = getFirestore();

    // Get Active credits
    const batchDocs = db.getDocuments('creditBatches');
    let activeBalance = 0;

    for (let i = 0; i < batchDocs.length; i++) {
      const batch = batchDocs[i].obj;
      if (batch && batch.employeeId === employeeId && batch.status === 'Active') {
        activeBalance += Number(batch.remainingHours || 0);
      }
    }

    // Get Uncertified logs
    const logDocs = db.getDocuments('overtimeLogs');
    let uncertifiedBalance = 0;

    for (let i = 0; i < logDocs.length; i++) {
      const log = logDocs[i].obj;
      if (log && log.employeeId === employeeId && log.status === 'Uncertified') {
        uncertifiedBalance += Number(log.earnedHours || 0);
      }
    }

    const totalBalance = activeBalance + uncertifiedBalance;

    return {
      success: true,
      active: Number(activeBalance.toFixed(2)),
      uncertified: Number(uncertifiedBalance.toFixed(2)),
      total: Number(totalBalance.toFixed(2))
    };

  } catch (error) {
    return {
      success: false,
      total: 0,
      error: error.toString()
    };
  }
}

// Auto-detect day type (weekday/weekend/holiday)
function getDayType_SERVER(dateStr) {
  try {
    const db = getFirestore();
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

    // Check if weekend
    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);

    // Check if holiday
    let isHoliday = false;
    let holidayName = '';

    try {
      const holidaysQuery = db.getDocuments('holidays');

      for (let i = 0; i < holidaysQuery.length; i++) {
        const holiday = holidaysQuery[i].obj;
        if (holiday.date === dateStr) {
          isHoliday = true;
          holidayName = holiday.name || 'Holiday';
          break;
        }
      }
    } catch (holidayError) {
      Logger.log('Error checking holidays (collection may not exist): ' + holidayError.toString());
      // Continue without holiday check
    }

    return {
      success: true,
      isWeekend: isWeekend,
      isHoliday: isHoliday,
      holidayName: holidayName
    };

  } catch (error) {
    Logger.log('Error detecting day type: ' + error.toString());
    return {
      success: false,
      isWeekend: false,
      isHoliday: false,
      error: error.toString()
    };
  }
}

// Get months with historical balance for an employee
function getHistoricalBalanceMonths_SERVER(employeeId, year) {
  try {
    const db = getFirestore();
    const allBatchesQuery = db.getDocuments('creditBatches');

    const historicalMonths = [];

    for (let i = 0; i < allBatchesQuery.length; i++) {
      const batch = allBatchesQuery[i].obj;
      if (batch.employeeId === employeeId && batch.source === 'Historical' && batch.monthYear) {
        const [batchYear, batchMonth] = batch.monthYear.split('-');
        if (parseInt(batchYear) === parseInt(year)) {
          historicalMonths.push(parseInt(batchMonth) - 1); // Return 0-indexed month
        }
      }
    }

    return {
      success: true,
      months: historicalMonths
    };

  } catch (error) {
    Logger.log('Error getting historical balance months: ' + error.toString());
    return {
      success: false,
      months: [],
      error: error.toString()
    };
  }
}

// Get months with overtime entries for an employee
function getOvertimeMonths_SERVER(employeeId, year) {
  try {
    const db = getFirestore();
    const allLogsQuery = db.getDocuments('overtimeLogs');

    const monthsWithEntries = new Set();

    for (let i = 0; i < allLogsQuery.length; i++) {
      const log = allLogsQuery[i].obj;
      if (log && log.employeeId === employeeId && log.overtimeDate) {
        const logDate = new Date(log.overtimeDate);
        const logYear = logDate.getFullYear();
        const logMonth = logDate.getMonth(); // 0-indexed

        if (logYear === parseInt(year)) {
          monthsWithEntries.add(logMonth);
        }
      }
    }

    return {
      success: true,
      months: Array.from(monthsWithEntries)
    };

  } catch (error) {
    Logger.log('Error getting overtime months: ' + error.toString());
    return {
      success: false,
      months: [],
      error: error.toString()
    };
  }
}

// Log overtime batch
function logOvertimeBatch_SERVER(data) {
  try {
    const db = getFirestore();

    // Validate required data
    if (!data.employeeId || data.month === undefined || !data.year || !data.entries || data.entries.length === 0) {
      return {
        success: false,
        error: 'Missing required data'
      };
    }

    // Check monthly cap
    const existingLogs = getUncertifiedOvertimeForMonth_SERVER(data.employeeId, data.month, data.year);
    const existingMonthTotal = existingLogs.reduce((sum, log) => sum + Number(log.earnedHours || 0), 0);
    const newEntriesTotal = data.entries.reduce((sum, entry) => sum + entry.cocEarned, 0);
    const totalMonthly = existingMonthTotal + newEntriesTotal;

    if (totalMonthly > 40) {
      return {
        success: false,
        error: `Monthly accrual cap exceeded. Total would be ${totalMonthly.toFixed(1)} hours (cap: 40 hours)`
      };
    }

    // Check total balance cap
    const balanceData = getTotalBalance_SERVER(data.employeeId);
    const newTotalBalance = balanceData.total + newEntriesTotal;

    if (newTotalBalance > 120) {
      return {
        success: false,
        error: `Total balance cap exceeded. Total would be ${newTotalBalance.toFixed(1)} hours (cap: 120 hours)`
      };
    }

    // Check for duplicate dates within the submission
    const dateSet = new Set();
    for (const entry of data.entries) {
      if (dateSet.has(entry.date)) {
        return {
          success: false,
          error: `Duplicate date found: ${entry.date}`
        };
      }
      dateSet.add(entry.date);
    }

    // Get all existing uncertified logs for this employee + month + year
    const allLogsQuery = db.getDocuments('overtimeLogs');
    const existingLogsMap = {}; // Map by date ISO string
    const existingLogIds = new Set();

    for (let i = 0; i < allLogsQuery.length; i++) {
      const log = allLogsQuery[i].obj;
      if (log.employeeId === data.employeeId &&
          log.month === data.month &&
          log.year === data.year &&
          log.status === 'Uncertified') {
        existingLogsMap[log.overtimeDate] = log;
        existingLogIds.add(log.logId);
      }
    }

    // Process entries: UPDATE existing or CREATE new
    let createdCount = 0;
    let updatedCount = 0;
    let totalCocEarned = 0;
    const processedLogIds = new Set();

    for (const entry of data.entries) {
      const overtimeDate = new Date(entry.date);
      const overtimeDateISO = overtimeDate.toISOString();
      const existingLog = existingLogsMap[overtimeDateISO];

      if (existingLog) {
        // UPDATE existing log - merge new data with old metadata
        const updatedLogData = {
          logId: existingLog.logId,
          employeeId: data.employeeId,
          overtimeDate: overtimeDateISO,
          dayType: entry.dayType,
          isHoliday: entry.isHoliday || false,
          holidayName: entry.holidayName || '',
          amIn: entry.amIn || null,
          amOut: entry.amOut || null,
          pmIn: entry.pmIn || null,
          pmOut: entry.pmOut || null,
          hoursWorked: entry.hoursWorked,
          earnedHours: entry.cocEarned,
          status: 'Uncertified',
          month: data.month,
          year: data.year,
          // Keep original creation metadata
          createdAt: existingLog.createdAt,
          createdBy: existingLog.createdBy,
          // Add modification metadata
          lastModifiedAt: new Date().toISOString(),
          lastModifiedBy: Session.getActiveUser().getEmail()
        };

        db.updateDocument('overtimeLogs/' + existingLog.logId, updatedLogData);
        processedLogIds.add(existingLog.logId);
        updatedCount++;
        totalCocEarned += entry.cocEarned;

      } else {
        // CREATE new log
        const logId = 'LOG_' + Utilities.getUuid();
        const logData = {
          logId: logId,
          employeeId: data.employeeId,
          overtimeDate: overtimeDateISO,
          dayType: entry.dayType,
          isHoliday: entry.isHoliday || false,
          holidayName: entry.holidayName || '',
          amIn: entry.amIn || null,
          amOut: entry.amOut || null,
          pmIn: entry.pmIn || null,
          pmOut: entry.pmOut || null,
          hoursWorked: entry.hoursWorked,
          earnedHours: entry.cocEarned,
          status: 'Uncertified',
          month: data.month,
          year: data.year,
          createdAt: new Date().toISOString(),
          createdBy: Session.getActiveUser().getEmail()
        };

        db.createDocument('overtimeLogs/' + logId, logData);
        createdCount++;
        totalCocEarned += entry.cocEarned;
      }
    }

    // DELETE logs that were removed from the form
    let deletedCount = 0;
    for (const logId of existingLogIds) {
      if (!processedLogIds.has(logId)) {
        db.deleteDocument('overtimeLogs/' + logId);
        deletedCount++;
      }
    }

    Logger.log(`Overtime batch: Created ${createdCount}, Updated ${updatedCount}, Deleted ${deletedCount}`);

    return {
      success: true,
      created: createdCount,
      updated: updatedCount,
      deleted: deletedCount,
      totalCocEarned: totalCocEarned
    };

  } catch (error) {
    Logger.log('Error logging overtime batch: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

function generateCertificate_SERVER(data) {
  try {
    const db = getFirestore();
    
    if (!data.selectedLogIds || data.selectedLogIds.length === 0) {
      return {
        success: false,
        error: 'No overtime logs selected'
      };
    }
    
    let totalEarnedHours = 0;
    const logs = [];
    
    data.selectedLogIds.forEach(logId => {
      const logDoc = db.getDocument('overtimeLogs/' + logId);
      if (logDoc && logDoc.obj.status === 'Uncertified' && logDoc.obj.employeeId === data.employeeId) {
        logs.push(logDoc.obj);
        totalEarnedHours += Number(logDoc.obj.earnedHours || 0);
      }
    });
    
    if (logs.length === 0) {
      return {
        success: false,
        error: 'No valid uncertified logs found'
      };
    }
    
    const certificateId = 'CERT_' + Utilities.getUuid();
    const batchId = 'BATCH_' + Utilities.getUuid();
    const ledgerId = 'LEDGER_' + Utilities.getUuid();
    
    const configDoc = db.getDocument('configuration/accrualRules');
    const expiryMonths = configDoc.obj.expiryMonths || 12;
    
    const issueDate = new Date();
    const expiryDate = new Date(issueDate);
    expiryDate.setMonth(expiryDate.getMonth() + expiryMonths);
    
    const certData = {
      certificateId: certificateId,
      employeeId: data.employeeId,
      totalEarnedHours: totalEarnedHours,
      issueDate: issueDate.toISOString(),
      logIds: data.selectedLogIds,
      createdAt: issueDate.toISOString(),
      createdBy: Session.getActiveUser().getEmail()
    };
    
    db.createDocument('certificates/' + certificateId, certData);
    
    data.selectedLogIds.forEach(logId => {
      db.updateDocument('overtimeLogs/' + logId, {
        status: 'Certified',
        certificateId: certificateId,
        certifiedAt: issueDate.toISOString(),
        certifiedBy: Session.getActiveUser().getEmail()
      });
    });
    
    const batchData = {
      batchId: batchId,
      employeeId: data.employeeId,
      certificateId: certificateId,
      earnedHours: totalEarnedHours,
      remainingHours: totalEarnedHours,
      issueDate: issueDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
      status: 'Active',
      isHistorical: false,
      createdAt: issueDate.toISOString()
    };
    
    db.createDocument('creditBatches/' + batchId, batchData);
    
    const allBatchDocs = db.getDocuments('creditBatches');
    let balanceAfter = 0;

    for (let i = 0; i < allBatchDocs.length; i++) {
      const batch = allBatchDocs[i].obj;
      if (batch && batch.employeeId === data.employeeId && batch.status === 'Active') {
        balanceAfter += Number(batch.remainingHours || 0);
      }
    }
    
    const ledgerData = {
      ledgerId: ledgerId,
      employeeId: data.employeeId,
      transactionDate: issueDate.toISOString(),
      transactionType: 'Earned',
      referenceId: certificateId,
      hoursChange: totalEarnedHours,
      balanceAfter: balanceAfter,
      remarks: `Certificate ${certificateId} issued`,
      createdAt: issueDate.toISOString()
    };
    
    db.createDocument('ledger/' + ledgerId, ledgerData);
    
    return {
      success: true,
      certificateId: certificateId,
      totalEarnedHours: totalEarnedHours
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

// ========== GENERATE CERTIFICATE FEATURE SERVER FUNCTIONS ==========

// Get uncertified overtime logs grouped by month/year for an employee
function getUncertifiedMonthsByEmployee_SERVER(employeeId) {
  try {
    const db = getFirestore();
    const allLogsQuery = db.getDocuments('overtimeLogs');

    // Group by month/year
    const monthsMap = {};

    for (let i = 0; i < allLogsQuery.length; i++) {
      const log = allLogsQuery[i].obj;
      if (log && log.employeeId === employeeId && log.status === 'Uncertified') {
        const key = `${log.month}-${log.year}`;
        if (!monthsMap[key]) {
          monthsMap[key] = {
            month: log.month,
            year: log.year,
            entries: [],
            totalHours: 0
          };
        }
        monthsMap[key].entries.push(log);
        monthsMap[key].totalHours += Number(log.earnedHours || 0);
      }
    }

    // Convert to array and sort by year/month descending
    const months = Object.values(monthsMap).sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });

    return {
      success: true,
      months: months
    };

  } catch (error) {
    Logger.log('Error getting uncertified months: ' + error.toString());
    return {
      success: false,
      error: error.toString(),
      months: []
    };
  }
}

// Get all employees with uncertified logs for a specific month/year
function getEmployeesByMonthWithUncertified_SERVER(month, year) {
  try {
    const db = getFirestore();
    const allLogsQuery = db.getDocuments('overtimeLogs');
    const employeesQuery = db.getDocuments('employees');

    // Build employee map
    const employeeMap = {};
    for (let i = 0; i < employeesQuery.length; i++) {
      const emp = employeesQuery[i].obj;
      if (emp) {
        employeeMap[emp.employeeId] = emp;
      }
    }

    // Group uncertified logs by employee for this month/year
    const employeeLogsMap = {};

    for (let i = 0; i < allLogsQuery.length; i++) {
      const log = allLogsQuery[i].obj;
      if (log && log.status === 'Uncertified' && log.month === month && log.year === year) {
        if (!employeeLogsMap[log.employeeId]) {
          employeeLogsMap[log.employeeId] = {
            employeeId: log.employeeId,
            entries: [],
            totalHours: 0
          };
        }
        employeeLogsMap[log.employeeId].entries.push(log);
        employeeLogsMap[log.employeeId].totalHours += Number(log.earnedHours || 0);
      }
    }

    // Convert to array with employee details
    const employees = [];
    for (const empId in employeeLogsMap) {
      const employee = employeeMap[empId];
      if (employee) {
        employees.push({
          employeeId: empId,
          fullName: `${employee.firstName} ${employee.lastName}`,
          office: employee.office || 'N/A',
          totalHours: employeeLogsMap[empId].totalHours,
          entriesCount: employeeLogsMap[empId].entries.length
        });
      }
    }

    // Sort by name
    employees.sort((a, b) => a.fullName.localeCompare(b.fullName));

    return {
      success: true,
      employees: employees
    };

  } catch (error) {
    Logger.log('Error getting employees by month: ' + error.toString());
    return {
      success: false,
      error: error.toString(),
      employees: []
    };
  }
}

// Generate COC Certificate with PDF for a specific month/year
function generateCOCCertificate_SERVER(data) {
  try {
    const db = getFirestore();

    // Validate required data
    if (!data.employeeId || data.month === undefined || !data.year || !data.dateOfIssuance) {
      return {
        success: false,
        error: 'Missing required data'
      };
    }

    // Get employee data
    const employeeDoc = db.getDocument('employees/' + data.employeeId);
    if (!employeeDoc || !employeeDoc.obj) {
      return {
        success: false,
        error: 'Employee not found'
      };
    }
    const employee = employeeDoc.obj;

    // Get all uncertified logs for this employee/month/year
    const allLogsQuery = db.getDocuments('overtimeLogs');
    const logs = [];
    let totalEarnedHours = 0;

    for (let i = 0; i < allLogsQuery.length; i++) {
      const log = allLogsQuery[i].obj;
      if (log && log.employeeId === data.employeeId &&
          log.month === data.month && log.year === data.year &&
          log.status === 'Uncertified') {
        logs.push(log);
        totalEarnedHours += Number(log.earnedHours || 0);
      }
    }

    if (logs.length === 0) {
      return {
        success: false,
        error: 'No uncertified logs found for this month/year'
      };
    }

    // Validate Date of Issuance
    const dateOfIssuance = new Date(data.dateOfIssuance);

    // Calculate valid date range: last day of earned month to last day of following month
    const lastDayOfMonth = new Date(data.year, data.month, 0); // Get last day of the earned month
    const followingMonth = data.month === 12 ? 1 : data.month + 1;
    const followingYear = data.month === 12 ? data.year + 1 : data.year;
    const lastDayOfFollowingMonth = new Date(followingYear, followingMonth, 0);

    // Normalize dates to midnight for comparison (ignore time portion)
    const issuanceDate = new Date(dateOfIssuance.getFullYear(), dateOfIssuance.getMonth(), dateOfIssuance.getDate());
    const minDate = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), lastDayOfMonth.getDate());
    const maxDate = new Date(lastDayOfFollowingMonth.getFullYear(), lastDayOfFollowingMonth.getMonth(), lastDayOfFollowingMonth.getDate());

    // Validate date is within range
    if (issuanceDate < minDate || issuanceDate > maxDate) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                         'July', 'August', 'September', 'October', 'November', 'December'];
      return {
        success: false,
        error: `Date of Issuance must be between ${monthNames[lastDayOfMonth.getMonth()]} ${lastDayOfMonth.getDate()}, ${lastDayOfMonth.getFullYear()} and ${monthNames[lastDayOfFollowingMonth.getMonth()]} ${lastDayOfFollowingMonth.getDate()}, ${lastDayOfFollowingMonth.getFullYear()}`
      };
    }

    // Calculate Valid Until (1 year minus 1 day from date of issuance)
    const validUntil = new Date(dateOfIssuance);
    validUntil.setFullYear(validUntil.getFullYear() + 1);
    validUntil.setDate(validUntil.getDate() - 1);

    // Check for existing certificate for this month/year
    const allCertsQuery = db.getDocuments('certificates');
    for (let i = 0; i < allCertsQuery.length; i++) {
      const cert = allCertsQuery[i].obj;
      if (cert && cert.employeeId === data.employeeId &&
          cert.month === data.month && cert.year === data.year) {
        return {
          success: false,
          error: 'Certificate already exists for this month/year'
        };
      }
    }

    // Generate IDs
    const certificateId = 'CERT_' + Utilities.getUuid();
    const batchId = 'BATCH_' + Utilities.getUuid();
    const ledgerId = 'LEDGER_' + Utilities.getUuid();

    // Create certificate document
    const certData = {
      certificateId: certificateId,
      employeeId: data.employeeId,
      month: data.month,
      year: data.year,
      totalEarnedHours: totalEarnedHours,
      dateOfIssuance: dateOfIssuance.toISOString(),
      validUntil: validUntil.toISOString(),
      logIds: logs.map(log => log.logId),
      createdAt: new Date().toISOString(),
      createdBy: Session.getActiveUser().getEmail()
    };

    db.createDocument('certificates/' + certificateId, certData);

    // Update all logs to Active status
    logs.forEach(log => {
      db.updateDocument('overtimeLogs/' + log.logId, {
        status: 'Active',
        certificateId: certificateId,
        validUntil: validUntil.toISOString(),
        certifiedAt: new Date().toISOString(),
        certifiedBy: Session.getActiveUser().getEmail()
      });
    });

    // Create credit batch
    const batchData = {
      batchId: batchId,
      employeeId: data.employeeId,
      certificateId: certificateId,
      earnedHours: totalEarnedHours,
      remainingHours: totalEarnedHours,
      issueDate: dateOfIssuance.toISOString(),
      expiryDate: validUntil.toISOString(),
      status: 'Active',
      isHistorical: false,
      createdAt: new Date().toISOString()
    };

    db.createDocument('creditBatches/' + batchId, batchData);

    // Create ledger entry
    const allBatchDocs = db.getDocuments('creditBatches');
    let balanceAfter = 0;
    for (let i = 0; i < allBatchDocs.length; i++) {
      const batch = allBatchDocs[i].obj;
      if (batch && batch.employeeId === data.employeeId && batch.status === 'Active') {
        balanceAfter += Number(batch.remainingHours || 0);
      }
    }

    const ledgerData = {
      ledgerId: ledgerId,
      employeeId: data.employeeId,
      transactionDate: dateOfIssuance.toISOString(),
      transactionType: 'Earned',
      referenceId: certificateId,
      hoursChange: totalEarnedHours,
      balanceAfter: balanceAfter,
      remarks: `Certificate ${certificateId} issued`,
      createdAt: new Date().toISOString()
    };

    db.createDocument('ledger/' + ledgerId, ledgerData);

    // Generate PDF
    let pdfUrl = null;
    let pdfId = null;
    try {
      const pdfResult = generateCertificatePDF({
        employee: employee,
        totalHours: totalEarnedHours,
        dateOfIssuance: dateOfIssuance,
        validUntil: validUntil
      });
      pdfUrl = pdfResult.url;
      pdfId = pdfResult.id;

      // Update certificate document with PDF info
      db.updateDocument('certificates/' + certificateId, {
        pdfUrl: pdfUrl,
        pdfId: pdfId
      });
    } catch (pdfError) {
      Logger.log('PDF generation failed: ' + pdfError.toString());
      // Continue even if PDF fails
    }

    // Get employee full name for response
    const employeeFullName = `${employee.firstName} ${employee.middleName || ''} ${employee.lastName}`.trim();

    return {
      success: true,
      certificateId: certificateId,
      totalEarnedHours: totalEarnedHours,
      pdfUrl: pdfUrl,
      employeeName: employeeFullName,
      monthYear: `${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][data.month]} ${data.year}`,
      dateOfIssuance: Utilities.formatDate(dateOfIssuance, Session.getScriptTimeZone(), 'MMMM d, yyyy'),
      validUntil: Utilities.formatDate(validUntil, Session.getScriptTimeZone(), 'MMMM d, yyyy')
    };

  } catch (error) {
    Logger.log('Error generating certificate: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

// Generate certificates for multiple employees (batch mode)
function generateBatchCertificates_SERVER(data) {
  try {
    if (!data.employeeIds || data.employeeIds.length === 0 ||
        data.month === undefined || !data.year || !data.dateOfIssuance) {
      return {
        success: false,
        error: 'Missing required data'
      };
    }

    const results = [];
    let successCount = 0;
    let failCount = 0;

    for (const employeeId of data.employeeIds) {
      const result = generateCOCCertificate_SERVER({
        employeeId: employeeId,
        month: data.month,
        year: data.year,
        dateOfIssuance: data.dateOfIssuance
      });

      results.push({
        employeeId: employeeId,
        success: result.success,
        error: result.error || null,
        certificateId: result.certificateId || null
      });

      if (result.success) {
        successCount++;
      } else {
        failCount++;
      }
    }

    return {
      success: true,
      successCount: successCount,
      failCount: failCount,
      results: results
    };

  } catch (error) {
    Logger.log('Error in batch generation: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

// Get all certificates with filters
function getCertificates_SERVER(filters) {
  try {
    const db = getFirestore();
    const allCerts = db.getDocuments('certificates');
    const allEmployees = db.getDocuments('employees');

    // Build employee map
    const employeeMap = {};
    for (let i = 0; i < allEmployees.length; i++) {
      const emp = allEmployees[i].obj;
      if (emp) {
        employeeMap[emp.employeeId] = emp;
      }
    }

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];

    let certificates = [];
    for (let i = 0; i < allCerts.length; i++) {
      const cert = allCerts[i].obj;
      if (!cert) continue;

      const employee = employeeMap[cert.employeeId];
      if (!employee) continue;

      // Apply filters
      if (filters.year && cert.year !== parseInt(filters.year)) continue;
      if (filters.month !== undefined && filters.month !== '' && cert.month !== parseInt(filters.month)) continue;

      const employeeName = `${employee.lastName}, ${employee.firstName}`;
      if (filters.search && filters.search.trim() !== '') {
        const searchLower = filters.search.toLowerCase();
        if (!employeeName.toLowerCase().includes(searchLower) &&
            !cert.certificateId.toLowerCase().includes(searchLower)) {
          continue;
        }
      }

      // Determine status
      const now = new Date();
      const validUntil = new Date(cert.validUntil);
      let status = 'Active';
      if (validUntil < now) {
        status = 'Expired';
      }

      certificates.push({
        certificateId: cert.certificateId,
        employeeId: cert.employeeId,
        employeeName: employeeName,
        month: cert.month,
        year: cert.year,
        period: `${monthNames[cert.month]} ${cert.year}`,
        totalHours: cert.totalEarnedHours,
        dateOfIssuance: cert.dateOfIssuance,
        validUntil: cert.validUntil,
        pdfUrl: cert.pdfUrl || null,
        pdfId: cert.pdfId || null,
        status: status,
        createdAt: cert.createdAt,
        createdBy: cert.createdBy
      });
    }

    // Sort by creation date (newest first)
    certificates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return {
      success: true,
      certificates: certificates
    };

  } catch (error) {
    Logger.log('Error getting certificates: ' + error.toString());
    return {
      success: false,
      error: error.toString(),
      certificates: []
    };
  }
}

// Helper function to generate PDF certificate
function generateCertificatePDF(data) {
  try {
    const ss = SpreadsheetApp.openById(CERTIFICATE_TEMPLATE_ID);
    const templateSheet = ss.getSheetByName('CERTIFICATE');

    if (!templateSheet) {
      throw new Error('CERTIFICATE template sheet not found');
    }

    // Create temporary copy
    const tempSheetName = 'TEMP_CERT_' + data.employee.employeeId + '_' + Date.now();
    const tempSheet = templateSheet.copyTo(ss);
    tempSheet.setName(tempSheetName);

    // Fill in data (adjust cell references based on your template)
    const employeeName = `${data.employee.firstName} ${data.employee.middleName || ''} ${data.employee.lastName}`.toUpperCase().trim();
    const position = (data.employee.position || '').toUpperCase();
    const office = (data.employee.office || '').toUpperCase();

    // First certificate (top) - adjust these cell references to match your template
    tempSheet.getRange('E4').setValue(employeeName);
    tempSheet.getRange('B6').setValue(position);
    tempSheet.getRange('F6').setValue(office);
    tempSheet.getRange('B9').setValue(data.totalHours.toFixed(1));
    tempSheet.getRange('D19').setValue(Utilities.formatDate(data.dateOfIssuance, Session.getScriptTimeZone(), 'MM/dd/yyyy'));
    tempSheet.getRange('D20').setValue(Utilities.formatDate(data.validUntil, Session.getScriptTimeZone(), 'MM/dd/yyyy'));

    // Second certificate (bottom) - offset by ~24 rows (adjust based on your template)
    tempSheet.getRange('E28').setValue(employeeName);
    tempSheet.getRange('B30').setValue(position);
    tempSheet.getRange('F30').setValue(office);
    tempSheet.getRange('B33').setValue(data.totalHours.toFixed(1));
    tempSheet.getRange('D43').setValue(Utilities.formatDate(data.dateOfIssuance, Session.getScriptTimeZone(), 'MM/dd/yyyy'));
    tempSheet.getRange('D44').setValue(Utilities.formatDate(data.validUntil, Session.getScriptTimeZone(), 'MM/dd/yyyy'));

    // Flush changes
    SpreadsheetApp.flush();

    // Convert to PDF
    const pdfBlob = tempSheet.getParent().getAs('application/pdf');
    // Use employee name in format: "LastName, FirstName"
    const pdfFileName = `COC_Certificate_${data.employee.lastName}, ${data.employee.firstName}.pdf`;
    pdfBlob.setName(pdfFileName);

    // Save to Drive with year/month organization
    const CERTIFICATES_FOLDER_ID = '1QltJeBLauIIjITAE8UUTNKwWb3u4r4Nr';
    const mainFolder = DriveApp.getFolderById(CERTIFICATES_FOLDER_ID);

    // Get year and month from date of issuance
    const year = data.dateOfIssuance.getFullYear();
    const month = data.dateOfIssuance.getMonth() + 1; // 0-based to 1-based
    const monthNames = ['01-January', '02-February', '03-March', '04-April', '05-May', '06-June',
                       '07-July', '08-August', '09-September', '10-October', '11-November', '12-December'];
    const monthFolderName = monthNames[data.dateOfIssuance.getMonth()];

    // Create or get year folder
    let yearFolder;
    const yearFolders = mainFolder.getFoldersByName(year.toString());
    if (yearFolders.hasNext()) {
      yearFolder = yearFolders.next();
    } else {
      yearFolder = mainFolder.createFolder(year.toString());
    }

    // Create or get month folder
    let monthFolder;
    const monthFolders = yearFolder.getFoldersByName(monthFolderName);
    if (monthFolders.hasNext()) {
      monthFolder = monthFolders.next();
    } else {
      monthFolder = yearFolder.createFolder(monthFolderName);
    }

    // Save PDF to month folder
    const pdfFile = monthFolder.createFile(pdfBlob);
    const pdfUrl = pdfFile.getUrl();
    const pdfId = pdfFile.getId();

    // Delete temporary sheet
    ss.deleteSheet(tempSheet);

    return {
      url: pdfUrl,
      id: pdfId
    };

  } catch (error) {
    Logger.log('PDF generation error: ' + error.toString());
    throw error;
  }
}

function logCto_SERVER(data) {
  try {
    const db = getFirestore();
    
    const hoursUsed = parseFloat(data.hoursUsed);
    
    const batchDocs = db.getDocuments('creditBatches');
    let availableBalance = 0;
    const batches = [];

    for (let i = 0; i < batchDocs.length; i++) {
      const doc = batchDocs[i];
      const batch = doc.obj;
      if (!batch || batch.employeeId !== data.employeeId || batch.status !== 'Active') {
        continue;
      }

      const batchId = doc.name.split('/').pop();
      batches.push({ id: batchId, data: batch });
      availableBalance += Number(batch.remainingHours || 0);
    }

    batches.sort((a, b) => {
      const dateA = a.data.expiryDate ? new Date(a.data.expiryDate) : new Date('9999-12-31');
      const dateB = b.data.expiryDate ? new Date(b.data.expiryDate) : new Date('9999-12-31');
      return dateA - dateB;
    });
    
    if (hoursUsed > availableBalance) {
      return {
        success: false,
        error: `Insufficient balance. Available: ${availableBalance.toFixed(2)} hours, Requested: ${hoursUsed.toFixed(2)} hours`
      };
    }
    
    let remainingToUse = hoursUsed;
    const usedBatches = [];
    
    for (let i = 0; i < batches.length && remainingToUse > 0; i++) {
      const batch = batches[i];
      const available = batch.data.remainingHours;
      const toUse = Math.min(available, remainingToUse);
      
      usedBatches.push({
        batchId: batch.id,
        hoursUsed: toUse,
        newRemaining: available - toUse
      });
      
      remainingToUse -= toUse;
    }
    
    const ctoId = 'CTO_' + Utilities.getUuid();
    const ctoDate = new Date(data.ctoDate);
    
    usedBatches.forEach(usage => {
      const newStatus = usage.newRemaining === 0 ? 'Depleted' : 'Active';
      
      db.updateDocument('creditBatches/' + usage.batchId, {
        remainingHours: usage.newRemaining,
        status: newStatus,
        lastUsedDate: ctoDate.toISOString(),
        lastUsedBy: Session.getActiveUser().getEmail()
      });
    });
    
    const newBalance = availableBalance - hoursUsed;
    
    const ledgerId = 'LEDGER_' + Utilities.getUuid();
    const ledgerData = {
      ledgerId: ledgerId,
      employeeId: data.employeeId,
      transactionDate: ctoDate.toISOString(),
      transactionType: 'Used',
      referenceId: ctoId,
      hoursChange: -hoursUsed,
      balanceAfter: newBalance,
      remarks: data.remarks || `CTO on ${ctoDate.toISOString().split('T')[0]}`,
      createdAt: new Date().toISOString()
    };
    
    db.createDocument('ledger/' + ledgerId, ledgerData);
    
    return {
      success: true,
      ctoId: ctoId,
      hoursUsed: hoursUsed,
      newBalance: newBalance
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function addEmployee_SERVER(data) {
  try {
    const db = getFirestore();
    
    const allEmployees = db.getDocuments('employees');
    const count = allEmployees.length;
    const nextNumber = count + 1;
    const employeeId = 'EMP_' + String(nextNumber).padStart(3, '0');
    
    const employeeData = {
      employeeId: employeeId,
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName || '',
      suffix: data.suffix || '',
      office: data.office,
      position: data.position,
      isActive: data.isActive !== false,
      createdAt: new Date().toISOString(),
      createdBy: Session.getActiveUser().getEmail()
    };
    
    db.createDocument('employees/' + employeeId, employeeData);
    
    return {
      success: true,
      employeeId: employeeId
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function updateEmployee_SERVER(employeeId, data) {
  try {
    const db = getFirestore();
    
    const updateData = {
      employeeId: employeeId,
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName || '',
      suffix: data.suffix || '',
      office: data.office,
      position: data.position,
      isActive: data.isActive !== false,
      updatedAt: new Date().toISOString(),
      updatedBy: Session.getActiveUser().getEmail()
    };
    
    db.updateDocument('employees/' + employeeId, updateData);
    
    return {
      success: true,
      employeeId: employeeId
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function addHoliday_SERVER(data) {
  try {
    const db = getFirestore();
    
    const holidayId = 'HOL_' + Utilities.getUuid();
    
    const holidayData = {
      holidayId: holidayId,
      date: data.date,
      name: data.name,
      type: data.type,
      isRecurring: data.isRecurring || false,
      createdAt: new Date().toISOString(),
      createdBy: Session.getActiveUser().getEmail()
    };
    
    db.createDocument('holidays/' + holidayId, holidayData);
    
    return {
      success: true,
      holidayId: holidayId
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function deleteHoliday_SERVER(holidayId) {
  try {
    const db = getFirestore();
    db.deleteDocument('holidays/' + holidayId);

    return {
      success: true
    };

  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function initializeHolidays_SERVER() {
  try {
    const db = getFirestore();

    const holidays2024 = [
      { date: '2024-01-01', name: "New Year's Day", type: 'Regular', isRecurring: true },
      { date: '2024-02-10', name: 'Chinese New Year', type: 'Special', isRecurring: false },
      { date: '2024-02-25', name: 'EDSA People Power Revolution Anniversary', type: 'Special', isRecurring: true },
      { date: '2024-03-28', name: 'Maundy Thursday', type: 'Regular', isRecurring: false },
      { date: '2024-03-29', name: 'Good Friday', type: 'Regular', isRecurring: false },
      { date: '2024-03-30', name: 'Black Saturday', type: 'Special', isRecurring: false },
      { date: '2024-04-09', name: 'Araw ng Kagitingan', type: 'Regular', isRecurring: true },
      { date: '2024-04-10', name: "Eid'l Fitr", type: 'Regular', isRecurring: false },
      { date: '2024-05-01', name: 'Labor Day', type: 'Regular', isRecurring: true },
      { date: '2024-06-12', name: 'Independence Day', type: 'Regular', isRecurring: true },
      { date: '2024-06-17', name: "Eid'l Adha", type: 'Regular', isRecurring: false },
      { date: '2024-08-21', name: 'Ninoy Aquino Day', type: 'Special', isRecurring: true },
      { date: '2024-08-26', name: 'National Heroes Day', type: 'Regular', isRecurring: false },
      { date: '2024-11-01', name: "All Saints' Day", type: 'Special', isRecurring: true },
      { date: '2024-11-02', name: 'All Souls\' Day', type: 'Special', isRecurring: true },
      { date: '2024-11-30', name: 'Bonifacio Day', type: 'Regular', isRecurring: true },
      { date: '2024-12-08', name: 'Feast of the Immaculate Conception', type: 'Special', isRecurring: true },
      { date: '2024-12-24', name: 'Christmas Eve', type: 'Special', isRecurring: true },
      { date: '2024-12-25', name: 'Christmas Day', type: 'Regular', isRecurring: true },
      { date: '2024-12-30', name: 'Rizal Day', type: 'Regular', isRecurring: true },
      { date: '2024-12-31', name: 'Last Day of the Year', type: 'Special', isRecurring: true }
    ];

    const holidays2025 = [
      { date: '2025-01-01', name: "New Year's Day", type: 'Regular', isRecurring: true },
      { date: '2025-01-29', name: 'Chinese New Year', type: 'Special', isRecurring: false },
      { date: '2025-02-25', name: 'EDSA People Power Revolution Anniversary', type: 'Special', isRecurring: true },
      { date: '2025-04-09', name: 'Araw ng Kagitingan', type: 'Regular', isRecurring: true },
      { date: '2025-04-17', name: 'Maundy Thursday', type: 'Regular', isRecurring: false },
      { date: '2025-04-18', name: 'Good Friday', type: 'Regular', isRecurring: false },
      { date: '2025-04-19', name: 'Black Saturday', type: 'Special', isRecurring: false },
      { date: '2025-05-01', name: 'Labor Day', type: 'Regular', isRecurring: true },
      { date: '2025-06-12', name: 'Independence Day', type: 'Regular', isRecurring: true },
      { date: '2025-08-21', name: 'Ninoy Aquino Day', type: 'Special', isRecurring: true },
      { date: '2025-08-25', name: 'National Heroes Day', type: 'Regular', isRecurring: false },
      { date: '2025-11-01', name: "All Saints' Day", type: 'Special', isRecurring: true },
      { date: '2025-11-02', name: 'All Souls\' Day', type: 'Special', isRecurring: true },
      { date: '2025-11-30', name: 'Bonifacio Day', type: 'Regular', isRecurring: true },
      { date: '2025-12-08', name: 'Feast of the Immaculate Conception', type: 'Special', isRecurring: true },
      { date: '2025-12-24', name: 'Christmas Eve', type: 'Special', isRecurring: true },
      { date: '2025-12-25', name: 'Christmas Day', type: 'Regular', isRecurring: true },
      { date: '2025-12-30', name: 'Rizal Day', type: 'Regular', isRecurring: true },
      { date: '2025-12-31', name: 'Last Day of the Year', type: 'Special', isRecurring: true }
    ];

    const allHolidays = holidays2024.concat(holidays2025);

    const existingDocs = db.getDocuments('holidays');
    const existingDates = new Set();

    for (let i = 0; i < existingDocs.length; i++) {
      const holiday = existingDocs[i].obj;
      if (holiday && holiday.date) {
        existingDates.add(holiday.date);
      }
    }

    let createdCount = 0;
    let skippedCount = 0;
    const createdHolidays = [];

    allHolidays.forEach(holiday => {
      if (existingDates.has(holiday.date)) {
        skippedCount++;
        return;
      }

      const holidayId = 'HOL_' + Utilities.getUuid();
      const holidayData = {
        holidayId: holidayId,
        date: holiday.date,
        name: holiday.name,
        type: holiday.type,
        isRecurring: holiday.isRecurring || false,
        createdAt: new Date().toISOString(),
        createdBy: Session.getActiveUser().getEmail()
      };

      db.createDocument('holidays/' + holidayId, holidayData);

      createdCount++;
      createdHolidays.push(`${holiday.date} - ${holiday.name}`);
      existingDates.add(holiday.date);
    });

    return {
      success: true,
      totalDefined: allHolidays.length,
      createdCount: createdCount,
      skippedCount: skippedCount,
      createdHolidays: createdHolidays
    };

  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function addLibraryItem_SERVER(libraryType, data) {
  try {
    const db = getFirestore();
    
    const itemId = Utilities.getUuid();
    const path = `libraries/${libraryType}/items/${itemId}`;
    
    const itemData = {
      id: itemId,
      name: data.name,
      createdAt: new Date().toISOString(),
      createdBy: Session.getActiveUser().getEmail()
    };
    
    db.createDocument(path, itemData);
    
    return {
      success: true,
      itemId: itemId
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function updateLibraryItem_SERVER(libraryType, itemId, data) {
  try {
    const db = getFirestore();
    
    const path = `libraries/${libraryType}/items/${itemId}`;
    
    const updateData = {
      name: data.name,
      updatedAt: new Date().toISOString(),
      updatedBy: Session.getActiveUser().getEmail()
    };
    
    db.updateDocument(path, updateData);
    
    return {
      success: true
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function deleteLibraryItem_SERVER(libraryType, itemId) {
  try {
    const db = getFirestore();
    
    const path = `libraries/${libraryType}/items/${itemId}`;
    db.deleteDocument(path);
    
    return {
      success: true
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function initializeLibraries_SERVER() {
  try {
    const db = getFirestore();
    
    const offices = [
      'Administrative Division',
      'Construction Division',
      'Equipment Management Division',
      'Finance Division',
      'Maintenance Division',
      'Office of the Regional Director',
      'Planning and Design Division',
      'Quality Assurance and Hydrology Division',
      'Right-of-Way Acquisition and Legal Division'
    ];
    
    const positions = [
      'Accountant I',
      'Accountant II',
      'Accountant III',
      'Accountant IV',
      'Administrative Aide III',
      'Administrative Aide IV',
      'Administrative Aide V',
      'Administrative Aide VI',
      'Administrative Assistant I',
      'Administrative Assistant II',
      'Administrative Assistant III',
      'Administrative Officer I',
      'Administrative Officer II',
      'Administrative Officer III',
      'Administrative Officer IV',
      'Administrative Officer V',
      'Architect II',
      'Assistant Regional Director',
      'Attorney III',
      'Attorney IV',
      'Attorney V',
      'Automotive Equipment Inspector II',
      'Chemist II',
      'Chief Administrative Officer',
      'Computer Programmer II',
      'District Engineer',
      'Engineer II',
      'Engineer III',
      'Engineer IV',
      'Engineer V',
      'Engineering Assistant',
      'Environmental Management Specialist II',
      'Geologist II',
      'Heavy Equipment Operator I',
      'Information Technologist Officer I',
      'Laboratory Technician I',
      'Laboratory Technician II',
      'Laboratory Technician Il',
      'Legal Assistant III',
      'Metal Worker I',
      'OIC - Assistant Regional Director',
      'Regional Director',
      'Supervising Administrative Officer',
      'Surveyman',
      'Welder I'
    ];
    
    const timestamp = new Date().toISOString();
    
    offices.forEach(office => {
      const itemId = Utilities.getUuid();
      const path = `libraries/offices/items/${itemId}`;
      const itemData = {
        id: itemId,
        name: office,
        createdAt: timestamp,
        createdBy: 'SYSTEM_INIT'
      };
      db.createDocument(path, itemData);
    });
    
    positions.forEach(position => {
      const itemId = Utilities.getUuid();
      const path = `libraries/positions/items/${itemId}`;
      const itemData = {
        id: itemId,
        name: position,
        createdAt: timestamp,
        createdBy: 'SYSTEM_INIT'
      };
      db.createDocument(path, itemData);
    });
    
    return {
      success: true,
      officesCreated: offices.length,
      positionsCreated: positions.length,
      message: 'Libraries initialized successfully!'
    };
    
  } catch (error) {
    Logger.log('Error initializing libraries: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

function migrateHistoricalBalance_SERVER(data) {
  try {
    const db = getFirestore();
    
    const cocEarned = parseFloat(data.cocEarned);
    const cocUsed = parseFloat(data.cocUsed) || 0;
    const monthYear = data.monthYear;
    const dateOfIssuance = new Date(data.dateOfIssuance);
    
    const [year, month] = monthYear.split('-').map(Number);
    const earnedMonth = month;
    const earnedYear = year;
    
    if (cocEarned > 40) {
      return {
        success: false,
        error: 'COC Earned cannot exceed 40 hours per month (Monthly Accrual Cap)'
      };
    }
    
    if (cocUsed > cocEarned) {
      return {
        success: false,
        error: 'COC Used cannot exceed COC Earned'
      };
    }
    
    const lastDayOfEarnedMonth = new Date(earnedYear, earnedMonth, 0);
    const lastDayOfNextMonth = new Date(earnedYear, earnedMonth + 1, 0);

    // Date range validation - allows December to span into next year
    if (dateOfIssuance < lastDayOfEarnedMonth || dateOfIssuance > lastDayOfNextMonth) {
      return {
        success: false,
        error: `Date of Issuance must be between ${lastDayOfEarnedMonth.toLocaleDateString('en-US', {timeZone: 'Asia/Manila'})} and ${lastDayOfNextMonth.toLocaleDateString('en-US', {timeZone: 'Asia/Manila'})}`
      };
    }
    
    const duplicateQuery = db.getDocuments('creditBatches');
    for (let i = 0; i < duplicateQuery.length; i++) {
      const batch = duplicateQuery[i];
      if (batch.fields.employeeId && batch.fields.employeeId.stringValue === data.employeeId &&
          batch.fields.isHistorical && batch.fields.isHistorical.booleanValue === true &&
          batch.fields.earnedMonth && batch.fields.earnedMonth.integerValue == earnedMonth &&
          batch.fields.earnedYear && batch.fields.earnedYear.integerValue == earnedYear) {
        return {
          success: false,
          error: `Historical balance for ${new Date(earnedYear, earnedMonth - 1).toLocaleDateString('en-US', {month: 'long', year: 'numeric', timeZone: 'Asia/Manila'})} already exists for this employee`
        };
      }
    }
    
    const remainingHours = cocEarned - cocUsed;
    
    const batchesQuery = db.getDocuments('creditBatches');
    let currentBalance = 0;
    
    batchesQuery.forEach(doc => {
      const batch = doc.obj;
      if (batch.employeeId === data.employeeId && batch.status === 'Active') {
        currentBalance += Number(batch.remainingHours || 0);
      }
    });
    
    const logsQuery = db.getDocuments('overtimeLogs');
    logsQuery.forEach(doc => {
      const log = doc.obj;
      if (log.employeeId === data.employeeId && log.status === 'Uncertified') {
        currentBalance += Number(log.earnedHours || 0);
      }
    });
    
    if (currentBalance + remainingHours > 120) {
      return {
        success: false,
        error: `Total balance cap exceeded. Current balance: ${currentBalance.toFixed(2)} hours. Adding ${remainingHours.toFixed(2)} hours would exceed 120-hour cap.`
      };
    }
    
    const expiryDate = new Date(dateOfIssuance);
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    expiryDate.setDate(expiryDate.getDate() - 1);

    // Calculate status with expiry check
    let status;
    if (remainingHours === 0) {
      status = 'Used';
    } else {
      // Check if expired - MUST use Manila timezone (UTC+8)
      // Get current date in Manila timezone as YYYY-MM-DD string
      const nowManilaStr = Utilities.formatDate(new Date(), 'Asia/Manila', 'yyyy-MM-dd');
      // Create Date object representing midnight of current day in Manila
      const todayManila = new Date(nowManilaStr);
      todayManila.setHours(0, 0, 0, 0);

      const expiry = new Date(expiryDate);
      expiry.setHours(0, 0, 0, 0);

      // "Valid Until Nov 11" means valid through entire day of Nov 11
      // Should only expire on Nov 12 onwards
      if (todayManila > expiry) {
        status = 'Expired';
      } else {
        status = 'Active';
      }
    }
    
    const batchId = 'BATCH_' + Utilities.getUuid();
    const ledgerEarnedId = 'LEDGER_' + Utilities.getUuid();
    const ledgerUsedId = 'LEDGER_' + Utilities.getUuid();
    
    const batchData = {
      batchId: batchId,
      employeeId: data.employeeId,
      certificateId: 'HISTORICAL',
      source: 'Historical',
      initialHours: cocEarned,
      earnedHours: cocEarned,
      usedHours: cocUsed,
      remainingHours: remainingHours,
      monthYear: monthYear,
      dateOfIssuance: dateOfIssuance.toISOString(),
      issueDate: dateOfIssuance.toISOString(),
      expiryDate: expiryDate.toISOString(),
      status: status,
      isHistorical: true,
      earnedMonth: earnedMonth,
      earnedYear: earnedYear,
      migratedAt: new Date().toISOString(),
      migratedBy: Session.getActiveUser().getEmail()
    };
    
    db.createDocument('creditBatches/' + batchId, batchData);
    
    const ledgerEarnedData = {
      ledgerId: ledgerEarnedId,
      employeeId: data.employeeId,
      transactionDate: dateOfIssuance.toISOString(),
      transactionType: 'Earned',
      referenceId: batchId,
      hoursChange: cocEarned,
      balanceAfter: currentBalance + cocEarned,
      remarks: `Historical balance - ${new Date(earnedYear, earnedMonth - 1).toLocaleDateString('en-US', {month: 'long', year: 'numeric', timeZone: 'Asia/Manila'})} (Initial Balance)`,
      createdAt: new Date().toISOString()
    };
    
    db.createDocument('ledger/' + ledgerEarnedId, ledgerEarnedData);
    
    if (cocUsed > 0) {
      const ledgerUsedData = {
        ledgerId: ledgerUsedId,
        employeeId: data.employeeId,
        transactionDate: dateOfIssuance.toISOString(),
        transactionType: 'Used',
        referenceId: batchId,
        hoursChange: -cocUsed,
        balanceAfter: currentBalance + remainingHours,
        remarks: `Historical balance - ${new Date(earnedYear, earnedMonth - 1).toLocaleDateString('en-US', {month: 'long', year: 'numeric', timeZone: 'Asia/Manila'})} (Initial Balance)`,
        createdAt: new Date().toISOString()
      };
      
      db.createDocument('ledger/' + ledgerUsedId, ledgerUsedData);
    }
    
    return {
      success: true,
      batchId: batchId,
      cocEarned: cocEarned,
      cocUsed: cocUsed,
      remainingHours: remainingHours,
      validUntil: expiryDate.toLocaleDateString('en-US', {timeZone: 'Asia/Manila'}),
      status: status
    };
    
  } catch (error) {
    Logger.log('Historical balance migration error: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

function saveConfiguration_SERVER(data) {
  try {
    const db = getFirestore();
    
    const configData = {
      regularDayMultiplier: data.regularDayMultiplier,
      restDayMultiplier: data.restDayMultiplier,
      holidayMultiplier: data.holidayMultiplier,
      monthlyAccrualCap: data.monthlyAccrualCap,
      totalBalanceCap: data.totalBalanceCap,
      expiryMonths: data.expiryMonths,
      updatedAt: new Date().toISOString(),
      updatedBy: Session.getActiveUser().getEmail()
    };
    
    db.updateDocument('configuration/accrualRules', configData);
    
    return {
      success: true
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function updateHistoricalBalance_SERVER(data) {
  try {
    const db = getFirestore();

    const cocEarned = parseFloat(data.cocEarned);
    const cocUsed = parseFloat(data.cocUsed) || 0;
    const monthYear = data.monthYear;
    const dateOfIssuance = new Date(data.dateOfIssuance);
    const batchId = data.batchId;

    const [year, month] = monthYear.split('-').map(Number);
    const earnedMonth = month;
    const earnedYear = year;

    // Get existing document to preserve ALL fields
    const existingDoc = db.getDocument('creditBatches/' + batchId);
    if (!existingDoc) {
      return {
        success: false,
        error: 'Historical balance not found'
      };
    }
    const existing = existingDoc.obj;

    // Same validations as create
    if (cocEarned > 40) {
      return {
        success: false,
        error: 'COC Earned cannot exceed 40 hours per month (Monthly Accrual Cap)'
      };
    }

    if (cocUsed > cocEarned) {
      return {
        success: false,
        error: 'COC Used cannot exceed COC Earned'
      };
    }

    const remainingHours = cocEarned - cocUsed;

    const expiryDate = new Date(dateOfIssuance);
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    expiryDate.setDate(expiryDate.getDate() - 1);

    // Calculate status with expiry check
    let status;
    if (remainingHours === 0) {
      status = 'Used';
    } else {
      // Check if expired - MUST use Manila timezone (UTC+8)
      // Get current date in Manila timezone as YYYY-MM-DD string
      const nowManilaStr = Utilities.formatDate(new Date(), 'Asia/Manila', 'yyyy-MM-dd');
      // Create Date object representing midnight of current day in Manila
      const todayManila = new Date(nowManilaStr);
      todayManila.setHours(0, 0, 0, 0);

      const expiry = new Date(expiryDate);
      expiry.setHours(0, 0, 0, 0);

      // "Valid Until Nov 11" means valid through entire day of Nov 11
      // Should only expire on Nov 12 onwards
      if (todayManila > expiry) {
        status = 'Expired';
      } else {
        status = 'Active';
      }
    }

    // Merge: Start with ALL existing fields, then override only what we're updating
    const updateData = Object.assign({}, existing, {
      initialHours: cocEarned,
      earnedHours: cocEarned,
      usedHours: cocUsed,
      remainingHours: remainingHours,
      monthYear: monthYear,
      dateOfIssuance: dateOfIssuance.toISOString(),
      issueDate: dateOfIssuance.toISOString(),
      expiryDate: expiryDate.toISOString(),
      status: status,
      earnedMonth: earnedMonth,
      earnedYear: earnedYear,
      updatedAt: new Date().toISOString(),
      updatedBy: Session.getActiveUser().getEmail()
    });

    db.updateDocument('creditBatches/' + batchId, updateData);

    return {
      success: true,
      batchId: batchId,
      cocEarned: cocEarned,
      cocUsed: cocUsed,
      remainingHours: remainingHours,
      validUntil: expiryDate.toLocaleDateString('en-US', {timeZone: 'Asia/Manila'}),
      status: status
    };

  } catch (error) {
    Logger.log('Historical balance update error: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

function deleteHistoricalBalance_SERVER(batchId) {
  try {
    const db = getFirestore();
    db.deleteDocument('creditBatches/' + batchId);

    return {
      success: true
    };

  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function checkEmployeeHasOvertimeLogs_SERVER(employeeId) {
  try {
    const db = getFirestore();

    const logDocs = db.getDocuments('overtimeLogs');
    let hasLogs = false;

    for (let i = 0; i < logDocs.length; i++) {
      const log = logDocs[i].obj;
      if (log && log.employeeId === employeeId) {
        hasLogs = true;
        break;
      }
    }

    return {
      success: true,
      hasLogs: hasLogs
    };

  } catch (error) {
    return {
      success: false,
      hasLogs: false,
      error: error.toString()
    };
  }
}

function dailyForfeitureTask() {
  try {
    const db = getFirestore();
    const today = new Date();
    
    const batchDocs = db.getDocuments('creditBatches');

    let forfeitedCount = 0;
    let totalForfeitedHours = 0;

    for (let i = 0; i < batchDocs.length; i++) {
      const doc = batchDocs[i];
      const batch = doc.obj;
      if (!batch || batch.status !== 'Active' || !batch.expiryDate) {
        continue;
      }

      const expiryDate = new Date(batch.expiryDate);
      if (expiryDate >= today) {
        continue;
      }

      const batchId = doc.name.split('/').pop();
      const remainingHours = Number(batch.remainingHours || 0);

      db.updateDocument('creditBatches/' + batchId, {
        status: 'Expired',
        expiredAt: today.toISOString()
      });

      const ledgerId = 'LEDGER_' + Utilities.getUuid();
      const ledgerData = {
        ledgerId: ledgerId,
        employeeId: batch.employeeId,
        transactionDate: today.toISOString(),
        transactionType: 'Forfeited',
        referenceId: batchId,
        hoursChange: -remainingHours,
        balanceAfter: 0,
        remarks: `Batch ${batchId} expired`,
        createdAt: today.toISOString()
      };

      db.createDocument('ledger/' + ledgerId, ledgerData);

      forfeitedCount++;
      totalForfeitedHours += remainingHours;
    }
    
    Logger.log(`Forfeiture task completed. ${forfeitedCount} batches expired. Total: ${totalForfeitedHours} hours`);
    
    return {
      success: true,
      forfeitedCount: forfeitedCount,
      totalForfeitedHours: totalForfeitedHours
    };
    
  } catch (error) {
    Logger.log('Forfeiture task error: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

function syncReportsToSheet() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('COC Reports');
    
    if (!sheet) {
      sheet = ss.insertSheet('COC Reports');
    } else {
      sheet.clear();
    }
    
    const db = getFirestore();
    
    sheet.appendRow(['COC Liability Report', '', '', '', '']);
    sheet.appendRow(['Generated:', new Date().toLocaleString('en-US', {timeZone: 'Asia/Manila'}), '', '', '']);
    sheet.appendRow(['']);
    sheet.appendRow(['Employee ID', 'Name', 'Total Balance (hrs)', 'Active Batches', 'Earliest Expiry']);
    
    const employeeDocs = db.getDocuments('employees');
    const batchDocs = db.getDocuments('creditBatches');

    const reportData = [];

    const activeEmployees = employeeDocs
      .map(doc => doc.obj)
      .filter(emp => emp && emp.isActive)
      .sort((a, b) => {
        const lastA = (a.lastName || '').toLowerCase();
        const lastB = (b.lastName || '').toLowerCase();
        if (lastA < lastB) return -1;
        if (lastA > lastB) return 1;
        return 0;
      });

    activeEmployees.forEach(emp => {
      const employeeBatches = batchDocs
        .filter(doc => {
          const batch = doc.obj;
          return batch && batch.employeeId === emp.employeeId && batch.status === 'Active';
        })
        .map(doc => doc.obj)
        .sort((a, b) => {
          const dateA = a.expiryDate ? new Date(a.expiryDate) : new Date('9999-12-31');
          const dateB = b.expiryDate ? new Date(b.expiryDate) : new Date('9999-12-31');
          return dateA - dateB;
        });

      let totalBalance = 0;
      let activeBatches = 0;
      let earliestExpiry = '';

      employeeBatches.forEach(batch => {
        totalBalance += Number(batch.remainingHours || 0);
        activeBatches++;

        if (!earliestExpiry && batch.expiryDate) {
          earliestExpiry = new Date(batch.expiryDate).toLocaleDateString('en-US', {timeZone: 'Asia/Manila'});
        }
      });

      if (totalBalance > 0) {
        reportData.push([
          emp.employeeId,
          `${emp.lastName}, ${emp.firstName}`,
          totalBalance.toFixed(2),
          activeBatches,
          earliestExpiry
        ]);
      }
    });
    
    if (reportData.length > 0) {
      sheet.getRange(5, 1, reportData.length, 5).setValues(reportData);
    } else {
      sheet.appendRow(['No active COC balances found']);
    }
    
    sheet.autoResizeColumns(1, 5);
    
    const headerRange = sheet.getRange(1, 1, 1, 5);
    headerRange.setFontWeight('bold').setFontSize(14);
    
    const columnHeaderRange = sheet.getRange(4, 1, 1, 5);
    columnHeaderRange.setFontWeight('bold').setBackground('#667eea').setFontColor('white');
    
    SpreadsheetApp.getUi().alert('Reports synced successfully to "COC Reports" sheet!');
    
    return {
      success: true,
      recordCount: reportData.length
    };
    
  } catch (error) {
    SpreadsheetApp.getUi().alert('Error syncing reports: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}
