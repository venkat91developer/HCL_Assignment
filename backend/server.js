const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Schema } = mongoose;
// const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/hcl_assignment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ResearchParticipantSchema = new Schema({
  name: String,
  age: Number,
  email: String,
  dateJoined: Date,
  medicalResearchProgram: String,
});

const ResearchParticipant = mongoose.model('ResearchParticipant', ResearchParticipantSchema);

app.post('/participants', async (req, res) => {
  const participant = new ResearchParticipant(req.body);
  await participant.save();
  res.status(201).send(participant);
});

app.get('/participants', async (req, res) => {
  const participants = await ResearchParticipant.find();
  res.send(participants);
});

app.put('/participants/:id', async (req, res) => {
  const participant = await ResearchParticipant.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(participant);
});

app.delete('/participants/:id', async (req, res) => {
  const participant = await ResearchParticipant.findByIdAndDelete(req.params.id);
  if (participant) {
    // await fetch('http://localhost:4000/audit', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     participantId: participant._id,
    //     deletedAt: new Date(),
    //     details: participant
    //   }),
    // });
  }
  res.send(participant);
});

app.listen(3000, () => console.log('Microservice1 running on port 3000'));

// Microservice 2 - Audit Service
const auditApp = express();
auditApp.use(bodyParser.json());
auditApp.use(cors());

const AuditSchema = new Schema({
  participantId: String,
  deletedAt: Date,
  details: Object,
});

const AuditLog = mongoose.model('AuditLog', AuditSchema);

auditApp.post('/audit', async (req, res) => {
  const auditEntry = new AuditLog(req.body);
  await auditEntry.save();
  res.status(201).send(auditEntry);
});

auditApp.get('/audit', async (req, res) => {
  const audits = await AuditLog.find();
  res.send(audits);
});

auditApp.listen(4000, () => console.log('Audit Microservice running on port 4000'));
