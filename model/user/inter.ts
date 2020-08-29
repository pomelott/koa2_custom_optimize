import Model from '@class/Model';
import {User} from '../../orm/entities/User';
import { QueryRunner } from 'typeorm';
export default class extends Model{
    // private test: string = '';
    private async addUser (qr: QueryRunner) {
        let newAdd = new User();
        newAdd.name = '炒面 tate';
        newAdd.addr = 'fuck addr';
        newAdd.phone = '12399992222';
        await qr.manager.save(newAdd);
    }

    private async getFirst (qr: QueryRunner) {
        return await qr.manager.findOne('User');
    }

    private async testRepository () {
        let userRepo = await this.repository('User');
        let newAdd = new User();
        newAdd.name = 'add from repo';
        newAdd.addr = 'add from repo';
        newAdd.phone = '18833339999';
        userRepo.save(newAdd);
    }

    private async getAll () {
        let userRepo = await this.repository('User');
        return await userRepo.find();
    }
}