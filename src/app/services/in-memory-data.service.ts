import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let files = [
            'song1.mp3',
            'song2.mp3'
        ];
        return { files };
    }
}
