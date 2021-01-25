import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({ providedIn: 'root' })
export class CommentsSocket {
    public currentComments = this.socket.fromEvent('socketGetAllMsgsOfMosaic');

    constructor(private socket: Socket) {}

    getCollectionComments(id) {
        this.socket.emit('socketGetAllMsgsOfMosaic', id);
    }
}
