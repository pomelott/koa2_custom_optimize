import Controller from '@class/Controller';
export default class Priority extends Controller {
    private async priority () {
        let userModel = await this.model('user.inter');
        let qr = await this.getQueryRunner();
        let manager = qr.manager;
        qr.startTransaction();
        await userModel.addUser(qr);
        let firstUser = await userModel.getFirst(qr);
        if (firstUser.name === 'tate') {
            qr.rollbackTransaction();
        } else {
            qr.commitTransaction();
        }
        let allUser = await manager.find('User');
        this.response.body = allUser;
    }

    private async check () {
        
        let qr = await this.getQueryRunner();
        let userService = await this.service('user.userService');
        this.response.body = await userService.priorityService(qr);
        this.ctx.debug.info('check debug')
        this.ctx.logger.info('check logger')
    }

    private async testRepository () {
        let userModel = await this.model('user.inter');
        await userModel.testRepository();
        this.response.body = await userModel.getAll();
    }
}