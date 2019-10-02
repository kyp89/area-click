import { Point } from 'common-models';

export class MarkedPoint {
    constructor(
        public id:string,
        public point:Point,
        public data:object
        ){}
}