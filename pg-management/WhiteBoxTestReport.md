# White Box Testing Report for Clientbooking.jsx

**Project:** PG Management System  
**Module:** Client Booking (Clientbooking.jsx)  
**Date:** 2025-12-02  
**Tester:** AI Assistant

## 1. Introduction
This report documents the White Box testing for `Clientbooking.jsx`. White Box testing involves analyzing the internal structure, code logic, and control flow of the component. This includes code coverage, path analysis, and state management verification.

## 2. Code Structure Analysis
*   **Component Type:** Functional Component with Hooks (`useState`, `useEffect`).
*   **External Dependencies:** `react`, local assets (images, fonts), `Navbar` component.
*   **State Management:**
    *   `selectedCategory`: Controls current room view.
    *   `showForm`: Toggles modal visibility.
    *   `formData`: Object holding all input values.
    *   `categories`: Array holding dynamic room data (id, label, count).
    *   `loading` / `error`: UI states for async operations.

## 3. Control Flow & Logic Analysis

### 3.1 Data Fetching (`useEffect`)
*   **Logic:** On mount, fetches from `http://localhost:3000/api/rooms`.
*   **Transformation:** Maps API response to `categories` state, formatting labels and calculating `numberOfRooms` based on `status === 'Available'`.
*   **Error Handling:** `.catch()` block sets `error` state and disables `loading`.

### 3.2 Form Submission (`handleFormSubmit`)
*   **Validation Logic:**
    ```javascript
    if (!formData.name || !formData.contact || ... ) {
        setError('Please fill in all required fields.');
        return;
    }
    ```
    *   **Path 1 (Fail):** If any required field is falsy, set error and exit.
    *   **Path 2 (Pass):** Proceed to `fetch`.
*   **API Interaction:**
    *   Sends POST to `/api/bookings`.
    *   **Response Handling:** Checks `response.ok`. If false, throws error.
*   **Success Logic:**
    *   Clears `formData`.
    *   Closes modal (`setShowForm(false)`).
    *   **Optimistic Update:** Updates `categories` state to decrement `numberOfRooms` for the selected category immediately.

### 3.3 Image Navigation
*   **Logic:** Uses modulo arithmetic for circular navigation.
    *   `Next`: `(prevIndex + 1) % length`
    *   `Prev`: `(prevIndex - 1 + length) % length` (Handles negative index correctly).

## 4. White Box Test Cases

| Test ID | Function/Logic | Test Condition | Code Path | Expected Outcome |
| :--- | :--- | :--- | :--- | :--- |
| **WC-001** | `useEffect` | API returns valid JSON list. | `fetch` -> `.then` -> `setCategories` | `categories` state is populated. `loading` becomes `false`. |
| **WC-002** | `useEffect` | API fails (Network Error). | `fetch` -> `.catch` | `error` state is set to "Failed to load room data.". `loading` becomes `false`. |
| **WC-003** | `handleCategoryChange` | User selects radio button. | `setSelectedCategory` | State `selectedCategory` updates to input value. |
| **WC-004** | `handleFormSubmit` | `formData.name` is empty. | Validation `if` block | `setError` called. Function returns early (no API call). |
| **WC-005** | `handleFormSubmit` | All fields valid. API returns 200 OK. | Validation -> `fetch` -> `.then` | `formData` reset. `showForm` false. `categories` count decremented. |
| **WC-006** | `handleFormSubmit` | All fields valid. API returns 400/500. | Validation -> `fetch` -> `!response.ok` -> `throw` | `catch` block executes. `setError` updates with server message. |
| **WC-007** | `handlePrevImage` | `currentImageIndex` is 0. | `(0 - 1 + 4) % 4` | Index becomes 3 (Last image). |
| **WC-008** | `handleNextImage` | `currentImageIndex` is 3 (Last). | `(3 + 1) % 4` | Index becomes 0 (First image). |

## 5. Code Coverage Summary (Estimated)
*   **Statement Coverage:** High (~90%). Most lines are executed in standard flows. Error handlers are covered by negative test cases.
*   **Branch Coverage:** High. Both sides of validation `if`, API success/fail `if`, and ternary operators in render are testable.
*   **Function Coverage:** 100%. All handler functions are reachable via UI interactions.

## 6. Recommendations
*   **Hardcoded URLs:** The URL `http://localhost:3000` is hardcoded. Suggest moving to an environment variable or config file.
*   **Validation:** Validation checks only for existence (`!value`). Suggest adding regex for Email and Contact format validation.
*   **Error Reset:** `error` state might persist. Suggest clearing `error` when the user starts typing or re-opens the form.
