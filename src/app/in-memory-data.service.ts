import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let courses = [
            { id: 11, name: 'JAPN 1001' },
            { id: 12, name: 'JAPN 1002' },
            { id: 13, name: 'JAPN 2001' },
            { id: 14, name: 'CHIN 1001' },
            { id: 15, name: 'CHIN 1002' },
            { id: 16, name: 'CHIN 2001' },
            { id: 17, name: 'RUSS 1001' },
            { id: 18, name: 'RUSS 1002' },
            { id: 19, name: 'RUSS 2001' },
            { id: 20, name: 'RUSS 2002' }
        ];
        return { courses };
    }
}
