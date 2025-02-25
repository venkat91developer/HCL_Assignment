import programRoutes from './router/program.routes';
const express = require('express');
require('dotenv').config();
const appProgram = express();
const appAudit = express();

const PORT_PROGRAM = Number(process.env.PORT_PROGRAM) | 3000;
const PORT_AUDIT = Number(process.env.PORT_AUDIT) | 4000;

//ROUTING PROCESS
appProgram.use('/api/v1/programs', programRoutes);
appAudit.use('/api/v1/audit-logs', programRoutes);

appProgram.listen(PORT_PROGRAM, () => {
    console.log(`Server Program run in port ${PORT_PROGRAM}`);
});
appAudit.listen(PORT_AUDIT, () => {
    console.log(`Server Audit run in port ${PORT_AUDIT}`);
});
