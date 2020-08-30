# koa-typescript

* A pure server-end koa framework which use typescript directly.

* use pm2 & ts-node

* if like this please ⭐️star⭐ on github.

* welcome to issue.

## Features

* more flexible customize
* Use typescript directly without compiling to js file.
* Object-oriented programming
* more convenient router、controller、model、service、middleware、routerMiddleware
* provide orm operation with transactions
* provide log with higher readability.

## Npm script

* `npm run create-model`:  create model from mysql(you can config to use other db) to orm/, first to config db in lib/conf/db

* `npm run server`:  launch by pm2

* `npm run debug`:  launch by ts-node when develop or debug

## Router

| option | type | necessary | default | example | description |
|:---:|:---:|:---:|:---:|:---:|:---:|
| type | string | false |'get'|'get'、'post'| the method for http request |
| route | string | true | - | '/user'|the path for request |
| controller | string | false |the file based on controller/ according to the router path | 'user.inter' |specify the controller file|
| middleware | Array\<string> | false | - | 'user.check''|specify the routerMiddleware file based on routerMiddleware/specific/ |

&nbsp;

### router example

```ts
export default {
    priority: {
        route: '/priority',
        middleware: ['user.priority']
    },
    check: {
        route: '/check',
        middleware: ['user.check'],

    },
    testRepository: {
        route: '/repository',
        middleware: ['user.repository']
    }
}
```

## Controller

```ts
import Controller from '@class/Controller';
export default class Priority extends Controller {
    private async priority () {
        // function name refer to the router keyname
    }
}
```

## Model

* orm framework based on typeorm, for detail: [typeorm](https://github.com/typeorm/typeorm)

* operate the table(mysql) directly

### repository way

```ts
import Model from '@class/Model';
import {User} from '../../orm/entities/User';
export default class extends Model{
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
```

### queryRunner way

* this way can support transaction

```ts
// controller file
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
    }
}
```

```ts
// model file
import Model from '@class/Model';
import {User} from '../../orm/entities/User';
import { QueryRunner } from 'typeorm';
export default class extends Model{
    // private test: string = '';
    private async addUser (qr: QueryRunner) {
        let newAdd = new User();
        newAdd.name = '炒面 tate';
        newAdd.addr = 'test addr';
        newAdd.phone = '12399992222';
        await qr.manager.save(newAdd);
    }

    private async getFirst (qr: QueryRunner) {
        return await qr.manager.findOne('User');
    }
}
```

## Service

* when used queryRunner way in model file, then you can use transaction in service file.

```ts
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
```

## Notice

* for detail, please view the source code.
* the api document will be published later.

## Links

* [import-esm-directory](https://github.com/pomelott/import-esm-directory)