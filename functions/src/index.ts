import * as admin from "firebase-admin";

import { createUser } from "./createUser";
import { updateLastUpdated } from "./updateLastUpdated";
import { addLastUpdatedToDocuments } from "./addLastUpdatedToDocuments";

admin.initializeApp();

exports.createUser = createUser;
exports.updateLastUpdated = updateLastUpdated;
exports.addLastUpdatedToDocuments = addLastUpdatedToDocuments;
