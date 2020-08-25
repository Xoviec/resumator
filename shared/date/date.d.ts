type FirestoreTimestamp = {}
type DateOrTimestamp = Date | FirebaseFirestore.Timestamp;
type LooseObject = {[key: string]: any}

export function castDate(timestamp: DateOrTimestamp | undefined): Date | undefined;

export function formatDate(timestamp: DateOrTimestamp | undefined, dateformat: string): string | undefined;

export function castDatesInObject(object: LooseObject): LooseObject;

export function formatDatesInObject(object: LooseObject, dateformat: string): LooseObject;
