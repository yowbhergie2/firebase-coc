# Deploy Code.gs to Google Apps Script

## ⚠️ IMPORTANT: Manual Deployment Required

The changes to `Code.gs` in this repository **do NOT automatically deploy** to Google Apps Script. You must manually update the script in the Google Apps Script editor.

## 🐛 Critical Bug Fixed

**Issue:** Date validation was calculating wrong month ranges, causing all certificate generation to fail.

**Error Message:** "Date of Issuance must be between December 31, 2024 and January 31, 2025" (for January 2025)

**Correct Range:** "Date of Issuance must be between January 31, 2025 and February 28, 2025" (for January 2025)

## 📝 Deployment Steps

### 1. Open Google Apps Script Editor
- Go to https://script.google.com
- Open your Firebase COC project

### 2. Find the Function
- Locate the `generateCOCCertificate_SERVER` function
- Go to approximately **line 815-820**
- Look for the section with comment: `// Calculate valid date range`

### 3. Replace the OLD Code

**OLD (BUGGY) CODE:**
```javascript
// Calculate valid date range: last day of earned month to last day of following month
const lastDayOfMonth = new Date(data.year, data.month, 0);
const followingMonth = data.month === 12 ? 1 : data.month + 1;
const followingYear = data.month === 12 ? data.year + 1 : data.year;
const lastDayOfFollowingMonth = new Date(followingYear, followingMonth, 0);
```

**NEW (FIXED) CODE:**
```javascript
// Calculate valid date range: last day of earned month to last day of following month
// Note: data.month is 0-based (0=Jan, 1=Feb, ..., 11=Dec)
const lastDayOfMonth = new Date(data.year, data.month + 1, 0);
const followingMonth = data.month === 11 ? 0 : data.month + 1;
const followingYear = data.month === 11 ? data.year + 1 : data.year;
const lastDayOfFollowingMonth = new Date(followingYear, followingMonth + 1, 0);
```

### 4. Save the Script
- Press **Ctrl+S** (Windows/Linux) or **Cmd+S** (Mac)
- Or click the **Save** icon

### 5. Test
- Try generating a certificate for January 2025 with Date of Issuance = February 1, 2025
- Should now work correctly ✅

## 🔍 What Changed?

| Line | Old | New | Why |
|------|-----|-----|-----|
| 817 | `data.month, 0` | `data.month + 1, 0` | Month is 0-indexed, need +1 |
| 818 | `data.month === 12` | `data.month === 11` | December is 11, not 12 |
| 820 | `followingMonth, 0` | `followingMonth + 1, 0` | Same +1 fix |

## ✅ Verification

After deploying, for **January 2025** (month=0):
- ✅ Valid range: January 31, 2025 - February 28, 2025
- ✅ Accepts: February 1, 2025
- ❌ Old range was: December 31, 2024 - January 31, 2025

For **December 2024** (month=11):
- ✅ Valid range: December 31, 2024 - January 31, 2025
- ✅ Accepts: January 1, 2025

## 📌 Remember

This fix needs to be applied **EVERY TIME** you update Code.gs from this repository to Google Apps Script.

Consider using `clasp` (Google's Apps Script CLI) for automatic deployment in the future.
