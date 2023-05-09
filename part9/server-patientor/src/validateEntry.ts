import { Diagnosis, HealthCheckRating, NewEntry } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (element: unknown): element is number => {
    return typeof element === 'number' || element instanceof Number;
};

const parseNumber = (element: unknown): number => {
    if (!isNumber(element)) {
        throw new Error('Incorrect or missing element');
    }
    return element;
};

const parseString = (element: unknown): string => {
    if (!isString(element)) {
        throw new Error('Incorrect or missing element');
    }
    return element;
};

const parseDischarge = (object: unknown) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('date' in object && 'criteria' in object) {
        return {
            date: parseString(object.date),
            criteria: parseString(object.criteria),
        };
    } else {
        throw new Error('Incorrect or missing discharge data');
    }
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    console.log("param", param);
    return Object.values(HealthCheckRating).map(v => v).includes(param);
};

const parseHealthCheckRating = (rating: unknown) => {
    if (!isNumber(rating) || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect or missing health rating: ' + rating);

    }
    return rating;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [] as Array<Diagnosis['code']>;
    }
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const validateEntry = (object: unknown): NewEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data in entry');
    }

    if ('type' in object && 'description' in object && 'date' in object && 'specialist' in object) {

        let newEntry = {
            description: parseString(object.description),
            date: parseString(object.date),
            specialist: parseString(object.specialist),
            diagnosisCodes: [''],
        };

        if ("diagnosisCodes" in object) {
            newEntry = {
                ...newEntry,
                diagnosisCodes: parseDiagnosisCodes(object),
            };
        }

        switch (object.type) {
            case 'Hospital':
                if ('discharge' in object) {
                    const hospitalEntry = {
                        ...newEntry,
                        discharge: parseDischarge(object.discharge),
                        type: object.type,
                    };
                    return hospitalEntry;
                } else {
                    throw new Error('Incorrect data in hospital entry: missing discharge');
                }
            case 'HealthCheck':
                if ('healthCheckRating' in object) {
                    const healthCheckEntry = {
                        ...newEntry,
                        healthCheckRating: parseHealthCheckRating(parseNumber(object.healthCheckRating)),
                        type: object.type,
                    };
                    return healthCheckEntry;
                } else {
                    throw new Error('Incorrect data in health check: missing rating');
                }
            case 'OccupationalHealthcare':
                if ('employerName' in object) {
                    const occupationalEntry = {
                        ...newEntry,
                        employerName: parseString(object.employerName),
                        type: object.type,
                    };
                    return occupationalEntry;
                } else {
                    throw new Error('Incorrect data in occupational entry: missing employer');
                }
            default: throw new Error('Missing or incorrect entry type');
        }
    } else {
        throw new Error('Incorrect data: some fields are missing');
    }
};

export default validateEntry;
