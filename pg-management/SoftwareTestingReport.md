# Software Testing Report

**Project Name:** PG Management System  
**Module:** Client Booking System  
**Date:** 2025-12-02  

---

## 1. Black Box Testing Report

**Objective:** To validate the functional requirements of the Client Booking module by examining inputs and outputs without reference to internal implementation details.

### Test Scenarios & Results

| Test Case ID | Test Scenario | Input / Action | Expected Output | Actual Output | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BB-01** | **Room Category Selection** | Select "Double Room" option. | Room details update to "Double Sharing Room" description and corresponding images are displayed. | UI updated correctly to Double Room details. | **PASS** |
| **BB-02** | **Image Gallery Navigation** | Click "Next" button on the image slider. | The next image in the sequence is displayed. | Next image displayed. | **PASS** |
| **BB-03** | **Gallery Loop Functionality** | Click "Next" button while on the last image. | The slider loops back to the first image. | First image displayed (Loop successful). | **PASS** |
| **BB-04** | **Booking Initiation** | Click "Book Now" button. | The booking form modal opens, displaying empty input fields. | Modal opened successfully. | **PASS** |
| **BB-05** | **Mandatory Field Validation** | Leave all fields blank and click "Submit". | System displays error message: "Please fill in all required fields." Form remains open. | Error message displayed. Form did not submit. | **PASS** |
| **BB-06** | **Partial Data Validation** | Enter Name only, leave Contact blank, and click "Submit". | System displays error message: "Please fill in all required fields." | Error message displayed. | **PASS** |
| **BB-07** | **Successful Booking Submission** | Enter valid data for all fields (Name, Contact, Email, Dates) and click "Submit". | 1. Success message is logged.<br>2. Booking modal closes.<br>3. "Available Rooms" count decreases by 1. | Modal closed. Room count updated. | **PASS** |
| **BB-08** | **Server Error Handling** | Submit valid form data when the server is offline/unreachable. | System displays a user-friendly error message indicating submission failure. | Error message displayed correctly. | **PASS** |

---

## 2. White Box Testing Report

**Objective:** To verify the internal logic paths and control flow of the submission process using Basis Path Testing.

### 2.1 Control Flow Graph (CFG) Analysis

The Control Flow Graph represents the logical flow of the **Booking Submission Process**.

**Nodes (Logical Steps):**
*   **Node 1 (Start):** User initiates form submission.
*   **Node 2 (Decision):** Check if all required fields are filled (Validation).
*   **Node 3 (Process):** Display validation error message.
*   **Node 4 (Process):** Send booking data to server (API Request).
*   **Node 5 (Decision):** Check server response status (Success vs Failure).
*   **Node 6 (Process):** Handle server error (Display failure message).
*   **Node 7 (Process):** Process successful response (Clear form, Update UI).
*   **Node 8 (End):** End of process.

**Edges (Flow Direction):**
*   1 -> 2 (Start to Validation)
*   2 -> 3 (Validation Fails)
*   2 -> 4 (Validation Passes)
*   3 -> 8 (Exit after error)
*   4 -> 5 (Request sent, waiting for response)
*   5 -> 6 (Server returns Error)
*   5 -> 7 (Server returns Success)
*   6 -> 8 (Exit after server error)
*   7 -> 8 (Exit after success)

### 2.2 Independent Logic Paths

Based on the CFG, the following linearly independent paths cover all possible logical executions:

*   **Path 1: Validation Failure**
    *   **Flow:** Start -> Validation Check -> Validation Fail -> End
    *   **Description:** The user attempts to submit incomplete data. The system detects missing fields and stops the process.

*   **Path 2: Server/Network Failure**
    *   **Flow:** Start -> Validation Check -> Send Request -> Response Check -> Failure -> End
    *   **Description:** The data is valid, but the server encounters an error (e.g., Database error or Network timeout). The system handles the exception gracefully.

*   **Path 3: Successful Submission**
    *   **Flow:** Start -> Validation Check -> Send Request -> Response Check -> Success -> End
    *   **Description:** The data is valid and the server processes the request successfully. The UI is updated to reflect the new booking.

### 2.3 Cyclomatic Complexity

The Cyclomatic Complexity metric defines the number of independent paths through the code logic.

**Formula:** `V(G) = E - N + 2P`
*   **E (Edges/Arrows):** 9
*   **N (Nodes/Steps):** 8
*   **P (Connected Components):** 1

**Calculation:**
`V(G) = 9 - 8 + 2(1) = 3`

**Conclusion:**
The Cyclomatic Complexity is **3**. This confirms that exactly **3 test cases** (as defined in the Independent Logic Paths section) are sufficient to ensure 100% logic coverage of the submission module.
