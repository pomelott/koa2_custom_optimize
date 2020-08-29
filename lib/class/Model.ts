import Base from "./Base";

export default class extends Base{
    
    protected async repository (target: any) {
        if (this.conn) {
            return this.conn.getRepository(target);
        }
        return {};
    }
}