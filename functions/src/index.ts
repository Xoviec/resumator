import * as admin from "firebase-admin";;
import * as functions from "firebase-functions";

import { createUser } from "./createUser";
import createDocx from "./createDocx";

import { getResume } from "./api/getResume";

const TEMPLATE_PATH = "template.docx";

admin.initializeApp();

exports.createUser = createUser;
exports.createDocx = functions.https.onRequest(async (req, res) => {;

  if (!req.query.resume) {
    const message = "No resume param provided";
    console.log(message);
    res.status(400).send(message);
    return;
  }

  const resume = await getResume(req.query.resume as string);
  if (!resume) {
    const message = "Could not find resume with provided id";
    console.log(message);
    res.status(404).send(message);
    return;
  }

  const template = await getBucketFile(TEMPLATE_PATH);
  if (!template) {
    const message = `Could not find docx template "${TEMPLATE_PATH}" on Firebase Storage`;
    console.log(message);
    res.status(500).send(message);
    return;
  }

  const avatar = await getBucketFile(`avatars/${resume.avatar}.png`);
  const output = await createDocx(resume, template, avatar)

  const { firstName, lastName } = resume.personalia;
  const filename = `resume=${firstName}-${lastName}.docx`
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${filename}`
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
