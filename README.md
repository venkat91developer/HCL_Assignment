## **System Overview**  
This system consists of:  

1. **Microservice 1: Research Program Service (Backend - Node.js/Express.js)**  
   - Manages **Medical Research Programs** and their associated **Research Participants**.  
   - Supports **CRUD operations** (Create, Read, Update, Delete).  
   - Sends **delete events** to Microservice 2 for auditing.  

2. **Microservice 2: Audit Service (Backend - Node.js/Express.js)**  
   - Listens for **delete events** from Microservice 1.  
   - Logs deleted records for auditing.  

3. **Frontend: Angular Application**  
   - Provides an **interactive UI** for managing research programs.  
   - Integrates with Microservice 1 via **REST API calls**.  

---

## **1. Microservice 1: Research Program Service**  

### **Entities:**  
#### **Medical Research Program**  
- `id` (UUID)  
- `name` (String)  
- `description` (String)  
- `startDate` (Date)  
- `endDate` (Date)  
- `budget` (Number)  
- `fileAttachment` (File)  

#### **Research Participant**  
- `id` (UUID)  
- `programId` (Foreign Key to Medical Research Program)  
- `name` (String)  
- `age` (Number)  
- `enrollmentDate` (Date)  
- `medicalReport` (File)  

### **API Endpoints:**  
- **GET** `/programs` → Retrieve all programs  
- **POST** `/programs` → Create a new research program  
- **PUT** `/programs/{id}` → Update program details  
- **DELETE** `/programs/{id}` → Delete a program  
  - **Triggers delete event** to Microservice 2.  

---

## **2. Microservice 2: Audit Service**  

### **Entities:**  
#### **AuditLog**  
- `id` (UUID)  
- `deletedEntityId` (UUID of deleted research program)  
- `entityType` (String) → e.g., "Research Program"  
- `deletedAt` (Timestamp)  
- `deletedBy` (String - user info)  

### **Workflow:**  
1. **Microservice 1 deletes a record.**  
2. **A delete event is sent to Microservice 2** via a message queue (RabbitMQ/Kafka).  
3. **Microservice 2 logs the deletion** in an `audit_log` table.  

### **API Endpoints (Optional):**  
- **GET** `/audit-logs` → Retrieve all delete logs  

---

## **3. Frontend: Angular Application**  

### **Features:**  
- **Dashboard** to list all **Research Programs**.  
- **Forms** to add/update programs.  
- **File Upload** for attaching research documents.  
- **Delete Program** (sends a request to Microservice 1).  

### **Angular Components:**  
- `ProgramsComponent` → Lists all research programs.  
- `AddProgramComponent` → Form to create a new program.  
- `EditProgramComponent` → Edit existing programs.  
- `DeleteConfirmationComponent` → Confirms deletions.  

### **API Integration:**  
- Uses **HttpClientModule** to interact with Microservice 1.  

---

## **4. Non-Functional Requirements**  

### **Authentication & Authorization**  
- Uses **JWT-based authentication**.  
- Role-based access control (Admin, Researcher).  

### **Encryption**  
- **Data encryption** for sensitive fields.  
- **HTTPS enforced** for secure communication.  

### **Audit & Logging**  
- **Microservice 2 maintains delete logs**.  
- Centralized **logging using Winston or Bunyan**.  

### **Scalability & Performance**  
- **Message queue (RabbitMQ/Kafka)** for async event handling.  
- **Database indexing** for faster queries.  
- **Dockerized services** for deployment.  

---

## **Technology Stack**  

### **Backend (Microservices)**  
- **Node.js** with Express.js  
- **PostgreSQL** for structured data storage  
- **RabbitMQ/Kafka** for message queue  
- **JWT for authentication**  

### **Frontend**  
- **Angular** (TypeScript)  
- **Material UI / Bootstrap** for UI components  

### **Deployment**  
- **Docker** for containerization  
- **Kubernetes** for orchestration  
- **Nginx** as a reverse proxy  

---

## **Summary**  
- **Microservice 1** manages Research Programs.  
- **Microservice 2** logs deletions.  
- **Angular Frontend** provides a UI.  
- **Security, Scalability, and Logging** are ensured. 🚀  