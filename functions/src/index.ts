import * as admin from "firebase-admin";;
import * as functions from "firebase-functions";

import { createUser } from "./createUser";
import createDocx from "./createDocx";

import ResumeModel from "./models/ResumeModel";

import { getResume } from "./api/getResume";

admin.initializeApp();

exports.createUser = createUser;
exports.createDocx = functions.https.onRequest(async (req, res) => {;

  if (!req.query.resume) {
    const message = "No resume param provided";
    console.log(message);
    res.status(400).send(message);
    return;
  }

  const data = await getResume(req.query.resume as string);
  if (!data) {
    const message = "Could not find resume with provided id";
    console.log(message);
    res.status(404).send(message);
    return;
  }

  const template = await getBucketFile("input.docx");
  if (!template) {
    const message = "Could not find docx template 'input.docx'";
    console.log(message);
    res.status(500).send(message);
    return;
  }

  // const resume = new ResumeModel(data);
  const resume = data;
  const avatar = await getBucketFile(`avatars/${resume.avatar}.png`);
  const output = await createDocx(resume, template, avatar)

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${data.personalia.firstName}-${data.personalia.lastName}-resume.docx`
  );

  res.setHeader(
    "Content-type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml"
  );

  res.setHeader("Content-Transfer-Encoding", "binary");

  res.status(200).send(output).end();
});

async function getBucketFile(filename: string): Promise<Buffer> {
  const bucket = admin.storage().bucket();
  const buffers = await bucket.file(filename).download();
  return buffers[0];
};
