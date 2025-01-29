import { v4 as uuidv4 } from 'uuid';

export abstract class Uuid {
    static generate(): string {
        return uuidv4();
    }

}