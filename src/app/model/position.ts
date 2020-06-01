import { Region } from './region';

export class Position extends Region {
    constructor(c: string, public position: number) {
        super(c, position, position);
    }

    name() {
        return `${this.chromosome}:${this.position}`;
    }
}
