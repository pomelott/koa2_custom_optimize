import Service from "@class/Service";
import { QueryRunner } from "typeorm";

export default class extends Service{
    private async priorityService (qr: QueryRunner) {
        let userModel = await this.model('user.inter');
        qr.startTransaction();
        await userModel.addUser(qr);
        let firstOne = await userModel.getFirst(qr);
        if (firstOne.name === 'tate') {
            qr.rollbackTransaction();
        } else {
            qr.commitTransaction()
        }
        let allUser = await qr.manager.find('User');
        return allUser;
    }
}